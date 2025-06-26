import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetPosts } from '../../context/PostsContext';
import { fetchRedditImageData } from '../../utils/redditApi';
import ImageViewer from '../../components/ImageViewer/ImageViewer';



const Home = () => {

    const posts = useGetPosts();

    const randomIndex = useMemo(() => {
        if (posts.length === 0) return -1;
        return Math.floor(Math.random() * posts.length);
    }, [posts]);

    const post = randomIndex === -1 ? null : posts[randomIndex];

    const { data, error, isLoading } = useQuery({
        queryKey: ['redditPost', post?.url],
        queryFn: () => fetchRedditImageData(post!.url),
        enabled: !!post?.url,
        retry: 1,
    });

    if (!post) return <p style={{ color: 'red' }}>No posts available.</p>;

    return (
        <ImageViewer
            selectedPost={post}
            imageUrl={data?.imageUrl ?? null}
            galleryUrls={data?.galleryImages ?? null}
            postTitle={data?.title ?? null}
            postLink={data?.permalink ?? null}
            loading={isLoading}
            error={error instanceof Error ? error.message : null}
        />
    );
};

export default Home;