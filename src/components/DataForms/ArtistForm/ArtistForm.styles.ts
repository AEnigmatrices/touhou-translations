import type { SxProps, Theme } from '@mui/material';

const styles = {
    containerBox: {
        maxWidth: 600,
        mx: 'auto',
        p: 3
    } as SxProps<Theme>,

    artistIdBox: {
        flex: '1 1 220px',
        minWidth: 220
    } as SxProps<Theme>,

    nameBox: {
        flex: '1 1 220px',
        minWidth: 220
    } as SxProps<Theme>,

    twitterBox: {
        flex: '1 1 260px',
        minWidth: 260
    } as SxProps<Theme>,

    pixivBox: {
        flex: '1 1 260px',
        minWidth: 260
    } as SxProps<Theme>,

    submitButton: {
        minWidth: 150
    } as SxProps<Theme>
};

export default styles;