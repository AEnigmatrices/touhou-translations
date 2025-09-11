import { useEffect, useRef, type FC } from 'react';
import { prefetch, navigate } from 'vike/client/router';
import { Box, Typography, Grid } from '@mui/material';
import { Img } from 'react-image';
import LoadingIndicator from '../../../../../components/LoadingIndicator/index.tsx';
import styles from './SeeMoreArtist.styles.ts';

interface Props {
    artistName?: string | null;
    artistPosts: { id: string; img: string }[];
}

const baseUrl = import.meta.env.BASE_URL;


const SeeMoreArtist: FC<Props> = ({ artistName, artistPosts }) => {
    const prefetched = useRef<Set<string>>(new Set());

    const prefetchIfNeeded = (postId: string | null) => {
        if (postId && !prefetched.current.has(postId)) {
            prefetch(`${baseUrl}posts/${postId}/`);
            prefetched.current.add(postId);
        }
    };

    useEffect(() => {
        artistPosts.slice(0, 4).forEach(({ id }) => prefetchIfNeeded(id));
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
                {artistPosts.slice(0, 4).map(({ id, img }) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={id} sx={styles.seeMoreGrid}>
                        <Box
                            sx={styles.seeMoreImage}
                            onClick={() => navigate(`${baseUrl}posts/${id}`)}
                        >
                            <Img
                                src={[img]}
                                alt={`See more by ${artistName ?? 'this Artist'}`}
                                decode={false}
                                loader={<LoadingIndicator />}
                                unloader={<LoadingIndicator />}
                                style={styles.imageStyle}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SeeMoreArtist;