import type { SxProps } from '@mui/material/styles';

export const paginationWrapperStyles: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    mt: { xs: 3, sm: 4 },
    px: 1,
    width: '100%',
    overflowX: 'auto',
};

export const paginationStyles: SxProps = {
    '& .MuiPagination-ul': {
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 1.5,
    },
    '& .MuiPaginationItem-root': {
        fontWeight: 600,
        fontSize: { xs: '0.85rem', sm: '1rem' },
        minWidth: { xs: 36, sm: 44 },
        height: { xs: 36, sm: 44 },
        borderRadius: 4,
        border: '1px solid divider',
        transition: 'background-color 200ms, box-shadow 200ms',
        '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            border: '1px solid primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
        },
        '&:hover': { backgroundColor: 'action.hover' },
        '&:focus-visible': { outline: '2px solid primary.main', outlineOffset: 2 },
    },
};