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
    redditUrl?: string | null;
}

const baseUrl = import.meta.env.BASE_URL;
const isDev = import.meta.env.MODE === 'development';


const MenuButtons: FC<Props> = ({ prevPostId, nextPostId, urls = [], redditUrl }) => {

    const extractRedditId = (url?: string | null): string | null => {
        if (!url) return null;
        const match = url.match(/comments\/([a-z0-9]+)/i);
        return match ? match[1] : null;
    };

    const downloadFile = async (url: string, filename: string) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${url} (status: ${res.status})`);

            const blob = await res.blob();
            const link = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);

            link.href = objectUrl;
            link.download = filename;
            link.click();

            URL.revokeObjectURL(objectUrl);
        } catch (err) {
            console.error('Download error:', err);
        }
    };

    const handleDownload = useCallback(async () => {
        if (!urls.length) return;

        const redditId = extractRedditId(redditUrl) || 'image';

        await Promise.all(
            urls.map((url, index) => {
                const sequenceSuffix = urls.length > 1 ? `-${index + 1}` : '';
                const extension = url.split('.').pop() || 'jpg';
                const filename = `${redditId}${sequenceSuffix}.${extension}`;
                return downloadFile(url, filename);
            })
        );
    }, [urls, redditUrl]);

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
