import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { extractRedditId } from '../../src/utils/extractRedditId';

interface RawPost {
    reddit: string;
    url: string[];
    src: string;
    artistId: string;
}

const postsDirectory = new URL('../../data/posts/', import.meta.url);
const posts = fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.json'))
    .sort()
    .reverse()
    .flatMap(file => JSON.parse(fs.readFileSync(new URL(file, postsDirectory), 'utf8')) as RawPost[]);
const artists = JSON.parse(
    fs.readFileSync(new URL('../../data/artists.json', import.meta.url), 'utf8')
) as Array<{ id: string; name: string }>;
const generatedPosts = posts.filter(post => extractRedditId(post.reddit) !== '');
const artistPostCounts = generatedPosts.reduce((counts, post) => {
    counts.set(post.artistId, (counts.get(post.artistId) ?? 0) + 1);
    return counts;
}, new Map<string, number>());
const postWithRelatedWork = generatedPosts.find(post => (artistPostCounts.get(post.artistId) ?? 0) > 1);

const makeIdleCallbacksImmediate = async (page: import('@playwright/test').Page): Promise<void> => {
    await page.addInitScript(() => {
        window.requestIdleCallback = callback => {
            window.setTimeout(() => callback({
                didTimeout: false,
                timeRemaining: () => 50
            }), 0);
            return 1;
        };
    });
};

const stubRedditImages = async (page: import('@playwright/test').Page): Promise<void> => {
    await page.route(/https:\/\/(?:i|preview)\.redd\.it\/.*/, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'image/png',
            body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64')
        });
    });
};

test('mobile visitors retain access to primary navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./');

    const navigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(navigation).toBeVisible();
    await navigation.getByRole('link', { name: 'Gallery' }).click();
    await expect(page).toHaveURL(/\/touhou-translations\/gallery\/$/);
    await expect(navigation.getByRole('link', { name: 'Gallery' })).toHaveAttribute('aria-current', 'page');

    await navigation.getByRole('button', { name: 'Post' }).click();
    await expect(page).toHaveURL(/\/touhou-translations\/posts\/[^/]+\/$/);
});

test('the Post button reuses the random post document warmed after idle', async ({ page }) => {
    await makeIdleCallbacksImmediate(page);

    const warmedRandomPost = page.waitForRequest(request =>
        request.resourceType() === 'fetch'
        && /\/posts\/[^/]+\/$/.test(new URL(request.url()).pathname)
    );

    await page.goto('./', { waitUntil: 'domcontentloaded' });
    const warmedUrl = (await warmedRandomPost).url();

    await page.getByRole('navigation', { name: 'Primary navigation' })
        .getByRole('button', { name: 'Post' })
        .click();
    await expect(page).toHaveURL(warmedUrl);
});

test('gallery exposes canonical metadata and interactive filtering', async ({ page }) => {
    await page.goto('gallery/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle('Gallery | Touhou Translations');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        'https://aenigmatrices.github.io/touhou-translations/gallery/'
    );

    const contentFilter = page.getByRole('button', { name: 'All Posts' });
    await contentFilter.click();
    await expect(page.getByRole('button', { name: 'SFW Only' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.grid img.nsfw')).toHaveCount(0);
});

test('character browsing warms gallery runtime data after idle', async ({ page }) => {
    await makeIdleCallbacksImmediate(page);
    const warmedData = page.waitForRequest(request =>
        new URL(request.url()).pathname.endsWith('/runtime-data/gallery-posts.json')
    );

    await page.goto('characters/', { waitUntil: 'domcontentloaded' });
    await warmedData;
});

test('gallery warms all twelve visible post documents on each page', async ({ page }) => {
    await makeIdleCallbacksImmediate(page);
    await stubRedditImages(page);

    const warmedPostUrls = new Set<string>();
    page.on('request', request => {
        if (request.resourceType() === 'fetch' && /\/posts\/[^/]+\/$/.test(new URL(request.url()).pathname)) {
            warmedPostUrls.add(request.url());
        }
    });

    await page.goto('gallery/', { waitUntil: 'domcontentloaded' });

    const firstPageUrls = await page.locator('[data-gallery-grid] a.tile').evaluateAll(links =>
        links.map(link => (link as HTMLAnchorElement).href)
    );
    expect(firstPageUrls).toHaveLength(12);
    await expect.poll(() => firstPageUrls.every(url => warmedPostUrls.has(url))).toBe(true);

    await page.getByRole('button', { name: '2', exact: true }).click();
    await expect(page.getByRole('button', { name: '2', exact: true })).toHaveAttribute('aria-current', 'page');

    const secondPageUrls = await page.locator('[data-gallery-grid] a.tile').evaluateAll(links =>
        links.map(link => (link as HTMLAnchorElement).href)
    );
    expect(secondPageUrls).toHaveLength(12);
    expect(secondPageUrls).not.toEqual(firstPageUrls);
    await expect.poll(() => secondPageUrls.every(url => warmedPostUrls.has(url))).toBe(true);

    const visiblePageUrls = new Set([...firstPageUrls, ...secondPageUrls]);
    expect([...visiblePageUrls].filter(url => warmedPostUrls.has(url))).toHaveLength(24);
});

test('post pages warm related artist documents after primary artwork settles', async ({ page }) => {
    if (!postWithRelatedWork) throw new Error('Expected at least one artist with multiple generated posts.');

    await makeIdleCallbacksImmediate(page);
    await stubRedditImages(page);
    const postId = extractRedditId(postWithRelatedWork.reddit);
    expect(postId).not.toBe('');

    const warmedPostUrls = new Set<string>();
    page.on('request', request => {
        if (request.resourceType() === 'fetch' && /\/posts\/[^/]+\/$/.test(new URL(request.url()).pathname)) {
            warmedPostUrls.add(request.url());
        }
    });

    await page.goto(`posts/${postId}/`, { waitUntil: 'domcontentloaded' });

    const relatedUrls = await page.evaluate(() => {
        const template = document.querySelector<HTMLTemplateElement>('[data-more-template]');
        if (!template) return [];

        return [...template.content.querySelectorAll<HTMLAnchorElement>('a')]
            .slice(0, 4)
            .flatMap(link => {
                const href = link.getAttribute('href');
                return href ? [new URL(href, document.baseURI).href] : [];
            });
    });
    expect(relatedUrls.length).toBeGreaterThan(0);

    await expect.poll(() => relatedUrls.some(url => warmedPostUrls.has(url))).toBe(true);
});

test('a direct post URL returns server-rendered archive metadata and content', async ({ page, request }) => {
    const post = posts[0];
    const postId = extractRedditId(post.reddit);
    const artistName = artists.find(artist => artist.id === post.artistId)?.name ?? post.artistId;
    const canonicalUrl = `https://aenigmatrices.github.io/touhou-translations/posts/${postId}/`;
    expect(postId).not.toBe('');

    const rawResponse = await request.get(`posts/${postId}/`);
    expect(rawResponse.status()).toBe(200);

    const rawHtml = await rawResponse.text();
    expect(rawHtml).toContain(`<title>${artistName} | Touhou Translations</title>`);
    expect(rawHtml).toContain(`<link rel="canonical" href="${canonicalUrl}"`);
    expect(rawHtml).toContain('<meta property="og:type" content="article"');
    expect(rawHtml).toMatch(/class="[^\"]*\bartist-pill\b[^\"]*"/);
    expect(rawHtml).toMatch(/class="[^\"]*\bpanel\b[^\"]*\bprose\b[^\"]*"/);
    expect(rawHtml).toContain(post.reddit);
    expect(rawHtml).toContain(post.src);
    expect(rawHtml).toContain(post.url[0]);
    expect(rawHtml).not.toContain('Post not found.');

    const navigationResponse = await page.goto(`posts/${postId}/`, { waitUntil: 'domcontentloaded' });
    expect(navigationResponse?.status()).toBe(200);
    await expect(page.locator('.artist-pill')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        canonicalUrl
    );
    await expect(page.locator('.prose script')).toHaveCount(0);

    const missingResponse = await request.get('posts/this-post-does-not-exist/');
    expect(missingResponse.status()).toBe(404);
});

test.describe.serial('service worker runtime caching', () => {
    test('caches only successful post visits and serves them offline', async ({ browser, baseURL }) => {
        if (!baseURL) throw new Error('Playwright baseURL is required for the service-worker test.');

        const postId = extractRedditId(posts[0].reddit);
        expect(postId).not.toBe('');

        const postUrl = new URL(`posts/${postId}/`, baseURL).href;
        const missingUrl = new URL('posts/this-post-does-not-exist/', baseURL).href;
        const postPath = new URL(postUrl).pathname;
        const missingPath = new URL(missingUrl).pathname;
        const postsPath = new URL('posts/', baseURL).pathname;
        const context = await browser.newContext({ serviceWorkers: 'allow' });
        await context.addInitScript(() => {
            Object.defineProperty(navigator, 'connection', {
                configurable: true,
                value: { saveData: true }
            });
        });
        const page = await context.newPage();

        const cachedPostPaths = () => page.evaluate(async pathPrefix => {
            const cacheNames = await caches.keys();
            const requests = (await Promise.all(cacheNames.map(async cacheName => {
                const cache = await caches.open(cacheName);
                return cache.keys();
            }))).flat();

            return requests
                .map(request => new URL(request.url).pathname)
                .filter(pathname => pathname.startsWith(pathPrefix));
        }, postsPath);

        try {
            await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
            await page.evaluate(async () => {
                await navigator.serviceWorker.ready;
            });

            if (!await page.evaluate(() => Boolean(navigator.serviceWorker.controller))) {
                await page.reload({ waitUntil: 'domcontentloaded' });
            }
            await expect.poll(
                () => page.evaluate(() => Boolean(navigator.serviceWorker.controller))
            ).toBe(true);

            expect(await cachedPostPaths()).toEqual([]);

            const postResponse = await page.goto(postUrl, { waitUntil: 'domcontentloaded' });
            expect(postResponse?.status()).toBe(200);
            await expect.poll(async () =>
                (await cachedPostPaths()).some(pathname => pathname.startsWith(postPath))
            ).toBe(true);

            const missingResponse = await page.goto(missingUrl, { waitUntil: 'domcontentloaded' });
            expect(missingResponse?.status()).toBe(404);
            expect((await cachedPostPaths()).some(pathname => pathname.startsWith(missingPath))).toBe(false);

            await page.goto(postUrl, { waitUntil: 'domcontentloaded' });
            await context.setOffline(true);

            const offlineResponse = await page.reload({ waitUntil: 'domcontentloaded' });
            expect(offlineResponse?.status()).toBe(200);
            await expect(page.locator('.artist-pill')).toBeVisible();
        } finally {
            await context.close();
        }
    });
});

test('the local admin route is absent from the production application', async ({ page }) => {
    const response = await page.goto('admin/');

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Add Reddit Post' })).toHaveCount(0);
});
