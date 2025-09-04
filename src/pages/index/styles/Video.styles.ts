import type { SxProps } from '@mui/material/styles';

interface Styles {
    videoContainer: SxProps;
    title: SxProps;
    videoWrapper: React.CSSProperties;
    iframe: React.CSSProperties;
}

const styles: Styles = {
    videoContainer: {
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: 'background.paper',
    },
    title: {
        mb: 2,
    },
    videoWrapper: {
        position: 'relative',
        paddingTop: '56.25%',
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0,
    },
};

export default styles;