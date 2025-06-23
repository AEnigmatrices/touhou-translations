import postsData from '../data/posts.json';
import type { Post } from '../types/data';

const getSortedPosts = (): Post[] => {
    const postsWithDate = postsData.filter(p => p.date);
    return postsWithDate.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const postsSorted = getSortedPosts();