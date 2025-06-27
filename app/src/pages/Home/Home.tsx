import { useMemo } from 'react';
import { useGetPosts } from '../../context/PostsContext';
import { hashDateToIndex } from '../../utils/dateUtils';
import ImageViewer from '../../components/ImageViewer/ImageViewer';



const Home = () => {

    const posts = useGetPosts();

    const selectedIndex = useMemo(() => {
        if (posts.length === 0) return -1;
        const today = new Date().toISOString().split('T')[0];
        return hashDateToIndex(today, posts.length);
    }, [posts]);

    const post = selectedIndex === -1 ? null : posts[selectedIndex];

    if (!post) return <p style={{ color: 'red' }}>No posts available.</p>;

    const isGallery = post.url.length > 1;
    const imageUrl = !isGallery ? post.url[0] : null;
    const galleryUrls = isGallery ? post.url : null;

    return (
        <div>
            <h2>Post of the Day</h2>
            <ImageViewer
                selectedPost={post}
                imageUrl={imageUrl}
                galleryUrls={galleryUrls}
                postLink={post.src ?? null}
                loading={false}
                error={null}
            />
        </div>
    );
};

export default Home;
