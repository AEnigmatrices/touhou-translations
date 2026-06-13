/// <reference lib="webworker" />

import { build, files, prerendered, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const scopePath = new URL(worker.registration.scope).pathname.replace(/\/$/, '');
const cacheName = `touhou-translations-${version}`;
const cachedFiles = [
    ...build,
    ...prerendered,
    ...files.filter(file => /\.(?:ico|png|svg|txt|webmanifest|woff2)$/.test(file))
];
const appShell = `${scopePath}/`;

worker.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(cachedFiles))
            .then(() => worker.skipWaiting())
    );
});

worker.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys
                .filter(key => key.startsWith('touhou-translations-') && key !== cacheName)
                .map(key => caches.delete(key))))
            .then(() => worker.clients.claim())
    );
});

worker.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    if (url.origin !== worker.location.origin) return;

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(async () => {
                const cachedPage = await caches.match(event.request);
                return cachedPage ?? await caches.match(appShell) ?? Response.error();
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => cachedResponse ?? fetch(event.request))
    );
});
