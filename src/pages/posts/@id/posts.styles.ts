import type { SxProps, Theme } from '@mui/material/styles';

interface Styles {
    root: SxProps<Theme>;
}

const styles: Styles = {
    root: {
        display: 'flex',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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