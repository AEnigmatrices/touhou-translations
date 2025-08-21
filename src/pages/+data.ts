import { fetchPosts, fetchArtists, fetchCharacters, getArtistArtworkCounts, getCharacterArtworkCounts, getDailyPost } from '../utils/fetchData';
import type { Artist, Character } from '../types/data';


const data = async () => {

    const [posts, artists, characters] = await Promise.all([
        fetchPosts(),
        fetchArtists(),
        fetchCharacters()
    ]);

    const artistArtworkCounts = getArtistArtworkCounts(posts);
    const characterArtworkCounts = getCharacterArtworkCounts(posts);

    const artistsWithCount: Artist[] = artists.map(a => ({ ...a, artworkCount: artistArtworkCounts[a.id] ?? 0 }));
    const charactersWithCount: Character[] = characters.map(c => ({ ...c, artworkCount: characterArtworkCounts[c.id] ?? 0 }));

    return {
        posts,
        artists: artistsWithCount,
        characters: charactersWithCount,
        dailyPost: getDailyPost(posts)
    };
}

export default data;