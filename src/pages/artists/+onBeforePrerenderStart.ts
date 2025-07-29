import { fetchArtists, fetchPosts } from '../../context/fetchData';
import { getArtistArtworkCounts } from '../../context/PostsContext';
import type { OnBeforePrerenderStartAsync } from 'vike/types';
import type { Artist } from '../../types/data';


export const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async () => {
    try {
        const artists = fetchArtists();
        if (!artists || artists.length === 0) return [];

        const posts = fetchPosts();
        const artworkCounts = getArtistArtworkCounts(posts);

        const artistsWithCount: Artist[] = artists.map((char) => ({
            ...char, artworkCount: artworkCounts[char.id] ?? 0,
        }));

        return [{ url: '/artists', pageContext: { data: { artists: artistsWithCount } } }];

    } catch (error) {
        console.error('Failed to generate prerender routes for artists:', error);
        return [];
    }
};