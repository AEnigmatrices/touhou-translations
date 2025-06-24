import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import postsData from '../../data/posts.json';
import type { Post } from '../../types/data';

const REDDIT_BASE_URL = 'https://www.reddit.com';



const Item = () => {
    const { id } = useParams();
    const numericIndex = parseInt(id ?? '', 10);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [postTitle, setPostTitle] = useState<string | null>(null);
    const [postLink, setPostLink] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const sortedPosts = useMemo(() => {
        const postsWithDate = (postsData as Post[]).filter(p => p.date);
        return [...postsWithDate].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, []);
    const post = sortedPosts[numericIndex - 1];



    const resetStateForLoading = useCallback(() => {
        setLoading(true); setError(null); setImageUrl(null); setPostTitle(null); setPostLink(null);
    }, []);


    const fetchRedditImage = useCallback(async () => {
        if (!post || !post.url) return;
        resetStateForLoading();
        try {
            const response = await fetch(post.url);
            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            const postData = data[0]?.data?.children[0]?.data;

            if (!postData) throw new Error('Invalid post data');

            setPostTitle(postData.title || null);
            setPostLink(postData.permalink ? `${REDDIT_BASE_URL}${postData.permalink}` : null);

            if (postData.url?.match(/\.(jpg|jpeg|png|gif)$/i)) {
                setImageUrl(postData.url);
            } else {
                throw new Error('No direct image URL found');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch image');
        } finally {
            setLoading(false);
        }
    }, [post, resetStateForLoading]);



    useEffect(() => {
        if (isNaN(numericIndex)) {
            setError('Invalid post ID');
            return;
        }
        if (!post) return;
        fetchRedditImage();
    }, [numericIndex, post, fetchRedditImage]);



    if (isNaN(numericIndex)) return <p style={{ color: 'red' }}>Invalid post ID.</p>;
    if (!post) return <p style={{ color: 'red' }}>Post not found.</p>;

    return (
        <ImageViewer
            selectedPost={post} imageUrl={imageUrl} postTitle={postTitle} postLink={postLink} loading={loading} error={error}
        />
    );
};

export default Item;
