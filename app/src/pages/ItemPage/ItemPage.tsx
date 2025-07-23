import { useParams } from 'react-router-dom';
import { useGetPosts } from '../../context/PostsContext';
import ImageViewer from '../../components/ImageViewer/ImageViewer';



const ItemPage = () => {
    const { id } = useParams();
    const numericIndex = parseInt(id ?? '', 10);

    const posts = useGetPosts();
    const post = posts[numericIndex - 1];

    if (isNaN(numericIndex)) return <p style={{ color: 'red' }}>Invalid post ID.</p>;
    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    return (
        <ImageViewer post={post} />
    );
};

export default ItemPage;
