import type { SxProps, Theme } from '@mui/material/styles';

interface StaticStyles {
    card: SxProps<Theme>;
    imageWrapper: SxProps<Theme>;
    image: SxProps<Theme>;
    loadingWrapper: SxProps<Theme>;
    errorText: SxProps<Theme>;
}

interface DynamicStyles {
    title: (theme: Theme) => SxProps<Theme>;
}

type Styles = StaticStyles & DynamicStyles;

const styles: Styles = {

    card: {
        width: '100%',
        maxWidth: 960,
        p: 2,
    },

    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },

    image: {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: 2,
    },

    loadingWrapper: {
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
    },

    errorText: {
        mt: 4,
    },

    title: (theme: Theme) => ({
        color: theme.palette.text.secondary,
        fontWeight: 500,
        mb: 2,
    }),
};

export default styles;