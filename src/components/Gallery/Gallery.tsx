import React, { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppData } from '../../renderer/useAppData';
import { extractRedditId } from '../../utils/extractRedditId';
import Masonry from '@mui/lab/Masonry';
import GalleryImage from './GalleryImage';
import styles from './Gallery.styles';
import type { Post } from '../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

interface Props {
    posts?: Post[];
}

const Gallery: React.FC<Props> = ({ posts }) => {
    const { posts: allPosts } = useAppData();
    const displayedPosts = posts || allPosts;

    const [loadedCount, setLoadedCount] = useState(0);
    const [batchId, setBatchId] = useState(0);

    const totalImages = useMemo(
        () => displayedPosts.filter(post => post.url?.length && extractRedditId(post.reddit)).length,
        [displayedPosts]
    );

    useEffect(() => {
        setLoadedCount(0);
        setBatchId((id) => id + 1);
    }, [posts]);

    const handleImageLoad = (currentBatchId: number) => {
        if (currentBatchId === batchId) {
            setLoadedCount((prev) => prev + 1);
        }
    };

    if (!displayedPosts.length) return <p>No posts available.</p>;

    const allLoaded = loadedCount === totalImages;

    return (
        <Box sx={{ position: 'relative', minHeight: '200px', display: 'flex', justifyContent: 'center' }}>
            <Masonry columns={{ xs: 2, md: 4 }} spacing={2} sx={{ visibility: allLoaded ? 'visible' : 'hidden' }}>
                {displayedPosts.map((post) => {
                    if (!post.url?.length) return null;

                    const imageUrl = post.url[0];
                    const redditId = extractRedditId(post.reddit);
                    if (!redditId) return null;

                    return (
                        <Box key={post.date} sx={styles.item}>
                            <a
                                href={`${BASE_URL}posts/${redditId}`}
                                aria-label="View post details"
                                tabIndex={0}
                                style={{ display: 'block', width: '100%', height: '100%' }}
                            >
                                <GalleryImage
                                    src={imageUrl}
                                    alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                                    onLoad={() => handleImageLoad(batchId)}
                                />
                            </a>
                        </Box>
                    );
                })}
            </Masonry>

            {!allLoaded && (
                <Box sx={styles.loadingOverlay} >
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default Gallery;