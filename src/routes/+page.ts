import { fetchHomePosts } from '../utils/generatedData';

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
    const galleryPosts = await fetchHomePosts();

    const featuredPosts = FEATURED_IDS
        .map(id => galleryPosts.find(post => post.id === id))
        .filter(post => post !== undefined);
    const dailyPostCandidates = galleryPosts;

    return { featuredPosts, dailyPostCandidates };
};
