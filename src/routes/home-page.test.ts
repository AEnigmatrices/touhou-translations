import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HomePost } from '../types/data';
import { fetchHomePosts } from '../utils/generatedData';
import { load } from './+page';

vi.mock('../utils/generatedData', () => ({
    fetchHomePosts: vi.fn()
}));

const makePost = (id: string, overrides: Partial<HomePost> = {}): HomePost => ({
    id,
    date: 1,
    img: `https://example.com/${id}.jpg`,
    nsfw: false,
    ...overrides
});

describe('home page load', () => {
    beforeEach(() => {
        vi.mocked(fetchHomePosts).mockReset();
    });

    it('builds featured posts and daily candidates from valid gallery posts', async () => {
        vi.mocked(fetchHomePosts).mockResolvedValue([
            makePost('1gkxrh2', { date: 10, nsfw: true }),
            makePost('notfeatured', { date: 20 }),
            makePost('1ftq7bi', { date: 30 })
        ]);

        await expect(load()).resolves.toEqual({
            featuredPosts: [
                { id: '1gkxrh2', img: 'https://example.com/1gkxrh2.jpg', nsfw: true, date: 10 },
                { id: '1ftq7bi', img: 'https://example.com/1ftq7bi.jpg', nsfw: false, date: 30 }
            ],
            dailyPostCandidates: [
                { id: '1gkxrh2', img: 'https://example.com/1gkxrh2.jpg', nsfw: true, date: 10 },
                { id: 'notfeatured', img: 'https://example.com/notfeatured.jpg', nsfw: false, date: 20 },
                { id: '1ftq7bi', img: 'https://example.com/1ftq7bi.jpg', nsfw: false, date: 30 }
            ]
        });
    });
});
