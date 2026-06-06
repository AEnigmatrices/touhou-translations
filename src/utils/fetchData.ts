import { extractRedditId } from "./extractRedditId";
import type { Post, ArtistRaw, Artist, CharacterRaw, Character } from "../types/data";

const BASE_PATH = import.meta.env.BASE_URL;

interface DerivedData {
    posts: Post[];
    artists: Artist[];
    characters: Character[];
    postByRedditId: Map<string, Post>;
    artistById: Map<string, Artist>;
    characterById: Map<string, Character>;
    characterByPostId: Map<string, Character[]>;
    artistPostsByArtistId: Map<string, Post[]>;
    adjacentPostIdsByPostId: Map<string, { prevPostId: string | null; nextPostId: string | null }>;
}

let derivedDataPromise: Promise<DerivedData> | null = null;


const processArtists = (artistsRaw: ArtistRaw[], posts: Post[]): Artist[] => {
    const artworkCountMap: Record<string, number> = {};
    const characterSetMap: Record<string, Set<string>> = {};

    for (const post of posts) {
        artworkCountMap[post.artistId] = (artworkCountMap[post.artistId] ?? 0) + 1;
        if (!characterSetMap[post.artistId]) {
            characterSetMap[post.artistId] = new Set();
        }
        for (const cid of post.characterIds) {
            characterSetMap[post.artistId].add(cid);
        }
    }

    return artistsRaw.map(a => ({
        ...a,
        artworkCount: artworkCountMap[a.id] ?? 0,
        characterCount: characterSetMap[a.id]?.size ?? 0
    }));
};

const processCharacters = (charactersRaw: CharacterRaw[], posts: Post[]): Character[] => {
    const artworkCountMap: Record<string, number> = {};
    const artistSetMap: Record<string, Set<string>> = {};

    for (const post of posts) {
        const uniqueCharacterIds = new Set(post.characterIds);
        for (const id of uniqueCharacterIds) {
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

const buildDerivedData = (posts: Post[], artistsRaw: ArtistRaw[], charactersRaw: CharacterRaw[]): DerivedData => {
    const artists = processArtists(artistsRaw, posts);
    const characters = processCharacters(charactersRaw, posts);

    const postByRedditId = new Map<string, Post>();
    const artistById = new Map(artists.map(artist => [artist.id, artist]));
    const characterById = new Map(characters.map(character => [character.id, character]));
    const characterByPostId = new Map<string, Character[]>();
    const artistPostsByArtistId = new Map<string, Post[]>();
    const adjacentPostIdsByPostId = new Map<string, { prevPostId: string | null; nextPostId: string | null }>();

    for (const post of posts) {
        const postId = extractRedditId(post.reddit);
        if (!postId) continue;

        postByRedditId.set(postId, post);
        characterByPostId.set(
            postId,
            post.characterIds
                .map(characterId => characterById.get(characterId))
                .filter((character): character is Character => Boolean(character))
        );

        const artistPosts = artistPostsByArtistId.get(post.artistId) ?? [];
        artistPosts.push(post);
        artistPostsByArtistId.set(post.artistId, artistPosts);
    }

    let previousPostWithLowerDate: Post | null = null;
    for (let index = 0; index < posts.length; index += 1) {
        const post = posts[index];
        const postId = extractRedditId(post.reddit);
        if (!postId) continue;

        adjacentPostIdsByPostId.set(postId, {
            prevPostId: previousPostWithLowerDate ? extractRedditId(previousPostWithLowerDate.reddit) || null : null,
            nextPostId: null
        });

        const nextPost = posts[index + 1] ?? null;
        if (!nextPost || nextPost.date > post.date) {
            previousPostWithLowerDate = post;
        }
    }

    let nextPostWithHigherDate: Post | null = null;
    for (let index = posts.length - 1; index >= 0; index -= 1) {
        const post = posts[index];
        const postId = extractRedditId(post.reddit);
        if (!postId) continue;

        const adjacentPostIds = adjacentPostIdsByPostId.get(postId);
        if (adjacentPostIds) {
            adjacentPostIds.nextPostId = nextPostWithHigherDate ? extractRedditId(nextPostWithHigherDate.reddit) || null : null;
        }

        const previousPost = posts[index - 1] ?? null;
        if (!previousPost || previousPost.date < post.date) {
            nextPostWithHigherDate = post;
        }
    }

    return {
        posts,
        artists,
        characters,
        postByRedditId,
        artistById,
        characterById,
        characterByPostId,
        artistPostsByArtistId,
        adjacentPostIdsByPostId
    };
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

export const fetchDerivedData = async (): Promise<DerivedData> => {
    derivedDataPromise ??= (async () => {
        const posts = await fetchPosts();
        const [artistsModule, charactersModule] = await Promise.all([
            import('../../data/artists.json'),
            import('../../data/characters.json'),
        ]);
        const artistsRaw: ArtistRaw[] = artistsModule.default;
        const charactersRaw: CharacterRaw[] = charactersModule.default;

        return buildDerivedData(posts, artistsRaw, charactersRaw);
    })();

    return derivedDataPromise;
};


export const fetchPostsData = async (): Promise<{ posts: Post[]; artists: Artist[]; characters: Character[] }> => {
    const { posts, artists, characters } = await fetchDerivedData();

    return { posts, artists, characters };
};


export const fetchArtistsData = async (): Promise<{ artists: Artist[] }> => {
    const { artists } = await fetchDerivedData();
    return { artists };
};


export const fetchCharactersData = async (): Promise<{ characters: Character[] }> => {
    const { characters } = await fetchDerivedData();
    return { characters };
};


export const getRandomPostPath = async (): Promise<string> => {
    const { posts } = await fetchDerivedData();
    if (!posts || posts.length === 0) return BASE_PATH;

    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    const redditId = extractRedditId(randomPost.reddit);

    return redditId ? `${BASE_PATH}posts/${redditId}/` : BASE_PATH;
};
