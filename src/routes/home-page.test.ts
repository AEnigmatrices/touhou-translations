import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Post } from '../types/data';
import type { DerivedData } from '../utils/fetchData';
import { fetchDerivedData } from '../utils/fetchData';
import { load } from './+page';

vi.mock('../utils/fetchData', () => ({
    fetchDerivedData: vi.fn()
}));

const makePost = (id: string, overrides: Partial<Post> = {}): Post => ({
    date: 1,
    reddit: `https://www.reddit.com/r/touhou/comments/${id}/title/`,
    url: [`https://example.com/${id}.jpg`],
    src: `https://example.com/${id}`,
    desc: '',
    artistId: 'artist-a',
    characterIds: ['reimu'],
    nsfw: false,
    ...overrides
});

const makeDerivedData = (posts: Post[]): DerivedData => ({
    posts,
    artists: [],
    characters: [],
    postByRedditId: new Map(),
    artistById: new Map(),
    characterById: new Map(),
    characterByPostId: new Map(),
    artistPostsByArtistId: new Map(),
    adjacentPostIdsByPostId: new Map()
});

describe('home page load', () => {
    beforeEach(() => {
        vi.mocked(fetchDerivedData).mockReset();
    });

    it('builds featured posts and daily candidates from valid gallery posts', async () => {
        vi.mocked(fetchDerivedData).mockResolvedValue(makeDerivedData([
            makePost('1gkxrh2', { date: 10, nsfw: true }),
            makePost('notfeatured', { date: 20 }),
            makePost('1ftq7bi', { date: 30 }),
            makePost('noimage', { url: [] }),
            makePost('invalidreddit', { reddit: 'https://www.reddit.com/r/touhou/' })
        ]));

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
