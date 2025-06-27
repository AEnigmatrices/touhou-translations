import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetPosts } from '../../context/PostsContext';
import { fetchRedditImageData } from '../../utils/redditApi';
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

    const { data, error, isLoading } = useQuery({
        queryKey: ['redditPost', post?.url],
        queryFn: () => fetchRedditImageData(post!.url),
        enabled: !!post?.url,
        retry: 1,
    });

    if (!post) return <p style={{ color: 'red' }}>No posts available.</p>;

    return (
        <div>
            <h2>Post of the Day</h2>
            <ImageViewer
                selectedPost={post}
                imageUrl={data?.imageUrl ?? null}
                galleryUrls={data?.galleryImages ?? null}
                postLink={data?.permalink ?? null}
                loading={isLoading}
                error={error instanceof Error ? error.message : null}
            />
        </div>
    );
};

export default Home;
