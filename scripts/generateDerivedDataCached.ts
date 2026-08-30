import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { generateDerivedData } from './generateDerivedData.ts';

interface CachedResponse {
    status: number;
    statusText: string;
    headers: Array<[string, string]>;
    body: string;
}

const rootDir = path.resolve(import.meta.dirname, '..');
const cacheDir = path.join(rootDir, '.cache', 'derived-fetch');
const originalFetch = globalThis.fetch.bind(globalThis);

const isCacheableRequest = (input: string | URL | Request, init?: RequestInit): boolean => {
    const request = input instanceof Request ? input : new Request(input, init);
    if (request.method !== 'GET') return false;

    const url = new URL(request.url);
    return url.hostname === 'i.redd.it'
        || url.hostname === 'preview.redd.it'
        || (url.hostname === 'www.reddit.com' && url.pathname === '/api/info.json');
};

const requestCacheKey = (input: string | URL | Request, init?: RequestInit): string => {
    const request = input instanceof Request ? input : new Request(input, init);
    const range = request.headers.get('range') ?? '';
    return createHash('sha256')
        .update(request.method)
        .update('\0')
        .update(request.url)
        .update('\0')
        .update(range)
        .digest('hex');
};

const readCachedResponse = (cachePath: string): Response | null => {
    if (!fs.existsSync(cachePath)) return null;

    try {
        const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8')) as CachedResponse;
        return new Response(Buffer.from(cached.body, 'base64'), {
            status: cached.status,
            statusText: cached.statusText,
            headers: cached.headers
        });
    } catch {
        fs.rmSync(cachePath, { force: true });
        return null;
    }
};

const writeCachedResponse = async (cachePath: string, response: Response): Promise<void> => {
    if (!response.ok || response.status === 206 && !response.headers.get('content-range')) return;

    const clone = response.clone();
    const payload: CachedResponse = {
        status: clone.status,
        statusText: clone.statusText,
        headers: [...clone.headers.entries()],
        body: Buffer.from(await clone.arrayBuffer()).toString('base64')
    };

    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(cachePath, JSON.stringify(payload), 'utf8');
};

globalThis.fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    if (!isCacheableRequest(input, init)) return await originalFetch(input, init);

    const cachePath = path.join(cacheDir, `${requestCacheKey(input, init)}.json`);
    const cached = readCachedResponse(cachePath);
    if (cached) return cached;

    const response = await originalFetch(input, init);
    try {
        await writeCachedResponse(cachePath, response);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`Could not cache derived-data request: ${message}`);
    }
    return response;
};

const legacyImageMetadata = process.argv.includes('--image-metadata');
await generateDerivedData(rootDir, {
    includeImageDimensions: legacyImageMetadata || process.argv.includes('--image-dimensions'),
    includeResponsiveImageSources: legacyImageMetadata || process.argv.includes('--reddit-responsive-images')
});
