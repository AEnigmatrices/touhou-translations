import { Box, Typography, Grid } from '@mui/material';
import { navigate } from 'vike/client/router';
import { useEffect, useState } from 'react';
import styles from './SeeMoreArtist.styles.ts';
import type { FC } from 'react';

interface Props {
    artistName?: string | null;
    artistPosts: { id: string; img: string }[];
    baseUrl: string;
}

const SeeMoreArtist: FC<Props> = ({ artistName, artistPosts, baseUrl }) => {
    const [loadedIndex, setLoadedIndex] = useState(-1);

    const handleImageLoad = (index: number) => {
        if (index + 1 < artistPosts.slice(0, 4).length) {
            setTimeout(() => { setLoadedIndex(index + 1); }, 600);
        }
    };

    useEffect(() => {
        if (!artistPosts.length) return;
        setLoadedIndex(-1);
        const timer = setTimeout(() => setLoadedIndex(0), 600);
        return () => clearTimeout(timer);
    }, [artistPosts]);

    if (artistPosts.length === 0) return null;

    return (
        <Box sx={styles.seeMoreContainer}>
            <Typography sx={styles.seeMoreTitle}>
                See more by
                <Box component="span" sx={styles.seeMoreArtistName}>
                    {artistName ?? 'this Artist'}
                </Box>
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {artistPosts.slice(0, 4).map(({ id, img }, index) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={id} sx={styles.seeMoreGrid}>
                        {index <= loadedIndex && (
                            <Box sx={styles.seeMoreImage} onClick={() => navigate(`${baseUrl}posts/${id}`)} >
                                <img
                                    src={img} alt={`See more by ${artistName ?? 'this Artist'}`}
                                    style={{
                                        width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.5s ease'
                                    }}
                                    onLoad={(e) => {
                                        (e.target as HTMLImageElement).style.opacity = '1';
                                        handleImageLoad(index);
                                    }}
                                />
                            </Box>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SeeMoreArtist;