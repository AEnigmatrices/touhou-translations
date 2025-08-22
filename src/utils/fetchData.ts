import artistsData from "../../data/artists.json";
import charactersData from "../../data/characters.json";
import type { Post, ArtistRaw, Artist, CharacterRaw, Character } from "../types/data";

const loadPosts = (): Post[] => {
    const postModules = import.meta.glob('../../data/posts/*.json', { eager: true });
    const postsArrays = Object.values(postModules).map((module: any) => module.default);

    return postsArrays
        .flat()
        .filter((p): p is Post => !!p && typeof p === 'object' && 'date' in p)
        .sort((a, b) => a.date - b.date);
};

export const fetchPosts = (): Post[] => loadPosts();
export const fetchArtistsRaw = (): ArtistRaw[] => artistsData;
export const fetchCharactersRaw = (): CharacterRaw[] => charactersData;



const getArtistArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        countMap[post.artistId] = (countMap[post.artistId] ?? 0) + 1;
    }
    return countMap;
};

const getCharacterArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return countMap;
};

const processArtists = (artistsRaw: ArtistRaw[], posts: Post[]): Artist[] => {
    const counts = getArtistArtworkCounts(posts);
    return artistsRaw.map(a => ({ ...a, artworkCount: counts[a.id] ?? 0 }));
};

const processCharacters = (charactersRaw: CharacterRaw[], posts: Post[]): Character[] => {
    const counts = getCharacterArtworkCounts(posts);
    return charactersRaw.map(c => ({ ...c, artworkCount: counts[c.id] ?? 0 }));
};



export const fetchPostsData = (): { posts: Post[]; artists: Artist[]; characters: Character[] } => {
    const posts = fetchPosts();
    const artists = processArtists(artistsData, posts);
    const characters = processCharacters(charactersData, posts);
    return { posts, artists, characters };
};