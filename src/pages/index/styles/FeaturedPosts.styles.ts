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
        flex: '0 0 auto',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        transition: 'transform 0.25s ease, box-shadow 0.3s ease',
        aspectRatio: { xs: '4 / 3', md: '1 / 1' },
        '&:hover': {
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
        },
        '&:focus-visible': {
            outline: '2px solid #005fcc',
            outlineOffset: 2,
        },
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
        opacity: 0,
        transition: 'opacity 0.5s ease-in-out',
    },
};

export default styles;
