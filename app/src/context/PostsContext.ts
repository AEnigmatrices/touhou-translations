import { createContext, useCallback, useContext } from 'react';
import type { Post, Artist, Character } from '../types/data';

interface PostsContextType {
    posts: Post[];
    artists: Artist[];
    characters: Character[];
}



const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) throw new Error('usePostsContext must be used within a PostsProvider');
    return context;
};

const getCharacterArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return countMap;
};



export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const useGetPosts = (): Post[] => usePostsContext().posts;

export const useGetArtist = (): ((id: string) => Artist | null) => {
    const { artists } = usePostsContext();
    return useCallback((id) => artists.find(artist => artist.id === id) ?? null, [artists]);
};

export const useGetCharacters = (): ((ids?: string[]) => (Character & { artworkCount: number })[]) => {
    const { characters, posts } = usePostsContext();
    return useCallback((ids) => {
        const countMap = getCharacterArtworkCounts(posts);
        return characters
            .filter(c => !ids || ids.includes(c.id))
            .map(c => ({ ...c, artworkCount: countMap[c.id] ?? 0 }));
    }, [characters, posts]);
};

export const useGetArtists = (): ((ids?: string[]) => Artist[]) => {
    const { artists } = usePostsContext();
    return useCallback((ids) => {
        const filtered = ids ? artists.filter(a => ids.includes(a.id)) : artists;
        return [...filtered].sort((a, b) => a.id.localeCompare(b.id));
    }, [artists]);
};