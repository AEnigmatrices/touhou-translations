import type { SxProps } from '@mui/material/styles';

interface InfoSectionStyles {
    root: SxProps;
    infoGrid: SxProps;
    infoItemLabel: SxProps;
    infoItemLabelComment: SxProps;
    infoItemValue: SxProps;
    infoItemValueComment: SxProps;
    infoIcons: SxProps;
    infoIconsLabel: SxProps;
    iconButton: SxProps;
    sourceLink: SxProps;
    sourceContainer: SxProps;
    seeMoreContainer: SxProps;
    seeMoreTitle: SxProps;
    seeMoreArtistName: SxProps;
    seeMoreGrid: SxProps;
    seeMoreImage: SxProps;
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        lineHeight: 1.6,
        '@media (max-width:480px)': {
            whiteSpace: 'normal',
        }
    },

    infoItemLabelComment: {
        display: 'flex',
        gap: 2,
        textAlign: 'left',
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '-0.75rem',
        alignItems: 'center',
        '@media (max-width:480px)': {
            fontSize: '1.1rem',
        }
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
        lineHeight: 1.6,
        '@media (max-width:480px)': {
            fontSize: '1rem',
        }
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

    sourceContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
        '@media (max-width:480px)': {
            gap: 0.5,
        }
    },

    seeMoreContainer: {
        mt: 3
    },

    seeMoreTitle: {
        fontWeight: 600,
        fontSize: '1.1rem',
        mb: 4
    },

    seeMoreArtistName: {
        fontWeight: 700,
        ml: 2
    },

    seeMoreGrid: {
        display: 'flex',
        justifyContent: 'center'
    },

    seeMoreImage: {
        width: 160,
        height: 160,
        borderRadius: 2,
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'scale(1.05)' }
    }

};

export default styles;