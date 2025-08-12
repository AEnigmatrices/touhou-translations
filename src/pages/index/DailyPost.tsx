import { Box, Card, CardContent, CircularProgress, Typography, useTheme } from '@mui/material';
import { useAppData } from '../../renderer/useAppData';
import styles from './DailyPost.styles';
import { extractRedditId } from '../../utils/extractRedditId';
import type { JSX } from 'react';

const BASE_URL = import.meta.env.BASE_URL || '/';


const DailyPost = (): JSX.Element | null => {
    const { posts, loading, error } = useAppData();
    const theme = useTheme();

    let content: JSX.Element | null = null;
    if (loading) {
        content = (
            <Box sx={styles.loadingWrapper}>
                <CircularProgress />
            </Box>
        );
    } else if (error || !posts.length) {
        content = (
            <Box sx={styles.loadingWrapper}>
                <Typography variant="h6" color="error" align="center" sx={styles.errorText}>
                    Failed to load post.
                </Typography>
            </Box>
        );
    } else {
        const today = new Date();
        const index = (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()) % posts.length;
        const post = posts[index];
        const imageUrl = post.url?.[0];
        const redditId = extractRedditId(post.reddit);

        if (!imageUrl || !redditId) return null;
        content = (
            <Box sx={styles.imageWrapper}>
                <a href={`${BASE_URL}posts/${redditId}`} aria-label="View post details" tabIndex={0} rel="noopener noreferrer">
                    <Box component="img" src={imageUrl} alt="Post image" draggable={false} fetchPriority="high" sx={styles.image} />
                </a>
            </Box>
        );
    }

    return (
        <Card sx={styles.card}>
            <CardContent>
                <Typography variant="h4" align="center" sx={styles.title(theme)} gutterBottom>Post of the Day</Typography>
                {content}
            </CardContent>
        </Card>
    );
};

export default DailyPost;