import type { SxProps, Theme } from '@mui/material/styles';

export const switchSlotProps = {
    input: { 'aria-label': 'Toggle gallery only' }
};

export const containerStyles = (theme: Theme): SxProps<Theme> => ({
    pt: theme.spacing(4),
    pb: theme.spacing(4),
    px: { xs: theme.spacing(1), sm: theme.spacing(2) },
    margin: '0 auto'
});

export const headerWrapperStyles = (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    pb: theme.spacing(2),
    mb: { xs: theme.spacing(2), sm: theme.spacing(4) },
    px: { xs: theme.spacing(1), sm: 0 },
    gap: theme.spacing(2)
});

export const galleryHeaderBoxStyles = (theme: Theme): SxProps<Theme> => ({
    maxWidth: theme.spacing(37.5),
    width: '100%',
    flexShrink: 0,
    listStyle: 'none',
    padding: 0,
    margin: 0
});

export const switchLabelStyles = (theme: Theme): SxProps<Theme> => ({
    ml: theme.spacing(2),
    fontWeight: 500,
    color: theme.palette.text.secondary,
    userSelect: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: theme.transitions.create('color', { duration: theme.transitions.duration.short }),
    '&:hover': { color: theme.palette.text.primary }
});

export const loaderBoxStyles = (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'center',
    py: theme.spacing(2)
});
