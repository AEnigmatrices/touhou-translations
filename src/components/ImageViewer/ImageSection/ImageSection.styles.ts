import type { SxProps, Theme } from '@mui/material/styles';

interface ImageSectionStyles {
    root: SxProps<Theme>;
    imageDisplay: SxProps<Theme>;
    image: SxProps<Theme>;
    galleryControls: SxProps<Theme>;
    galleryButton: SxProps<Theme>;
    galleryIndex: SxProps<Theme>;
}

const styles: ImageSectionStyles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    imageDisplay: {
        maxWidth: 600,
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.03)'
        },
        '&:active': {
            transform: 'scale(0.97)'
        },
        '@media (max-width:768px)': {
            maxWidth: '100%',
            flex: '1 1 100%'
        },
        '@media (max-width:480px)': {
            maxWidth: '100%',
            maxHeight: '50vh',
            overflow: 'hidden'
        }
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: 2,
        cursor: 'zoom-in',
        '@media (max-width:480px)': {
            maxHeight: '100%',
            objectFit: 'contain'
        }
    },
    galleryControls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        '@media (max-width:480px)': {
            gap: 1
        }
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
            transform: 'scale(1.2)'
        },
        '@media (max-width:480px)': {
            fontSize: '1rem',
            padding: 0.5
        }
    },
    galleryIndex: {
        fontWeight: 600,
        minWidth: 64,
        textAlign: 'center'
    }
};

export default styles;