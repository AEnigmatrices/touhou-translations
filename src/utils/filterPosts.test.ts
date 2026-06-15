import { describe, expect, it } from 'vitest';
import type { Post } from '../types/data';
import { filterPosts } from './filterPosts';

const makePost = (overrides: Partial<Post>): Post => ({
    date: 1,
    reddit: 'https://www.reddit.com/r/touhou/comments/testid/title/',
    url: ['https://example.com/image.jpg'],
    src: 'https://example.com/source',
    desc: '',
    artistId: 'artist-a',
    characterIds: ['reimu'],
    nsfw: false,
    ...overrides
});

const posts = [
    makePost({
        reddit: 'https://www.reddit.com/r/touhou/comments/post1/title/',
        artistId: 'artist-a',
        characterIds: ['reimu', 'marisa']
    }),
    makePost({
        reddit: 'https://www.reddit.com/r/touhou/comments/post2/title/',
        artistId: 'artist-b',
        characterIds: ['reimu']
    }),
    makePost({
        reddit: 'https://www.reddit.com/r/touhou/comments/post3/title/',
        artistId: 'artist-c',
        characterIds: ['sakuya']
    })
];

describe('filterPosts', () => {
    it('returns the original posts when no queries are provided', () => {
        expect(filterPosts(posts, [], [])).toBe(posts);
    });

    it('filters by character ID case-insensitively', () => {
        expect(filterPosts(posts, ['REIMU'], []).map(post => post.artistId)).toEqual(['artist-a', 'artist-b']);
    });

    it('filters by artist ID case-insensitively', () => {
        expect(filterPosts(posts, [], ['ARTIST-B']).map(post => post.artistId)).toEqual(['artist-b']);
    });

    it('requires character and artist matches in and mode', () => {
        expect(filterPosts(posts, ['reimu'], ['artist-a'], 'and').map(post => post.artistId)).toEqual(['artist-a']);
    });

    it('accepts either character or artist matches in or mode', () => {
        expect(filterPosts(posts, ['sakuya'], ['artist-b'], 'or').map(post => post.artistId)).toEqual(['artist-b', 'artist-c']);
    });

    it('handles posts with missing optional IDs without throwing', () => {
        const incompletePost = makePost({ artistId: undefined, characterIds: undefined } as Partial<Post>);

        expect(filterPosts([incompletePost], ['reimu'], ['artist-a'], 'or')).toEqual([]);
    });
});
