import type { PageContextServer } from 'vike/types';
import { fetchPostsData } from '../../../utils/fetchData';
import { extractRedditId } from '../../../utils/extractRedditId';

const data = async (pageContext: PageContextServer) => {
    const { id } = pageContext.routeParams;

    const { posts, artists, characters } = fetchPostsData();

    const post = posts.find(p => extractRedditId(p.reddit) === id);
    if (!post || !post.url.length || !post.src) throw new Error(`Post not found for ID: ${id}`);

    const artist = artists.find(a => a.id === post.artistId) || null;
    const postCharacters = characters.filter(c => post.characterIds.includes(c.id));

    const artistPosts = posts.filter(p => p.artistId === post.artistId && p.reddit !== post.reddit);
    const randomArtistPosts = artistPosts
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(p => ({ id: extractRedditId(p.reddit), img: p.url[0] }));

    const dateSortedPosts = [...posts].sort((a, b) => a.date - b.date);
    const currentIndex = dateSortedPosts.findIndex(p => p.reddit === post.reddit);
    const prevPostId = dateSortedPosts[currentIndex - 1] ? extractRedditId(dateSortedPosts[currentIndex - 1].reddit) : null;
    const nextPostId = dateSortedPosts[currentIndex + 1] ? extractRedditId(dateSortedPosts[currentIndex + 1].reddit) : null;

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