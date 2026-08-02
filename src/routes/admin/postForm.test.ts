import { describe, expect, it } from 'vitest';
import {
    buildPostEntry,
    extractBaseRedditUrl,
    parseRedditData,
    validateRedditUrl
} from './postForm';

describe('admin post form helpers', () => {
    it('normalizes supported Reddit post URLs', () => {
        expect(extractBaseRedditUrl('https://old.reddit.com/r/touhou/comments/abc123/title/?share_id=1'))
            .toBe('https://www.reddit.com/r/touhou/comments/abc123');
        expect(extractBaseRedditUrl('https://example.com/r/touhou/comments/abc123')).toBe('');
    });

    it('rejects malformed and duplicate Reddit posts', () => {
        const ids = new Set(['abc123']);
        expect(validateRedditUrl('not a URL', ids)).toBe('Enter a valid Reddit post URL.');
        expect(validateRedditUrl('https://www.reddit.com/r/touhou/comments/abc123/title', ids))
            .toBe('This Reddit post already exists.');
        expect(validateRedditUrl('https://www.reddit.com/r/touhou/comments/new456/title', ids)).toBe(true);
    });

    it('extracts Reddit metadata and canonical image URLs', () => {
        expect(parseRedditData([{
            data: {
                children: [{
                    data: {
                        created_utc: 100,
                        selftext: 'Description',
                        media_metadata: {
                            image: { m: 'image/png', s: { u: 'https://preview.redd.it/a.png?x=1&amp;y=2' } }
                        }
                    }
                }]
            }
        }])).toEqual({
            createdDate: 100_000,
            description: 'Description',
            imageUrls: ['https://i.redd.it/image.png']
        });
    });

    it('builds a normalized post entry', () => {
        expect(buildPostEntry({
            date: 100,
            reddit: 'https://new.reddit.com/r/touhou/comments/abc123/title',
            urls: ' https://a.test/1.png, https://a.test/2.png ',
            src: ' https://source.test ',
            desc: ' Description ',
            artistId: ' artist ',
            characterIds: ['reimu']
        }, true)).toEqual({
            date: 100,
            reddit: 'https://www.reddit.com/r/touhou/comments/abc123',
            url: ['https://a.test/1.png', 'https://a.test/2.png'],
            src: 'https://source.test',
            desc: 'Description',
            artistId: 'artist',
            characterIds: ['reimu'],
            nsfw: true
        });
    });
});
