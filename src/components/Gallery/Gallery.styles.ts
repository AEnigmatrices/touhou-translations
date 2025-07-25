import type { SxProps, Theme } from '@mui/material/styles';

interface GalleryStyles {
    grid: SxProps<Theme>;
    item: SxProps<Theme>;
}

const styles: GalleryStyles = {
    grid: {
        columnCount: 3,
        columnGap: '1.25rem',
        width: '100%',
        '@media (max-width:1024px)': {
            columnCount: 2,
        },
        '@media (max-width:768px)': {
            columnCount: 1,
        },
    },
    item: {
        breakInside: 'avoid',
        marginBottom: '1.25rem',
        borderRadius: 1,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        display: 'block',
        willChange: 'transform, box-shadow',
        '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        },
        '&:focus-visible': {
            outline: '2px solid #005fcc',
            outlineOffset: '2px',
        },
    },
};

export default styles;