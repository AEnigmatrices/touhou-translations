import React, { useState } from 'react';
import { Box } from '@mui/material';
import { mergeSx } from './Gallery.utils';
import styles from './GalleryImage.styles';

interface Props {
    src: string;
    alt: string;
    onLoad?: () => void;
}

const GalleryImage: React.FC<Props> = ({ src, alt, onLoad }) => {

    const [loaded, setLoaded] = useState(false);

    const sxImage = mergeSx(styles.image, loaded ? styles.loaded : styles.loading);

    const handleLoad = () => {
        setLoaded(true);
        if (onLoad) onLoad();
    };

    return (
        <Box sx={styles.wrapper}>
            {!loaded && <Box sx={styles.placeholder} aria-hidden="true" />}
            <Box component="img" src={src} alt={alt} loading="lazy" onLoad={handleLoad} sx={sxImage} />
        </Box>
    );
};


export default GalleryImage;