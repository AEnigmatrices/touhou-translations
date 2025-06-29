import { createContext, useCallback, useContext } from 'react';
import type { Post, Artist, Character } from '../types/data';

interface PostsContextType {
    posts: Post[];
    artists: Artist[];
    characters: Character[];
}



const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) throw new Error('usePostsContext must be used within a PostsProvider');
    return context;
};



export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const useGetPosts = (): Post[] => usePostsContext().posts;

export const useGetArtist = (): ((id: string) => Artist | null) => {
    const { artists } = usePostsContext();
    return useCallback((id) => artists.find(artist => artist.id === id) ?? null, [artists]);
};

export const useGetCharacters = (): ((ids?: string[]) => Character[]) => {
    const { characters } = usePostsContext();
    return useCallback((ids) => (ids ? characters.filter(c => ids.includes(c.id)) : characters), [characters]);
};