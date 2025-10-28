import { Box, Typography, Grid } from '@mui/material';
import { Img } from 'react-image';
import LoadingIndicator from '../../../../../components/LoadingIndicator/index.tsx';
import styles from './SeeMoreArtist.styles.ts';
import type { FC } from 'react';

interface Props {
    artistId: string;
    artistName: string | null;
    artistPosts: { id: string; img: string; nsfw: boolean; }[];
}

const baseUrl = import.meta.env.BASE_URL;

const SeeMoreArtist: FC<Props> = ({ artistId, artistName, artistPosts }) => {
    if (artistPosts.length === 0) return null;

    return (
        <Box sx={styles.seeMoreContainer}>
            <Typography sx={styles.seeMoreTitle}>
                See more by{' '}
                <Box
                    component="a"
                    href={`${baseUrl}gallery?artist=${artistId}`}
                    sx={styles.seeMoreArtistName}
                    aria-label={`View gallery for ${artistName ?? 'this Artist'}`}
                >
                    {artistName ?? 'this Artist'}
                </Box>
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {artistPosts.slice(0, 4).map(({ id, img, nsfw }) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={id} sx={styles.seeMoreGrid}>
                        <Box
                            component="a"
                            href={`${baseUrl}posts/${id}/`}
                            sx={styles.seeMoreImage}
                        >
                            <Img
                                src={[img]}
                                alt={`See more by ${artistName ?? 'this Artist'}`}
                                decode={false}
                                loader={<LoadingIndicator />}
                                unloader={<LoadingIndicator />}
                                style={{ ...styles.imageStyle, filter: nsfw ? 'blur(10px)' : 'none' }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SeeMoreArtist;