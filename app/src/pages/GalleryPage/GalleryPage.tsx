import { useMemo } from 'react';
import { useGetPosts } from '../../context/PostsContext';
import Gallery from '../../components/Gallery/Gallery';
import './GalleryPage.scss';

const GalleryPage = () => {
    const posts = useGetPosts();

    const selectedPosts = useMemo(() => {
        const shuffled = [...posts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }, [posts]);

    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <Gallery posts={selectedPosts} />
        </div>
    );
};

export default GalleryPage;
