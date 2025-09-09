import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';

interface Styles {
    switchSlotProps: { input: { 'aria-label': string } };
    containerStyles: SxProps;
    headerWrapperStyles: SxProps;
    galleryHeaderBoxStyles: SxProps;
    switchLabelStyles: SxProps;
    loaderBoxStyles: SxProps;
    paginationWrapperStyles: SxProps;
    paginationStyles: SxProps;
}

const useStyles = (): Styles => {
    const theme = useTheme();

    return {
        switchSlotProps: { input: { 'aria-label': 'Toggle gallery only' } },

        containerStyles: {
            pt: theme.spacing(4),
            pb: theme.spacing(4),
            px: { xs: theme.spacing(1), sm: theme.spacing(2) },
        },

        headerWrapperStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            pb: theme.spacing(2),
            mb: { xs: theme.spacing(2), sm: theme.spacing(4) },
            px: { xs: theme.spacing(1), sm: 0 },
            gap: theme.spacing(2),
        },

        galleryHeaderBoxStyles: {
            maxWidth: theme.spacing(37.5),
            width: '100%',
            flexShrink: 0,
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },

        switchLabelStyles: {
            ml: theme.spacing(2),
            fontWeight: 500,
            color: theme.palette.text.secondary,
            userSelect: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: theme.transitions.create('color', {
                duration: theme.transitions.duration.short,
            }),
            '&:hover': { color: theme.palette.text.primary },
        },

        loaderBoxStyles: {
            display: 'flex',
            justifyContent: 'center',
            py: theme.spacing(2),
        },

        paginationWrapperStyles: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: theme.spacing(4), sm: theme.spacing(4) },
            mt: { xs: theme.spacing(3), sm: theme.spacing(4) },
            px: theme.spacing(1),
            width: '100%',
            overflowX: 'auto',
        },

        paginationStyles: {
            '& .MuiPagination-ul': {
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: theme.spacing(1.5),
            },
            '& .MuiPaginationItem-root': {
                fontWeight: 600,
                fontSize: { xs: '0.85rem', sm: '1rem' },
                minWidth: { xs: theme.spacing(4.5), sm: theme.spacing(5.5) },
                height: { xs: theme.spacing(4.5), sm: theme.spacing(5.5) },
                borderRadius: theme.spacing(1),
                border: `1px solid ${theme.palette.divider}`,
                transition: theme.transitions.create(['background-color', 'box-shadow'], {
                    duration: theme.transitions.duration.short,
                }),
                '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    border: `1px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                },
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
                '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                },
            },
        },
    };
};

export default useStyles;