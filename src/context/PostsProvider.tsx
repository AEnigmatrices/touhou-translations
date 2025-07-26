import React, { useEffect, useMemo, useState } from 'react';
import { fetchPosts, fetchArtists, fetchCharacters } from './fetchData';
import { PostsContext } from './PostsContext';
import type { Post, ArtistRaw, CharacterRaw } from '../types/data';

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [artists, setArtists] = useState<ArtistRaw[]>([]);
    const [characters, setCharacters] = useState<CharacterRaw[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchedPosts = fetchPosts();
            const fetchedArtists = fetchArtists();
            const fetchedCharacters = fetchCharacters();

            setPosts(fetchedPosts);
            setArtists(fetchedArtists);
            setCharacters(fetchedCharacters);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({ posts, artists, characters }), [posts, artists, characters]);

    if (loading) return <div>Loading...</div>;

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;