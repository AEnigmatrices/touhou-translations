import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { useAppData } from '../layout/useAppData';
import styles from './DailyPost.styles';
import { extractRedditId } from '../../utils/extractRedditId';
import type { JSX } from 'react';

const BASE_URL = import.meta.env.BASE_URL || '/';
const IMAGE_WIDTH = 960;
const IMAGE_HEIGHT = 540;


const DailyPost = (): JSX.Element | null => {

    const { dailyPost, loading, error } = useAppData();
    const imageUrl = dailyPost?.url?.[0];
    const redditId = dailyPost ? extractRedditId(dailyPost.reddit) : null;

    return (
        <Card sx={styles.card}>
            <CardContent>
                <Typography variant="h4" sx={styles.title}>
                    Post of the Day
                </Typography>
                <Box sx={styles.imageWrapper}>
                    {loading ? <Box sx={styles.loadingWrapper}><CircularProgress /></Box>
                        : error || !dailyPost || !imageUrl || !redditId ? <Typography sx={styles.errorText} variant="h6">Failed to load post.</Typography>
                            :
                            <a
                                href={`${BASE_URL}posts/${redditId}`} aria-label="View post details"
                                tabIndex={0} rel="noopener noreferrer"
                            >
                                <Box
                                    component="img" src={imageUrl} alt="Post image" draggable={false} fetchPriority="high"
                                    loading="eager" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} sx={styles.image}
                                />
                            </a>
                    }
                </Box>
            </CardContent>
        </Card>
    );
};

export default DailyPost;