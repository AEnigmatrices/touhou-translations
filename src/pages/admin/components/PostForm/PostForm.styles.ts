import type { SxProps, Theme } from '@mui/material';

interface PostFormStyles {
    containerBox: SxProps<Theme>;
    inputBoxSmall: SxProps<Theme>;
    actionButton: SxProps<Theme>;
    imagePreviewContainer: SxProps<Theme>;
    imageBox: SxProps<Theme>;
    previewImage: SxProps<Theme>;
}

const styles: PostFormStyles = {
    containerBox: {
        maxWidth: 900,
        mx: 'auto',
        p: 3
    },

    inputBoxSmall: {
        flex: '1 1 220px',
        minWidth: 220
    },

    actionButton: {
        minWidth: 150
    },

    imagePreviewContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mt: 2,
    },

    imageBox: {
        border: '1px solid #ccc',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 1,
    },

    previewImage: {
        maxWidth: '150px',
        maxHeight: '150px',
        objectFit: 'contain',
        display: 'block',
    },
};

export default styles;