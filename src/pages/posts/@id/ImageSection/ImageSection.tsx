import { useState, type FC } from 'react';
import { Img } from 'react-image';
import styles from './styles.module.css';

const ImageSkeleton: FC = () => (
    <div className={styles.skeletonMedia} aria-hidden="true">
        <div className={styles.skeletonImage} />
        <div className={styles.skeletonCaption}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineShort} />
        </div>
    </div>
);

export const ImageSectionSkeleton: FC = () => (
    <div className={styles.root}>
        <div className={`${styles.paper} ${styles.paperOut}`}>
            <ImageSkeleton />
        </div>
    </div>
);

const ImageSection: FC<{ urls: string[]; nsfw?: boolean }> = ({ urls, nsfw }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    const currentImage = urls[currentIndex];
    const isGallery = urls.length > 1;

    const handleChangeIndex = (direction: number) => {
        if (isGallery) setCurrentIndex((prev) => (prev + direction + urls.length) % urls.length);
    };

    const handleImageClick = () => {
        if (!window.matchMedia('(max-width: 640px)').matches) setZoomed((prev) => !prev);
    };

    return (
        <div className={styles.root}>
            <div className={styles.imageDisplay}>
                <button
                    type="button"
                    onClick={handleImageClick}
                    className={`${styles.paper} ${zoomed ? styles.paperZoomed : styles.paperOut}`}
                    aria-label={zoomed ? 'Zoom image out' : 'Zoom image in'}
                >
                    <Img
                        src={[currentImage]}
                        alt="Translated Image"
                        decode={false}
                        draggable={false}
                        loader={<ImageSkeleton />}
                        unloader={<div className={styles.unavailableImage}>Image unavailable</div>}
                        className={zoomed ? styles.zoomed : styles.zoomOut}
                        style={{ filter: nsfw ? 'blur(10px)' : 'none' }}
                    />
                </button>
            </div>

            {isGallery && !zoomed && (
                <div className={styles.galleryControls}>
                    <button type="button" onClick={() => handleChangeIndex(-1)} aria-label="Previous image" className={styles.galleryButton}>
                        ‹
                    </button>
                    <span className={styles.galleryIndex}>
                        {currentIndex + 1} / {urls.length}
                    </span>
                    <button type="button" onClick={() => handleChangeIndex(1)} aria-label="Next image" className={styles.galleryButton}>
                        ›
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageSection;
