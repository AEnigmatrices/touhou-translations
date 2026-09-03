import fs from 'node:fs';
import path from 'node:path';
import { absoluteSiteUrl } from '../src/utils/siteMetadata';

interface BuildFile {
    absolutePath: string;
    relativePath: string;
    bytes: number;
}

const rootDir = path.resolve(import.meta.dirname, '..');
const buildDir = path.join(rootDir, 'build');
const generatedPostIdsPath = path.join(buildDir, 'post-ids.json');
const postsBuildDir = path.join(buildDir, 'posts');
const unknownPostSentinel = '__build-verifier-unknown-post__';
const serializedLayoutKey = 'randomPostIds';
const genericPostTitle = 'Post | Touhou Translations';
const genericPostDescription = 'View a translated Touhou Project comic or illustration.';
const maximumReportedErrors = 100;
const filesystemConcurrency = 64;
const kibibyte = 1024;
const mebibyte = 1024 * kibibyte;
const artifactBudgets = {
    totalBuildBytes: 64 * mebibyte,
    postHtmlP95Bytes: 32 * kibibyte,
    maximumPostHtmlBytes: 48 * kibibyte,
    javascriptBytes: 1 * mebibyte,
    cssBytes: 64 * kibibyte,
    serviceWorkerBytes: 64 * kibibyte
};

const toPortablePath = (filePath: string): string => filePath.split(path.sep).join('/');

const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;

    const units = ['KiB', 'MiB', 'GiB'];
    let value = bytes;
    let unitIndex = -1;
    do {
        value /= 1024;
        unitIndex += 1;
    } while (value >= 1024 && unitIndex < units.length - 1);

    return `${value.toFixed(2)} ${units[unitIndex]}`;
};

const summarizeValues = (values: string[], limit = 20): string => {
    const sorted = [...values].sort();
    const visible = sorted.slice(0, limit).join(', ');
    const remainder = sorted.length - limit;
    return remainder > 0 ? `${visible} (and ${remainder} more)` : visible;
};

const readPostIds = (): string[] => {
    if (!fs.existsSync(generatedPostIdsPath)) {
        throw new Error(`Built post ID list not found: ${generatedPostIdsPath}`);
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(fs.readFileSync(generatedPostIdsPath, 'utf8'));
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Could not parse ${generatedPostIdsPath}: ${message}`);
    }

    if (!Array.isArray(parsed) || !parsed.every(id => typeof id === 'string' && /^[a-z0-9]+$/.test(id))) {
        throw new Error(`${generatedPostIdsPath} must contain only lowercase alphanumeric post IDs.`);
    }
    if (parsed.length === 0) {
        throw new Error(`${generatedPostIdsPath} contains no post IDs.`);
    }

    const duplicates = parsed.filter((id, index) => parsed.indexOf(id) !== index);
    if (duplicates.length > 0) {
        throw new Error(`Generated post IDs are not unique: ${summarizeValues([...new Set(duplicates)])}`);
    }
    if (parsed.includes(unknownPostSentinel)) {
        throw new Error(`The unknown-post sentinel unexpectedly appears in generated data: ${unknownPostSentinel}`);
    }

    return parsed;
};

const mapConcurrent = async <T, R>(
    values: T[],
    concurrency: number,
    mapper: (value: T) => Promise<R>
): Promise<R[]> => {
    const results = new Array<R>(values.length);
    let nextIndex = 0;

    const worker = async (): Promise<void> => {
        while (nextIndex < values.length) {
            const index = nextIndex;
            nextIndex += 1;
            results[index] = await mapper(values[index]);
        }
    };

    await Promise.all(Array.from(
        { length: Math.min(concurrency, values.length) },
        () => worker()
    ));

    return results;
};

const collectBuildFiles = async (directory: string): Promise<BuildFile[]> => {
    const filePaths: string[] = [];

    const visit = (currentDirectory: string): void => {
        for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
            const absolutePath = path.join(currentDirectory, entry.name);
            if (entry.isDirectory()) {
                visit(absolutePath);
            } else if (entry.isFile()) {
                filePaths.push(absolutePath);
            }
        }
    };

    visit(directory);
    return await mapConcurrent(filePaths, filesystemConcurrency, async absolutePath => ({
        absolutePath,
        relativePath: toPortablePath(path.relative(buildDir, absolutePath)),
        bytes: (await fs.promises.stat(absolutePath)).size
    }));
};

const getAttribute = (tag: string, name: string): string | null => {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = tag.match(new RegExp(
        `\\s${escapedName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\x60]+))`,
        'i'
    ));
    return match ? (match[1] ?? match[2] ?? match[3] ?? '') : null;
};

const findMetaContent = (html: string, attributeName: 'name' | 'property', value: string): string | null => {
    for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
        if (getAttribute(match[0], attributeName)?.toLowerCase() === value.toLowerCase()) {
            return getAttribute(match[0], 'content');
        }
    }
    return null;
};

const findCanonicalUrls = (html: string): string[] => {
    const urls: string[] = [];
    for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
        const rel = getAttribute(match[0], 'rel');
        if (!rel?.toLowerCase().split(/\s+/).includes('canonical')) continue;

        const href = getAttribute(match[0], 'href');
        if (href !== null) urls.push(href);
    }
    return urls;
};

const validatePostHead = (id: string, html: string): string[] => {
    const errors: string[] = [];
    const label = `posts/${id}/index.html`;
    const expectedUrl = absoluteSiteUrl(`posts/${id}`);
    const canonicalUrls = findCanonicalUrls(html);
    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? '';
    const description = findMetaContent(html, 'name', 'description')?.trim() ?? '';
    const openGraphTitle = findMetaContent(html, 'property', 'og:title')?.trim() ?? '';
    const openGraphDescription = findMetaContent(html, 'property', 'og:description')?.trim() ?? '';
    const openGraphType = findMetaContent(html, 'property', 'og:type')?.trim() ?? '';
    const openGraphUrl = findMetaContent(html, 'property', 'og:url')?.trim() ?? '';
    const openGraphImage = findMetaContent(html, 'property', 'og:image')?.trim() ?? '';

    if (canonicalUrls.length !== 1 || canonicalUrls[0] !== expectedUrl) {
        const actual = canonicalUrls.length > 0 ? canonicalUrls.join(', ') : '(missing)';
        errors.push(`${label}: canonical URL must be exactly "${expectedUrl}"; found ${actual}.`);
    }
    if (!title || title === genericPostTitle || !title.endsWith(' | Touhou Translations')) {
        errors.push(`${label}: title is missing or still uses a generic post title.`);
    }
    if (!description || description === genericPostDescription) {
        errors.push(`${label}: description is missing or still uses the client-only placeholder.`);
    }
    if (!openGraphTitle || openGraphTitle !== title) {
        errors.push(`${label}: og:title must be present and match the document title.`);
    }
    if (!openGraphDescription || openGraphDescription !== description) {
        errors.push(`${label}: og:description must be present and match the description.`);
    }
    if (openGraphType !== 'article') {
        errors.push(`${label}: og:type must be "article".`);
    }
    if (openGraphUrl !== expectedUrl) {
        errors.push(`${label}: og:url must be exactly "${expectedUrl}".`);
    }
    if (!/^https:\/\/[^\s]+$/i.test(openGraphImage)) {
        errors.push(`${label}: og:image must be a nonempty absolute HTTPS URL.`);
    }
    if (!/class="[^"]*\bartist-pill\b[^"]*"/.test(html)) {
        errors.push(`${label}: server-rendered artist content is missing.`);
    }
    if (!/class="[^"]*\bpanel\b[^"]*\bprose\b[^"]*"/.test(html)) {
        errors.push(`${label}: server-rendered post description is missing.`);
    }
    if (!html.includes('alt="Translated artwork page 1"')) {
        errors.push(`${label}: server-rendered artwork is missing.`);
    }
    if (html.includes('Post not found.')) {
        errors.push(`${label}: valid post output contains the not-found state.`);
    }

    return errors;
};

const percentile = (sortedValues: number[], fraction: number): number => {
    if (sortedValues.length === 0) return 0;
    return sortedValues[Math.max(0, Math.ceil(sortedValues.length * fraction) - 1)];
};

const median = (sortedValues: number[]): number => {
    if (sortedValues.length === 0) return 0;
    const midpoint = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 === 0
        ? (sortedValues[midpoint - 1] + sortedValues[midpoint]) / 2
        : sortedValues[midpoint];
};

const main = async (): Promise<void> => {
    const postIds = readPostIds();
    if (!fs.existsSync(buildDir) || !fs.statSync(buildDir).isDirectory()) {
        throw new Error(`Build output not found: ${buildDir}`);
    }

    const errors: string[] = [];
    const expectedPostIds = new Set(postIds);
    let emittedDirectoryIds: string[] = [];

    if (!fs.existsSync(postsBuildDir) || !fs.statSync(postsBuildDir).isDirectory()) {
        errors.push(`Prerendered posts directory not found: ${postsBuildDir}`);
    } else {
        emittedDirectoryIds = fs.readdirSync(postsBuildDir, { withFileTypes: true })
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name);

        const emittedPostIds = new Set(emittedDirectoryIds);
        const missing = postIds.filter(id => !emittedPostIds.has(id));
        const unexpected = emittedDirectoryIds.filter(id => !expectedPostIds.has(id));
        if (missing.length > 0) {
            errors.push(`Missing ${missing.length} prerendered post director${missing.length === 1 ? 'y' : 'ies'}: ${summarizeValues(missing)}`);
        }
        if (unexpected.length > 0) {
            errors.push(`Found ${unexpected.length} unexpected post director${unexpected.length === 1 ? 'y' : 'ies'}: ${summarizeValues(unexpected)}`);
        }
    }

    const buildFiles = await collectBuildFiles(buildDir);
    const buildFilePaths = new Set(buildFiles.map(file => file.relativePath));
    const missingIndex = emittedDirectoryIds.filter(id => !buildFilePaths.has(`posts/${id}/index.html`));
    if (missingIndex.length > 0) {
        errors.push(`${missingIndex.length} post director${missingIndex.length === 1 ? 'y is' : 'ies are'} missing index.html: ${summarizeValues(missingIndex)}`);
    }

    const postFileIds = new Map<string, string>();
    for (const id of postIds) {
        postFileIds.set(`posts/${id}/index.html`, id);
    }

    const postHtmlSizes: Array<{ id: string; bytes: number }> = [];
    const serializedKeyFiles: string[] = [];
    const scannedFiles = buildFiles.filter(file =>
        postFileIds.has(file.relativePath) || /\.(?:html|json)$/i.test(file.relativePath)
    );
    const scanResults = await mapConcurrent(scannedFiles, filesystemConcurrency, async file => {
        const postId = postFileIds.get(file.relativePath);
        const isSerializedDocument = /\.(?:html|json)$/i.test(file.relativePath);
        const content = await fs.promises.readFile(file.absolutePath, 'utf8');
        return {
            file,
            postId,
            hasSerializedLayoutKey: isSerializedDocument && content.includes(serializedLayoutKey),
            headErrors: postId ? validatePostHead(postId, content) : []
        };
    });

    for (const result of scanResults) {
        if (result.hasSerializedLayoutKey) serializedKeyFiles.push(result.file.relativePath);
        if (!result.postId) continue;

        postHtmlSizes.push({ id: result.postId, bytes: result.file.bytes });
        errors.push(...result.headErrors);
    }

    if (serializedKeyFiles.length > 0) {
        errors.push(
            `The removed layout field "${serializedLayoutKey}" is serialized in ${serializedKeyFiles.length} build artifact(s): `
            + summarizeValues(serializedKeyFiles)
        );
    }

    const sentinelPrefix = `posts/${unknownPostSentinel}`;
    const sentinelFiles = buildFiles
        .map(file => file.relativePath)
        .filter(relativePath => relativePath === `${sentinelPrefix}.html` || relativePath.startsWith(`${sentinelPrefix}/`));
    if (sentinelFiles.length > 0) {
        errors.push(`Unknown-post sentinel output must not exist: ${summarizeValues(sentinelFiles)}`);
    }

    const totalBytes = buildFiles.reduce((sum, file) => sum + file.bytes, 0);
    const javascriptFiles = buildFiles.filter(file => path.extname(file.relativePath).toLowerCase() === '.js');
    const cssFiles = buildFiles.filter(file => path.extname(file.relativePath).toLowerCase() === '.css');
    const javascriptBytes = javascriptFiles.reduce((sum, file) => sum + file.bytes, 0);
    const cssBytes = cssFiles.reduce((sum, file) => sum + file.bytes, 0);
    const serviceWorker = buildFiles.find(file => file.relativePath === 'service-worker.js');
    if (!serviceWorker) {
        errors.push('Build output is missing service-worker.js.');
    }

    const sortedPostHtmlSizes = postHtmlSizes.map(post => post.bytes).sort((a, b) => a - b);
    const totalPostHtmlBytes = sortedPostHtmlSizes.reduce((sum, bytes) => sum + bytes, 0);
    const postHtmlP95Bytes = percentile(sortedPostHtmlSizes, 0.95);
    const largestPost = postHtmlSizes.reduce<{ id: string; bytes: number } | null>(
        (largest, post) => !largest || post.bytes > largest.bytes ? post : largest,
        null
    );

    console.log('Build artifact metrics');
    console.log(`  Total build: ${buildFiles.length.toLocaleString('en-US')} files, ${formatBytes(totalBytes)} (${totalBytes.toLocaleString('en-US')} bytes)`);
    console.log(`  Post HTML: ${postHtmlSizes.length.toLocaleString('en-US')} files`);
    console.log(`    Aggregate: ${formatBytes(totalPostHtmlBytes)} (${totalPostHtmlBytes.toLocaleString('en-US')} bytes)`);
    console.log(`    Median: ${formatBytes(median(sortedPostHtmlSizes))}`);
    console.log(`    p95: ${formatBytes(postHtmlP95Bytes)}`);
    console.log(`    Maximum: ${largestPost ? `${formatBytes(largestPost.bytes)} (posts/${largestPost.id}/index.html)` : 'n/a'}`);
    console.log(`  JavaScript: ${javascriptFiles.length.toLocaleString('en-US')} files, ${formatBytes(javascriptBytes)} (${javascriptBytes.toLocaleString('en-US')} bytes)`);
    console.log(`  CSS: ${cssFiles.length.toLocaleString('en-US')} files, ${formatBytes(cssBytes)} (${cssBytes.toLocaleString('en-US')} bytes)`);
    console.log(`  Service worker: ${serviceWorker ? `${formatBytes(serviceWorker.bytes)} (${serviceWorker.bytes.toLocaleString('en-US')} bytes)` : 'missing'}`);

    const enforceBudget = (label: string, actual: number, maximum: number): void => {
        if (actual > maximum) {
            errors.push(`${label} is ${formatBytes(actual)}, exceeding its ${formatBytes(maximum)} budget.`);
        }
    };

    enforceBudget('Total build size', totalBytes, artifactBudgets.totalBuildBytes);
    enforceBudget('Post HTML p95', postHtmlP95Bytes, artifactBudgets.postHtmlP95Bytes);
    enforceBudget('Largest post HTML', largestPost?.bytes ?? 0, artifactBudgets.maximumPostHtmlBytes);
    enforceBudget('JavaScript size', javascriptBytes, artifactBudgets.javascriptBytes);
    enforceBudget('CSS size', cssBytes, artifactBudgets.cssBytes);
    if (serviceWorker) enforceBudget('Service-worker size', serviceWorker.bytes, artifactBudgets.serviceWorkerBytes);

    if (errors.length > 0) {
        console.error(`\nBuild verification failed with ${errors.length.toLocaleString('en-US')} error${errors.length === 1 ? '' : 's'}:`);
        for (const error of errors.slice(0, maximumReportedErrors)) console.error(`  - ${error}`);
        if (errors.length > maximumReportedErrors) {
            console.error(`  - ...and ${(errors.length - maximumReportedErrors).toLocaleString('en-US')} more errors.`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(`\nBuild verification passed for all ${postIds.length.toLocaleString('en-US')} prerendered posts.`);
};

try {
    await main();
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Build verification failed: ${message}`);
    process.exitCode = 1;
}
