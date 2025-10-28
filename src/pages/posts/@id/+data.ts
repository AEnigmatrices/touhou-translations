import type { PageContextServer } from 'vike/types';
import { fetchPostsData } from '../../../utils/fetchData';
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
    const { posts, artists, characters } = await fetchPostsData();

    const post = posts.find(p => extractRedditId(p.reddit) === id);
    if (!post || !post.url.length || !post.src) throw new Error(`Post not found for ID: ${id}`);

    const artist = artists.find(a => a.id === post.artistId) || null;
    const postCharacters = characters.filter(c => post.characterIds.includes(c.id));

    const artistPosts = posts.filter(p => p.artistId === post.artistId && p.reddit !== post.reddit);
    const randomArtistPosts = getRandomArtistPosts(artistPosts).map(p => ({ id: extractRedditId(p.reddit), img: p.url[0], nsfw: p.nsfw }));

    const validPosts = posts.filter(p => p.date != null);
    let prevPost: typeof post | null = null;
    let nextPost: typeof post | null = null;

    for (const p of validPosts) {
        if (p.date < post.date && (!prevPost || p.date > prevPost.date)) prevPost = p;
        if (p.date > post.date && (!nextPost || p.date < nextPost.date)) nextPost = p;
    }

    const prevPostId = prevPost ? extractRedditId(prevPost.reddit) : null;
    const nextPostId = nextPost ? extractRedditId(nextPost.reddit) : null;

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