import artistsData from "../../data/artists.json";
import charactersData from "../../data/characters.json";
import type { Post, ArtistRaw, CharacterRaw } from "../types/data";

const postModules = import.meta.glob('../../data/posts/*.json', { eager: true });

const loadPosts = async (): Promise<Post[]> => {
    const postsArrays = Object.values(postModules).map((module: any) => module.default);

    const allPosts = postsArrays.flat();
    return allPosts
        .filter((p): p is Post => !!p && typeof p === 'object' && 'date' in p)
        .sort((a, b) => a.date - b.date);
};

export const fetchPosts = async (): Promise<Post[]> => loadPosts();

export const fetchArtists = async (): Promise<ArtistRaw[]> => artistsData;

export const fetchCharacters = async (): Promise<CharacterRaw[]> => charactersData;