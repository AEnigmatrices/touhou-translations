import type { SxProps, Theme } from '@mui/material/styles';

export const switchSlotProps = {
    input: { 'aria-label': 'Toggle gallery only' }
};

export const containerStyles: SxProps<Theme> = {
    pt: 4,
    pb: 4,
    px: { xs: 1, sm: 2 },
    margin: '0 auto',
};

export const headerWrapperStyles: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    pb: 2,
    mb: { xs: 2, sm: 4 },
    px: { xs: 1, sm: 0 },
    gap: 2,
};

export const galleryHeaderBoxStyles: SxProps<Theme> = {
    maxWidth: 300,
    width: '100%',
    flexShrink: 0,
};

export const switchLabelStyles = (theme: Theme): SxProps<Theme> => ({
    ml: 2,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    userSelect: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': { color: theme.palette.text.primary },
});

export const loaderBoxStyles: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    py: 2,
};