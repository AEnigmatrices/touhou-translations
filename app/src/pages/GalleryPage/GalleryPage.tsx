import { useMemo } from 'react';
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

    const filteredPosts = useMemo(() => {
        return filterPosts(posts, characterQueries, artistQueries, mode);
    }, [posts, characterQueries, artistQueries, mode]);

    const selectedPosts = useMemo(() => {
        const shuffled = [...filteredPosts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }, [filteredPosts]);

    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <Gallery posts={selectedPosts} />
        </div>
    );
};


export default GalleryPage;
