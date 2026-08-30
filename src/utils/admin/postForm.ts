import type { Post, PostEntryForm } from '../../types/data.ts';

interface RedditMedia {
    m?: string;
    s?: { u?: string };
}

interface RedditPostData {
    media_metadata?: Record<string, RedditMedia>;
    url?: string;
    created_utc?: number;
    selftext?: string;
}

type RedditApiResponse = Array<{
    data?: { children?: Array<{ data?: RedditPostData }> };
}>;

export interface RedditFormData {
    createdDate: number | null;
    description: string;
    imageUrls: string[];
}

export const splitClean = (input: string): string[] => (
    input.split(',').map(value => value.trim()).filter(Boolean)
);

export const extractBaseRedditUrl = (value = ''): string => {
    try {
        const url = new URL(value.trim());
        const hostname = url.hostname.toLowerCase();
        if (!['reddit.com', 'www.reddit.com', 'old.reddit.com', 'new.reddit.com'].includes(hostname)) {
            return '';
        }

        const segments = url.pathname.split('/').filter(Boolean);
        if (segments.length < 4 || segments[0] !== 'r' || segments[2] !== 'comments') return '';

        return `https://www.reddit.com/${segments.slice(0, 4).join('/')}`;
    } catch {
        return '';
    }
};

export const redditPostId = (value: string): string => {
    const normalized = extractBaseRedditUrl(value);
    return normalized.split('/').at(-1) ?? '';
};

export const validateRedditUrl = (
    value: string,
    existingPostIds: ReadonlySet<string>
): true | string => {
    const id = redditPostId(value);
    if (!id) return 'Enter a valid Reddit post URL.';
    if (existingPostIds.has(id)) return 'This Reddit post already exists.';
    return true;
};

const decodeRedditUrl = (value: string): string => value.replaceAll('&amp;', '&');

const imageUrlFromMedia = (id: string, media: RedditMedia): string => {
    if (media.m) return `https://i.redd.it/${id}.${media.m.includes('png') ? 'png' : 'jpg'}`;
    return media.s?.u ? decodeRedditUrl(media.s.u) : '';
};

export const parseRedditData = (response: unknown): RedditFormData | null => {
    if (!Array.isArray(response)) return null;

    const redditResponse = response as RedditApiResponse;
    const post = redditResponse[0]?.data?.children?.[0]?.data;
    if (!post) return null;

    const imageUrls = post.media_metadata
        ? Object.entries(post.media_metadata)
            .map(([id, media]) => imageUrlFromMedia(id, media))
            .filter(Boolean)
        : post.url
            ? [decodeRedditUrl(post.url)]
            : [];

    return {
        createdDate: typeof post.created_utc === 'number' ? post.created_utc * 1000 : null,
        description: post.selftext ?? '',
        imageUrls
    };
};

export const buildPostEntry = (
    form: PostEntryForm,
    nsfw: boolean
): Post => ({
    date: form.date,
    reddit: extractBaseRedditUrl(form.reddit),
    url: splitClean(form.urls),
    src: form.src.trim(),
    desc: form.desc.trim(),
    artistId: form.artistId.trim(),
    characterIds: form.characterIds,
    nsfw
});
