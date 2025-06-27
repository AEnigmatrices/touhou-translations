import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetPosts } from '../../context/PostsContext';
import './Gallery.scss';



const Gallery = () => {

    const posts = useGetPosts();

    const selectedPosts = useMemo(() => {
        const shuffled = [...posts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }, [posts]);

    if (selectedPosts.length === 0) return <p>No posts available.</p>;

    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <div className="gallery-grid">
                {selectedPosts.map(post => {
                    if (!post.url || post.url.length === 0) return null;
                    const imageUrl = post.url[0];

                    const postIndex = posts.findIndex(p => p === post);
                    if (postIndex === -1) return null;

                    return (
                        <Link
                            key={post.url.join('|')}
                            to={`/post/${postIndex + 1}`}
                            className="gallery-item"
                            aria-label="View post details"
                        >
                            <img src={imageUrl} alt="Gallery Post" loading="lazy" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Gallery;
