import type { SxProps } from '@mui/material/styles';

interface Styles {
    container: SxProps;
    button: SxProps;
}

const styles: Styles = {

    container: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 3,
        gap: 2,
        flexWrap: 'wrap',
    },

    button: {
        minWidth: 120,
        px: 3,
        py: 1.5,
        fontWeight: 500,
        textTransform: 'none',
        transition: 'all 0.3s ease',
        color: 'white',
        backgroundColor: 'primary.main',
        '&:hover': {
            backgroundColor: 'primary.dark',
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
        },
        '&.Mui-disabled': {
            backgroundColor: 'grey.300',
            color: 'grey.600',
        },
    },

};

export default styles;