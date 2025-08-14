import { Box, Typography, Grid } from '@mui/material';
import { navigate } from 'vike/client/router';
import styles from './SeeMoreArtist.styles.ts';
import type { FC } from 'react';

interface ArtistPost {
    id: string;
    img: string;
}

interface Props {
    artistName?: string | null;
    artistPosts: ArtistPost[];
    baseUrl: string;
}

const SeeMoreArtist: FC<Props> = ({ artistName, artistPosts, baseUrl }) => {
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
                {artistPosts.slice(0, 4).map(({ id, img }) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={id} sx={styles.seeMoreGrid}>
                        <Box
                            sx={{ ...styles.seeMoreImage, backgroundImage: `url(${img})` }}
                            onClick={() => navigate(`${baseUrl}posts/${id}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SeeMoreArtist;