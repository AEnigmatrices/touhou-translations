import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { extractRedditId } from '../../src/utils/extractRedditId';

const postsDirectory = new URL('../../data/posts/', import.meta.url);
const posts = fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.json'))
    .sort()
    .reverse()
    .flatMap(file => JSON.parse(fs.readFileSync(new URL(file, postsDirectory), 'utf8')) as Array<{ reddit: string }>);

test('mobile visitors retain access to primary navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./');

    const navigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(navigation).toBeVisible();
    await navigation.getByRole('link', { name: 'Gallery' }).click();
    await expect(page).toHaveURL(/\/touhou-translations\/gallery\/$/);
    await expect(navigation.getByRole('link', { name: 'Gallery' })).toHaveAttribute('aria-current', 'page');
});

test('gallery exposes canonical metadata and interactive filtering', async ({ page }) => {
    await page.goto('gallery/');
    await page.waitForLoadState('networkidle');

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

test('a direct post URL loads its archive metadata and content', async ({ page }) => {
    const postId = extractRedditId(posts[0].reddit);
    expect(postId).not.toBe('');

    await page.goto(`posts/${postId}/`);
    await expect(page.locator('.artist-pill')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://aenigmatrices.github.io/touhou-translations/posts/${postId}/`
    );
    await expect(page.locator('.prose script')).toHaveCount(0);
});
