import { describe, expect, it } from 'vitest';
import { markdownExcerpt, renderMarkdown } from './renderMarkdown';

describe('renderMarkdown', () => {
    it('preserves safe Markdown and removes executable HTML', () => {
        const html = renderMarkdown('[Safe](https://example.com) <script>alert(1)</script> [Bad](javascript:alert(1))');

        expect(html).toContain('<a href="https://example.com">Safe</a>');
        expect(html).not.toContain('<script');
        expect(html).not.toContain('javascript:');
    });

    it('creates a bounded plain-text metadata excerpt', () => {
        expect(markdownExcerpt('**A useful** description', 12)).toBe('A useful de…');
    });
});
