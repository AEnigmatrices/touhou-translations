import React, { useMemo } from 'react';
import { fetchPosts, fetchArtists, fetchCharacters } from './fetchData';
import { PostsContext } from './PostsContext';

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const posts = useMemo(() => fetchPosts(), []);
    const artists = useMemo(() => fetchArtists(), []);
    const characters = useMemo(() => fetchCharacters(), []);

    const contextValue = useMemo(() => ({ posts, artists, characters }), [posts, artists, characters]);

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;