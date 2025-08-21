import { useEffect, useState, type FC } from 'react';
import { useData } from 'vike-react/useData';
import { Grid, Box } from '@mui/material';
import { extractRedditId } from '../../utils/extractRedditId';
import GalleryImage from './GalleryImage';
import styles from './Gallery.styles';
import type { Data, Post } from '../../types/data';

interface Props { posts?: Post[]; }

const BASE_URL = import.meta.env.BASE_URL || '/';
const BATCH_SIZE = 5;
const BATCH_DELAY = 500;


const Gallery: FC<Props> = ({ posts }) => {
    const { posts: allPosts } = useData<Data>();
    const displayedPosts = posts || allPosts;
    const [visibleCount, setVisibleCount] = useState(0);



    useEffect(() => {
        if (!displayedPosts.length) return;

        setVisibleCount(0);
        let batchIndex = 0;

        const interval = setInterval(() => {
            batchIndex++;
            setVisibleCount(Math.min(batchIndex * BATCH_SIZE, displayedPosts.length));
            if (batchIndex * BATCH_SIZE >= displayedPosts.length) clearInterval(interval);
        }, BATCH_DELAY);
        return () => clearInterval(interval);

    }, [displayedPosts]);



    if (!displayedPosts.length) return <p>No posts available.</p>;

    return (
        <Grid container spacing={2} justifyContent="center">
            {displayedPosts.map((post, index) => {
                if (index >= visibleCount) return null;
                if (!post.url?.length) return null;

                const redditId = extractRedditId(post.reddit);
                if (!redditId) return null;

                return (
                    <Grid size={{ xs: 6, sm: 2.4 }} key={redditId}>
                        <Box
                            sx={{
                                ...styles.item,
                                animation: 'fadeIn 0.5s forwards',
                                animationDelay: `${index * 100}ms`,
                                '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } }
                            }}
                        >
                            <a
                                href={`${BASE_URL}posts/${redditId}`}
                                style={{ display: 'block', width: '100%', height: '100%' }}
                            >
                                <Box sx={styles.imageWrapper}>
                                    <GalleryImage
                                        src={post.url[0]}
                                        alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                                    />
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