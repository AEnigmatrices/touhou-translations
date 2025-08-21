import artistsData from "../../data/artists.json";
import charactersData from "../../data/characters.json";
import type { Post, ArtistRaw, CharacterRaw } from "../types/data";

const loadPosts = (): Post[] => {
    const postModules = import.meta.glob('../../data/posts/*.json', { eager: true });
    const postsArrays = Object.values(postModules).map((module: any) => module.default);

    const allPosts = postsArrays.flat();
    return allPosts
        .filter((p): p is Post => !!p && typeof p === 'object' && 'date' in p)
        .sort((a, b) => a.date - b.date);
};

export const fetchPosts = (): Post[] => loadPosts();
export const fetchArtists = (): ArtistRaw[] => artistsData;
export const fetchCharacters = (): CharacterRaw[] => charactersData;



export const getCharacterArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return countMap;
};

export const getArtistArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        const id = post.artistId;
        countMap[id] = (countMap[id] ?? 0) + 1;
    }
    return countMap;
};



export const getDailyPost = (posts: Post[]): Post | null => {
    if (!posts.length) return null;
    const today = new Date();
    const index = (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()) % posts.length;
    return posts[index];
};