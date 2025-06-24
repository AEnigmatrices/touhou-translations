import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRedditImageData } from '../../utils/redditApi';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import postsData from '../../data/posts.json';
import type { Post } from '../../types/data';



const Home = () => {
    const sortedPosts = useMemo(() => {
        const postsWithDate = (postsData as Post[]).filter(p => p.date);
        return [...postsWithDate].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, []);

    const randomIndex = useMemo(() => {
        if (sortedPosts.length === 0) return -1;
        return Math.floor(Math.random() * sortedPosts.length);
    }, [sortedPosts]);

    const post = randomIndex === -1 ? null : sortedPosts[randomIndex];

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
            postTitle={data?.title ?? null}
            postLink={data?.permalink ?? null}
            loading={isLoading}
            error={error instanceof Error ? error.message : null}
        />
    );
};

export default Home;
