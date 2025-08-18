import { useMemo, useRef } from 'react';
import { filterPosts } from '../../utils/filterPosts';
import type { Post, SortOrder } from '../../types/data';

interface Props {
    posts: Post[];
    characterQueries: string[];
    artistQueries: string[];
    mode: 'and' | 'or';
    galleryOnly: boolean;
    dateSortOrder?: SortOrder;
}

const useFilteredPosts = ({ posts, characterQueries, artistQueries, mode, galleryOnly, dateSortOrder = "none" }: Props) => {
    const filteredPosts = useMemo(() => {
        const base = filterPosts(posts, characterQueries, artistQueries, mode)
            .filter(post => !galleryOnly || post.url.length > 1);

        if (dateSortOrder === "none") return base;

        return [...base].sort((a, b) => {
            const dateA = a.date || 0;
            const dateB = b.date || 0;
            return dateSortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
    }, [posts, characterQueries, artistQueries, mode, galleryOnly, dateSortOrder]);

    const shuffledOnceRef = useRef<Post[] | null>(null);

    const shuffledPosts = useMemo(() => {
        if (dateSortOrder !== "none") return filteredPosts;
        if (!shuffledOnceRef.current || shuffledOnceRef.current.length !== filteredPosts.length) {
            shuffledOnceRef.current = [...filteredPosts].sort(() => Math.random() - 0.5);
        }
        return shuffledOnceRef.current;
    }, [filteredPosts, dateSortOrder]);

    return { filteredPosts, shuffledPosts };
};

export default useFilteredPosts;