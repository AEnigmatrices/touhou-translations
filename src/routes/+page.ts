import { fetchDerivedData } from '../utils/fetchData';
import { extractRedditId } from '../utils/extractRedditId';

const FEATURED_IDS = [
    '1gkxrh2',
    '1ftq7bi',
    '1fwsc2y',
    '1h80n82',
    '1kc80tr',
    '1g78cf3',
    '1mtq78j',
    '1hqgla8',
];

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

    const featuredPosts = FEATURED_IDS
        .map(id => galleryPosts.find(post => post.id === id))
        .filter(post => post !== undefined);
    const dailyPostCandidates = galleryPosts;

    return { featuredPosts, dailyPostCandidates };
};
