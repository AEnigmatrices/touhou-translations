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
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
        },
        '@media (max-width:768px)': {
            flexDirection: 'column',
            padding: 2
        }
    }
};

export default styles;