import { describe, expect, it, vi } from 'vitest';
import {
    fetchRedditData,
    parseOldRedditHtml,
    parseRedditEmbed,
    parseRedditRss
} from './redditData';

const redditUrl = 'https://www.reddit.com/r/touhou/comments/abc123/title';

describe('Reddit data fetching', () => {
    it('extracts metadata and Markdown-like text from a post RSS entry', () => {
        const rss = `
            <feed>
                <entry>
                    <content type="html">
                        &lt;table&gt;&lt;tr&gt;&lt;td&gt;
                        &lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;
                        &lt;p&gt;&lt;code&gt;yosegaki&lt;/code&gt;&lt;/p&gt;
                        &lt;p&gt;Graduation &amp;amp; farewell.&lt;/p&gt;
                        &lt;/div&gt;&lt;!-- SC_ON --&gt;
                        &lt;a href="https://i.redd.it/image123.png"&gt;[link]&lt;/a&gt;
                    </content>
                    <id>t3_abc123</id>
                    <published>2026-03-08T09:57:15+00:00</published>
                </entry>
            </feed>
        `;

        expect(parseRedditRss(rss, 'abc123')).toEqual({
            createdDate: Date.parse('2026-03-08T09:57:15+00:00'),
            description: '`yosegaki`\n\nGraduation & farewell.',
            imageUrls: ['https://i.redd.it/image123.png']
        });
    });

    it('extracts ordered full-size gallery URLs from embed markup', () => {
        const html = `
            <gallery-carousel>
                <img src="https://preview.redd.it/title-v0-first123.png?width=640&amp;auto=webp">
                <img src="https://preview.redd.it/title-v0-second456.jpg?width=640&amp;auto=webp">
            </gallery-carousel>
            <span data="{&quot;created_timestamp&quot;:1772963835976}"></span>
        `;

        expect(parseRedditEmbed(html)).toEqual({
            createdDate: 1_772_963_835_976,
            description: '',
            imageUrls: [
                'https://i.redd.it/first123.png',
                'https://i.redd.it/second456.jpg'
            ]
        });
    });

    it('extracts the requested post from old Reddit HTML', () => {
        const html = `
            <div class="sidebar"><div class="md"><p>Sidebar text</p></div></div>
            <div class="thing link" data-fullname="t3_abc123"
                data-timestamp="1774976765000"
                data-url="https://i.redd.it/image123.png">
                <div class="usertext usertext-body">
                    <div class="md">
                        <p>TIL that <code>Mystic Square</code> Alice is <strong>Lolice</strong>.</p>
                        <blockquote>
                            <p>Illustrator is <a href="https://example.com"><strong>Suzume Suzume</strong></a>.</p>
                        </blockquote>
                    </div>
                </div>
            </div>
            <div class="commentarea">
                <div class="usertext-body"><div class="md"><p>Comment text</p></div></div>
            </div>
        `;

        expect(parseOldRedditHtml(html, 'abc123')).toEqual({
            createdDate: 1_774_976_765_000,
            description: 'TIL that `Mystic Square` Alice is **Lolice**.\n\n'
                + 'Illustrator is [**Suzume Suzume**](https://example.com).',
            imageUrls: ['https://i.redd.it/image123.png']
        });
    });

    it('prefers JSON data while fetching all sources concurrently', async () => {
        const fetcher = vi.fn<typeof fetch>().mockImplementation(async input => {
            const url = new URL(input.toString());
            if (url.hostname === 'www.reddit.com' && url.pathname.endsWith('.json')) {
                return new Response(JSON.stringify([{
                    data: {
                        children: [{
                            data: {
                                created_utc: 100,
                                selftext: 'Exact Markdown',
                                url: 'https://i.redd.it/from-json.png'
                            }
                        }]
                    }
                }]), { status: 200 });
            }
            return new Response('', { status: 404 });
        });

        await expect(fetchRedditData(redditUrl, fetcher)).resolves.toEqual({
            source: 'json',
            cacheable: true,
            data: {
                createdDate: 100_000,
                description: 'Exact Markdown',
                imageUrls: ['https://i.redd.it/from-json.png']
            }
        });
        expect(fetcher).toHaveBeenCalledTimes(3);
        expect(fetcher.mock.calls[0]?.[1]).toEqual(expect.objectContaining({ redirect: 'error' }));
    });

    it('combines public RSS and embed data when JSON is blocked', async () => {
        const rss = `
            <entry>
                <content type="html">&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;p&gt;Description&lt;/p&gt;&lt;/div&gt;&lt;!-- SC_ON --&gt;</content>
                <id>t3_abc123</id>
                <published>2026-03-08T09:57:15Z</published>
            </entry>
        `;
        const embed = `
            <gallery-carousel>
                <img src="https://preview.redd.it/title-v0-image123.png?width=640">
            </gallery-carousel>
        `;
        const fetcher = vi.fn<typeof fetch>()
            .mockResolvedValueOnce(new Response('Blocked', { status: 403 }))
            .mockResolvedValueOnce(new Response(rss, { status: 200 }))
            .mockResolvedValueOnce(new Response(embed, { status: 200 }));

        await expect(fetchRedditData(redditUrl, fetcher)).resolves.toEqual({
            source: 'public-fallback',
            cacheable: true,
            data: {
                createdDate: Date.parse('2026-03-08T09:57:15Z'),
                description: 'Description',
                imageUrls: ['https://i.redd.it/image123.png']
            }
        });
        expect(fetcher).toHaveBeenCalledTimes(3);
    });

    it('uses old Reddit HTML when the primary public sources are blocked', async () => {
        const embed = `
            <gallery-carousel>
                <img src="https://preview.redd.it/title-v0-image123.png?width=640">
            </gallery-carousel>
        `;
        const oldRedditHtml = `
            <div class="thing link" data-fullname="t3_abc123"
                data-timestamp="1774976765000"
                data-url="https://i.redd.it/image123.png">
                <div class="usertext usertext-body">
                    <div class="md"><p>Old Reddit description</p></div>
                </div>
            </div>
            <div class="commentarea"></div>
        `;
        const fetcher = vi.fn<typeof fetch>().mockImplementation(async input => {
            const url = new URL(input.toString());
            if (url.hostname === 'www.reddit.com' && url.pathname.endsWith('.json')) {
                return new Response('Blocked', { status: 403 });
            }
            if (url.hostname === 'embed.reddit.com') {
                return new Response(embed, { status: 200 });
            }
            if (url.hostname === 'old.reddit.com') {
                return new Response(oldRedditHtml, { status: 200 });
            }
            return new Response('Rate limited', { status: 429 });
        });

        await expect(fetchRedditData(redditUrl, fetcher)).resolves.toEqual({
            source: 'public-fallback',
            cacheable: true,
            data: {
                createdDate: 1_774_976_765_000,
                description: 'Old Reddit description',
                imageUrls: ['https://i.redd.it/image123.png']
            }
        });
        expect(fetcher).toHaveBeenCalledTimes(4);
        expect(fetcher).toHaveBeenCalledWith(
            'https://old.reddit.com/r/touhou/comments/abc123/',
            expect.any(Object)
        );
    });

    it('does not mark embed-only fallback data as cacheable', async () => {
        const embed = `
            <gallery-carousel>
                <img src="https://preview.redd.it/title-v0-image123.png?width=640">
            </gallery-carousel>
            <span data="{&quot;created_timestamp&quot;:1772963835976}"></span>
        `;
        const fetcher = vi.fn<typeof fetch>().mockImplementation(async input => {
            const url = new URL(input.toString());
            if (url.hostname === 'www.reddit.com' && url.pathname.endsWith('.json')) {
                return new Response('Blocked', { status: 403 });
            }
            if (url.hostname === 'embed.reddit.com') {
                return new Response(embed, { status: 200 });
            }
            return new Response('Rate limited', {
                status: 429,
                headers: { 'Retry-After': '0' }
            });
        });

        await expect(fetchRedditData(redditUrl, fetcher)).resolves.toEqual({
            source: 'public-fallback',
            cacheable: false,
            data: {
                createdDate: 1_772_963_835_976,
                description: '',
                imageUrls: ['https://i.redd.it/image123.png']
            }
        });
        expect(fetcher).toHaveBeenCalledTimes(4);
    });

    it('rejects URLs outside the Reddit host allowlist without fetching them', async () => {
        const fetcher = vi.fn<typeof fetch>();

        await expect(fetchRedditData(
            'https://www.reddit.com.example.com/r/touhou/comments/abc123/title',
            fetcher
        )).rejects.toThrow('Enter a valid Reddit post URL.');
        expect(fetcher).not.toHaveBeenCalled();
    });

    it('removes malformed nested HTML tags completely', () => {
        const rss = `
            <entry>
                <content type="html">
                    &lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;
                    &lt;p&gt;Safe text&lt;/p&gt;
                    &lt;&lt;script&gt;script&gt;alert(1)&lt;&lt;/script&gt;/script&gt;
                    &lt;/div&gt;&lt;!-- SC_ON --&gt;
                </content>
                <id>t3_abc123</id>
            </entry>
        `;

        const result = parseRedditRss(rss, 'abc123');
        expect(result?.description).not.toMatch(/<\s*\/?\s*script/i);
        expect(result?.description).toContain('Safe text');
    });
});
