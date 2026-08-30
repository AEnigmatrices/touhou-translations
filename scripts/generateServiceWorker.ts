import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

interface PrecacheEntry {
    filePath: string;
    url: string;
}

const rootDir = path.resolve(import.meta.dirname, '..');
const buildDir = path.join(rootDir, 'build');
const publicDir = path.join(rootDir, 'public');
const serviceWorkerPath = path.join(buildDir, 'service-worker.js');
const basePath = '/touhou-translations/';
const cachePrefix = 'touhou-translations-';

const toPortablePath = (filePath: string): string => filePath.split(path.sep).join('/');

const collectFiles = (directory: string): string[] => {
    if (!fs.existsSync(directory)) return [];

    const files: string[] = [];
    const visit = (currentDirectory: string): void => {
        for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
            const entryPath = path.join(currentDirectory, entry.name);
            if (entry.isDirectory()) visit(entryPath);
            else if (entry.isFile()) files.push(entryPath);
        }
    };

    visit(directory);
    return files;
};

const assertBuildFile = (relativePath: string): PrecacheEntry => {
    const filePath = path.join(buildDir, ...relativePath.split('/'));
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        throw new Error(`Required build asset is missing: ${relativePath}`);
    }

    return { filePath, url: `${basePath}${relativePath}` };
};

if (!fs.existsSync(buildDir) || !fs.statSync(buildDir).isDirectory()) {
    throw new Error(`Astro build output not found: ${buildDir}`);
}

const appShellPath = path.join(buildDir, 'index.html');
if (!fs.existsSync(appShellPath) || !fs.statSync(appShellPath).isFile()) {
    throw new Error(`Astro app shell not found: ${appShellPath}`);
}

const metadataAssetPaths = ['favicon.ico', 'robots.txt', 'manifest.webmanifest'];
const pwaIconPaths = collectFiles(path.join(publicDir, 'icons', 'pwa'))
    .filter(filePath => /\.png$/i.test(filePath))
    .map(filePath => toPortablePath(path.relative(publicDir, filePath)));
const postDocumentPaths = collectFiles(path.join(buildDir, 'posts'))
    .filter(filePath => path.basename(filePath) === 'index.html')
    .sort();

const entriesByUrl = new Map<string, PrecacheEntry>();
entriesByUrl.set(basePath, { filePath: appShellPath, url: basePath });
for (const relativePath of [...metadataAssetPaths, ...pwaIconPaths]) {
    const entry = assertBuildFile(relativePath);
    entriesByUrl.set(entry.url, entry);
}

const precacheEntries = [...entriesByUrl.values()].sort((left, right) => left.url.localeCompare(right.url));
const contentHash = createHash('sha256');
for (const entry of precacheEntries) {
    contentHash.update(entry.url);
    contentHash.update('\0');
    contentHash.update(fs.readFileSync(entry.filePath));
    contentHash.update('\0');
}

// Post pages are runtime-cached. Include their contents in the cache version so a
// deployment that edits an existing post cannot leave an older cached document behind.
for (const filePath of postDocumentPaths) {
    contentHash.update(toPortablePath(path.relative(buildDir, filePath)));
    contentHash.update('\0');
    contentHash.update(fs.readFileSync(filePath));
    contentHash.update('\0');
}

const cacheName = `${cachePrefix}${contentHash.digest('hex').slice(0, 16)}`;
const precacheUrls = precacheEntries.map(entry => entry.url);
const workerSource = `'use strict';

const BASE_PATH = ${JSON.stringify(basePath)};
const POST_PATH_PREFIX = BASE_PATH + 'posts/';
const CACHE_PREFIX = ${JSON.stringify(cachePrefix)};
const CACHE_NAME = ${JSON.stringify(cacheName)};
const PRECACHE_URLS = ${JSON.stringify(precacheUrls, null, 4)};

function canCache(response) {
    return response.ok && response.status !== 206;
}

async function updateCache(request, response) {
    if (!canCache(response)) return;

    const cachedResponse = response.clone();
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, cachedResponse);
    } catch {
        // A cache write failure must not turn a successful network request into a failure.
    }
}

async function matchCachedNavigation(request) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(request)
        ?? await cache.match(request, { ignoreSearch: true });
}

function networkFirst(event) {
    const networkResult = fetch(event.request).then(response => ({
        response,
        cacheUpdate: updateCache(event.request, response)
    }));

    event.waitUntil(
        networkResult
            .then(result => result.cacheUpdate)
            .catch(() => undefined)
    );

    return networkResult
        .then(result => result.response)
        .catch(async () => await matchCachedNavigation(event.request) ?? Response.error());
}

async function cacheAdjacentPostDocuments(response) {
    if (!canCache(response)) return;

    let html;
    try {
        html = await response.clone().text();
    } catch {
        return;
    }

    const adjacentUrls = new Set();
    const adjacentLinkPattern = /<a[^>]*href=(["'])([^"']+)["'][^>]*>[^<]*(?:Previous|Next)[^<]*<[/]a>/gi;
    for (const match of html.matchAll(adjacentLinkPattern)) {
        try {
            const url = new URL(match[2], self.location.origin);
            if (url.origin === self.location.origin && url.pathname.startsWith(POST_PATH_PREFIX)) {
                adjacentUrls.add(url.href);
            }
        } catch {
            // Ignore malformed links rather than affecting the current navigation.
        }
    }

    if (adjacentUrls.size === 0) return;

    const cache = await caches.open(CACHE_NAME);
    await Promise.all([...adjacentUrls].map(async url => {
        const request = new Request(url, { credentials: 'same-origin' });
        if (await cache.match(request, { ignoreSearch: true })) return;

        try {
            const adjacentResponse = await fetch(request);
            await updateCache(request, adjacentResponse);
        } catch {
            // Adjacent warming is opportunistic and must never affect the current page.
        }
    }));
}

function postNavigationCacheFirst(event) {
    const result = caches.open(CACHE_NAME).then(async cache => {
        const cachedResponse = await cache.match(event.request, { ignoreSearch: true });
        if (cachedResponse) {
            return {
                response: cachedResponse,
                backgroundUpdate: cacheAdjacentPostDocuments(cachedResponse)
            };
        }

        const response = await fetch(event.request);
        return {
            response,
            backgroundUpdate: Promise.all([
                updateCache(event.request, response),
                cacheAdjacentPostDocuments(response)
            ]).then(() => undefined)
        };
    });

    event.waitUntil(
        result
            .then(value => value.backgroundUpdate)
            .catch(() => undefined)
    );

    return result.then(value => value.response);
}

function cacheFirst(event) {
    const result = caches.open(CACHE_NAME).then(async cache => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return { response: cachedResponse, cacheUpdate: Promise.resolve() };
        }

        const response = await fetch(event.request);
        return { response, cacheUpdate: updateCache(event.request, response) };
    });

    event.waitUntil(
        result
            .then(networkResult => networkResult.cacheUpdate)
            .catch(() => undefined)
    );

    return result.then(networkResult => networkResult.response);
}

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys
                .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
                .map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) return;

    if (request.mode === 'navigate') {
        event.respondWith(
            url.pathname.startsWith(POST_PATH_PREFIX)
                ? postNavigationCacheFirst(event)
                : networkFirst(event)
        );
        return;
    }

    event.respondWith(cacheFirst(event));
});
`;

fs.writeFileSync(serviceWorkerPath, workerSource, 'utf8');
console.log(
    `Generated ${toPortablePath(path.relative(rootDir, serviceWorkerPath))} with `
    + `${precacheUrls.length} precached URLs (${cacheName}).`
);
