import { styled } from '@mui/material/styles';
import { SpeedDial, SpeedDialAction } from '@mui/material';

export const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    '& .MuiSpeedDial-fab': {
        width: 72,
        height: 72,
        boxShadow: theme.shadows[8],
        transition: 'all 0.3s ease-in-out',
        border: `2px solid ${theme.palette.background.paper}`,
        backgroundColor: theme.palette.background.paper,

        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: theme.shadows[12],
        },

        '& .MuiAvatar-root': {
            width: 64,
            height: 64,
            border: '2px solid white',
        }
    }
}));

export const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
    '& .MuiSpeedDialAction-fab': {
        width: 60,
        height: 60,
        boxShadow: theme.shadows[4],
        transition: 'all 0.2s ease-in-out',
        backgroundColor: theme.palette.background.paper,

        '&:hover': {
            transform: 'scale(1.15)',
            boxShadow: theme.shadows[8],
        }
    },

    '& .MuiAvatar-root': {
        width: 52,
        height: 52,
        transition: 'all 0.2s ease-in-out',
    },

    '& .MuiTooltip-tooltip': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[4],
        fontSize: '0.875rem',
        fontWeight: 500,
        borderRadius: theme.shape.borderRadius,
        whiteSpace: 'nowrap',
        maxWidth: 'none',
    }
}));