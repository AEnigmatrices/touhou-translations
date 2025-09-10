import type { SxProps } from '@mui/material/styles';

export const headerWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    pb: 2,
    mb: { xs: 2, sm: 4 },
    px: { xs: 1, sm: 0 },
    gap: 2,
};

export const galleryHeaderBoxStyles: SxProps = {
    maxWidth: 300,
    width: '100%',
    flexShrink: 0,
    listStyle: 'none',
    padding: 0,
    margin: 0,
};