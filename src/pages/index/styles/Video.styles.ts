import type { SxProps } from '@mui/material/styles';

interface Styles {
    videoContainer: SxProps;
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
};

export default styles;