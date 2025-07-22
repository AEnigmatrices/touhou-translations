import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
    adminContainer: {
        m: 4,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 3
    } as SxProps<Theme>,

    header: {
        mb: 3,
        color: 'primary.main',
        fontWeight: 600
    } as SxProps<Theme>,

    contentTitle: (theme: Theme): SxProps<Theme> => ({
        mb: 2,
        pb: 1,
        borderBottom: `2px solid ${theme.palette.primary.light}`,
        color: 'primary.main'
    }),

    siteUtilitiesTitle: (theme: Theme): SxProps<Theme> => ({
        mb: 3,
        pb: 1,
        borderBottom: `2px solid ${theme.palette.primary.light}`,
        color: 'primary.main'
    }),

    paperFullHeight: {
        p: 3,
        height: '100%'
    } as SxProps<Theme>,

    accordionMargin: {
        mb: 2
    } as SxProps<Theme>
};

export default styles;