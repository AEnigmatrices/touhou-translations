import { Img } from 'react-image';
import { Box } from '@mui/material';
import LoadingIndicator from '../LoadingIndicator';
import styles from './GalleryImage.styles';
import { type FC } from 'react';

interface Props {
    src: string;
    alt: string;
}

const GalleryImage: FC<Props> = ({ src, alt }) => {
    return (
        <Box sx={styles.wrapper}>
            <Img
                src={[src]}
                loader={<LoadingIndicator />}
                unloader={<LoadingIndicator />}
                decode={false}
                alt={alt}
                style={styles.image}
            />
        </Box>
    );
};

export default GalleryImage;