import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Img } from 'react-image';
import { extractRedditId } from '../../../utils/extractRedditId';
import LoadingIndicator from '../../../components/LoadingIndicator';
import styles from '../styles/DailyPost.styles';
import type { FC } from 'react';
import type { Post } from '../../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

type DailyPostCandidate = Pick<Post, 'reddit' | 'url' | 'nsfw'>;

interface Props {
    posts: DailyPostCandidate[];
}

const getLocalDailyPost = (posts: DailyPostCandidate[]): DailyPostCandidate | null => {
    if (posts.length === 0) return null;

    const today = new Date();
    const index = (
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate()
    ) % posts.length;

    return posts[index];
};

const DailyPost: FC<Props> = ({ posts }) => {
    const [dailyPost, setDailyPost] = useState<DailyPostCandidate | null>(null);

    useEffect(() => {
        setDailyPost(getLocalDailyPost(posts));
    }, [posts]);

    const imageUrl = dailyPost?.url?.[0];
    const redditId = dailyPost ? extractRedditId(dailyPost.reddit) : null;

    return (
        <Card sx={styles.card}>
            <CardContent>
                <Typography variant="h6" color="text.primary">
                    Post of the Day
                </Typography>
                {imageUrl && redditId && <Box sx={styles.imageWrapper}>
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
                            style={{ ...styles.image, filter: dailyPost?.nsfw ? 'blur(10px)' : 'none' }}
                        />
                    </a>
                </Box>}
            </CardContent>
        </Card>
    );
};

export default DailyPost;
