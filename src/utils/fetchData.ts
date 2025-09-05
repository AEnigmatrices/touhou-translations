import { extractRedditId } from "./extractRedditId";
import type { Post, ArtistRaw, Artist, CharacterRaw, Character } from "../types/data";

const BASE_PATH = import.meta.env.BASE_URL;


const processArtists = (artistsRaw: ArtistRaw[], posts: Post[]): Artist[] => {
    const artworkCountMap: Record<string, number> = {};
    const characterCountMap: Record<string, number> = {};

    for (const post of posts) {
        artworkCountMap[post.artistId] = (artworkCountMap[post.artistId] ?? 0) + 1;
        characterCountMap[post.artistId] = (characterCountMap[post.artistId] ?? 0) + post.characterIds.length;
    }

    return artistsRaw.map(a => ({
        ...a,
        artworkCount: artworkCountMap[a.id] ?? 0,
        characterCount: characterCountMap[a.id] ?? 0
    }));
};

const processCharacters = (charactersRaw: CharacterRaw[], posts: Post[]): Character[] => {
    const artworkCountMap: Record<string, number> = {};
    const artistSetMap: Record<string, Set<string>> = {};

    for (const post of posts) {
        for (const id of post.characterIds) {
            artworkCountMap[id] = (artworkCountMap[id] ?? 0) + 1;
            if (!artistSetMap[id]) artistSetMap[id] = new Set();
            artistSetMap[id].add(post.artistId);
        }
    }

    return charactersRaw.map(c => ({
        ...c,
        artworkCount: artworkCountMap[c.id] ?? 0,
        artistCount: artistSetMap[c.id]?.size ?? 0
    }));
};



export const fetchPosts = async (): Promise<Post[]> => {
    const postModules = import.meta.glob('../../data/posts/*.json');
    const loaded = await Promise.all(
        Object.values(postModules).map(loader => loader())
    );
    return loaded
        .map((m: any) => m.default)
        .flat()
        .filter((p): p is Post => !!p && typeof p === 'object' && 'date' in p)
        .sort((a, b) => a.date - b.date);
};


export const fetchPostsData = async (): Promise<{ posts: Post[]; artists: Artist[]; characters: Character[] }> => {
    const posts = await fetchPosts();
    const [artistsModule, charactersModule] = await Promise.all([
        import('../../data/artists.json'),
        import('../../data/characters.json'),
    ]);
    const artistsRaw: ArtistRaw[] = artistsModule.default;
    const charactersRaw: CharacterRaw[] = charactersModule.default;

    const artists = processArtists(artistsRaw, posts);
    const characters = processCharacters(charactersRaw, posts);

    return { posts, artists, characters };
};


export const fetchArtistsData = async (): Promise<{ artists: Artist[] }> => {
    const posts = await fetchPosts();

    const artistsModule = await import('../../data/artists.json');
    const artistsRaw: ArtistRaw[] = artistsModule.default;

    const artworkCountMap: Record<string, number> = {};
    const characterCountMap: Record<string, number> = {};

    for (const post of posts) {
        artworkCountMap[post.artistId] = (artworkCountMap[post.artistId] ?? 0) + 1;
        characterCountMap[post.artistId] = (characterCountMap[post.artistId] ?? 0) + post.characterIds.length;
    }

    const artists: Artist[] = artistsRaw.map(a => ({
        ...a,
        artworkCount: artworkCountMap[a.id] ?? 0,
        characterCount: characterCountMap[a.id] ?? 0
    }));

    return { artists };
};


export const fetchCharactersData = async (): Promise<{ characters: Character[] }> => {
    const posts = await fetchPosts();

    const charactersModule = await import('../../data/characters.json');
    const charactersRaw: CharacterRaw[] = charactersModule.default;

    const artworkCountMap: Record<string, number> = {};
    const artistSetMap: Record<string, Set<string>> = {};

    for (const post of posts) {
        for (const id of post.characterIds) {
            artworkCountMap[id] = (artworkCountMap[id] ?? 0) + 1;
            if (!artistSetMap[id]) artistSetMap[id] = new Set();
            artistSetMap[id].add(post.artistId);
        }
    }

    const characters: Character[] = charactersRaw.map(c => ({
        ...c,
        artworkCount: artworkCountMap[c.id] ?? 0,
        artistCount: artistSetMap[c.id]?.size ?? 0
    }));

    return { characters };
};


export const getRandomPostPath = async (): Promise<string> => {
    const { posts } = await fetchPostsData();
    if (!posts || posts.length === 0) return BASE_PATH;

    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    const redditId = extractRedditId(randomPost.reddit);

    return redditId ? `${BASE_PATH}posts/${redditId}/` : BASE_PATH;
};


export const fetchDailyPost = async (): Promise<Post> => {
    const posts = await fetchPosts();
    const today = new Date();
    const index = (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()) % posts.length;
    return posts[index];
};