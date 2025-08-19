import { usePageContext } from '../renderer/usePageContext';
import { useEffect, useState } from 'react';
import { fetchPosts, fetchArtists, fetchCharacters } from '../utils/fetchData';
import type { Post, Artist, Character } from '../types/data';

interface AppData {
    posts: Post[];
    artists: Artist[];
    characters: Character[];
    dailyPost: Post | null;
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

const getDailyPost = (posts: Post[]): Post | null => {
    if (!posts.length) return null;
    const today = new Date();
    const index = (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()) % posts.length;
    return posts[index];
};

const useAppData = (): AppData => {
    const pageContext = usePageContext();
    const [data, setData] = useState<AppData>({
        posts: pageContext.appData?.posts || [],
        artists: pageContext.appData?.artists || [],
        characters: pageContext.appData?.characters || [],
        dailyPost: pageContext.appData?.posts ? getDailyPost(pageContext.appData.posts) : null,
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
                    dailyPost: getDailyPost(posts),
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