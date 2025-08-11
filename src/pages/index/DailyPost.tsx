import { Box, Card, CardContent, CircularProgress, Typography, useTheme } from '@mui/material';
import { useAppData } from '../../renderer/useAppData';
import styles from './DailyPost.styles';
import { extractRedditId } from '../../utils/extractRedditId';
import type { JSX } from 'react';

const BASE_URL = import.meta.env.BASE_URL || '/';

const DailyPost = (): JSX.Element | null => {
    const { posts, loading, error } = useAppData();
    const theme = useTheme();

    if (loading) return <Box sx={styles.loadingWrapper}><CircularProgress /></Box>;
    if (error || !posts.length) return <Typography variant="h6" color="error" align="center" sx={styles.errorText}>Failed to load post.</Typography>;

    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % posts.length;
    const postOfTheDay = posts[index];

    if (!postOfTheDay.url.length) return null;

    const imageUrl = postOfTheDay.url[0];
    const redditId = extractRedditId(postOfTheDay.reddit);
    if (!redditId) return null;

    const postLink = `${BASE_URL}posts/${redditId}`;

    return (
        <Card sx={styles.card}>
            <CardContent>
                <Typography variant="h4" align="center" sx={styles.title(theme)} gutterBottom>
                    Post of the Day
                </Typography>
                <Box sx={styles.imageWrapper}>
                    <a href={postLink} aria-label="View post details" tabIndex={0} rel="noopener noreferrer">
                        <Box component="img" src={imageUrl} alt="Post image" draggable={false} fetchPriority="high" sx={styles.image} />
                    </a>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DailyPost;