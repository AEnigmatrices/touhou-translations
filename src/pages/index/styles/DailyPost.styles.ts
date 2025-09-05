import type { CSSProperties } from 'react';
import type { SxProps } from '@mui/material/styles';

interface Styles {
    card: SxProps;
    imageWrapper: SxProps;
    image: CSSProperties;
    errorText: SxProps;
}

const styles: Styles = {

    card: {
        width: '100%',
        maxWidth: 960,
        p: 0,
        mx: 'auto',
        borderRadius: { xs: 0, md: 3 },
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: 'background.paper',
    },

    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 960,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        mt: 2,
    },

    image: {
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: 2,
        objectFit: 'cover',
    },

    errorText: {
        color: 'error.main',
        textAlign: 'center',
        mt: 4,
        px: 2,
    },

};

export default styles;