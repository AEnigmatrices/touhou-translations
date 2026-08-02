import { describe, expect, it } from 'vitest';
import { buildArtistEntry, filterArtistOptions, validateArtistForm } from './artistForm';

const form = {
    id: 'new_artist',
    name: 'New Artist',
    linkTwitter: 'https://x.com/new_artist',
    linkPixiv: 'https://www.pixiv.net/en/users/123'
};

describe('admin artist form helpers', () => {
    it('rejects duplicate IDs and malformed profile links', () => {
        expect(validateArtistForm(form, new Set(['new_artist']))).toBe('Artist ID already exists.');
        expect(validateArtistForm({ ...form, id: 'New Artist' }, new Set()))
            .toBe('Artist ID may contain only lowercase letters, numbers, and underscores.');
        expect(validateArtistForm({ ...form, linkPixiv: 'https://example.com/123' }, new Set()))
            .toBe('Enter a valid Pixiv user URL.');
    });

    it('trims fields and omits empty optional links', () => {
        expect(buildArtistEntry({
            id: ' new_artist ',
            name: ' New Artist ',
            linkTwitter: '',
            linkPixiv: ' '
        }, 'portraits/placeholders/scout.webp')).toEqual({
            id: 'new_artist',
            name: 'New Artist',
            portrait: 'portraits/placeholders/scout.webp'
        });
    });

    it('ranks exact artist IDs ahead of earlier substring matches', () => {
        const portrait = 'portraits/placeholders/scout.webp';
        const artists = [
            ...Array.from({ length: 12 }, (_, index) => ({
                id: `artist_ts_${index}`,
                name: `Artist ${index}`,
                portrait
            })),
            { id: 'ts', name: 'TS', portrait },
            { id: 'tsukasa', name: 'Tsukasa', portrait }
        ];

        expect(filterArtistOptions(artists, 'ts').map(artist => artist.id)).toEqual([
            'ts',
            'tsukasa',
            ...Array.from({ length: 10 }, (_, index) => `artist_ts_${index}`)
        ]);
    });
});
