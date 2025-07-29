import { usePageContext } from '../renderer/usePageContext';
import { useEffect, useState } from 'react';
import { fetchPosts, fetchArtists, fetchCharacters } from '../context/fetchData';
import { getArtistArtworkCounts, getCharacterArtworkCounts } from '../context/PostsContext';
import type { Post, Artist, Character } from '../types/data';

interface AppData {
    posts: Post[];
    artists: Artist[];
    characters: Character[];
    loading: boolean;
    error: Error | null;
}

const useAppData = (): AppData => {
    const pageContext = usePageContext();
    const [data, setData] = useState<AppData>({
        posts: pageContext.appData?.posts || [],
        artists: pageContext.appData?.artists || [],
        characters: pageContext.appData?.characters || [],
        loading: !pageContext.appData,
        error: null,
    });

    useEffect(() => {
        if (pageContext.appData) return;

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, loading: true, error: null }));

                const [posts, artists, characters] = await Promise.all([
                    fetchPosts(),
                    fetchArtists(),
                    fetchCharacters()
                ]);

                const artistArtworkCounts = getArtistArtworkCounts(posts);
                const characterArtworkCounts = getCharacterArtworkCounts(posts);

                const artistsWithCount: Artist[] = artists.map(artist => ({ ...artist, artworkCount: artistArtworkCounts[artist.id] ?? 0 }));

                const charactersWithCount: Character[] = characters.map(character => ({ ...character, artworkCount: characterArtworkCounts[character.id] ?? 0 }));

                setData({
                    posts,
                    artists: artistsWithCount,
                    characters: charactersWithCount,
                    loading: false,
                    error: null
                });
            } catch (error) {
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error instanceof Error ? error : new Error('Failed to fetch data')
                }));
            }
        };

        fetchData();
    }, [pageContext.appData]);

    return data;
};

export { useAppData };