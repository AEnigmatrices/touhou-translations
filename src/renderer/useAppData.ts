import { usePageContext } from '../renderer/usePageContext';
import { useEffect, useState } from 'react';
import { fetchPosts, fetchArtists, fetchCharacters } from '../utils/fetchData';
import type { Post, Artist, Character } from '../types/data';

interface AppData {
    posts: Post[];
    artists: Artist[];
    characters: Character[];
    loading: boolean;
    error: Error | null;
}

const getCharacterArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return countMap;
};

const getArtistArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        const id = post.artistId;
        countMap[id] = (countMap[id] ?? 0) + 1;
    }
    return countMap;
};

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