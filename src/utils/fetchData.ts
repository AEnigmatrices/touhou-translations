import { extractRedditId } from "./extractRedditId";
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

    const countMap: Record<string, number> = {};
    for (const post of posts) {
        countMap[post.artistId] = (countMap[post.artistId] ?? 0) + 1;
    }

    const artists: Artist[] = artistsRaw.map(a => ({ ...a, artworkCount: countMap[a.id] ?? 0 }));
    return { artists };
};


export const fetchCharactersData = async (): Promise<{ characters: Character[] }> => {
    const posts = await fetchPosts();

    const charactersModule = await import('../../data/characters.json');
    const charactersRaw: CharacterRaw[] = charactersModule.default;

    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }

    const characters: Character[] = charactersRaw.map(c => ({ ...c, artworkCount: countMap[c.id] ?? 0 }));
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