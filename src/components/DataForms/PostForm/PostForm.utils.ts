import type { PostEntryForm } from "../../../types/data";
import artists from '../../../../data/artists.json';

const headers = { 'Content-Type': 'application/json' };



const splitClean = (input: string) => input.split(',').map(s => s.trim()).filter(Boolean);

const getApiUrl = (url: string) => url.endsWith('.json') ? url : `${url}.json`;

const buildImageUrls = (postData: any): string[] => {
    if (postData.media_metadata) {
        const metadata = postData.media_metadata as Record<string, { m?: string }>;
        return Object.entries(metadata)
            .map(([id, media]) => {
                const ext = media.m?.includes('png') ? 'png' : 'jpg';
                return `https://i.redd.it/${id}.${ext}`;
            })
            .reverse();
    }
    return postData.url ? [postData.url] : [];
};

const buildPostEntry = ({ date, reddit, urls, src, desc, artistId, characterIds }: PostEntryForm) => ({
    date,
    reddit: extractBaseRedditUrl(reddit),
    url: splitClean(urls),
    src,
    desc,
    artistId,
    characterIds: splitClean(characterIds),
});



export const submitPostEntry = async (data: PostEntryForm): Promise<void> => {
    const response = await fetch('/api/posts', { method: 'POST', headers, body: JSON.stringify(buildPostEntry(data)) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to add post');
};

export const validateArtistId = (id: string): true | string => {
    const trimmed = id.trim();
    const exists = artists.some(artist => artist.id === trimmed);
    return exists || 'Artist ID does not exist.';
}

export const extractBaseRedditUrl = (url?: string): string => {
    if (!url) return '';
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname === 'old.reddit.com') parsedUrl.hostname = 'www.reddit.com';

        const { origin, pathname } = parsedUrl;
        const segments = pathname.split('/').filter(Boolean);
        const isValidRedditPostPath =
            segments.length >= 4 &&
            segments[0] === 'r' &&
            segments[2] === 'comments';

        return isValidRedditPostPath ? `${origin}/${segments.slice(0, 4).join('/')}` : '';
    } catch {
        return '';
    }
};

export const fetchRedditData = async (redditUrl: string) => {
    if (!redditUrl) return null;
    try {
        const response = await fetch(getApiUrl(redditUrl));
        if (!response.ok) throw new Error('Failed to fetch Reddit data');
        const jsonData = await response.json();

        const postData = jsonData[0]?.data?.children[0]?.data;
        if (!postData) throw new Error('Invalid Reddit data structure');

        const createdDate = postData.created_utc ? postData.created_utc * 1000 : null;
        const description = postData.selftext ?? '';
        const imageUrls = buildImageUrls(postData);

        return { createdDate, description, imageUrls };
    } catch (error) {
        console.error('Error fetching Reddit data:', error);
        return null;
    }
};

export const validateRedditUrl = (value: string, existingPosts: { reddit: string }[]): string | true => {
    const normalizedValue = extractBaseRedditUrl(value.trim());
    const isDuplicate = existingPosts?.some(post => extractBaseRedditUrl(post.reddit) === normalizedValue);
    if (isDuplicate) return 'This Reddit URL already exists.';
    return true;
};