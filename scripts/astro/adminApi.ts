import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import {
    artistDataSchema,
    characterDataSchema,
    portraitPathSchema,
    postDataSchema
} from '../../src/lib/content/schemas.ts';
import {
    extractBaseRedditUrl,
    fetchRedditData,
    type RedditDataResponse
} from '../vite/redditData.ts';

export const prerender = false;

const rootDir = path.resolve(import.meta.dirname, '../..');
const dataDir = path.join(rootDir, 'src', 'data');
const postsDir = path.join(dataDir, 'posts');
const artistsDir = path.join(dataDir, 'artists');
const charactersDir = path.join(dataDir, 'characters');
const redditDataCache = new Map<string, { expiresAt: number; result: RedditDataResponse }>();

const newArtistSchema = artistDataSchema.omit({ sortOrder: true }).extend({
    id: z.string().regex(/^[a-z0-9_]+$/),
    portrait: portraitPathSchema.refine(
        value => /^portraits\/placeholders\/(?:demoman|engineer|heavy|medic|pyro|scout|sniper|soldier|spy)\.webp$/.test(value),
        { message: 'Expected one of the admin placeholder portraits.' }
    )
});

const collectJsonFiles = (directory: string): string[] => fs.readdirSync(directory, { withFileTypes: true })
    .flatMap(entry => entry.isDirectory()
        ? collectJsonFiles(path.join(directory, entry.name))
        : entry.name.endsWith('.json') ? [path.join(directory, entry.name)] : []
    );

const entryId = (filePath: string): string => path.basename(filePath, '.json');

const readRecords = <T>(directory: string, parse: (value: unknown) => T): Array<{ id: string; data: T }> =>
    collectJsonFiles(directory).map(filePath => ({
        id: entryId(filePath),
        data: parse(JSON.parse(fs.readFileSync(filePath, 'utf8')) as unknown)
    }));

const writeJsonExclusive = (filePath: string, value: unknown): void => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 4)}\n`, { encoding: 'utf8', flag: 'wx' });
};

const getPostPath = (date: number, id: string): string => {
    const postDate = new Date(date);
    return path.join(
        postsDir,
        String(postDate.getUTCFullYear()),
        String(postDate.getUTCMonth() + 1).padStart(2, '0'),
        `${id}.json`
    );
};

const redditPostId = (url: string): string => url.match(/\/comments\/([a-zA-Z0-9]+)/)?.[1] ?? '';
const endpointPath = (pathname: string): string => pathname.replace(/\/+$/, '');

const json = (status: number, data: unknown): Response => new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

export const GET: APIRoute = async ({ url }) => {
    if (endpointPath(url.pathname) !== '/api/reddit-data') {
        return json(405, { error: 'Method not allowed.' });
    }

    const redditUrl = extractBaseRedditUrl(url.searchParams.get('url') ?? '');
    if (!redditUrl) return json(400, { error: 'Enter a valid Reddit post URL.' });

    const cached = redditDataCache.get(redditUrl);
    if (cached && cached.expiresAt > Date.now()) return json(200, cached.result);

    try {
        const { cacheable, ...result } = await fetchRedditData(redditUrl);
        if (cacheable) {
            redditDataCache.set(redditUrl, {
                expiresAt: Date.now() + 10 * 60_000,
                result
            });
        }
        return json(200, result);
    } catch (error) {
        return json(502, {
            error: error instanceof Error ? error.message : 'Failed to load Reddit data.'
        });
    }
};

export const POST: APIRoute = async ({ request, url }) => {
    let input: unknown;
    try {
        input = JSON.parse(await request.text()) as unknown;
    } catch {
        return json(400, { error: 'Request body must be valid JSON.' });
    }

    const endpoint = endpointPath(url.pathname);
    if (endpoint === '/api/posts') {
        const parsed = postDataSchema.safeParse(input);
        if (!parsed.success) return json(400, { error: 'Invalid post data format.' });

        const entry = parsed.data;
        const id = redditPostId(entry.reddit);
        const filePath = getPostPath(entry.date, id);
        const existingPostIds = new Set(collectJsonFiles(postsDir).map(entryId));
        if (!id || existingPostIds.has(id)) return json(409, { error: 'This Reddit post already exists.' });

        const artists = readRecords(artistsDir, value => artistDataSchema.parse(value));
        if (!artists.some(artist => artist.id === entry.artistId)) {
            return json(400, { error: 'Artist ID does not exist.' });
        }

        const validCharacterIds = new Set(
            readRecords(charactersDir, value => characterDataSchema.parse(value))
                .map(character => character.id)
        );
        if (entry.characterIds.some(id => !validCharacterIds.has(id))) {
            return json(400, { error: 'One or more character IDs do not exist.' });
        }

        try {
            writeJsonExclusive(filePath, entry);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
                return json(409, { error: 'This Reddit post already exists.' });
            }
            throw error;
        }
        return json(200, {
            success: true,
            file: path.relative(rootDir, filePath).replaceAll('\\', '/')
        });
    }

    if (endpoint === '/api/artists') {
        const parsed = newArtistSchema.safeParse(input);
        if (!parsed.success) return json(400, { error: 'Invalid artist data format.' });

        const { id, ...artist } = parsed.data;
        const filePath = path.join(artistsDir, `${id}.json`);
        if (fs.existsSync(filePath)) return json(409, { error: 'This artist ID already exists.' });
        const artists = readRecords(artistsDir, value => artistDataSchema.parse(value));
        const sortOrder = artists.reduce((maximum, entry) => Math.max(maximum, entry.data.sortOrder), -1) + 1;

        try {
            writeJsonExclusive(filePath, { ...artist, sortOrder });
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
                return json(409, { error: 'This artist ID already exists.' });
            }
            throw error;
        }
        return json(200, {
            success: true,
            file: path.relative(rootDir, filePath).replaceAll('\\', '/')
        });
    }

    return json(404, { error: 'Admin API endpoint not found.' });
};
