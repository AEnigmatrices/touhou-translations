import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
    switchSlotProps: {
        input: { 'aria-label': 'Toggle gallery only' }
    },

    containerStyles: (theme: Theme): SxProps<Theme> => ({
        pt: theme.spacing(4),
        pb: theme.spacing(4),
        px: { xs: theme.spacing(1), sm: theme.spacing(2) },
        margin: '0 auto'
    }),

    headerWrapperStyles: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        pb: theme.spacing(2),
        mb: { xs: theme.spacing(2), sm: theme.spacing(4) },
        px: { xs: theme.spacing(1), sm: 0 },
        gap: theme.spacing(2)
    }),

    galleryHeaderBoxStyles: (theme: Theme): SxProps<Theme> => ({
        maxWidth: theme.spacing(37.5),
        width: '100%',
        flexShrink: 0,
        listStyle: 'none',
        padding: 0,
        margin: 0
    }),

    switchLabelStyles: (theme: Theme): SxProps<Theme> => ({
        ml: theme.spacing(2),
        fontWeight: 500,
        color: theme.palette.text.secondary,
        userSelect: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: theme.transitions.create('color', { duration: theme.transitions.duration.short }),
        '&:hover': { color: theme.palette.text.primary }
    }),

    loaderBoxStyles: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        justifyContent: 'center',
        py: theme.spacing(2)
    }),

    paginationWrapperStyles: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(4),
        mt: theme.spacing(4),
    }),

    paginationButtonStyles: (theme: Theme): SxProps<Theme> => ({
        minWidth: 110,
        fontSize: '1.1rem',
        padding: theme.spacing(1.75, 4),
        borderRadius: (theme.shape.borderRadius as number) * 2,
        textTransform: 'none',
        fontWeight: 700,
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        transition: theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.short,
        }),
        '&:hover:not(:disabled)': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        },
        '&:disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.text.disabled,
            pointerEvents: 'none',
            opacity: 0.6,
            boxShadow: 'none',
        },
        '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
        },
    }),

    paginationPageInfoStyles: (theme: Theme): SxProps<Theme> => ({
        fontWeight: 600,
        fontSize: '1.15rem',
        color: theme.palette.text.primary,
        userSelect: 'none',
        minWidth: 120,
        textAlign: 'center',
    }),
};

export default styles;