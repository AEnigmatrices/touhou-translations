/// <reference lib="webworker" />

import { base, build, files, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const cachePrefix = 'touhou-translations-';
const cacheName = `touhou-translations-${version}`;
const appShell = `${base}/`;
const cachedFiles = [...new Set([
    ...build,
    ...files.filter(file => /\.(?:ico|png|svg|txt|webmanifest|woff2)$/.test(file)),
    appShell
])];

interface NetworkResult {
    response: Response;
    cacheUpdate: Promise<void>;
}

function isDataRequest(url: URL): boolean {
    return /(?:\/__data\.json|\.html__data\.json)$/.test(url.pathname);
}

function updateCache(request: Request, response: Response): Promise<void> {
    if (!response.ok || response.status === 206) return Promise.resolve();

    const cachedResponse = response.clone();
    return caches.open(cacheName)
        .then(cache => cache.put(request, cachedResponse))
        .catch(() => undefined);
}

function networkFirst(event: FetchEvent, fallback: () => Promise<Response | undefined>): Promise<Response> {
    const networkResult = fetch(event.request).then<NetworkResult>(response => ({
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
        .catch(async () => await fallback() ?? Response.error());
}

function cacheFirst(event: FetchEvent): Promise<Response> {
    const result = caches.open(cacheName).then(async cache => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return {
                response: cachedResponse,
                cacheUpdate: Promise.resolve()
            } satisfies NetworkResult;
        }

        const response = await fetch(event.request);
        return {
            response,
            cacheUpdate: updateCache(event.request, response)
        } satisfies NetworkResult;
    });

    event.waitUntil(
        result
            .then(networkResult => networkResult.cacheUpdate)
            .catch(() => undefined)
    );

    return result.then(networkResult => networkResult.response);
}

async function matchNavigation(request: Request): Promise<Response | undefined> {
    const cache = await caches.open(cacheName);
    return await cache.match(request)
        ?? await cache.match(request, { ignoreSearch: true });
}

worker.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(cachedFiles))
    );
});

worker.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys
                .filter(key => key.startsWith(cachePrefix) && key !== cacheName)
                .map(key => caches.delete(key))))
            .then(() => worker.clients.claim())
    );
});

worker.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    if (url.origin !== worker.location.origin) return;

    if (event.request.mode === 'navigate') {
        event.respondWith(networkFirst(event, () => matchNavigation(event.request)));
        return;
    }

    if (isDataRequest(url)) {
        event.respondWith(cacheFirst(event));
        return;
    }

    event.respondWith(cacheFirst(event));
});
