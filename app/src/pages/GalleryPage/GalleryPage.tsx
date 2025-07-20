import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPosts, useGetCharacter, useGetArtist } from '../../context/PostsContext';
import { filterPosts } from '../../utils/filterPosts';
import Gallery from '../../components/Gallery/Gallery';
import GalleryHeaderCharacter from './GalleryHeaderCharacter';
import GalleryHeaderArtist from './GalleryHeaderArtist';
import './GalleryPage.scss';

const PAGE_CHUNK_SIZE = 12;



const GalleryPage = () => {
    const posts = useGetPosts();
    const getCharacter = useGetCharacter();
    const getArtist = useGetArtist();

    const searchParams = new URLSearchParams(useLocation().search);
    const characterQueries = searchParams.getAll('character');
    const artistQueries = searchParams.getAll('artist');
    const mode = searchParams.get('mode') === 'or' ? 'or' : 'and';

    const characterId = characterQueries[0] ?? null;
    const character = characterId ? getCharacter(characterId) : null;

    const artistId = artistQueries[0] ?? null;
    const artist = artistId ? getArtist(artistId) : null;

    const [visibleCount, setVisibleCount] = useState(PAGE_CHUNK_SIZE);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isLoadingRef = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);



    const filteredPosts = useMemo(() => filterPosts(posts, characterQueries, artistQueries, mode), [posts, characterQueries, artistQueries, mode]);

    const filterKey = useMemo(() => {
        const chars = [...characterQueries].sort().join(',');
        const artists = [...artistQueries].sort().join(',');
        return `${chars}|${artists}|${mode}|${filteredPosts.length}`;
    }, [characterQueries, artistQueries, mode, filteredPosts.length]);

    const shuffledPosts = useMemo(() => {
        return [...filteredPosts].sort(() => 0.5 - Math.random());
    }, [filterKey]);

    const visiblePosts = shuffledPosts.slice(0, visibleCount);




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
            {character && <GalleryHeaderCharacter character={character} />}
            {artist && <GalleryHeaderArtist artist={artist} />}
            <Gallery posts={visiblePosts} />
            {visiblePosts.length < shuffledPosts.length && (<div ref={loaderRef} className="loader"><div className="loader-spinner" /></div>)}
        </div>
    );
};

export default GalleryPage;