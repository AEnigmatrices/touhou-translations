import { fetchDerivedData } from '../utils/fetchData';
import { extractRedditId } from '../utils/extractRedditId';

export const load = async () => {
    const { posts } = await fetchDerivedData();
    const galleryPosts = posts
        .filter(post => post.url.length > 0)
        .map(post => ({
            id: extractRedditId(post.reddit),
            img: post.url[0],
            nsfw: post.nsfw,
            date: post.date,
        }))
        .filter(post => post.id);

    const featuredPosts = galleryPosts.slice(-8).reverse();
    const dailyPostCandidates = galleryPosts;

    return { featuredPosts, dailyPostCandidates };
};
