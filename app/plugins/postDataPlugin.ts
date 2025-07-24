import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import type { Post, Artist } from '../src/types/data';

const postsPath = path.resolve(__dirname, '../../data/posts/posts-2024.json');
const artistsPath = path.resolve(__dirname, '../../data/artists.json');

const readRequestBody = async (req: any): Promise<string> => {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) chunks.push(chunk);
    return Buffer.concat(chunks).toString();
};

const isValidPost = (entry: any): entry is Post => (
    entry !== null &&
    typeof entry === 'object' &&
    typeof entry.date === 'number' &&
    typeof entry.reddit === 'string' &&
    Array.isArray(entry.url) && entry.url.every((u: any) => typeof u === 'string') &&
    typeof entry.src === 'string' &&
    typeof entry.desc === 'string' &&
    typeof entry.artistId === 'string' &&
    Array.isArray(entry.characterIds) && entry.characterIds.every((id: any) => typeof id === 'string')
);

const isValidArtist = (entry: any): entry is Artist => (
    entry !== null &&
    typeof entry === 'object' &&
    typeof entry.id === 'string' &&
    typeof entry.name === 'string'
);

const readJsonFile = (filePath: string): any[] => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
};

const writeJsonFile = (filePath: string, data: any[]): void => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
};

const postDataPlugin: Plugin = {
    name: 'post-data',
    configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
            if (req.method !== 'POST') return next();

            const routeMap = {
                '/api/posts': { path: postsPath, validate: isValidPost },
                '/api/artists': { path: artistsPath, validate: isValidArtist }
            } as const;

            const config = routeMap[req.url as keyof typeof routeMap];
            if (!config) return next();

            try {
                const body = await readRequestBody(req);
                const entry = JSON.parse(body);

                if (!config.validate(entry)) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Invalid data format' }));
                    return;
                }

                const existing = readJsonFile(config.path);
                existing.push(entry);
                writeJsonFile(config.path, existing);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
            } catch {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal server error' }));
            }
        });
    }
};

export default postDataPlugin;