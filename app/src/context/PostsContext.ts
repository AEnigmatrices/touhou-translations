import { createContext, useCallback, useContext } from 'react';
import type { Post, Artist, Character } from '../types/data';

interface PostsContextType {
    sortedPosts: Post[];
    artists: Record<string, Artist>;
    characters: Record<string, Character>;
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) throw new Error('usePostsContext must be used within a PostsProvider');
    return context;
};

export const useSortedPosts = (): Post[] => {
    const { sortedPosts } = usePostsContext();
    return sortedPosts;
};

export const useGetArtist = (): ((id: string) => Artist | null) => {
    const { artists } = usePostsContext();
    return useCallback(
        (id: string) => artists[id] ?? null, [artists]
    );
};

export const useGetCharacters = (): ((ids: string[]) => Character[]) => {
    const { characters } = usePostsContext();
    return useCallback(
        (ids: string[]) => ids.map(id => characters[id]).filter(Boolean) as Character[], [characters]
    );
};