import { usePostsContext } from "../context/PostsContext";
import type { Post, Artist, Character } from "../types/data";

export const useSortedPosts = (): Post[] => {
    const { sortedPosts } = usePostsContext();
    return sortedPosts;
};

export const useGetArtist = (): ((id: string) => Artist | null) => {
    const { artists } = usePostsContext();
    return (id: string) => artists[id] ?? null;
};

export const useGetCharacters = (): ((ids: string[]) => Character[]) => {
    const { characters } = usePostsContext();
    return (ids: string[]) =>
        ids.map((id) => characters[id]).filter(Boolean) as Character[];
};
