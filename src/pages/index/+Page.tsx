import { useMemo } from 'react';
import { useGetPosts } from '../../context/PostsContext';
import { hashDateToIndex } from './utils';
import ImageViewer from '../../components/ImageViewer/ImageViewer';

const FALLBACK_DATE = '2016-05-28';

const Page = () => {
    const posts = useGetPosts();

    const today = typeof window !== 'undefined' && window.__TODAY__ ? window.__TODAY__ : FALLBACK_DATE;

    const selectedIndex = useMemo(() => {
        if (posts.length === 0) return -1;
        return hashDateToIndex(today, posts.length);
    }, [posts, today]);

    const post = selectedIndex === -1 ? null : posts[selectedIndex];

    return (
        <div>
            <h2>Post of the Day</h2>
            {post ? (
                <ImageViewer post={post} />
            ) : (
                <p style={{ color: 'red' }}>No posts available.</p>
            )}
        </div>
    );
};

export default Page;