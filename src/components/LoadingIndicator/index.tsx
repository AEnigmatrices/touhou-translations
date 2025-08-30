import { Box, CircularProgress } from '@mui/material';
import type { JSX } from 'react';

export const LoadingIndicator = (): JSX.Element => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}
    >
        <CircularProgress size={32} />
    </Box>
);

export default LoadingIndicator