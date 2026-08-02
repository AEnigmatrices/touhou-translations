import {
    extractBaseRedditUrl,
    parseRedditData,
    type RedditFormData
} from '../../src/routes/admin/postForm.ts';
import sanitizeHtml from 'sanitize-html';

export { extractBaseRedditUrl };

export interface RedditDataResponse {
    data: RedditFormData;
    source: 'json' | 'public-fallback';
}

export interface FetchedRedditData extends RedditDataResponse {
    cacheable: boolean;
}

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

const REQUEST_HEADERS = {
    Accept: 'application/json, application/atom+xml, text/html;q=0.9',
    'User-Agent': 'touhou-translations-admin/1.0 (local development tool)'
};

const decodeHtmlEntities = (value: string): string => {
    const decodeOnce = (input: string): string => input
        .replace(/&#x([0-9a-f]+);/gi, (_, value: string) => String.fromCodePoint(Number.parseInt(value, 16)))
        .replace(/&#(\d+);/g, (_, value: string) => String.fromCodePoint(Number.parseInt(value, 10)))
        .replaceAll('&quot;', '"')
        .replaceAll('&#39;', "'")
        .replaceAll('&apos;', "'")
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&amp;', '&');

    return decodeOnce(decodeOnce(value));
};

const htmlToText = (html: string): string => {
    const withMarkdownHints = html
        .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
        .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
        .replace(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**')
        .replace(/<(?:em|i)\b[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*')
        .replace(/<li\b[^>]*>/gi, '- ')
        .replace(/<\/(?:p|div|li|blockquote|h[1-6])>/gi, '\n\n')
        .replace(/<br\s*\/?>/gi, '\n');

    const plainText = sanitizeHtml(decodeHtmlEntities(withMarkdownHints), {
        allowedTags: [],
        allowedAttributes: {}
    });

    return plainText
        .replaceAll('&amp;', '&')
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};

const unique = (values: string[]): string[] => [...new Set(values)];

const directImageUrls = (value: string): string[] => {
    const decoded = decodeHtmlEntities(value);
    const direct = [...decoded.matchAll(/https:\/\/i\.redd\.it\/[a-z0-9._-]+\.(?:png|jpe?g|gif|webp)/gi)]
        .map(match => match[0]);
    const previews = [...decoded.matchAll(
        /https:\/\/preview\.redd\.it\/[^"'?\s]*?([a-z0-9]+)\.(png|jpe?g|gif|webp)\?/gi
    )].map(match => `https://i.redd.it/${match[1]}.${match[2].toLowerCase()}`);

    return unique([...direct, ...previews]);
};

export const parseRedditRss = (rss: string, postId: string): RedditFormData | null => {
    const entry = [...rss.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gi)]
        .map(match => match[0])
        .find(value => new RegExp(`<id>t3_${postId}</id>`, 'i').test(value));
    if (!entry) return null;

    const published = entry.match(/<published>([^<]+)<\/published>/i)?.[1];
    const content = entry.match(/<content\b[^>]*>([\s\S]*?)<\/content>/i)?.[1] ?? '';
    const decodedContent = decodeHtmlEntities(content);
    const markdownHtml = decodedContent.match(
        /<!--\s*SC_OFF\s*-->\s*<div\b[^>]*class="[^"]*\bmd\b[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<!--\s*SC_ON\s*-->/i
    )?.[1] ?? '';

    return {
        createdDate: published && Number.isFinite(Date.parse(published)) ? Date.parse(published) : null,
        description: htmlToText(markdownHtml),
        imageUrls: directImageUrls(decodedContent)
    };
};

export const parseRedditEmbed = (html: string): RedditFormData | null => {
    const decoded = decodeHtmlEntities(html);
    const timestamp = decoded.match(/"created_timestamp":(\d+)/i)?.[1];
    const carousel = decoded.match(/<gallery-carousel\b[\s\S]*?<\/gallery-carousel>/i)?.[0];
    const imageUrls = directImageUrls(carousel ?? decoded);

    if (!timestamp && imageUrls.length === 0) return null;
    return {
        createdDate: timestamp ? Number(timestamp) : null,
        description: '',
        imageUrls
    };
};

export const parseOldRedditHtml = (html: string, postId: string): RedditFormData | null => {
    const postStart = html.match(
        new RegExp(`<div\\b[^>]*\\bdata-fullname="t3_${postId}"[^>]*>`, 'i')
    );
    if (!postStart || postStart.index === undefined) return null;

    const remainder = html.slice(postStart.index);
    const commentsStart = remainder.search(
        /<div\b[^>]*class=['"][^'"]*\bcommentarea\b[^'"]*['"][^>]*>/i
    );
    const postHtml = commentsStart >= 0 ? remainder.slice(0, commentsStart) : remainder;
    const timestamp = postStart[0].match(/\bdata-timestamp="(\d+)"/i)?.[1];
    const descriptionHtml = postHtml.match(
        /<div\b[^>]*class="[^"]*\busertext-body\b[^"]*"[^>]*>\s*<div\b[^>]*class="[^"]*\bmd\b[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i
    )?.[1] ?? '';
    const imageUrls = directImageUrls(postHtml);

    if (!timestamp && !descriptionHtml && imageUrls.length === 0) return null;
    return {
        createdDate: timestamp ? Number(timestamp) : null,
        description: htmlToText(descriptionHtml),
        imageUrls
    };
};

const ALLOWED_REDDIT_REQUEST_HOSTS = new Set([
    'www.reddit.com',
    'embed.reddit.com',
    'old.reddit.com'
]);

const request = async (fetcher: Fetcher, value: string): Promise<Response> => {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !ALLOWED_REDDIT_REQUEST_HOSTS.has(url.hostname)) {
        throw new Error('Refusing to request an untrusted Reddit URL.');
    }

    return fetcher(url.toString(), {
        headers: REQUEST_HEADERS,
        redirect: 'error',
        signal: AbortSignal.timeout(15_000)
    });
};

export const fetchRedditData = async (
    value: string,
    fetcher: Fetcher = fetch
): Promise<FetchedRedditData> => {
    const redditUrl = extractBaseRedditUrl(value);
    if (!redditUrl) throw new Error('Enter a valid Reddit post URL.');

    const postId = redditUrl.split('/').at(-1) ?? '';
    const publicPath = new URL(redditUrl).pathname;
    const jsonUrl = `${redditUrl}.json?raw_json=1`;
    const rssUrl = `${redditUrl}.rss`;
    const embedUrl = `https://embed.reddit.com${publicPath}`;
    const [jsonResult, rssResult, embedResult] = await Promise.allSettled([
        request(fetcher, jsonUrl),
        request(fetcher, rssUrl),
        request(fetcher, embedUrl)
    ]);

    const jsonResponse = jsonResult.status === 'fulfilled' && jsonResult.value.ok ? jsonResult.value : null;
    const rssResponse = rssResult.status === 'fulfilled' && rssResult.value.ok ? rssResult.value : null;
    const embedResponse = embedResult.status === 'fulfilled' && embedResult.value.ok ? embedResult.value : null;
    let jsonData: RedditFormData | null = null;
    if (jsonResponse) {
        try {
            const jsonPayload: unknown = JSON.parse(await jsonResponse.text());
            jsonData = parseRedditData(jsonPayload);
        } catch {
            jsonData = null;
        }
    }
    const rssText = rssResponse ? await rssResponse.text() : '';
    const embedText = embedResponse ? await embedResponse.text() : '';
    const rssData = rssText ? parseRedditRss(rssText, postId) : null;
    const embedData = embedText ? parseRedditEmbed(embedText) : null;
    let oldRedditData: RedditFormData | null = null;
    if (!jsonData && !rssData) {
        const oldRedditUrl = `https://old.reddit.com${publicPath}/`;
        try {
            const oldRedditResponse = await request(fetcher, oldRedditUrl);
            if (oldRedditResponse.ok) {
                oldRedditData = parseOldRedditHtml(await oldRedditResponse.text(), postId);
            }
        } catch {
            oldRedditData = null;
        }
    }

    const data: RedditFormData = {
        createdDate: jsonData?.createdDate
            ?? rssData?.createdDate
            ?? oldRedditData?.createdDate
            ?? embedData?.createdDate
            ?? null,
        description: jsonData?.description || rssData?.description || oldRedditData?.description || '',
        imageUrls: jsonData?.imageUrls.length
            ? jsonData.imageUrls
            : embedData?.imageUrls.length
            ? embedData.imageUrls
            : oldRedditData?.imageUrls.length
            ? oldRedditData.imageUrls
            : rssData?.imageUrls ?? []
    };

    if (!data.createdDate && !data.description && data.imageUrls.length === 0) {
        throw new Error('Reddit data could not be loaded from JSON, RSS, or embed sources.');
    }

    const result: FetchedRedditData = {
        data,
        source: jsonData ? 'json' : 'public-fallback',
        cacheable: Boolean(jsonData || rssData || oldRedditData)
    };
    return result;
};
