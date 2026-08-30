import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import type { ArtistRaw, Post } from '../../src/types/data.ts';
import { generateDerivedData } from '../generateDerivedData.ts';
import {
    extractBaseRedditUrl,
    fetchRedditData,
    type RedditDataResponse
} from './redditData.ts';

const rootDir = path.resolve(import.meta.dirname, '../..');
const dataDir = path.join(rootDir, 'data');
const generatedDir = path.join(rootDir, 'generated');
const postsDir = path.join(rootDir, 'data/posts');
const artistsPath = path.join(rootDir, 'data/artists.json');
const charactersPath = path.join(rootDir, 'data/characters.json');
let suppressDataHotUpdatesUntil = 0;
const redditDataCache = new Map<string, { expiresAt: number; result: RedditDataResponse }>();

const suppressDataHotUpdates = (): void => {
    suppressDataHotUpdatesUntil = Date.now() + 5_000;
};

const isWithinDirectory = (filePath: string, directory: string): boolean => {
    const relativePath = path.relative(directory, filePath);
    return relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
};

const readRequestBody = async (req: IncomingMessage): Promise<string> => {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) chunks.push(chunk);
    return Buffer.concat(chunks).toString();
};

const isRecord = (entry: unknown): entry is Record<string, unknown> => (
    entry !== null && typeof entry === 'object'
);

const isStringArray = (value: unknown): value is string[] => (
    Array.isArray(value) && value.every(item => typeof item === 'string')
);

const isValidPost = (entry: unknown): entry is Post => (
    isRecord(entry) &&
    typeof entry.date === 'number' &&
    typeof entry.reddit === 'string' &&
    isStringArray(entry.url) &&
    typeof entry.src === 'string' &&
    typeof entry.desc === 'string' &&
    typeof entry.artistId === 'string' &&
    isStringArray(entry.characterIds) &&
    entry.characterIds.length > 0 &&
    typeof entry.nsfw === 'boolean'
);

const isStoredArtist = (entry: unknown): entry is ArtistRaw => (
    isRecord(entry) &&
    typeof entry.id === 'string' &&
    typeof entry.name === 'string' &&
    typeof entry.portrait === 'string'
);

const isValidOptionalUrl = (value: unknown, pattern: RegExp): value is string | undefined => (
    value === undefined || (typeof value === 'string' && pattern.test(value))
);

const isValidNewArtist = (entry: unknown): entry is ArtistRaw => (
    isStoredArtist(entry) &&
    /^[a-z0-9_]+$/.test(entry.id) &&
    entry.name.trim().length > 0 &&
    /^portraits\/placeholders\/(?:demoman|engineer|heavy|medic|pyro|scout|sniper|soldier|spy)\.webp$/.test(entry.portrait) &&
    isValidOptionalUrl(entry.linkTwitter, /^https:\/\/(?:www\.)?(?:x|twitter)\.com\/[^/]+\/?$/i) &&
    isValidOptionalUrl(entry.linkPixiv, /^https:\/\/(?:www\.)?pixiv\.net\/(?:en\/)?users\/\d+\/?$/i)
);

const readJsonFile = (filePath: string): unknown[] => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
};

const writeJsonFile = (filePath: string, data: unknown[]): void => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
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

const sendJson = (res: ServerResponse, status: number, data: unknown): void => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};

const postDataPlugin: Plugin = {
    name: 'post-data',
    hotUpdate({ file }) {
        if (
            Date.now() <= suppressDataHotUpdatesUntil &&
            (isWithinDirectory(file, dataDir) || isWithinDirectory(file, generatedDir))
        ) {
            return [];
        }
    },
    configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
            const requestUrl = new URL(req.url ?? '/', 'http://localhost');

            try {
                if (req.method === 'GET' && requestUrl.pathname === '/api/reddit-data') {
                    const redditUrl = extractBaseRedditUrl(requestUrl.searchParams.get('url') ?? '');
                    if (!redditUrl) {
                        sendJson(res, 400, { error: 'Enter a valid Reddit post URL.' });
                        return;
                    }

                    const cached = redditDataCache.get(redditUrl);
                    if (cached && cached.expiresAt > Date.now()) {
                        sendJson(res, 200, cached.result);
                        return;
                    }

                    try {
                        const { cacheable, ...result } = await fetchRedditData(redditUrl);
                        if (cacheable) {
                            redditDataCache.set(redditUrl, {
                                expiresAt: Date.now() + 10 * 60_000,
                                result
                            });
                        }
                        sendJson(res, 200, result);
                    } catch (error) {
                        sendJson(res, 502, {
                            error: error instanceof Error ? error.message : 'Failed to load Reddit data.'
                        });
                    }
                    return;
                }

                if (req.method !== 'POST') return next();
                const body = await readRequestBody(req);
                const entry = JSON.parse(body);

                if (requestUrl.pathname === '/api/posts') {
                    if (!isValidPost(entry)) {
                        sendJson(res, 400, { error: 'Invalid post data format.' });
                        return;
                    }

                    const id = redditPostId(entry.reddit);
                    if (!id || readAllPosts().some(post => redditPostId(post.reddit) === id)) {
                        sendJson(res, 409, { error: 'This Reddit post already exists.' });
                        return;
                    }

                    const artists = readJsonFile(artistsPath).filter(isStoredArtist);
                    if (!artists.some(artist => artist.id === entry.artistId)) {
                        sendJson(res, 400, { error: 'Artist ID does not exist.' });
                        return;
                    }

                    const validCharacterIds = new Set(
                        readJsonFile(charactersPath)
                            .filter(isRecord)
                            .map(character => character.id)
                            .filter((id): id is string => typeof id === 'string')
                    );
                    if (entry.characterIds.some(id => !validCharacterIds.has(id))) {
                        sendJson(res, 400, { error: 'One or more character IDs do not exist.' });
                        return;
                    }

                    const filePath = getPostsPath(entry.date);
                    const posts = readJsonFile(filePath).filter(isValidPost);
                    posts.push(entry);
                    posts.sort((left, right) => left.date - right.date);
                    suppressDataHotUpdates();
                    writeJsonFile(filePath, posts);

                    sendJson(res, 200, { success: true, file: path.relative(rootDir, filePath).replaceAll('\\', '/') });
                    setTimeout(() => {
                        suppressDataHotUpdates();
                        void generateDerivedData(rootDir).catch(error => {
                            server.config.logger.error(
                                error instanceof Error ? error.message : 'Failed to regenerate derived data.'
                            );
                        });
                    }, 100);
                    return;
                }

                if (requestUrl.pathname === '/api/artists') {
                    if (!isValidNewArtist(entry)) {
                        sendJson(res, 400, { error: 'Invalid artist data format.' });
                        return;
                    }

                    const artists = readJsonFile(artistsPath);
                    if (artists.some(artist => isRecord(artist) && artist.id === entry.id)) {
                        sendJson(res, 409, { error: 'This artist ID already exists.' });
                        return;
                    }

                    artists.push(entry);
                    suppressDataHotUpdates();
                    writeJsonFile(artistsPath, artists);
                    sendJson(res, 200, { success: true, file: 'data/artists.json' });
                    setTimeout(() => {
                        suppressDataHotUpdates();
                        void generateDerivedData(rootDir).catch(error => {
                            server.config.logger.error(
                                error instanceof Error ? error.message : 'Failed to regenerate derived data.'
                            );
                        });
                    }, 100);
                    return;
                }

                return next();
            } catch (error) {
                sendJson(res, 500, {
                    error: error instanceof Error ? error.message : 'Internal server error.'
                });
            }
        });
    }
};

export default postDataPlugin;
