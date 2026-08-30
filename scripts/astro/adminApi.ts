import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';
import type { ArtistRaw, Post } from '../../src/types/data.ts';
import { generateDerivedData } from '../generateDerivedData.ts';
import { suppressDataHotUpdates } from '../vite/postDataHotUpdatePlugin.ts';
import {
    extractBaseRedditUrl,
    fetchRedditData,
    type RedditDataResponse
} from '../vite/redditData.ts';

export const prerender = false;

const rootDir = path.resolve(import.meta.dirname, '../..');
const postsDir = path.join(rootDir, 'data/posts');
const artistsPath = path.join(rootDir, 'data/artists.json');
const charactersPath = path.join(rootDir, 'data/characters.json');
const redditDataCache = new Map<string, { expiresAt: number; result: RedditDataResponse }>();

const isRecord = (entry: unknown): entry is Record<string, unknown> => (
    entry !== null && typeof entry === 'object'
);

const isStringArray = (value: unknown): value is string[] => (
    Array.isArray(value) && value.every(item => typeof item === 'string')
);

const isValidPost = (entry: unknown): entry is Post => (
    isRecord(entry)
    && typeof entry.date === 'number'
    && typeof entry.reddit === 'string'
    && isStringArray(entry.url)
    && typeof entry.src === 'string'
    && typeof entry.desc === 'string'
    && typeof entry.artistId === 'string'
    && isStringArray(entry.characterIds)
    && entry.characterIds.length > 0
    && typeof entry.nsfw === 'boolean'
);

const isStoredArtist = (entry: unknown): entry is ArtistRaw => (
    isRecord(entry)
    && typeof entry.id === 'string'
    && typeof entry.name === 'string'
    && typeof entry.portrait === 'string'
);

const isValidOptionalUrl = (value: unknown, pattern: RegExp): value is string | undefined => (
    value === undefined || (typeof value === 'string' && pattern.test(value))
);

const isValidNewArtist = (entry: unknown): entry is ArtistRaw => (
    isStoredArtist(entry)
    && /^[a-z0-9_]+$/.test(entry.id)
    && entry.name.trim().length > 0
    && /^portraits\/placeholders\/(?:demoman|engineer|heavy|medic|pyro|scout|sniper|soldier|spy)\.webp$/.test(entry.portrait)
    && isValidOptionalUrl(entry.linkTwitter, /^https:\/\/(?:www\.)?(?:x|twitter)\.com\/[^/]+\/?$/i)
    && isValidOptionalUrl(entry.linkPixiv, /^https:\/\/(?:www\.)?pixiv\.net\/(?:en\/)?users\/\d+\/?$/i)
);

const readJsonFile = (filePath: string): unknown[] => {
    try {
        const data: unknown = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
};

const writeJsonFile = (filePath: string, data: unknown[]): void => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
};

const getPostsPath = (date: number): string => {
    const year = new Date(date).getUTCFullYear();
    return path.join(postsDir, `posts-${year}.json`);
};

const readAllPosts = (): Post[] => (
    fs.readdirSync(postsDir)
        .filter(file => file.endsWith('.json'))
        .flatMap(file => readJsonFile(path.join(postsDir, file)))
        .filter(isValidPost)
);

const redditPostId = (url: string): string => url.match(/\/comments\/([a-zA-Z0-9]+)/)?.[1] ?? '';
const endpointPath = (pathname: string): string => pathname.replace(/\/+$/, '');

const json = (status: number, data: unknown): Response => new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

const scheduleDerivedData = (): void => {
    setTimeout(() => {
        suppressDataHotUpdates();
        void generateDerivedData(rootDir).catch(error => {
            console.error(error instanceof Error ? error.message : 'Failed to regenerate derived data.');
        });
    }, 100);
};

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
    let entry: unknown;
    const rawBody = await request.text();
    try {
        entry = JSON.parse(rawBody) as unknown;
    } catch {
        return json(400, { error: 'Request body must be valid JSON.' });
    }

    const endpoint = endpointPath(url.pathname);
    if (endpoint === '/api/posts') {
        if (!isValidPost(entry)) return json(400, { error: 'Invalid post data format.' });

        const id = redditPostId(entry.reddit);
        if (!id || readAllPosts().some(post => redditPostId(post.reddit) === id)) {
            return json(409, { error: 'This Reddit post already exists.' });
        }

        const artists = readJsonFile(artistsPath).filter(isStoredArtist);
        if (!artists.some(artist => artist.id === entry.artistId)) {
            return json(400, { error: 'Artist ID does not exist.' });
        }

        const validCharacterIds = new Set(
            readJsonFile(charactersPath)
                .filter(isRecord)
                .map(character => character.id)
                .filter((id): id is string => typeof id === 'string')
        );
        if (entry.characterIds.some(id => !validCharacterIds.has(id))) {
            return json(400, { error: 'One or more character IDs do not exist.' });
        }

        const filePath = getPostsPath(entry.date);
        const posts = readJsonFile(filePath).filter(isValidPost);
        posts.push(entry);
        posts.sort((left, right) => left.date - right.date);
        suppressDataHotUpdates();
        writeJsonFile(filePath, posts);
        scheduleDerivedData();
        return json(200, {
            success: true,
            file: path.relative(rootDir, filePath).replaceAll('\\', '/')
        });
    }

    if (endpoint === '/api/artists') {
        if (!isValidNewArtist(entry)) return json(400, { error: 'Invalid artist data format.' });

        const artists = readJsonFile(artistsPath);
        if (artists.some(artist => isRecord(artist) && artist.id === entry.id)) {
            return json(409, { error: 'This artist ID already exists.' });
        }

        artists.push(entry);
        suppressDataHotUpdates();
        writeJsonFile(artistsPath, artists);
        scheduleDerivedData();
        return json(200, { success: true, file: 'data/artists.json' });
    }

    return json(404, { error: 'Admin API endpoint not found.' });
};
