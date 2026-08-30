import { expect, test } from '@playwright/test';

test('archive routes use native document navigation consistently', async ({ page }) => {
    await page.goto('gallery/', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
        (window as Window & { __documentMarker?: string }).__documentMarker = 'gallery';
    });

    await page.locator('[data-gallery-grid] a.tile').first().click();
    await expect(page).toHaveURL(/\/touhou-translations\/posts\/[^/]+\/$/);
    await expect(page.locator('.artist-pill')).toBeVisible();
    expect(await page.evaluate(() =>
        (window as Window & { __documentMarker?: string }).__documentMarker
    )).toBeUndefined();

    await page.evaluate(() => {
        (window as Window & { __documentMarker?: string }).__documentMarker = 'post';
    });

    const adjacent = page.locator('.links a').filter({ hasText: /^(Previous|Next)$/ }).first();
    await expect(adjacent).toBeVisible();
    const firstPostUrl = page.url();
    await adjacent.click();
    await expect(page).not.toHaveURL(firstPostUrl);
    await expect(page.locator('.artist-pill')).toBeVisible();
    expect(await page.evaluate(() =>
        (window as Window & { __documentMarker?: string }).__documentMarker
    )).toBeUndefined();

    await page.getByRole('link', { name: 'Gallery', exact: true }).first().click();
    await expect(page).toHaveURL(/\/touhou-translations\/gallery\/$/);

    const contentFilter = page.getByRole('button', { name: 'All Posts' });
    await contentFilter.click();
    await expect(page.getByRole('button', { name: 'SFW Only' })).toHaveAttribute('aria-pressed', 'true');
});
