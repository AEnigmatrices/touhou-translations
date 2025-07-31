import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
    appBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1100,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    } as SxProps<Theme>,

    toolbar: {
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        justifyContent: 'flex-start',
        paddingY: 1.5,
    } as SxProps<Theme>,

    title: (theme: Theme): SxProps<Theme> => ({
        flexGrow: 1,
        color: theme.palette.text.primary,
        textDecoration: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
    }),

    drawerBox: {
        width: 250,
    } as SxProps<Theme>,

    tabContainer: {
        minHeight: 48,
    } as SxProps<Theme>,

    tab: (active: boolean): SxProps<Theme> => ({
        textTransform: 'none',
        marginRight: 3,
        borderRadius: 1,
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            color: '#000',
        },
        '&:active': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        '&:last-of-type': {
            marginRight: 0,
        },
        minHeight: 48,
        fontWeight: 600,
        color: active ? '#1976d2' : '#333',
    }),
};

export default styles;
