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
const documentPaths = collectFiles(buildDir)
    .filter(filePath => /\.html$/i.test(filePath))
    .sort();
const runtimeDataPaths = collectFiles(path.join(buildDir, 'runtime-data'))
    .filter(filePath => /\.json$/i.test(filePath))
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

// Runtime-cached documents and JSON must rotate with a deployment even though they
// are intentionally not all downloaded during service-worker installation.
for (const filePath of [...documentPaths, ...runtimeDataPaths]) {
    contentHash.update(toPortablePath(path.relative(buildDir, filePath)));
    contentHash.update('\0');
    contentHash.update(fs.readFileSync(filePath));
    contentHash.update('\0');
}

const cacheName = `${cachePrefix}${contentHash.digest('hex').slice(0, 16)}`;
const precacheUrls = precacheEntries.map(entry => entry.url);
const workerSource = `'use strict';

const BASE_PATH = ${JSON.stringify(basePath)};
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
        // Cache writes are opportunistic and must never affect a successful request.
    }
}

async function matchCachedNavigation(request) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(request)
        ?? await cache.match(request, { ignoreSearch: true });
}

async function navigationCacheFirst(event) {
    try {
        const cachedResponse = await matchCachedNavigation(event.request);
        if (cachedResponse) return cachedResponse;
    } catch {
        // A cache lookup failure should fall through to the network.
    }

    const response = await fetch(event.request);
    event.waitUntil(updateCache(event.request, response));
    return response;
}

function cacheFirst(event) {
    const result = caches.open(CACHE_NAME).then(async cache => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return { response: cachedResponse, cacheUpdate: Promise.resolve() };

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
    event.waitUntil((async () => {
        // Documents are deployment-versioned by CACHE_NAME, so a warm navigation
        // is already fresh for this build. Disable navigation preload to avoid a
        // redundant HTML request racing the cached response and its subresources.
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.disable();
        }

        const keys = await caches.keys();
        await Promise.all(keys
            .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map(key => caches.delete(key)));
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) return;

    if (request.mode === 'navigate') {
        event.respondWith(navigationCacheFirst(event));
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
