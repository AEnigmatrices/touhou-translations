import type { SxProps, Theme } from '@mui/material/styles';

interface InfoSectionStyles {
    root: SxProps<Theme>;
    infoGrid: SxProps<Theme>;
    infoItemLabel: SxProps<Theme>;
    infoItemLabelComment: SxProps<Theme>;
    infoItemValue: SxProps<Theme>;
    infoItemValueComment: SxProps<Theme>;
    infoIcons: SxProps<Theme>;
    infoIconsLabel: SxProps<Theme>;
    iconButton: SxProps<Theme>;
    sourceLink: SxProps<Theme>;
    characterLink: SxProps<Theme>;
    charactersWrapper: SxProps<Theme>;
    characterChip: SxProps<Theme>;
}

const styles: InfoSectionStyles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 600,
        color: '#333',
        alignItems: 'stretch'
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '0.5rem 1rem',
        '@media (max-width:768px)': {
            gridTemplateColumns: '1fr'
        }
    },
    infoItemLabel: {
        color: '#222',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        lineHeight: 1.6
    },
    infoItemLabelComment: {
        display: 'flex',
        gap: 2,
        textAlign: 'left',
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '-0.75rem',
        alignItems: 'center'
    },
    infoItemValue: {
        display: 'flex',
        gap: 3,
        '@media (max-width:480px)': {
            flexWrap: 'wrap',
            gap: 1
        }
    },
    infoItemValueComment: {
        textAlign: 'left',
        fontSize: '1.05rem',
        lineHeight: 1.6
    },
    infoIcons: {
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap'
    },
    infoIconsLabel: {
        alignItems: 'center'
    },
    iconButton: {
        p: 0,
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, filter 0.15s ease',
        '& img': {
            width: 24,
            height: 24,
            borderRadius: 1,
            transition: 'inherit',
            display: 'block'
        },
        '&:hover img': {
            transform: 'scale(1.1)',
            filter: 'brightness(1.1)'
        },
        '&:active img': {
            transform: 'scale(0.95)',
            filter: 'brightness(0.9)'
        }
    },
    sourceLink: {
        color: '#0066cc',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        maxWidth: '100%',
        textAlign: 'left',
        '&:hover': {
            textDecoration: 'underline'
        },
        '@media (max-width:480px)': {
            whiteSpace: 'normal',
            wordBreak: 'break-word'
        }
    },
    characterLink: {
        color: '#0066cc',
        textDecoration: 'none',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        transition: 'color 0.2s ease, text-decoration 0.2s ease',
        '&:hover, &:focus': {
            color: '#004999',
            textDecoration: 'underline'
        },
        '&:active': {
            color: '#003366'
        }
    },
    charactersWrapper: {
        display: 'inline',
        textAlign: 'left'
    },
    characterChip: {
        fontWeight: 500,
        color: '#0066cc',
        borderColor: '#0066cc',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: '#e6f0ff',
            color: '#004999',
            borderColor: '#004999',
        },
        '&:active': {
            backgroundColor: '#cce0ff',
            color: '#003366',
            borderColor: '#003366',
        },
        '& .MuiChip-label': {
            paddingLeft: 6,
            paddingRight: 6,
        },
    }
};

export default styles;