import { Button, Box } from '@mui/material';
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import DownloadIcon from '@mui/icons-material/Download';
import styles from './MenuButtons.styles';
import type { FC } from 'react';

interface Props {
    prevPostId: string | null;
    nextPostId: string | null;
    urls?: string[];
}

const baseUrl = import.meta.env.BASE_URL;
const isDev = import.meta.env.MODE === 'development';


const MenuButtons: FC<Props> = ({ prevPostId, nextPostId, urls = [] }) => {

    const downloadFile = async (url: string) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${url} (status: ${res.status})`);

            const blob = await res.blob();
            const link = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);

            link.href = objectUrl;
            link.download = url.split('/').pop() || 'file';
            link.click();

            URL.revokeObjectURL(objectUrl);
        } catch (err) {
            console.error('Download error:', err);
        }
    };

    const handleDownload = async () => await Promise.all(urls.map(downloadFile));


    return (
        <Box sx={styles.container}>
            <Button
                component="a"
                href={prevPostId ? `${baseUrl}posts/${prevPostId}/` : undefined}
                variant="contained"
                disabled={!prevPostId}
                startIcon={<ArrowBack />}
                sx={styles.button}
            >
                Previous
            </Button>

            {isDev && urls.length > 0 && (
                <Button
                    variant="contained"
                    onClick={handleDownload}
                    startIcon={<DownloadIcon />}
                    sx={styles.downloadButton}
                >
                    Download
                </Button>
            )}

            <Button
                component="a"
                href={nextPostId ? `${baseUrl}posts/${nextPostId}/` : undefined}
                variant="contained"
                disabled={!nextPostId}
                endIcon={<ArrowForward />}
                sx={styles.button}
            >
                Next
            </Button>
        </Box>
    );
};

export default MenuButtons;