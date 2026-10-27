import { expect, test } from '@playwright/test';

test('prerendered catalog pages remain accessible without JavaScript', async ({ browser, baseURL, request }) => {
    if (!baseURL) throw new Error('Expected Playwright baseURL.');

    const catalogs = [
        { route: 'gallery', json: 'gallery-posts', pageSize: 12, cards: '[data-gallery-grid] a.tile' },
        { route: 'artists', json: 'artists', pageSize: 24, cards: '[data-list-grid] .profile-item' },
        { route: 'characters', json: 'characters', pageSize: 24, cards: '[data-list-grid] .profile-item' }
    ] as const;

    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    try {
        for (const catalog of catalogs) {
            const response = await request.get('runtime-data/' + catalog.json + '.json');
            expect(response.ok()).toBe(true);
            const entries = await response.json() as unknown[];
            const pageCount = Math.ceil(entries.length / catalog.pageSize);
            expect(pageCount).toBeGreaterThan(2);

            await page.goto(new URL(catalog.route + '/', baseURL).href);
            const nav = page.locator('[data-catalog-pagination]');
            await nav.getByRole('link', { name: '2', exact: true }).click();
            await expect(page).toHaveURL(new RegExp('/' + catalog.route + '/page/2/$'));
            await expect(page.locator(catalog.cards)).toHaveCount(catalog.pageSize);
            await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
                'href', 'https://aenigmatrices.github.io/touhou-translations/' + catalog.route + '/page/2/'
            );

            await page.goto(new URL(catalog.route + '/page/' + pageCount + '/', baseURL).href);
            await expect(page.locator(catalog.cards)).toHaveCount(
                entries.length - (pageCount - 1) * catalog.pageSize
            );
            await expect(page.locator('[data-catalog-pagination] a[aria-current="page"]'))
                .toHaveText(String(pageCount));
            await page.locator('[data-catalog-pagination]').getByRole('link', { name: 'Previous' }).click();
            await expect(page).toHaveURL(new RegExp('/' + catalog.route + '/page/' + (pageCount - 1) + '/$'));
        }
    } finally {
        await context.close();
    }
});
