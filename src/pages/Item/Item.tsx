import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRedditImageData } from '../../utils/redditApi';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import postsData from '../../data/posts.json';
import type { Post } from '../../types/data';



const Item = () => {
    const { id } = useParams();
    const numericIndex = parseInt(id ?? '', 10);

    const sortedPosts = useMemo(() => {
        const postsWithDate = (postsData as Post[]).filter(p => p.date);
        return [...postsWithDate].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, []);

    const post = sortedPosts[numericIndex - 1];

    const { data, error, isLoading } = useQuery({
        queryKey: ['redditPost', post?.url],
        queryFn: () => fetchRedditImageData(post!.url),
        enabled: !!post?.url && !isNaN(numericIndex),
        retry: 1,
    });

    if (isNaN(numericIndex)) return <p style={{ color: 'red' }}>Invalid post ID.</p>;
    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

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

export default Item;
