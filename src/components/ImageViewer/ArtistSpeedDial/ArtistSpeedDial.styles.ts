import type { SxProps, Theme } from '@mui/material/styles';

interface StaticStyles {
    container: SxProps<Theme>;
    innerWrapper: SxProps<Theme>;
    avatarWrapper: SxProps<Theme>;
    nameTag: SxProps<Theme>;
    speedDialFab: SxProps<Theme>;
    speedDialActionFab: SxProps<Theme>;
    tooltip: SxProps<Theme>;
    desktopContainer: SxProps<Theme>;
    desktopSpeedDial: SxProps<Theme>;
}

const styles: StaticStyles = {
    container: (theme: Theme) => ({
        position: 'fixed',
        bottom: 84,
        right: 16,
        zIndex: theme.zIndex.tooltip + 1,
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            bottom: 'auto',
            right: 'auto',
            zIndex: 'auto',
        },
    }),

    innerWrapper: (theme: Theme) => ({
        position: 'relative',
        width: 72,
        height: 72,
        overflow: 'visible',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(2),
        },
    }),

    avatarWrapper: (theme: Theme) => ({
        position: 'absolute',
        right: 0,
        bottom: 0,
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            right: 'auto',
            bottom: 'auto',
        },
    }),

    nameTag: (theme: Theme) => ({
        position: 'absolute',
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%) translateX(10px)',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 2),
        borderRadius: Number(theme.shape.borderRadius) * 2,
        boxShadow: theme.shadows[4],
        whiteSpace: 'nowrap',
        opacity: 0,
        pointerEvents: 'none',
        marginRight: theme.spacing(1),
        '&.MuiBox-root--open': {
            transform: 'translateY(-50%) translateX(0)',
            opacity: 1,
            pointerEvents: 'auto',
        },
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            top: 'auto',
            right: 'auto',
            transform: 'none',
            opacity: 1,
            pointerEvents: 'auto',
            margin: 0,
            boxShadow: 'none',
            padding: 0,
            backgroundColor: 'transparent',
        },
    }),

    speedDialFab: (theme: Theme) => ({
        width: 72,
        height: 72,
        boxShadow: theme.shadows[8],
        transition: 'all 0.3s ease-in-out',
        border: `2px solid ${theme.palette.background.paper}`,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: theme.shadows[12],
        },
        '& .MuiAvatar-root': {
            width: 64,
            height: 64,
            border: '2px solid white',
        },
        [theme.breakpoints.up('sm')]: {
            width: 48,
            height: 48,
            '& .MuiAvatar-root': {
                width: 40,
                height: 40,
                border: '1px solid white',
            },
        },
    }),

    speedDialActionFab: (theme: Theme) => ({
        width: 60,
        height: 60,
        boxShadow: theme.shadows[4],
        transition: 'all 0.2s ease-in-out',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            transform: 'scale(1.15)',
            boxShadow: theme.shadows[8],
        },
        [theme.breakpoints.up('sm')]: {
            width: 40,
            height: 40,
        },
    }),

    tooltip: (theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[4],
        fontSize: '0.875rem',
        fontWeight: 500,
        borderRadius: theme.shape.borderRadius,
        whiteSpace: 'nowrap',
        maxWidth: 'none',
    }),

    desktopContainer: (theme: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
    }),

    desktopSpeedDial: {
        '& .MuiSpeedDial-directionRight': {
            display: 'flex',
            alignItems: 'center',
        },
    },
};

export default styles;