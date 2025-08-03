import type { SxProps, Theme } from '@mui/material/styles';

interface ImageViewerStyles {
    root: SxProps<Theme>;
}

const styles: ImageViewerStyles = {
    root: {
        display: 'flex',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        padding: 3,
        backgroundColor: '#fafafa',
        borderRadius: 3,
        '@media (max-width:768px)': {
            flexDirection: 'column',
            padding: 2
        }
    }
};

export default styles;