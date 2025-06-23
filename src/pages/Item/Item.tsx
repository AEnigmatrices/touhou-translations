import { useParams } from 'react-router-dom';
import postsData from '../../data/posts.json';
import type { Post } from '../../types/data';
import ImageViewer from '../../components/ImageViewer/ImageViewer';

const typedPosts = postsData as Post[];

const Item = () => {
    const { id } = useParams();

    const numericId = parseInt(id ?? '', 10);
    const post = typedPosts.find(p => p.id === numericId);

    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    return <ImageViewer selectedPost={post} />;
};

export default Item;
