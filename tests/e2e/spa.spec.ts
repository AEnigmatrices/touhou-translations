import { expect, test } from '@playwright/test';

test('adjacent post browsing stays in the Astro client router', async ({ page }) => {
    await page.goto('gallery/', { waitUntil: 'domcontentloaded' });

    // Gallery intentionally stays a plain static page. Entering a post may replace
    // the document; only sequential post-to-post browsing needs SPA semantics.
    await page.locator('[data-gallery-grid] a.tile').first().click();
    await expect(page).toHaveURL(/\/touhou-translations\/posts\/[^/]+\/$/);
    await expect(page.locator('.artist-pill')).toBeVisible();

    await page.evaluate(() => {
        (window as Window & { __spaNavigationMarker?: string }).__spaNavigationMarker = 'alive';
    });

    const adjacent = page.locator('.links a').filter({ hasText: /^(Previous|Next)$/ }).first();
    await expect(adjacent).toBeVisible();
    const firstPostUrl = page.url();
    await adjacent.click();
    await expect(page).not.toHaveURL(firstPostUrl);
    await expect(page.locator('.artist-pill')).toBeVisible();
    expect(await page.evaluate(() =>
        (window as Window & { __spaNavigationMarker?: string }).__spaNavigationMarker
    )).toBe('alive');

    // Leaving the post section intentionally returns to ordinary document navigation.
    await page.getByRole('link', { name: 'Gallery', exact: true }).first().click();
    await expect(page).toHaveURL(/\/touhou-translations\/gallery\/$/);
    expect(await page.evaluate(() =>
        (window as Window & { __spaNavigationMarker?: string }).__spaNavigationMarker
    )).toBeUndefined();

    const contentFilter = page.getByRole('button', { name: 'All Posts' });
    await contentFilter.click();
    await expect(page.getByRole('button', { name: 'SFW Only' })).toHaveAttribute('aria-pressed', 'true');
});
