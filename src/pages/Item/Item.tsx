import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import postsData from '../../data/posts.json';
import type { Post } from '../../types/data';

const Item = () => {
    const { id } = useParams();
    const numericIndex = parseInt(id ?? '', 10);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [postTitle, setPostTitle] = useState<string | null>(null);
    const [postLink, setPostLink] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const postsWithDate: Post[] = (postsData as Post[]).filter(p => p.date);
    const sortedPosts = postsWithDate.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const post = sortedPosts[numericIndex - 1];



    useEffect(() => {
        if (!post) return;
        const fetchRedditImage = async () => {
            setLoading(true);
            setError(null);
            setImageUrl(null);
            setPostTitle(null);
            setPostLink(null);

            try {
                const response = await fetch(post.url);
                const data = await response.json();
                const postData = data[0]?.data?.children[0]?.data;

                if (postData?.title) setPostTitle(postData.title);
                else setError('No title found.');

                if (postData?.permalink) setPostLink(`https://www.reddit.com${postData.permalink}`);
                else setError('No permalink found.');

                if (postData?.url?.match(/\.(jpg|jpeg|png|gif)$/i)) setImageUrl(postData.url);
                else setError('No direct image URL found.');
            } catch {
                setError('Failed to fetch image.');
            } finally {
                setLoading(false);
            }
        };

        fetchRedditImage();
    }, [post]);



    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    return (
        <ImageViewer
            selectedPost={post}
            imageUrl={imageUrl}
            postTitle={postTitle}
            postLink={postLink}
            loading={loading}
            error={error}
        />
    );
};

export default Item;
