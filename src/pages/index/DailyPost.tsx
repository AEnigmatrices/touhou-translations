import { Box, Card, CardContent, Typography } from '@mui/material';
import styles from './DailyPost.styles';
import { extractRedditId } from '../../utils/extractRedditId';
import type { FC } from 'react';
import type { Post } from '../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';
const IMAGE_WIDTH = 960;
const IMAGE_HEIGHT = 540;

interface Props {
    dailyPost: Post | null;
}


const DailyPost: FC<Props> = ({ dailyPost }) => {
    const imageUrl = dailyPost?.url?.[0];
    const redditId = dailyPost ? extractRedditId(dailyPost.reddit) : null;

    return (
        <Card sx={styles.card}>
            <CardContent>
                <Typography variant="h4" sx={styles.title}>
                    Post of the Day
                </Typography>
                <Box sx={styles.imageWrapper}>
                    <a
                        href={`${BASE_URL}posts/${redditId}`}
                        aria-label="View post details"
                        tabIndex={0}
                        rel="noopener noreferrer"
                    >
                        <Box
                            component="img"
                            src={imageUrl}
                            alt="Post image"
                            draggable={false}
                            fetchPriority="high"
                            loading="eager"
                            width={IMAGE_WIDTH}
                            height={IMAGE_HEIGHT}
                            sx={styles.image}
                        />
                    </a>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DailyPost;