import { useState, useEffect, useCallback, type FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import styles from './GalleryImage.styles';
import type { SxProps } from '@mui/material';

interface Props {
    src: string;
    alt: string;
    preloaded?: boolean;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 300;

const GalleryImage: FC<Props> = ({ src, alt, preloaded }) => {
    const [loaded, setLoaded] = useState(!!preloaded);
    const [retryCount, setRetryCount] = useState(0);
    const [currentSrc, setCurrentSrc] = useState(src);


    const attemptLoad = useCallback(() => {
        const cacheBustedSrc = `${src}?retry=${retryCount}&cb=${Date.now()}`;
        setCurrentSrc(cacheBustedSrc);
    }, [retryCount, src]);


    useEffect(() => {
        if (retryCount > 0 && retryCount <= MAX_RETRIES) {
            const timer = setTimeout(attemptLoad, RETRY_DELAY);
            return () => clearTimeout(timer);
        }
    }, [retryCount, attemptLoad]);

    useEffect(() => {
        if (loaded) return;

        const img = new Image();
        img.src = currentSrc;

        const handleLoad = () => setLoaded(true);
        const handleError = () => {
            if (retryCount < MAX_RETRIES) setRetryCount(prev => prev + 1);
        };

        img.onload = handleLoad;
        img.onerror = handleError;

        if (img.complete && img.naturalWidth > 0) setLoaded(true);

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [currentSrc, loaded, retryCount]);


    return (
        <Box sx={styles.wrapper}>
            {!loaded && <Box sx={styles.spinnerContainer}><CircularProgress /></Box>}
            {loaded && (
                <Box
                    component="img"
                    src={currentSrc}
                    alt={alt}
                    loading="lazy"
                    sx={{ ...styles.image, ...(loaded ? styles.loaded : styles.loading) } as SxProps}
                />
            )}
        </Box>
    );
};

export default GalleryImage;