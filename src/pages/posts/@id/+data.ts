import type { PageContextServer } from 'vike/types';
import { fetchDerivedData } from '../../../utils/fetchData';
import { extractRedditId } from '../../../utils/extractRedditId';

const RANDOM_ARTIST_POSTS_COUNT = 4;

const getRandomArtistPosts = <T>(arr: T[]): T[] => {
    const result = [...arr];
    for (let i = 0; i < Math.min(RANDOM_ARTIST_POSTS_COUNT, result.length); i++) {
        const j = i + Math.floor(Math.random() * (result.length - i));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result.slice(0, RANDOM_ARTIST_POSTS_COUNT);
};

const data = async (pageContext: PageContextServer) => {
    const { id } = pageContext.routeParams;
    const {
        artistById,
        characterByPostId,
        artistPostsByArtistId,
        adjacentPostIdsByPostId,
        postByRedditId
    } = await fetchDerivedData();

    const post = postByRedditId.get(id);
    if (!post || !post.url.length || !post.src) throw new Error(`Post not found for ID: ${id}`);

    const artist = artistById.get(post.artistId) || null;
    const postCharacters = characterByPostId.get(id) ?? [];

    const artistPosts = (artistPostsByArtistId.get(post.artistId) ?? []).filter(p => p.reddit !== post.reddit);
    const randomArtistPosts = getRandomArtistPosts(artistPosts).map(p => ({ id: extractRedditId(p.reddit), img: p.url[0], nsfw: p.nsfw }));

    const { prevPostId, nextPostId } = adjacentPostIdsByPostId.get(id) ?? { prevPostId: null, nextPostId: null };

    return {
        post,
        artist,
        characters: postCharacters,
        randomArtistPosts,
        prevPostId,
        nextPostId
    };
};

export { data };
export type Data = Awaited<ReturnType<typeof data>>;
