import { useState, type FC } from 'react';
import { Box } from '@mui/material';
import styles from './GalleryImage.styles';
import type { SxProps } from '@mui/material';

interface Props {
    src: string;
    alt: string;
    onLoad?: () => void;
}

const GalleryImage: FC<Props> = ({ src, alt, onLoad }) => {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
        if (onLoad) onLoad();
    };

    return (
        <Box sx={styles.wrapper}>
            {!loaded && <Box sx={styles.placeholder} aria-hidden="true" />}
            <Box
                component="img"
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={handleLoad}
                sx={{ ...styles.image, ...(loaded ? styles.loaded : styles.loading) } as SxProps<{}>}
            />
        </Box>
    );
};

export default GalleryImage;