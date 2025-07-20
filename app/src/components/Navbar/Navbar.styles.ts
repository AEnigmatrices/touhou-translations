import type { SxProps, Theme } from '@mui/material/styles';

export const appBarSx: SxProps<Theme> = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1100,
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
};

export const toolbarSx: SxProps<Theme> = {
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
    justifyContent: 'flex-start',
    paddingY: 1.5,
};

export const titleSx: SxProps<Theme> = {
    flexGrow: 1,
    color: '#333',
    textDecoration: 'none',
    fontWeight: 'bold',
};

export const drawerBoxSx: SxProps<Theme> = {
    width: 250,
};

export const tabContainerSx: SxProps<Theme> = {
    minHeight: 48,
};

export const tabSx = (active: boolean): SxProps<Theme> => ({
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
});
