import type { Post } from '../types/data';

export const filterPostsByCharacters = (posts: Post[], characterQueries: string[], mode: 'and' | 'or' = 'and'): Post[] => {
    if (characterQueries.length === 0) return posts;

    const lowerCaseQueries = characterQueries.map(q => q.toLowerCase());

    return posts.filter(post => {
        const ids = post.characterIds?.map(id => id.toLowerCase()) ?? [];
        return mode === 'and'
            ? lowerCaseQueries.every(q => ids.includes(q))
            : lowerCaseQueries.some(q => ids.includes(q));
    });
}
