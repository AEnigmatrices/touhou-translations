import React from 'react';
import './ImageSection.scss';

interface Props {
    currentIndex: number;
    urls: string[];
    handleChangeIndex: (direction: number) => void;
}



const ImageSection: React.FC<Props> = ({ currentIndex, urls, handleChangeIndex }) => {
    const currentImage = urls[currentIndex];
    const isGallery = urls.length > 1;

    return (
        <div className="image-section">
            <div className="image-section__image-display">
                <a href={currentImage} target="_blank" rel="noopener noreferrer">
                    <img src={currentImage} alt="Translated Image" className="image-section__image" />
                </a>
            </div>
            {isGallery && (
                <div className="image-section__gallery-controls">
                    <button onClick={() => handleChangeIndex(-1)} aria-label="Previous image">◀</button>
                    <span className="image-section__gallery-index">{`${currentIndex + 1} / ${urls.length}`}</span>
                    <button onClick={() => handleChangeIndex(1)} aria-label="Next image">▶</button>
                </div>
            )}
        </div>
    );
};

export default ImageSection;