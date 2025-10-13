import type { CSSProperties } from 'react';
import type { SxProps } from '@mui/material/styles';

interface Styles {
    card: SxProps;
    item: SxProps;
    imageWrapper: SxProps;
    wrapper: SxProps;
    image: CSSProperties;
}

const styles: Styles = {
    card: {
        width: '100%',
        maxWidth: 960,
        mx: 'auto',
        p: 2,
        borderRadius: { xs: 0, md: 3 },
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: 'background.paper',
    },

    item: {
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
            outlineOffset: 2,
        },
        aspectRatio: '1 / 1',
    },

    imageWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },

    wrapper: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 1,
    },

    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transition: 'opacity 0.3s ease, filter 0.3s ease',
    },
};

export default styles;
