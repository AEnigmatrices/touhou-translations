import { expect, test } from '@playwright/test';

test('character and artist lists use Astro-optimized portraits', async ({ page }) => {
    for (const route of ['characters/', 'artists/']) {
        await page.goto(route, { waitUntil: 'domcontentloaded' });

        const portrait = page.locator('[data-list-grid] img').first();
        await expect(portrait).toHaveAttribute('src', /\/_astro\//);
        await expect(portrait).toHaveAttribute('srcset', /\/_astro\//);
        await expect(portrait).toHaveAttribute('width', /\d+/);
        await expect(portrait).toHaveAttribute('height', /\d+/);
    }
});

test('dynamically rendered character cards retain optimized portraits', async ({ page }) => {
    await page.goto('characters/', { waitUntil: 'domcontentloaded' });

    const portraits = page.locator('[data-list-grid] img');
    await expect(portraits).toHaveCount(24);
    await page.getByRole('button', { name: 'Load More' }).click();
    await expect(portraits).toHaveCount(48);

    const loadedPortrait = portraits.nth(47);
    await expect(loadedPortrait).toHaveAttribute('src', /\/_astro\//);
    await expect(loadedPortrait).toHaveAttribute('srcset', /\/_astro\//);
});
