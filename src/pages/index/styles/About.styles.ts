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
        borderRadius: { xs: 0, md: 2 },
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: 'background.paper',
    },

    aboutText: {
        textAlign: { xs: 'center', md: 'left' }
    },

};

export default styles;