import type { SxProps, Theme } from '@mui/material';

const styles = {
    containerBox: {
        maxWidth: 800,
        mx: 'auto',
        p: 3
    } as SxProps<Theme>,

    titleTypography: {
        mb: 2
    } as SxProps<Theme>,

    generateButton: {
        mx: 'auto',
        display: 'block'
    } as SxProps<Theme>,

    downloadButton: {
        mx: 'auto',
        display: 'block'
    } as SxProps<Theme>,

    stackSpacing: 2
};

export default styles;