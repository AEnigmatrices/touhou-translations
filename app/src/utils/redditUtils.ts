import type { PostEntryForm } from "../types/data";



export const extractBaseRedditUrl = (url?: string): string => {
    if (!url) return '';
    try {
        const { origin, pathname } = new URL(url);
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



export const buildPostEntry = (data: PostEntryForm) => {
    return {
        date: data.date,
        reddit: extractBaseRedditUrl(data.reddit),
        url: data.urls.split(',').map((u) => u.trim()).filter(Boolean),
        src: data.src,
        desc: data.desc,
        artistId: data.artistId,
        characterIds: data.characterIds.split(',').map((c) => c.trim()).filter(Boolean),
    };
}



export const fetchRedditData = async (redditUrl: string) => {
    if (!redditUrl) return null;
    const apiUrl = redditUrl.endsWith('.json') ? redditUrl : `${redditUrl}.json`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch Reddit data');
        const jsonData = await response.json();

        const postData = jsonData[0]?.data?.children[0]?.data;
        if (!postData) throw new Error('Invalid Reddit data structure');

        const createdDate = postData.created ? postData.created * 1000 : null;
        const description = postData.selftext || '';

        let imageUrls: string[] = [];
        if (postData.media_metadata) {
            imageUrls = Object.keys(postData.media_metadata).map((id) => {
                const mediaInfo = postData.media_metadata[id];
                const ext = mediaInfo?.m?.includes('png') ? 'png' : 'jpg';
                return `https://i.redd.it/${id}.${ext}`;
            });
        } else if (postData.url) {
            imageUrls = [postData.url];
        }
        return { createdDate, description, imageUrls };
    } catch (error) {
        console.error('Error fetching Reddit data:', error);
        return null;
    }
};
