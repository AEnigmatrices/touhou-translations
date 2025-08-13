import { useEffect, useState, type FC } from 'react';
import { useMediaQuery, useTheme, Box, IconButton, Typography, Paper, CircularProgress } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './ImageSection.styles';


const ImageSection: FC<{ urls: string[] }> = ({ urls }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [zoomed, setZoomed] = useState(false);

    const currentImage = urls[currentIndex];
    const isGallery = urls.length > 1;



    const handleChangeIndex = (direction: number) => {
        if (isGallery) setCurrentIndex((prev) => (prev + direction + urls.length) % urls.length);
    };

    const handleImageClick = () => {
        if (!isMobile) setZoomed((prev) => !prev);
    };

    const getPaperSx = (zoomed: boolean, isMobile: boolean) => ({
        ...styles.paper,
        ...(zoomed ? styles.paperZoomIn : styles.paperZoomOut),
        ...(isMobile ? styles.cursorDefault : zoomed ? styles.cursorZoomOut : styles.cursorZoomIn),
    });

    useEffect(() => { setLoading(true); }, [currentIndex]);



    return (
        <Box sx={styles.root}>
            <Box sx={styles.imageDisplay} position="relative">
                <Paper onClick={handleImageClick} elevation={zoomed ? 8 : 1} sx={getPaperSx(zoomed, isMobile)}>
                    <Box
                        component="img" src={currentImage} alt="Translated Image" draggable={false} fetchPriority="high"
                        sx={zoomed ? styles.zoomed : styles.zoomOut} onLoad={() => setLoading(false)} onError={() => setLoading(false)}
                    />
                    {loading && (
                        <>
                            <Box sx={styles.loadingBackdrop} />
                            <Box sx={styles.loadingIndicatorWrapper(theme)}><CircularProgress /></Box>
                        </>
                    )}
                </Paper>
            </Box>

            {isGallery && !zoomed && (
                <Box sx={styles.galleryControls}>
                    <IconButton onClick={() => handleChangeIndex(-1)} aria-label="Previous image" sx={styles.galleryButton}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography sx={styles.galleryIndex}>
                        {currentIndex + 1} / {urls.length}
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