import type { SxProps, Theme } from '@mui/material';

interface Styles {
    root: SxProps<Theme>;
}

const styles: Styles = {
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
        backgroundColor: (theme: Theme) => theme.palette.background.paper,
        py: 0.5,
        zIndex: (theme: Theme) => theme.zIndex.appBar,
        backdropFilter: 'blur(10px)',
        transition: 'background-color 0.3s ease',
    },
};

export default styles;