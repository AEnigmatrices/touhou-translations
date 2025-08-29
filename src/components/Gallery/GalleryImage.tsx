import { type FC } from 'react';
import { Img } from 'react-image';
import { Box, CircularProgress } from '@mui/material';
import styles from './GalleryImage.styles';

interface Props {
    src: string;
    alt: string;
}

const GalleryImage: FC<Props> = ({ src, alt }) => {
    return (
        <Box sx={styles.wrapper}>
            <Img
                src={[src]}
                loader={<Box sx={styles.spinnerContainer}><CircularProgress size={24} /></Box>}
                unloader={<Box sx={styles.placeholder}>Failed to load</Box>}
                decode={false}
                alt={alt}
                style={styles.image}
            />
        </Box>
    );
};

export default GalleryImage;