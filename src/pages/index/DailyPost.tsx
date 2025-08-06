import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { useAppData } from '../../renderer/useAppData';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import type { JSX } from 'react';

const DailyPost = (): JSX.Element => {
    const { posts, loading, error } = useAppData();

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error || !posts.length) return <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>Failed to load post.</Typography>;

    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % posts.length;
    const postOfTheDay = posts[index];

    return (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: 960, p: 2 }}>
                <CardContent>
                    <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
                        Post of the Day
                    </Typography>
                    <ImageViewer post={postOfTheDay} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default DailyPost;