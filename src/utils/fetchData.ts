import { extractRedditId } from "./extractRedditId";
import type { Post, ArtistRaw, Artist, CharacterRaw, Character } from "../types/data";

export interface DerivedData {
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

export const processArtists = (artistsRaw: ArtistRaw[], posts: Post[]): Artist[] => {
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

export const processCharacters = (charactersRaw: CharacterRaw[], posts: Post[]): Character[] => {
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
export const buildDerivedData = (posts: Post[], artistsRaw: ArtistRaw[], charactersRaw: CharacterRaw[]): DerivedData => {
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
