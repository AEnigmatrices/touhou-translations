import React from 'react';
import './ImageViewer.scss';

interface Props {
    currentImage: string;
    isGallery: boolean;
    currentIndex: number;
    urls: string[];
    handleChangeIndex: (direction: number) => void;
}

const ImageSection: React.FC<Props> = ({ currentImage, isGallery, currentIndex, urls, handleChangeIndex }) => {
    return (
        <div className="image-viewer__image-section">
            <div className="image-viewer__image-display">
                <a href={currentImage} target="_blank" rel="noopener noreferrer">
                    <img src={currentImage} alt="Translated Image" className="image-viewer__image" />
                </a>
            </div>
            {isGallery && (
                <div className="image-viewer__gallery-controls">
                    <button onClick={() => handleChangeIndex(-1)} aria-label="Previous image">◀</button>
                    <span className="image-viewer__gallery-index">{`${currentIndex + 1} / ${urls.length}`}</span>
                    <button onClick={() => handleChangeIndex(1)} aria-label="Next image">▶</button>
                </div>
            )}
        </div>
    );
};

export default ImageSection;
