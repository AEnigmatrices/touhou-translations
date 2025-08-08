import type { SxProps, Theme } from '@mui/material/styles';

interface StaticStyles {
    adminContainer: SxProps<Theme>;
    header: SxProps<Theme>;
    paperFullHeight: SxProps<Theme>;
    accordionMargin: SxProps<Theme>;
}

interface DynamicStyles {
    contentTitle: (theme: Theme) => SxProps<Theme>;
}

type Styles = StaticStyles & DynamicStyles;

const styles: Styles = {
    adminContainer: {
        m: 4,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 3,
    },

    header: {
        mb: 3,
        color: 'primary.main',
        fontWeight: 600,
    },

    contentTitle: (theme: Theme) => ({
        mb: 2,
        pb: 1,
        borderBottom: `2px solid ${theme.palette.primary.light}`,
        color: 'primary.main',
    }),

    paperFullHeight: {
        p: 3,
        height: '100%',
    },

    accordionMargin: {
        mb: 2,
    },
};

export default styles;