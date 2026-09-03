import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Post } from '../src/types/data';
import { postDataSchema } from '../src/lib/content/schemas';
import type { ArtworkMediaMetadataMap } from '../src/lib/content/mediaMetadata';
import {
    resolveImageDimensions,
    resolveResponsiveImageSources
} from './mediaMetadata';

interface PrepareMediaOptions {
    includeImageDimensions?: boolean;
    includeResponsiveImageSources?: boolean;
}

const collectJsonFiles = (directory: string): string[] => fs.readdirSync(directory, { withFileTypes: true })
    .flatMap(entry => entry.isDirectory()
        ? collectJsonFiles(path.join(directory, entry.name))
        : entry.name.endsWith('.json') ? [path.join(directory, entry.name)] : []
    );

export const prepareMediaMetadata = async (
    rootDir = process.cwd(),
    options: PrepareMediaOptions = {}
): Promise<void> => {
    const posts = collectJsonFiles(path.join(rootDir, 'src', 'data', 'posts'))
        .map(file => postDataSchema.parse(JSON.parse(fs.readFileSync(file, 'utf8'))) as Post);
    const [dimensions, sources] = await Promise.all([
        options.includeImageDimensions
            ? resolveImageDimensions(posts)
            : Promise.resolve(new Map()),
        options.includeResponsiveImageSources
            ? resolveResponsiveImageSources(posts)
            : Promise.resolve(new Map())
    ]);
    const metadata: ArtworkMediaMetadataMap = Object.fromEntries(
        [...new Set(posts.flatMap(post => post.url))].map(url => [url, {
            imageDimensions: dimensions.get(url) ?? null,
            imageSources: sources.get(url) ?? []
        }])
    );
    const generatedDir = path.join(rootDir, 'generated');
    fs.rmSync(generatedDir, { recursive: true, force: true });
    fs.mkdirSync(generatedDir, { recursive: true });
    fs.writeFileSync(
        path.join(generatedDir, 'media-metadata.json'),
        JSON.stringify(metadata),
        'utf8'
    );
    console.log(`Prepared media metadata for ${Object.keys(metadata).length} artwork images.`);
};

const isCliRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCliRun) {
    const legacyImageMetadata = process.argv.includes('--image-metadata');
    await prepareMediaMetadata(process.cwd(), {
        includeImageDimensions: legacyImageMetadata || process.argv.includes('--image-dimensions'),
        includeResponsiveImageSources: legacyImageMetadata || process.argv.includes('--reddit-responsive-images')
    });
}
