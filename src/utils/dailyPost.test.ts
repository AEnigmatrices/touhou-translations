import { describe, expect, it } from 'vitest';
import type { HomePost } from '../types/data';
import { selectDailyPost } from './dailyPost';

const posts: HomePost[] = [
    { id: 'first', img: 'https://example.com/first.jpg', nsfw: false, date: 1 },
    { id: 'second', img: 'https://example.com/second.jpg', nsfw: true, date: 2 },
    { id: 'third', img: 'https://example.com/third.jpg', nsfw: false, date: 3 }
];

describe('selectDailyPost', () => {
    it('rotates candidates by the current UTC day', () => {
        expect(selectDailyPost(posts, 0)?.id).toBe('first');
        expect(selectDailyPost(posts, 86_400_000)?.id).toBe('second');
        expect(selectDailyPost(posts, 3 * 86_400_000)?.id).toBe('first');
    });

    it('returns null when the archive has no candidates', () => {
        expect(selectDailyPost([])).toBeNull();
    });
});
