import { Paper, Typography } from '@mui/material';
import type { JSX } from 'react';

const Video = (): JSX.Element => {
    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3, boxShadow: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                Featured Video
            </Typography>

            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                    src="https://www.youtube.com/embed/Gfev_ZEBRNk"
                    title="Featured Video"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </Paper>
    );
};

export default Video;