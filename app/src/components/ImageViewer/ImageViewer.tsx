import type { Post } from '../../types/data';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGetArtist, useGetCharacters } from '../../context/PostsContext';
import './ImageViewer.scss';
import twitterIcon from '../../icons/twitter.webp';
import pixivIcon from '../../icons/pixiv.webp';
import redditIcon from '../../icons/reddit.webp';

interface Props {
    post: Post;
    imageUrls: string[];
}



const ImageViewer: React.FC<Props> = ({ post, imageUrls }) => {

    const getArtist = useGetArtist();
    const getCharacters = useGetCharacters();

    const artist = getArtist(post.artistId);
    const characters = getCharacters(post.characterIds);

    const isGallery = imageUrls.length > 1;
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentImage = imageUrls[currentIndex];



    const handlePrev = () => {
        if (!isGallery) return;
        setCurrentIndex(prev => (prev === 0 ? imageUrls.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (!isGallery) return;
        setCurrentIndex(prev => (prev === imageUrls.length - 1 ? 0 : prev + 1));
    };

    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) => {
        if (!href) return null;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={`icon-button ${altText.toLowerCase()}`}>
                <img src={iconSrc} alt={altText} />
            </a>
        );
    };

    if (!currentImage || !post.src) return null;



    return (
        <div className="image-viewer">
            <div className="image-section">
                <div className="image-display">
                    <a href={post.src} target="_blank" rel="noopener noreferrer" aria-label="View source">
                        <img src={currentImage} alt="Reddit Post" className="image" />
                    </a>
                </div>
                {isGallery && (
                    <div className="gallery-controls">
                        <button onClick={handlePrev} aria-label="Previous image">◀</button>
                        <span className="gallery-index">{`${currentIndex + 1} / ${imageUrls.length}`}</span>
                        <button onClick={handleNext} aria-label="Next image">▶</button>
                    </div>
                )}
            </div>
            <div className="info-section">
                <div className="info-grid">
                    {artist && (
                        <div className="info-item">
                            <div className="label">Artist:</div>
                            <div className="value">
                                {artist.name}
                                <div className="info-icons">
                                    {renderIconLink(artist.linkTwitter, "Twitter profile", twitterIcon, "Twitter")}
                                    {renderIconLink(artist.linkPixiv, "Pixiv profile", pixivIcon, "Pixiv")}
                                </div>
                            </div>
                        </div>
                    )}
                    {characters.length > 0 && (
                        <div className="info-item">
                            <div className="label">Characters:</div>
                            <div className="value">{characters.map(c => c.name).join(', ')}</div>
                        </div>
                    )}
                </div>
                <div className="info-comment">
                    <div className="label">
                        {renderIconLink(post.src, "Reddit post", redditIcon, "Reddit")}
                        TL Commentary:
                    </div>
                    <div className="value">
                        <ReactMarkdown>{post.desc}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;