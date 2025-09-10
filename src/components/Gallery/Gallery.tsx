import { Grid, Box } from '@mui/material';
import { Img } from 'react-image';
import { extractRedditId } from '../../utils/extractRedditId';
import LoadingIndicator from '../LoadingIndicator';
import styles from './Gallery.styles';
import type { FC } from 'react';
import type { Post } from '../../types/data';

interface Props { posts: Post[]; }

const BASE_URL = import.meta.env.BASE_URL || '/';


const Gallery: FC<Props> = ({ posts }) => {
    if (!posts.length) return <p>No posts available.</p>;

    return (
        <Grid container spacing={2} justifyContent="center">
            {posts.map((post) => {
                if (!post.url?.length) return null;

                const redditId = extractRedditId(post.reddit);
                if (!redditId) return null;

                return (
                    <Grid size={{ xs: 6, sm: 2 }} key={redditId}>
                        <Box sx={styles.item}>
                            <a href={`${BASE_URL}posts/${redditId}/`}>
                                <Box sx={styles.imageWrapper}>
                                    <Box sx={styles.wrapper}>
                                        <Img
                                            src={[post.url[0]]}
                                            loader={<LoadingIndicator />}
                                            unloader={<LoadingIndicator />}
                                            decode={false}
                                            alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                                            style={styles.image}
                                        />
                                    </Box>
                                </Box>
                            </a>
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Gallery;