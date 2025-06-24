import { createContext, useContext } from 'react';
import type { Post } from '../types/data';

interface PostsContextType {
    sortedPosts: Post[];
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) throw new Error('usePostsContext must be used within a PostsProvider');
    return context;
};
