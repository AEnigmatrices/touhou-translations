import { useParams } from 'react-router-dom';
import { postsSorted } from '../../utils/posts';
import ImageViewer from '../../components/ImageViewer/ImageViewer';

const Item = () => {
    const { id } = useParams();
    const numericIndex = parseInt(id ?? '', 10);

    const post = postsSorted[numericIndex - 1];

    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    return <ImageViewer selectedPost={post} />;
};

export default Item;