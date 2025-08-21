import { Paper, Typography } from '@mui/material';
import styles from './About.styles';
import type { JSX } from 'react';

const About = (): JSX.Element => {
    return (
        <Paper sx={styles.aboutContainer}>
            <Typography variant="h6" color="text.primary">
                About This Site
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={styles.aboutText}>
                This website is a personal archive and viewer for Touhou Project fan comics
                and illustrations that I have translated into English and posted on r/touhou.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={styles.aboutText}>
                Honestly, I just want to have a convenient way to browse the artworks that I have already translated.
            </Typography>
        </Paper>
    );
};

export default About;