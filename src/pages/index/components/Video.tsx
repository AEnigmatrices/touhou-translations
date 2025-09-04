import { Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import type { JSX } from 'react';
import styles from '../styles/Video.styles';

const Video = (): JSX.Element => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper sx={{ ...styles.videoContainer, maxWidth: isMobile ? '100%' : 800, mx: 'auto', p: 0, }}  >
            <Typography variant="h6" color="text.primary" sx={styles.title}>
                Featured Video
            </Typography>

            <div style={styles.videoWrapper}>
                <iframe
                    src="https://www.youtube-nocookie.com/embed/Gfev_ZEBRNk"
                    title="Featured Video"
                    style={styles.iframe}
                    allowFullScreen
                />
            </div>
        </Paper>
    );
};

export default Video;