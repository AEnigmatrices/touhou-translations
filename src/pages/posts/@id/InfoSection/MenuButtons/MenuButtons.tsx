import { useCallback, useEffect } from 'react';
import { navigate } from 'vike/client/router';
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

    const handleDownload = useCallback(async () => {
        if (urls.length > 0) await Promise.all(urls.map(downloadFile));
    }, [urls]);

    const handlePrev = useCallback(() => {
        if (prevPostId) navigate(`${baseUrl}posts/${prevPostId}/`);
    }, [prevPostId]);

    const handleNext = useCallback(() => {
        if (nextPostId) navigate(`${baseUrl}posts/${nextPostId}/`);
    }, [nextPostId]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement).tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || e.ctrlKey || e.metaKey || e.altKey) return;

            switch (e.key.toLowerCase()) {
                case 'a':
                    handlePrev();
                    break;
                case 'd':
                    handleNext();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext, handleDownload]);

    return (
        <Box sx={styles.container}>
            <Button
                onClick={handlePrev}
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
                onClick={handleNext}
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
