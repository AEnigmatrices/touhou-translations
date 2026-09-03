import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
    artistDataSchema,
    characterDataSchema,
    postDataSchema
} from '../src/lib/content/schemas';
import { extractRedditId } from '../src/utils/extractRedditId';

export interface ContentValidationResult {
    errors: string[];
    artistsCount: number;
    charactersCount: number;
    postsCount: number;
}

const collectJsonFiles = (directory: string): string[] => {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
        ? collectJsonFiles(path.join(directory, entry.name))
        : entry.name.endsWith('.json') ? [path.join(directory, entry.name)] : []
    );
};

const formatIssues = (issues: Array<{ path: PropertyKey[]; message: string }>): string => issues
    .map(issue => `${issue.path.length ? `.${issue.path.join('.')}` : ''}: ${issue.message}`)
    .join('; ');

const parseJson = (filePath: string, errors: string[]): unknown => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8')) as unknown;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        errors.push(`${filePath} could not be parsed: ${message}`);
        return undefined;
    }
};

const checkCaseCollisions = (kind: string, ids: string[], errors: string[]): void => {
    const seen = new Map<string, string>();
    for (const id of ids) {
        const key = id.toLocaleLowerCase('en-US');
        const existing = seen.get(key);
        if (existing && existing !== id) errors.push(`${kind} IDs differ only by case: ${existing} and ${id}.`);
        seen.set(key, id);
    }
};

export const validateContentData = (rootDir = process.cwd()): ContentValidationResult => {
    const contentDir = path.join(rootDir, 'src', 'data');
    const artistsDir = path.join(contentDir, 'artists');
    const charactersDir = path.join(contentDir, 'characters');
    const postsDir = path.join(contentDir, 'posts');
    const errors: string[] = [];
    const artistFiles = collectJsonFiles(artistsDir);
    const characterFiles = collectJsonFiles(charactersDir);
    const postFiles = collectJsonFiles(postsDir);
    const artistIdList = artistFiles.map(file => path.basename(file, '.json'));
    const characterIdList = characterFiles.map(file => path.basename(file, '.json'));
    const artistIds = new Set(artistIdList);
    const characterIds = new Set(characterIdList);
    const postIds = postFiles.map(file => path.basename(file, '.json'));

    checkCaseCollisions('Artist', artistIdList, errors);
    checkCaseCollisions('Character', characterIdList, errors);
    checkCaseCollisions('Post', postIds, errors);
    if (artistIds.size !== artistIdList.length) errors.push('Artist filename IDs must be globally unique.');
    if (characterIds.size !== characterIdList.length) errors.push('Character filename IDs must be globally unique.');
    if (new Set(postIds).size !== postIds.length) errors.push('Post filename IDs must be globally unique.');

    const validatePortrait = (file: string, portrait: string): void => {
        const assetPath = path.join(rootDir, 'src', 'assets', ...portrait.split('/'));
        if (!fs.existsSync(assetPath)) errors.push(`${path.relative(rootDir, file)} references missing portrait ${portrait}.`);
    };

    const artistOrders = new Set<number>();
    for (const file of artistFiles) {
        const parsed = artistDataSchema.safeParse(parseJson(file, errors));
        if (!parsed.success) {
            errors.push(`${path.relative(rootDir, file)}${formatIssues(parsed.error.issues)}.`);
            continue;
        }
        if (artistOrders.has(parsed.data.sortOrder)) errors.push(`Artist sortOrder ${parsed.data.sortOrder} is duplicated.`);
        artistOrders.add(parsed.data.sortOrder);
        validatePortrait(file, parsed.data.portrait);
    }

    const characterOrders = new Set<number>();
    for (const file of characterFiles) {
        const parsed = characterDataSchema.safeParse(parseJson(file, errors));
        if (!parsed.success) {
            errors.push(`${path.relative(rootDir, file)}${formatIssues(parsed.error.issues)}.`);
            continue;
        }
        if (characterOrders.has(parsed.data.sortOrder)) errors.push(`Character sortOrder ${parsed.data.sortOrder} is duplicated.`);
        characterOrders.add(parsed.data.sortOrder);
        validatePortrait(file, parsed.data.portrait);
    }

    for (const file of postFiles) {
        const id = path.basename(file, '.json');
        const parsed = postDataSchema.safeParse(parseJson(file, errors));
        if (!parsed.success) {
            errors.push(`${path.relative(rootDir, file)}${formatIssues(parsed.error.issues)}.`);
            continue;
        }
        const redditId = extractRedditId(parsed.data.reddit);
        if (redditId !== id) errors.push(`${path.relative(rootDir, file)} has Reddit ID ${redditId || '(missing)'}, expected ${id}.`);
        if (!artistIds.has(parsed.data.artistId)) errors.push(`${path.relative(rootDir, file)} references missing artist ${parsed.data.artistId}.`);
        for (const characterId of parsed.data.characterIds) {
            if (!characterIds.has(characterId)) errors.push(`${path.relative(rootDir, file)} references missing character ${characterId}.`);
        }
        const date = new Date(parsed.data.date);
        const expectedTail = path.join(
            String(date.getUTCFullYear()),
            String(date.getUTCMonth() + 1).padStart(2, '0'),
            `${id}.json`
        );
        if (!file.endsWith(expectedTail)) errors.push(`${path.relative(rootDir, file)} is outside its UTC month.`);
    }

    return {
        errors,
        artistsCount: artistFiles.length,
        charactersCount: characterFiles.length,
        postsCount: postFiles.length
    };
};

export const printContentValidationResult = (result: ContentValidationResult): void => {
    if (result.errors.length) {
        console.error(`Content validation failed with ${result.errors.length} error(s):`);
        result.errors.forEach(error => console.error(`- ${error}`));
        return;
    }
    console.log(
        `Content validation passed: ${result.artistsCount} artists, `
        + `${result.charactersCount} characters, ${result.postsCount} posts.`
    );
};

const isCliRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCliRun) {
    const result = validateContentData();
    printContentValidationResult(result);
    process.exitCode = result.errors.length ? 1 : 0;
}
