import { render } from 'vike/abort';
import { fetchPosts, fetchArtists } from '../../context/fetchData';
import { getArtistArtworkCounts } from '../../context/PostsContext';
import type { ArtistRaw } from '../../types/data';

export type Data = Awaited<ReturnType<typeof data>>;


export const data = async () => {
    const artists = fetchArtists();
    if (!artists || artists.length === 0) throw render(404, 'No artists found');

    const posts = fetchPosts();
    const artworkCounts = getArtistArtworkCounts(posts);

    const artistsWithCount = artists.map((artist: ArtistRaw) => ({
        ...artist, artworkCount: artworkCounts[artist.id] ?? 0
    }));
    return { artists: artistsWithCount };
};