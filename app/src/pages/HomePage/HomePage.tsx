import { useMemo } from 'react';
import { useGetPosts } from '../../context/PostsContext';
import { hashDateToIndex } from '../../utils/dateUtils';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import PostForm from '../../components/PostForm/PostForm';

const Home = () => {

    const posts = useGetPosts();

    const selectedIndex = useMemo(() => {
        if (posts.length === 0) return -1;
        const today = new Date().toISOString().split('T')[0];
        return hashDateToIndex(today, posts.length);
    }, [posts]);

    const post = selectedIndex === -1 ? null : posts[selectedIndex];

    const enablePostForm = import.meta.env.VITE_ENABLE_POST_FORM === "true";

    return (
        <div>
            {enablePostForm && (<PostForm />)}
            <h2>Post of the Day</h2>
            {post ? <ImageViewer post={post} /> : <p style={{ color: 'red' }}>No posts available.</p>}
        </div>
    );
};

export default Home;
