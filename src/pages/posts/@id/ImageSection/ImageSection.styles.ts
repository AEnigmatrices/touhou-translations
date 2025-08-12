import type { SxProps, Theme } from '@mui/material/styles';

interface Styles {
    root: SxProps<Theme>;
    imageDisplay: SxProps<Theme>;
    image: SxProps<Theme>;
    galleryControls: SxProps<Theme>;
    galleryButton: SxProps<Theme>;
    galleryIndex: SxProps<Theme>;
    zoomOut: SxProps<Theme>;
    zoomed: SxProps<Theme>;
}

const styles: Styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    imageDisplay: {
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.03)',
        },
        '&:active': {
            transform: 'scale(0.97)',
        },
        '@media (max-width:768px)': {
            maxWidth: '100%',
            flex: '1 1 100%',
        },
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
        overflow: 'hidden',
        borderRadius: 2,
    },
    galleryControls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        '@media (max-width:480px)': {
            gap: 1,
        },
    },
    galleryButton: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: 1,
        color: '#333',
        transition: 'transform 0.2s ease',
        '&:hover': {
            transform: 'scale(1.2)',
        },
        '@media (max-width:480px)': {
            fontSize: '1rem',
            padding: 0.5,
        },
    },
    galleryIndex: {
        fontWeight: 600,
        minWidth: 64,
        textAlign: 'center',
    },
    zoomOut: {
        maxWidth: '100%',
        maxHeight: '70vh',
        width: 'auto',
        height: 'auto',
        display: 'block',
        borderRadius: 2,
        userSelect: 'none',
        objectFit: 'contain',
    },
    zoomed: {
        width: '100%',
        objectFit: 'contain',
        userSelect: 'none',
        borderRadius: 0,
    },
};

export default styles;