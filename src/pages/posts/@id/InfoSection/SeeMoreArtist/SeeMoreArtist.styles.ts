import type { SxProps } from '@mui/material/styles';
import type { CSSProperties } from 'react';

interface Styles {
    seeMoreContainer: SxProps;
    seeMoreTitle: SxProps;
    seeMoreArtistName: SxProps;
    seeMoreGrid: SxProps;
    seeMoreImage: SxProps;
    imageStyle: CSSProperties;
    loaderWrapper: SxProps;
    unloaderWrapper: SxProps;
    unloaderText: SxProps;
}

const styles: Styles = {
    seeMoreContainer: { mt: 3 },
    seeMoreTitle: { fontWeight: 600, fontSize: '1.1rem', mb: 4 },
    seeMoreArtistName: { fontWeight: 700, ml: 2 },
    seeMoreGrid: { display: 'flex', justifyContent: 'center', width: 160, height: 160 },
    seeMoreImage: {
        width: 160,
        height: 160,
        borderRadius: 2,
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'scale(1.05)' },
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    loaderWrapper: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unloaderWrapper: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unloaderText: {
        color: '#999',
        fontSize: '0.9rem',
        textAlign: 'center',
    },
};

export default styles;