import React from 'react';
import { Box, IconButton, Typography, Link } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './ImageSection.styles';

interface Props {
    currentIndex: number;
    urls: string[];
    handleChangeIndex: (direction: number) => void;
}

const ImageSection: React.FC<Props> = ({ currentIndex, urls, handleChangeIndex }) => {
    const currentImage = urls[currentIndex];
    const isGallery = urls.length > 1;

    return (
        <Box sx={styles.root}>
            <Box sx={styles.imageDisplay}>
                <Link href={currentImage} target="_blank" rel="noopener noreferrer" underline="none">
                    <Box component="img" src={currentImage} alt="Translated Image" sx={{ ...styles.image }} loading="lazy" title="Translated Image" />
                </Link>
            </Box>
            {isGallery && (
                <Box sx={styles.galleryControls}>
                    <IconButton onClick={() => handleChangeIndex(-1)} aria-label="Previous image" sx={styles.galleryButton}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography sx={styles.galleryIndex}>
                        {`${currentIndex + 1} / ${urls.length}`}
                    </Typography>
                    <IconButton onClick={() => handleChangeIndex(1)} aria-label="Next image" sx={styles.galleryButton}>
                        <NavigateNextIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default ImageSection;