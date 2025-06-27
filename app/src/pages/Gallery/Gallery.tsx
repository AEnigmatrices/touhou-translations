import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useGetPosts } from '../../context/PostsContext';
import { fetchRedditImageData } from '../../utils/redditApi';
import './Gallery.scss';

const Gallery = () => {
    const posts = useGetPosts();

    const selectedPosts = useMemo(() => {
        const shuffled = [...posts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }, [posts]);

    const queries = useQueries({
        queries: selectedPosts.map(post => ({
            queryKey: ['redditImage', post.url],
            queryFn: () => fetchRedditImageData(post.url),
            retry: 1,
            enabled: !!post.url,
        })),
    });

    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);

    if (isLoading) return <p>Loading gallery...</p>;
    if (isError) return <p style={{ color: 'red' }}>Failed to load gallery.</p>;

    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <div className="gallery-grid">
                {selectedPosts.map((post, index) => {
                    const data = queries[index]?.data;
                    const imageUrl = Array.isArray(data?.galleryImages) ? data.galleryImages[0] : data?.imageUrl;
                    if (!imageUrl) return null;
                    return (
                        <a
                            key={post.url}
                            href={post.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gallery-item"
                            aria-label="Open source post"
                        >
                            <img src={imageUrl} alt="Gallery Post" loading="lazy" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default Gallery;