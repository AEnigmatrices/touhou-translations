import React from 'react';
import { PostsContext } from './PostsContext';
import { sortedPosts } from '../data/data';

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PostsContext.Provider value={{ sortedPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;