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

const getCharacterArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return countMap;
};

const getArtistArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        const id = post.artistId;
        countMap[id] = (countMap[id] ?? 0) + 1;
    }
    return countMap;
};



export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const useGetPosts = (): Post[] => usePostsContext().posts;



export const useGetArtist = (): ((id: string) => (Artist & { artworkCount: number }) | null) => {
    const { artists, posts } = usePostsContext();
    return useCallback((id) => {
        const countMap = getArtistArtworkCounts(posts);
        const artist = artists.find(a => a.id === id);
        return artist ? { ...artist, artworkCount: countMap[artist.id] ?? 0 } : null;
    }, [artists, posts]);
};

export const useGetArtists = (): ((ids?: string[]) => (Artist & { artworkCount: number })[]) => {
    const { artists, posts } = usePostsContext();
    return useCallback((ids) => {
        const countMap = getArtistArtworkCounts(posts);
        return artists
            .filter(a => !ids || ids.includes(a.id))
            .map(a => ({ ...a, artworkCount: countMap[a.id] ?? 0 }))
    }, [artists, posts]);
};



export const useGetCharacter = (): ((id: string) => (Character & { artworkCount: number }) | null) => {
    const { characters, posts } = usePostsContext();
    return useCallback((id) => {
        const countMap = getCharacterArtworkCounts(posts);
        const character = characters.find(c => c.id === id);
        return character ? { ...character, artworkCount: countMap[character.id] ?? 0 } : null;
    }, [characters, posts]);
};

export const useGetCharacters = (): ((ids?: string[]) => (Character & { artworkCount: number })[]) => {
    const { characters, posts } = usePostsContext();
    return useCallback((ids) => {
        const countMap = getCharacterArtworkCounts(posts);
        return characters
            .filter(c => !ids || ids.includes(c.id))
            .map(c => ({ ...c, artworkCount: countMap[c.id] ?? 0 }));
    }, [characters, posts]);
};