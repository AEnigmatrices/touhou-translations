import { useMemo } from 'react';
import { filterPosts } from '../../utils/filterPosts';

interface Props {
    posts: any[];
    characterQueries: string[];
    artistQueries: string[];
    mode: 'and' | 'or';
    galleryOnly: boolean;
    visibleCount: number;
}

const useFilteredPosts = ({ posts, characterQueries, artistQueries, mode, galleryOnly, visibleCount }: Props) => {

    const filteredPosts = useMemo(() => {
        const baseFiltered = filterPosts(posts, characterQueries, artistQueries, mode);
        return galleryOnly ? baseFiltered.filter(post => post.url.length > 1) : baseFiltered;
    }, [posts, characterQueries, artistQueries, mode, galleryOnly]);

    const filterKey = useMemo(() => {
        const chars = characterQueries.slice().sort().join(',');
        const artists = artistQueries.slice().sort().join(',');
        return `${chars}|${artists}|${mode}|${galleryOnly}|${filteredPosts.length}`;
    }, [characterQueries, artistQueries, mode, galleryOnly, filteredPosts.length]);

    const shuffledPosts = useMemo(
        () => filteredPosts.slice().sort(() => Math.random() - 0.5),
        [filterKey]
    );

    const visiblePosts = useMemo(
        () => shuffledPosts.slice(0, visibleCount),
        [shuffledPosts, visibleCount]
    );

    return { filteredPosts, shuffledPosts, visiblePosts };
};

export default useFilteredPosts;