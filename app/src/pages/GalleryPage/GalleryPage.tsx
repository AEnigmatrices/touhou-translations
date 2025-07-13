import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPosts } from '../../context/PostsContext';
import { filterPosts } from '../../utils/filterPosts';
import Gallery from '../../components/Gallery/Gallery';
import './GalleryPage.scss';

const PAGE_CHUNK_SIZE = 12;



const GalleryPage = () => {
    const posts = useGetPosts();
    const searchParams = new URLSearchParams(useLocation().search);
    const characterQueries = searchParams.getAll('character');
    const artistQueries = searchParams.getAll('artist');
    const mode = searchParams.get('mode') === 'or' ? 'or' : 'and';

    const [visibleCount, setVisibleCount] = useState(PAGE_CHUNK_SIZE);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isLoadingRef = useRef(false);

    const filteredPosts = useMemo(() => { return filterPosts(posts, characterQueries, artistQueries, mode); }, [posts, characterQueries, artistQueries, mode]);
    const shuffledPosts = useMemo(() => { return [...filteredPosts].sort(() => 0.5 - Math.random()); }, [filteredPosts]);
    const visiblePosts = useMemo(() => { return shuffledPosts.slice(0, visibleCount); }, [shuffledPosts, visibleCount]);

    const observerRef = useRef<IntersectionObserver | null>(null);



    useEffect(() => {
        if (!loaderRef.current) return;
        observerRef.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isLoadingRef.current && visiblePosts.length < shuffledPosts.length) {
                    isLoadingRef.current = true;
                    setVisibleCount(prev => prev + PAGE_CHUNK_SIZE);
                }
            },
            { rootMargin: '200px' }
        );
        const currentObserver = observerRef.current;
        currentObserver.observe(loaderRef.current);
        return () => { currentObserver.disconnect(); };

    }, []);

    useEffect(() => { isLoadingRef.current = false; }, [visiblePosts.length]);



    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <Gallery posts={visiblePosts} />
            {visiblePosts.length < shuffledPosts.length && (
                <div ref={loaderRef} className="loader">
                    <div className="loader-spinner" />
                </div>
            )}
        </div>
    );
};

export default GalleryPage;