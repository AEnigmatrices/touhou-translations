import { describe, expect, it } from 'vitest';
import { getPostIds, getPostPageData } from './postPageData';

describe('post page data', () => {
    it('returns lean, deterministic data for every generated route entry', async () => {
        const postIds = await getPostIds();
        expect(postIds.length).toBeGreaterThan(0);
        expect(new Set(postIds).size).toBe(postIds.length);

        const postId = postIds[Math.floor(postIds.length / 2)];
        const firstResult = await getPostPageData(postId);
        const secondResult = await getPostPageData(postId);

        expect(firstResult).not.toBeNull();
        expect(firstResult?.id).toBe(postId);
        expect(firstResult?.post.url.length).toBeGreaterThan(0);
        expect(firstResult?.relatedPosts.length).toBeLessThanOrEqual(4);
        expect(firstResult?.relatedPosts.every(post => post.id !== postId)).toBe(true);
        expect(secondResult?.relatedPosts).toEqual(firstResult?.relatedPosts);
    });

    it('returns null for an unknown post ID', async () => {
        await expect(getPostPageData('definitely-not-a-post')).resolves.toBeNull();
    });
});
