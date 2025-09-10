import type { SxProps } from '@mui/material/styles';

export const switchSlotProps = { input: { 'aria-label': 'Toggle gallery only' } };

export const switchLabelStyles: SxProps = {
    ml: 2,
    fontWeight: 500,
    color: 'text.secondary',
    userSelect: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 200ms',
    '&:hover': { color: 'text.primary' },
};