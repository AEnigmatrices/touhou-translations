import { createContext, useContext } from 'react';
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
