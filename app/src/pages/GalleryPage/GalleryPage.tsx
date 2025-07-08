import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetPosts } from '../../context/PostsContext';
import Gallery from '../../components/Gallery/Gallery';
import { filterPosts } from '../../utils/filterPosts';
import { useLocation } from 'react-router-dom';
import './GalleryPage.scss';



const GalleryPage = () => {
    const posts = useGetPosts();
    const searchParams = new URLSearchParams(useLocation().search);
    const characterQueries = searchParams.getAll('character');
    const artistQueries = searchParams.getAll('artist');
    const mode = searchParams.get('mode') === 'or' ? 'or' : 'and';

    const [visibleCount, setVisibleCount] = useState(12);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const filteredPosts = useMemo(() => { return filterPosts(posts, characterQueries, artistQueries, mode); }, [posts, characterQueries, artistQueries, mode]);
    const shuffledPosts = useMemo(() => { return [...filteredPosts].sort(() => 0.5 - Math.random()); }, [filteredPosts]);
    const visiblePosts = useMemo(() => { return shuffledPosts.slice(0, visibleCount); }, [shuffledPosts, visibleCount]);



    useEffect(() => {
        const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setVisibleCount(prev => prev + 12); }, { threshold: 1 });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
    }, [loaderRef]);



    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <Gallery posts={visiblePosts} />
            {visiblePosts.length < shuffledPosts.length && (
                <div ref={loaderRef} style={{ height: '50px' }} />
            )}
        </div>
    );
};

export default GalleryPage;