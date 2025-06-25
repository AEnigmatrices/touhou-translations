import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { fetchPosts, fetchArtists, fetchCharacters } from '../data/fetchData';
import { PostsContext } from './PostsContext';

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const results = useQueries({
        queries: [
            { queryKey: ['posts'], queryFn: fetchPosts },
            { queryKey: ['artists'], queryFn: fetchArtists },
            { queryKey: ['characters'], queryFn: fetchCharacters },
        ],
    });

    const [postsQuery, artistsQuery, charactersQuery] = results;

    const isLoading = results.some(q => q.isLoading);
    const isError = results.some(q => q.isError);

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>Failed to load data</div>;

    return (
        <PostsContext.Provider
            value={{
                sortedPosts: postsQuery.data ?? [],
                artists: artistsQuery.data ?? {},
                characters: charactersQuery.data ?? {},
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;
