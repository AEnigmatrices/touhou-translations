import type { SxProps, Theme } from '@mui/material/styles';

interface CharacterChipsStyles {
    container: SxProps<Theme>;
    chip: SxProps<Theme>;
    toggleWrapper: SxProps<Theme>;
    toggle: SxProps<Theme>;
}

const styles: CharacterChipsStyles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1,
        textAlign: 'left',
        '@media (max-width:480px)': {
            gap: 0.5,
            justifyContent: 'center',
        }
    },
    chip: {
        padding: 2.5,
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        fontWeight: 600,
        color: '#004999',
        borderColor: '#004999',
        backgroundColor: '#e6f0ff',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minHeight: 36,
        '@media (max-width:480px)': {
            width: 'calc(50% - 4px)',
            maxWidth: '50%',
            flexGrow: 0,
            flexShrink: 0,
        },
        '&:hover': {
            backgroundColor: '#d0e4ff',
            color: '#003366',
            borderColor: '#003366',
        },
        '&:active': {
            backgroundColor: '#cce0ff',
            color: '#002244',
            borderColor: '#002244',
        },
        '& .MuiChip-label': {
            fontSize: '0.9rem',
            '@media (max-width:480px)': {
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }
        }
    },
    toggleWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: 1,
    },
    toggle: {
        fontWeight: 500,
        fontSize: '0.85rem',
        color: '#004999',
        borderColor: '#b0cfff',
        backgroundColor: '#f0f6ff',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: '#e0eeff',
            color: '#003366',
            borderColor: '#99bbff',
        },
        '&:active': {
            backgroundColor: '#d0e4ff',
            color: '#002244',
            borderColor: '#88aaff',
        },
        '@media (max-width:480px)': {
            mt: 1
        }
    },
};

export default styles;