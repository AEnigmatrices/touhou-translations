import { fetchPosts, fetchArtists, fetchCharacters } from '../context/fetchData';
import { getArtistArtworkCounts, getCharacterArtworkCounts } from '../context/PostsContext';

export const data = async () => {
    const [posts, artists, characters] = await Promise.all([
        fetchPosts(),
        fetchArtists(),
        fetchCharacters()
    ]);

    const artistArtworkCounts = getArtistArtworkCounts(posts);
    const characterArtworkCounts = getCharacterArtworkCounts(posts);

    const artistsWithCount = artists.map(artist => ({
        ...artist,
        artworkCount: artistArtworkCounts[artist.id] ?? 0
    }));

    const charactersWithCount = characters.map(character => ({
        ...character,
        artworkCount: characterArtworkCounts[character.id] ?? 0
    }));

    return {
        posts,
        artists: artistsWithCount,
        characters: charactersWithCount
    };
}
