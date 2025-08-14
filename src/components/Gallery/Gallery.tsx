import { useState, useEffect, type FC } from 'react';
import { Grid, Box } from '@mui/material';
import { useAppData } from '../../renderer/useAppData';
import { extractRedditId } from '../../utils/extractRedditId';
import GalleryImage from './GalleryImage';
import styles from './Gallery.styles';
import type { Post } from '../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

interface Props {
    posts?: Post[];
}

const Gallery: FC<Props> = ({ posts }) => {
    const { posts: allPosts } = useAppData();
    const [loadedIndex, setLoadedIndex] = useState(-1);
    const displayedPosts = posts || allPosts;

    const handleImageLoad = (index: number) => {
        if (index + 1 < displayedPosts.length) {
            setTimeout(() => setLoadedIndex(index + 1), 600);
        }
    };

    useEffect(() => {
        if (!displayedPosts.length) return;
        setLoadedIndex(-1);
        const timer = setTimeout(() => setLoadedIndex(0), 600);
        return () => clearTimeout(timer);
    }, [displayedPosts]);

    if (!displayedPosts.length) return <p>No posts available.</p>;

    return (
        <Grid container spacing={2} justifyContent="center">
            {displayedPosts.map((post, index) => {
                if (!post.url?.length) return null;
                const imageUrl = post.url[0];
                const redditId = extractRedditId(post.reddit);
                if (!redditId) return null;

                return (
                    <Grid size={{ xs: 6, sm: 2.4 }} key={post.date}   >
                        <Box sx={styles.item}>
                            {index <= loadedIndex ? (
                                <a
                                    href={`${BASE_URL}posts/${redditId}`}
                                    style={{ display: 'block', width: '100%', height: '100%' }}
                                >
                                    <Box sx={styles.imageWrapper}>
                                        <GalleryImage
                                            src={imageUrl}
                                            alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                                            onLoad={() => handleImageLoad(index)}
                                        />
                                    </Box>
                                </a>
                            ) : (
                                <Box sx={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />
                            )}
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Gallery;