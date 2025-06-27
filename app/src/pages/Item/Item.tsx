import { useParams } from 'react-router-dom';
import { useGetPosts } from '../../context/PostsContext';
import ImageViewer from '../../components/ImageViewer/ImageViewer';



const Item = () => {
    const { id } = useParams();
    const numericIndex = parseInt(id ?? '', 10);

    const posts = useGetPosts();
    const post = posts[numericIndex - 1];

    if (isNaN(numericIndex)) return <p style={{ color: 'red' }}>Invalid post ID.</p>;
    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    const isGallery = post.url.length > 1;
    const imageUrl = !isGallery ? post.url[0] : null;
    const galleryUrls = isGallery ? post.url : null;

    return (
        <ImageViewer
            selectedPost={post}
            imageUrl={imageUrl}
            galleryUrls={galleryUrls}
            postLink={post.src ?? null}
            loading={false}
            error={null}
        />
    );
};

export default Item;
