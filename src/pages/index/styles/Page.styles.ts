import type { SxProps } from '@mui/material/styles';

interface Styles {
    container: SxProps;
}

const styles: Styles = {
    container: {
        px: { xs: 0 },
        mt: { xs: 2, md: 4 },
        mb: { xs: 2, md: 4 },
    }
};

export default styles;