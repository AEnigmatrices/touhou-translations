import { describe, expect, it } from 'vitest';
import type { ArtistRaw, CharacterRaw, Post } from '../types/data';
import { buildDerivedData, processArtists, processCharacters } from './fetchData';

const artistsRaw: ArtistRaw[] = [
    { id: 'artist-a', name: 'Artist A', portrait: 'portraits/artists/a.webp' },
    { id: 'artist-b', name: 'Artist B', portrait: 'portraits/artists/b.webp' },
    { id: 'artist-empty', name: 'Artist Empty', portrait: 'portraits/artists/empty.webp' }
];

const charactersRaw: CharacterRaw[] = [
    { id: 'reimu', name: 'Reimu Hakurei', short_name: 'Reimu', work: ['Touhou'], portrait: 'portraits/characters/reimu.webp' },
    { id: 'marisa', name: 'Marisa Kirisame', short_name: 'Marisa', work: ['Touhou'], portrait: 'portraits/characters/marisa.webp' },
    { id: 'sakuya', name: 'Sakuya Izayoi', short_name: 'Sakuya', work: ['Touhou'], portrait: 'portraits/characters/sakuya.webp' }
];

const makePost = (id: string, date: number, artistId: string, characterIds: string[]): Post => ({
    date,
    reddit: `https://www.reddit.com/r/touhou/comments/${id}/title/`,
    url: [`https://example.com/${id}.jpg`],
    src: `https://example.com/${id}`,
    desc: '',
    artistId,
    characterIds,
    nsfw: false
});

const posts = [
    makePost('older1', 10, 'artist-a', ['reimu', 'marisa']),
    makePost('samea', 20, 'artist-a', ['reimu', 'reimu']),
    makePost('sameb', 20, 'artist-b', ['sakuya']),
    makePost('newer1', 30, 'artist-b', ['reimu', 'sakuya'])
];

describe('processArtists', () => {
    it('adds artwork and unique character counts to artists', () => {
        expect(processArtists(artistsRaw, posts)).toMatchObject([
            { id: 'artist-a', artworkCount: 2, characterCount: 2 },
            { id: 'artist-b', artworkCount: 2, characterCount: 2 },
            { id: 'artist-empty', artworkCount: 0, characterCount: 0 }
        ]);
    });
});

describe('processCharacters', () => {
    it('adds artwork and unique artist counts to characters', () => {
        expect(processCharacters(charactersRaw, posts)).toMatchObject([
            { id: 'reimu', artworkCount: 3, artistCount: 2 },
            { id: 'marisa', artworkCount: 1, artistCount: 1 },
            { id: 'sakuya', artworkCount: 2, artistCount: 1 }
        ]);
    });
});

describe('buildDerivedData', () => {
    it('builds lookup maps for posts, artists, characters, and post relationships', () => {
        const derivedData = buildDerivedData(posts, artistsRaw, charactersRaw);

        expect(derivedData.postByRedditId.get('older1')).toBe(posts[0]);
        expect(derivedData.artistById.get('artist-a')).toMatchObject({ name: 'Artist A', artworkCount: 2 });
        expect(derivedData.characterById.get('reimu')).toMatchObject({ name: 'Reimu Hakurei', artworkCount: 3 });
        expect(derivedData.characterByPostId.get('older1')?.map(character => character.id)).toEqual(['reimu', 'marisa']);
        expect(derivedData.artistPostsByArtistId.get('artist-b')).toEqual([posts[2], posts[3]]);
    });

    it('links adjacent posts by lower and higher date while skipping same-date neighbors', () => {
        const { adjacentPostIdsByPostId } = buildDerivedData(posts, artistsRaw, charactersRaw);

        expect(adjacentPostIdsByPostId.get('older1')).toEqual({ prevPostId: null, nextPostId: 'samea' });
        expect(adjacentPostIdsByPostId.get('samea')).toEqual({ prevPostId: 'older1', nextPostId: 'newer1' });
        expect(adjacentPostIdsByPostId.get('sameb')).toEqual({ prevPostId: 'older1', nextPostId: 'newer1' });
        expect(adjacentPostIdsByPostId.get('newer1')).toEqual({ prevPostId: 'sameb', nextPostId: null });
    });
});
