import type { Post } from '../../types/data';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGetArtist, useGetCharacters } from '../../context/PostsContext';
import './ImageViewer.scss';
import twitterIcon from '../../icons/twitter.webp';
import pixivIcon from '../../icons/pixiv.webp';
import redditIcon from '../../icons/reddit.webp';

interface Props {
    selectedPost: Post;
    postLink: string | null;
    imageUrl: string | null;
    galleryUrls: string[] | null;
    loading: boolean;
    error: string | null;
}



const ImageViewer: React.FC<Props> = ({ selectedPost, postLink, imageUrl, galleryUrls, loading, error, }) => {

    const getArtist = useGetArtist();
    const getCharacters = useGetCharacters();

    const artist = getArtist(selectedPost.artistId);
    const characters = getCharacters(selectedPost.characterIds);

    const isGallery = Array.isArray(galleryUrls) && galleryUrls.length > 0;
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentImage = isGallery ? galleryUrls[currentIndex] : imageUrl;



    const handlePrev = () => {
        if (!isGallery) return;
        setCurrentIndex(prev => (prev === 0 ? galleryUrls.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (!isGallery) return;
        setCurrentIndex(prev => (prev === galleryUrls.length - 1 ? 0 : prev + 1));
    };

    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) => {
        if (!href) return null;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={`icon-button ${altText.toLowerCase()}`}>
                <img src={iconSrc} alt={altText} />
            </a>
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!currentImage || !postLink) return null;



    return (
        <div className="image-viewer">
            <div className="image-section">
                <div className="image-display">
                    <a href={selectedPost.src} target="_blank" rel="noopener noreferrer" aria-label="View source">
                        <img src={currentImage} alt="Reddit Post" className="image" />
                    </a>
                </div>
                {isGallery && (
                    <div className="gallery-controls">
                        <button onClick={handlePrev} aria-label="Previous image">◀</button>
                        <span className="gallery-index">{`${currentIndex + 1} / ${galleryUrls.length}`}</span>
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
                        {renderIconLink(postLink, "Reddit post", redditIcon, "Reddit")}
                        TL Commentary:
                    </div>
                    <div className="value">
                        <ReactMarkdown>{selectedPost.desc}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;