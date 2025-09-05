import type { CSSProperties } from 'react';
import type { SxProps } from '@mui/material/styles';

interface Styles {
    videoContainer: SxProps;
    title: SxProps;
    videoWrapper: CSSProperties;
    iframe: CSSProperties;
}

const styles: Styles = {
    videoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderTopLeftRadius: { xs: 0, md: 36 },
        borderTopRightRadius: 0,
        borderBottomLeftRadius: { xs: 0, md: 36 },
        borderBottomRightRadius: { xs: 0, md: 36 },
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: 'background.paper',
        width: '100%',
        overflow: 'hidden',
    },
    title: {
        textAlign: 'center',
        p: 2,
        pb: 0
    },
    videoWrapper: {
        position: 'relative',
        paddingTop: '56.25%',
        width: '100%',
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0,
    },
};

export default styles;