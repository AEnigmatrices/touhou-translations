import React, { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPosts, fetchArtists, fetchCharacters } from './fetchData';
import { PostsContext } from './PostsContext';

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: posts } = useSuspenseQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    const { data: artists } = useSuspenseQuery({
        queryKey: ['artists'],
        queryFn: fetchArtists,
    });

    const { data: characters } = useSuspenseQuery({
        queryKey: ['characters'],
        queryFn: fetchCharacters,
    });

    const contextValue = useMemo(() => ({
        sortedPosts: posts,
        artists,
        characters,
    }), [posts, artists, characters]);

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;