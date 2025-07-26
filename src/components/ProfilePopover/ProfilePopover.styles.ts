import type { SxProps, Theme } from '@mui/material/styles';

const getPopoverStyles = (visible: boolean, position: { x: number; y: number }): SxProps<Theme> => ({
    position: 'fixed',
    top: position.y,
    left: position.x,
    zIndex: 9999,
    padding: 0.5,
    pointerEvents: 'auto',
    maxWidth: 320,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
});

export default getPopoverStyles;