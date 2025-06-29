import { useGetPosts } from '../../context/PostsContext';
import { Link } from 'react-router-dom';
import type { Post } from '../../types/data';
import './Gallery.scss';

interface Props { posts: Post[]; }

const Gallery: React.FC<Props> = ({ posts }) => {
    const allPosts = useGetPosts();
    if (!posts || posts.length === 0) return <p>No posts available.</p>;
    return (
        <div className="gallery-grid">
            {posts.map(post => {
                if (!post.url || post.url.length === 0) return null;
                const imageUrl = post.url[0];

                const postIndex = allPosts.findIndex(p => p === post);
                if (postIndex === -1) return null;

                return (
                    <Link
                        key={post.date}
                        to={`/post/${postIndex + 1}`}
                        className="gallery-item"
                        aria-label="View post details"
                    >
                        <img src={imageUrl} alt="Gallery Post" loading="lazy" />
                    </Link>
                );
            })}
        </div>
    );
};

export default Gallery;
