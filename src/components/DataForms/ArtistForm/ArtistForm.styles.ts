import type { SxProps, Theme } from '@mui/material';

interface Styles {
    containerBox: SxProps<Theme>;
    artistIdBox: SxProps<Theme>;
    nameBox: SxProps<Theme>;
    twitterBox: SxProps<Theme>;
    pixivBox: SxProps<Theme>;
    submitButton: SxProps<Theme>;
}

const styles: Styles = {
    containerBox: {
        maxWidth: 600,
        mx: 'auto',
        p: 3,
    },
    artistIdBox: {
        flex: '1 1 220px',
        minWidth: 220,
    },
    nameBox: {
        flex: '1 1 220px',
        minWidth: 220,
    },
    twitterBox: {
        flex: '1 1 260px',
        minWidth: 260,
    },
    pixivBox: {
        flex: '1 1 260px',
        minWidth: 260,
    },
    submitButton: {
        minWidth: 150,
    },
};

export default styles;