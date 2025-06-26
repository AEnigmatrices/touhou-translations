import React, { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { fetchPosts, fetchArtists, fetchCharacters } from './fetchData';
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

    const contextValue = useMemo(() => ({
        sortedPosts: postsQuery.data ?? [],
        artists: artistsQuery.data ?? {},
        characters: charactersQuery.data ?? {},
    }), [postsQuery.data, artistsQuery.data, charactersQuery.data]);

    const isLoading = results.some(q => q.isLoading);
    const isError = results.some(q => q.isError);

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>Failed to load data</div>;

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;