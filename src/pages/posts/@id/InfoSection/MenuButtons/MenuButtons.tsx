import { useCallback, useEffect } from 'react';
import { ArrowLeftIcon } from '@phosphor-icons/react/ArrowLeft';
import { ArrowRightIcon } from '@phosphor-icons/react/ArrowRight';
import { DownloadSimpleIcon } from '@phosphor-icons/react/DownloadSimple';
import { navigate } from 'vike/client/router';
import styles from './styles.module.css';
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
        <div className={styles.container}>
            <button
                type="button"
                onClick={handlePrev}
                disabled={!prevPostId}
                className={styles.button}
            >
                <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" /> Previous
            </button>

            {isDev && urls.length > 0 && (
                <button
                    type="button"
                    onClick={handleDownload}
                    className={`${styles.button} ${styles.downloadButton}`}
                >
                    <DownloadSimpleIcon size={18} weight="bold" aria-hidden="true" /> Download
                </button>
            )}

            <button
                type="button"
                onClick={handleNext}
                disabled={!nextPostId}
                className={styles.button}
            >
                Next <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
            </button>
        </div>
    );
};

export default MenuButtons;
