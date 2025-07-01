import { useGetPosts } from '../../context/PostsContext';
import { Link, useLocation } from 'react-router-dom';
import { filterPosts } from '../../utils/filterPosts';
import type { Post } from '../../types/data';
import './Gallery.scss';

interface Props { posts: Post[]; }

const Gallery: React.FC<Props> = ({ posts }) => {
    const allPosts = useGetPosts();

    const searchParams = new URLSearchParams(useLocation().search);
    const characterQueries = searchParams.getAll('character');
    const artistQueries = searchParams.getAll('artist');
    const mode = searchParams.get('mode') === 'or' ? 'or' : 'and';

    const filteredPosts = filterPosts(posts, characterQueries, artistQueries, mode);

    if (!filteredPosts || filteredPosts.length === 0) return <p>No posts available.</p>;
    return (
        <div className="gallery__grid">
            {filteredPosts.map(post => {
                if (!post.url || post.url.length === 0) return null;
                const imageUrl = post.url[0];

                const postIndex = allPosts.findIndex(p => p === post);
                if (postIndex === -1) return null;

                return (
                    <Link key={post.date} to={`/post/${postIndex + 1}`} className="gallery__item" aria-label="View post details">
                        <img src={imageUrl} alt="Gallery Post" loading="lazy" className="gallery__image" />
                    </Link>
                );
            })}
        </div>
    );
};

export default Gallery;
