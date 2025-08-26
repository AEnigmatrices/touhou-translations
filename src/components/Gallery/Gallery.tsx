import { useState, useEffect, type FC } from 'react';
import { Grid, Box } from '@mui/material';
import { useAppData } from '../../pages/layout/useAppData';
import { extractRedditId } from '../../utils/extractRedditId';
import { isCached } from '../../utils/isCached';
import GalleryImage from './GalleryImage';
import styles from './Gallery.styles';
import type { Post } from '../../types/data';

interface Props { posts?: Post[]; }

const BASE_URL = import.meta.env.BASE_URL || '/';
const BATCH_SIZE = 5;
const BATCH_DELAY = 500;


const Gallery: FC<Props> = ({ posts }) => {
    const { posts: allPosts } = useAppData();
    const displayedPosts = posts || allPosts;

    const cachedCount = displayedPosts.filter(p => p.url?.length && isCached(p.url[0])).length;

    const [visibleCount, setVisibleCount] = useState(cachedCount);

    useEffect(() => {
        if (!displayedPosts.length) return;

        if (cachedCount >= displayedPosts.length) {
            setVisibleCount(displayedPosts.length);
            return;
        }

        setVisibleCount(cachedCount);
        let batchIndex = 0;

        const interval = setInterval(() => {
            batchIndex++;
            const nextCount = Math.min(cachedCount + batchIndex * BATCH_SIZE, displayedPosts.length);
            setVisibleCount(nextCount);
            if (nextCount >= displayedPosts.length) clearInterval(interval);
        }, BATCH_DELAY);

        return () => clearInterval(interval);
    }, [displayedPosts, cachedCount]);

    if (!displayedPosts.length) return <p>No posts available.</p>;

    return (
        <Grid container spacing={2} justifyContent="center">
            {displayedPosts.map((post, index) => {
                if (index >= visibleCount) return null;
                if (!post.url?.length) return null;

                const redditId = extractRedditId(post.reddit);
                if (!redditId) return null;

                const preloaded = isCached(post.url[0]);
                return (
                    <Grid size={{ xs: 6, sm: 2.4 }} key={redditId}>
                        <Box
                            sx={{
                                ...styles.item,
                                opacity: preloaded ? 1 : 0,
                                animation: preloaded ? 'none' : 'fadeIn 0.5s forwards',
                                animationDelay: preloaded ? '0ms' : `${index * 100}ms`,
                                '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } }
                            }}
                        >
                            <a
                                href={`${BASE_URL}posts/${redditId}`}
                                style={{ display: 'block', width: '100%', height: '100%' }}
                            >
                                <Box sx={styles.imageWrapper}>
                                    <GalleryImage
                                        src={post.url[0]} preloaded={preloaded}
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