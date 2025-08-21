import type { SxProps, Theme } from '@mui/material/styles';

interface Styles {
    card: SxProps;
    imageWrapper: SxProps;
    image: SxProps;
    loadingWrapper: SxProps;
    errorText: SxProps;
    title: SxProps<Theme>;
}

const styles: Styles = {

    card: {
        width: '100%',
        maxWidth: 960,
        p: { xs: 2, sm: 3 },
        mx: 'auto',
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: 'background.paper',
    },

    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 960,
        height: 540,
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
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },

    loadingWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },

    errorText: {
        color: 'error.main',
        textAlign: 'center',
        mt: 4,
        px: 2,
    },

    title: (theme) => ({
        color: theme.palette.text.secondary,
        fontWeight: 600,
        mb: 4.5,
        textAlign: 'center',
    }),

};

export default styles;