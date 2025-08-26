import { extractRedditId } from "./extractRedditId";
import artistsData from "../../data/artists.json";
import charactersData from "../../data/characters.json";
import type { Post, ArtistRaw, Artist, CharacterRaw, Character } from "../types/data";

const BASE_PATH = import.meta.env.BASE_URL;


const processArtists = (artistsRaw: ArtistRaw[], posts: Post[]): Artist[] => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        countMap[post.artistId] = (countMap[post.artistId] ?? 0) + 1;
    }
    return artistsRaw.map(a => ({ ...a, artworkCount: countMap[a.id] ?? 0 }));
};

const processCharacters = (charactersRaw: CharacterRaw[], posts: Post[]): Character[] => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return charactersRaw.map(c => ({ ...c, artworkCount: countMap[c.id] ?? 0 }));
};


export const fetchPosts = (): Post[] => {
    const postModules = import.meta.glob('../../data/posts/*.json', { eager: true });
    const postsArrays = Object.values(postModules).map((module: any) => module.default);

    return postsArrays
        .flat()
        .filter((p): p is Post => !!p && typeof p === 'object' && 'date' in p)
        .sort((a, b) => a.date - b.date);
};
export const fetchArtistsRaw = (): ArtistRaw[] => artistsData;
export const fetchCharactersRaw = (): CharacterRaw[] => charactersData;


export const fetchPostsData = (): { posts: Post[]; artists: Artist[]; characters: Character[] } => {
    const posts = fetchPosts();
    const artists = processArtists(artistsData, posts);
    const characters = processCharacters(charactersData, posts);
    return { posts, artists, characters };
};

export const fetchArtistsData = (): { artists: Artist[] } => {
    const posts = fetchPosts();
    const artists = processArtists(artistsData, posts);
    return { artists };
};

export const fetchCharactersData = (): { characters: Character[] } => {
    const posts = fetchPosts();
    const characters = processCharacters(charactersData, posts);
    return { characters };
};


export const getRandomPostPath = (): string => {
    const { posts } = fetchPostsData();
    if (!posts || posts.length === 0) return `${BASE_PATH}/`;

    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    const redditId = extractRedditId(randomPost.reddit);

    return redditId ? `${BASE_PATH}posts/${redditId}` : BASE_PATH;
};


export const fetchDailyPost = (): Post => {
    const posts = fetchPosts();
    const today = new Date();
    const index = (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()) % posts.length;
    return posts[index];
};