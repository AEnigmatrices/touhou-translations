import { expect, test } from '@playwright/test';

test('archive browsing stays in the Astro client router', async ({ page }) => {
    await page.goto('gallery/', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
        (window as Window & { __spaNavigationMarker?: string }).__spaNavigationMarker = 'alive';
    });

    await page.locator('[data-gallery-grid] a.tile').first().click();
    await expect(page).toHaveURL(/\/touhou-translations\/posts\/[^/]+\/$/);
    await expect(page.locator('.artist-pill')).toBeVisible();
    expect(await page.evaluate(() =>
        (window as Window & { __spaNavigationMarker?: string }).__spaNavigationMarker
    )).toBe('alive');

    const adjacent = page.locator('.links a').filter({ hasText: /^(Previous|Next)$/ }).first();
    await expect(adjacent).toBeVisible();
    const firstPostUrl = page.url();
    await adjacent.click();
    await expect(page).not.toHaveURL(firstPostUrl);
    await expect(page.locator('.artist-pill')).toBeVisible();
    expect(await page.evaluate(() =>
        (window as Window & { __spaNavigationMarker?: string }).__spaNavigationMarker
    )).toBe('alive');

    await page.getByRole('link', { name: 'Gallery', exact: true }).first().click();
    await expect(page).toHaveURL(/\/touhou-translations\/gallery\/$/);
    expect(await page.evaluate(() =>
        (window as Window & { __spaNavigationMarker?: string }).__spaNavigationMarker
    )).toBe('alive');

    const contentFilter = page.getByRole('button', { name: 'All Posts' });
    await contentFilter.click();
    await expect(page.getByRole('button', { name: 'SFW Only' })).toHaveAttribute('aria-pressed', 'true');
});
