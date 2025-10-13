import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { Img } from 'react-image';
import { extractRedditId } from '../../../utils/extractRedditId';
import LoadingIndicator from '../../../components/LoadingIndicator';
import styles from '../styles/FeaturedPosts.styles';
import type { FC } from 'react';
import type { Post } from '../../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

interface Props {
    featuredPosts: Post[];
}

const FeaturedPosts: FC<Props> = ({ featuredPosts }) => {
    if (!featuredPosts.length) return <p>No featured posts available.</p>;

    return (
        <Card sx={styles.card}>
            <CardContent>
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Featured Posts
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {featuredPosts.map((post) => {
                        const imageUrl = post.url?.[0];
                        const redditId = extractRedditId(post.reddit);
                        if (!imageUrl || !redditId) return null;

                        return (
                            <Grid size={{ xs: 6, md: 3 }} key={redditId}>
                                <Box
                                    component="a"
                                    href={`${BASE_URL}posts/${redditId}/`}
                                    aria-label={`View featured post ${redditId}`}
                                    rel="noopener noreferrer"
                                    sx={styles.item}
                                >
                                    <Box sx={styles.imageWrapper}>
                                        <Box sx={styles.wrapper}>
                                            <Img
                                                src={[imageUrl]}
                                                loader={<LoadingIndicator />}
                                                unloader={<LoadingIndicator />}
                                                decode={false}
                                                alt={`Featured post ${redditId}`}
                                                style={styles.image}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default FeaturedPosts;
