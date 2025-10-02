import type { CSSProperties } from 'react';
import type { SxProps } from '@mui/material/styles';

interface Styles {
    aboutContainer: SxProps;
    header: SxProps;
    profileImage: SxProps;
    title: SxProps;
    aboutText: SxProps;
    redditLink: CSSProperties;
}

const styles: Styles = {
    aboutContainer: {
        p: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: { xs: 0, md: 3 },
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        backgroundColor: 'background.paper',
        maxWidth: 700,
        mx: 'auto',
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        pb: 2,
        mb: 2,
    },

    profileImage: {
        width: 64,
        height: 64,
        borderRadius: '50%',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    },

    title: {
        fontWeight: 600,
        letterSpacing: 0.5,
    },

    aboutText: {
        lineHeight: 1.7,
        textAlign: { xs: 'center', md: 'left' },
    },

    redditLink: {
        color: 'inherit',
        textDecoration: 'underline',
    },
};

export default styles;
