import { expect, test } from '@playwright/test';

const smallImage = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    'base64'
);

test('gallery skeleton settles after a delayed image and after an image failure', async ({ page }) => {
    const delayedPath = '**/skeleton-delayed.png';
    const failedPath = '**/skeleton-failed.png';
    let resumeImage: () => void = () => undefined;
    const imageGate = new Promise<void>(resolve => { resumeImage = resolve; });

    await page.route(delayedPath, async route => {
        await imageGate;
        await route.fulfill({ status: 200, contentType: 'image/png', body: smallImage });
    });
    await page.route(failedPath, route => route.abort());

    try {
        await page.goto('gallery/', { waitUntil: 'domcontentloaded' });
        const tile = page.locator('[data-gallery-grid] [data-image-skeleton]').first();
        await expect(tile).toBeVisible();

        const delayedUrl = new URL('skeleton-delayed.png', page.url()).href;
        const failedUrl = new URL('skeleton-failed.png', page.url()).href;

        // First fail an image to reproduce the stale complete=true state.
        await tile.locator('img').evaluate((image: HTMLImageElement, url) => {
            image.removeAttribute('srcset');
            image.src = url;
        }, failedUrl);
        await expect(tile).toHaveAttribute('data-image-state', 'error');

        // Hold the next request open. The failed image must return to loading.
        const delayedRequest = page.waitForRequest(request => request.url() === delayedUrl);
        await tile.locator('img').evaluate((image: HTMLImageElement, url) => {
            image.src = url;
        }, delayedUrl);
        await delayedRequest;
        await expect(tile).toHaveAttribute('data-image-state', 'loading');

        resumeImage();
        await expect(tile).toHaveAttribute('data-image-state', 'ready');

        await tile.locator('img').evaluate((image: HTMLImageElement, url) => {
            image.src = url;
        }, failedUrl);
        await expect(tile).toHaveAttribute('data-image-state', 'error');
    } finally {
        resumeImage();
    }
});

test('skeletons cover home media and newly rendered artist and gallery cards', async ({ page }) => {
    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-daily-link]')).toHaveAttribute('data-image-state', /^(loading|ready|error)$/);
    await expect(page.locator('.video-frame')).toHaveAttribute('data-image-state', /^(loading|ready|error)$/);

    await page.goto('artists/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-list-grid] .image-frame').first())
        .toHaveAttribute('data-image-state', /^(loading|ready|error)$/);
    const artistName = await page.locator('[data-list-grid] .name').first().textContent();
    if (!artistName) throw new Error('Expected at least one artist.');
    await page.locator('[data-list-search]').fill(artistName);
    await expect(page.locator('[data-list-grid] .image-frame').first())
        .toHaveAttribute('data-image-state', /^(loading|ready|error)$/);

    await page.goto('gallery/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: '2', exact: true }).click();
    await expect(page.locator('[data-gallery-grid] a.tile').first())
        .toHaveAttribute('data-image-state', /^(loading|ready|error)$/);
});
