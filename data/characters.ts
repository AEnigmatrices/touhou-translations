import rawCharacters from './characters.json';
import { posts } from './posts';
import type { CharacterRaw, Post, Character } from '../src/types/data';

const getCharacterArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return countMap;
};

const countMap = getCharacterArtworkCounts(posts);

export const characters: Character[] = (rawCharacters as CharacterRaw[]).map(c => ({
    ...c, artworkCount: countMap[c.id] ?? 0
}));
