import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSortedPosts } from '../../context/PostsContext';
import { fetchRedditImageData } from '../../utils/redditApi';
import ImageViewer from '../../components/ImageViewer/ImageViewer';



const Item = () => {
    const { id } = useParams();
    const numericIndex = parseInt(id ?? '', 10);

    const sortedPosts = useSortedPosts();
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
            galleryUrls={data?.galleryImages ?? null}
            postTitle={data?.title ?? null}
            postLink={data?.permalink ?? null}
            loading={isLoading}
            error={error instanceof Error ? error.message : null}
        />
    );
};

export default Item;
