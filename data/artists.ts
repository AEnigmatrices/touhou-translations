import rawArtists from './artists.json';
import { posts } from './posts';
import type { ArtistRaw, Artist, Post } from '../src/types/data';

const getArtistArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        const id = post.artistId;
        countMap[id] = (countMap[id] ?? 0) + 1;
    }
    return countMap;
};

const countMap = getArtistArtworkCounts(posts);

export const artists: Artist[] = (rawArtists as ArtistRaw[]).map(a => ({
    ...a, artworkCount: countMap[a.id] ?? 0
}));
