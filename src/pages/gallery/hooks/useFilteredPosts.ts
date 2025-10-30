import { useMemo, useRef } from 'react';
import { filterPosts } from '../../../utils/filterPosts';
import type { Post, SortOrder } from '../../../types/data';

interface Props {
    posts: Post[];
    characterQueries: string[];
    artistQueries: string[];
    mode: 'and' | 'or';
    galleryOnly: boolean;
    dateSortOrder?: SortOrder;
    startDate?: string | null;
    endDate?: string | null;
}

const useFilteredPosts = ({ posts, characterQueries, artistQueries, mode, galleryOnly, dateSortOrder = "none", startDate, endDate }: Props) => {
    const filteredPosts = useMemo(() => {
        const base = filterPosts(posts, characterQueries, artistQueries, mode)
            .filter(post => !galleryOnly || post.url.length > 1);

        const start = startDate ? new Date(startDate).getTime() : null;
        const end = endDate ? new Date(endDate).getTime() : null;

        const dateFiltered = base.filter(post => {
            const postDate = post.date || 0;
            if (start && postDate < start) return false;
            if (end && postDate > end) return false;
            return true;
        });

        if (dateSortOrder === "none") return dateFiltered;

        return [...dateFiltered].sort((a, b) => {
            const dateA = a.date || 0;
            const dateB = b.date || 0;
            return dateSortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
    }, [posts, characterQueries, artistQueries, mode, galleryOnly, dateSortOrder, startDate, endDate]);

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
