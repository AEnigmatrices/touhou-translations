import type { SxProps } from '@mui/material/styles';

interface Styles {
    aboutContainer: SxProps;
    aboutText: SxProps;
}

const styles: Styles = {

    aboutContainer: {
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: 'background.paper',
    },

    aboutText: {
        textAlign: { xs: 'center', md: 'left' }
    },

};

export default styles;