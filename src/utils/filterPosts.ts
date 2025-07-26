import type { Post } from '../types/data';

export const filterPosts = (posts: Post[], characterQueries: string[], artistQueries: string[], mode: 'and' | 'or' = 'and'): Post[] => {
    if (characterQueries.length === 0 && artistQueries.length === 0) return posts;

    const lowerCaseCharacterQueries = characterQueries.map(q => q.toLowerCase());
    const lowerCaseArtistQueries = artistQueries.map(q => q.toLowerCase());

    return posts.filter(post => {
        const postCharacterIds = post.characterIds?.map(id => id.toLowerCase()) ?? [];
        const postArtistId = post.artistId?.toLowerCase() ?? '';

        const characterMatch = mode === 'and'
            ? lowerCaseCharacterQueries.every(q => postCharacterIds.includes(q))
            : lowerCaseCharacterQueries.some(q => postCharacterIds.includes(q));

        const artistMatch = mode === 'and'
            ? lowerCaseArtistQueries.every(q => postArtistId === q)
            : lowerCaseArtistQueries.some(q => postArtistId === q);

        if (characterQueries.length > 0 && artistQueries.length > 0) {
            return mode === 'and' ? characterMatch && artistMatch : characterMatch || artistMatch;
        } else if (characterQueries.length > 0) {
            return characterMatch;
        } else {
            return artistMatch;
        }
    });
};
