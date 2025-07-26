import type { SxProps, Theme } from '@mui/material';

const styles = {
    containerBox: {
        maxWidth: 900,
        mx: 'auto',
        p: 3
    } as SxProps<Theme>,

    inputBoxSmall: {
        flex: '1 1 220px',
        minWidth: 220
    } as SxProps<Theme>,

    actionButton: {
        minWidth: 150
    } as SxProps<Theme>
};

export default styles;