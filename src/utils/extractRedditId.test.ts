import { describe, expect, it } from 'vitest';
import { extractRedditId } from './extractRedditId';

describe('extractRedditId', () => {
    it('extracts the post ID from a Reddit comments URL', () => {
        expect(extractRedditId('https://www.reddit.com/r/touhou/comments/1gkxrh2/example_title/')).toBe('1gkxrh2');
    });

    it('trims surrounding whitespace before matching', () => {
        expect(extractRedditId('  https://old.reddit.com/r/touhou/comments/ABC123/title  ')).toBe('ABC123');
    });

    it('returns an empty string when the URL does not contain a comments ID', () => {
        expect(extractRedditId('https://www.reddit.com/r/touhou/')).toBe('');
    });
});
