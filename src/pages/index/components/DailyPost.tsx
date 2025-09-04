import { Box, Card, CardContent, Typography } from '@mui/material';
import { Img } from 'react-image';
import { extractRedditId } from '../../../utils/extractRedditId';
import LoadingIndicator from '../../../components/LoadingIndicator';
import styles from '../styles/DailyPost.styles';
import type { FC } from 'react';
import type { Post } from '../../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

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
                {imageUrl && <Box sx={styles.imageWrapper}>
                    <a
                        href={`${BASE_URL}posts/${redditId}/`}
                        aria-label="View post details"
                        tabIndex={0}
                        rel="noopener noreferrer"
                    >
                        <Img
                            src={[imageUrl]}
                            alt="Post image"
                            decode={false}
                            loader={<LoadingIndicator />}
                            unloader={<LoadingIndicator />}
                            style={styles.image}
                        />
                    </a>
                </Box>}
            </CardContent>
        </Card>
    );
};

export default DailyPost;