import type { SxProps, Theme } from '@mui/material/styles';

interface GalleryImageStyles {
    wrapper: SxProps<Theme>;
    placeholder: SxProps<Theme>;
    image: SxProps<Theme>;
    loading: SxProps<Theme>;
    loaded: SxProps<Theme>;
}

const styles: GalleryImageStyles = {
    wrapper: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 1
    },
    placeholder: {
        position: 'absolute',
        inset: 0,
        borderRadius: 1,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
        objectFit: 'cover',
        transition: 'opacity 0.3s ease, filter 0.3s ease'
    },
    loading: {
        opacity: 0.5,
        filter: 'blur(5px)'
    },
    loaded: {
        opacity: 1,
        filter: 'blur(0)'
    }
};

export default styles;