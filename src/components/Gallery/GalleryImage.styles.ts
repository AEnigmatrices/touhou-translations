import type { SxProps } from '@mui/material/styles';
import type { CSSProperties } from 'react';

interface Styles {
    wrapper: SxProps;
    image: CSSProperties;
}

const styles: Styles = {
    wrapper: { position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 1 },

    image: {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
        transition: 'opacity 0.3s ease, filter 0.3s ease',
    },

};

export default styles;