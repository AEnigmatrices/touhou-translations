import { useMemo } from 'react';
import postsData from '../data/posts.json';
import { PostsContext } from './PostsContext';
import type { Post } from '../types/data';

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const sortedPosts = useMemo(() => {
        const postsWithDate = (postsData as Post[]).filter(p => p.date);
        return [...postsWithDate].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, []);

    return (
        <PostsContext.Provider value={{ sortedPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;
