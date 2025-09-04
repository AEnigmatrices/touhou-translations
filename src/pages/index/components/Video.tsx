import { Paper, Typography } from '@mui/material';
import type { JSX } from 'react';
import styles from '../styles/Video.styles';

const Video = (): JSX.Element => {
    return (
        <Paper sx={styles.videoContainer}>
            <Typography variant="h6" color="text.primary" sx={styles.title}>
                Featured Video
            </Typography>

            <div style={styles.videoWrapper}>
                <iframe
                    src="https://www.youtube-nocookie.com/embed/Gfev_ZEBRNk"
                    title="Featured Video"
                    style={styles.iframe}
                    allowFullScreen
                ></iframe>
            </div>
        </Paper>
    );
};

export default Video;