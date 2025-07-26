import React, { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPosts, fetchArtists, fetchCharacters } from './fetchData';
import { PostsContext } from './PostsContext';
import { createSuspenseQueryOptions } from './queryOptions';
import type { Post, Artist, Character } from '../types/data';

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { data: posts } = useSuspenseQuery<Post[]>(
        createSuspenseQueryOptions({ queryKey: ['posts'], queryFn: fetchPosts })
    );

    const { data: artists } = useSuspenseQuery<Artist[]>(
        createSuspenseQueryOptions({ queryKey: ['artists'], queryFn: fetchArtists })
    );

    const { data: characters } = useSuspenseQuery<Character[]>(
        createSuspenseQueryOptions({ queryKey: ['characters'], queryFn: fetchCharacters })
    );

    const contextValue = useMemo(() => ({ posts, artists, characters }), [posts, artists, characters]);

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;