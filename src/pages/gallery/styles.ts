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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: theme.spacing(4), sm: theme.spacing(4) },
        mt: { xs: theme.spacing(3), sm: theme.spacing(4) },
        px: theme.spacing(1),
        width: '100%',
        overflowX: 'auto',
    }),

    paginationButtonStyles: (theme: Theme): SxProps<Theme> => ({
        minWidth: { xs: 80, sm: 110 },
        fontSize: { xs: '0.9rem', sm: '1.05rem' },
        padding: {
            xs: theme.spacing(1, 2),
            sm: theme.spacing(1.5, 3),
        },
        borderRadius: (theme.shape.borderRadius as number) * 2,
        textTransform: 'none',
        fontWeight: 700,
        whiteSpace: 'nowrap',
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
        fontSize: { xs: '0.95rem', sm: '1.1rem' },
        color: theme.palette.text.primary,
        userSelect: 'none',
        minWidth: { xs: 80, sm: 100 },
        textAlign: 'center',
        whiteSpace: 'nowrap',
    }),

};

export default styles;