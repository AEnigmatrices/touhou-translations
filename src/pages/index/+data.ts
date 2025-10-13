import type { PageContextServer } from 'vike/types';
import { fetchDailyPost, fetchPosts } from '../../utils/fetchData';
import { extractRedditId } from '../../utils/extractRedditId';

const FEATURED_IDS = [
    '1gkxrh2', '1ftq7bi', '1fwsc2y', '1h80n82',
    '1kc80tr', '1g78cf3', '1mtq78j', '1hqgla8'
];

const data = async (_pageContext: PageContextServer) => {
    const dailyPost = await fetchDailyPost();
    const allPosts = await fetchPosts();

    const featuredPosts = allPosts.filter(post => {
        const id = extractRedditId(post.reddit);
        return id && FEATURED_IDS.includes(id);
    });

    return { dailyPost, featuredPosts };
};

export { data };
export type Data = Awaited<ReturnType<typeof data>>;
