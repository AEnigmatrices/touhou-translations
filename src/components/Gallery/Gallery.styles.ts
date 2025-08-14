import type { SxProps } from '@mui/material/styles';

interface Props {
    item: SxProps;
    imageWrapper: SxProps;
    loadingOverlay: SxProps;
}

const styles: Props = {
    item: {
        width: 200,
        height: 200,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        },
        '&:focus-visible': {
            outline: '2px solid #005fcc',
            outlineOffset: '2px',
        },
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    loadingOverlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        paddingTop: '1rem',
    },
};

export default styles;