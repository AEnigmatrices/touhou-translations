import type { Post } from '../../types/data';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { dateFormatOptions } from '../../utils/dateUtils';
import { useGetArtist, useGetCharacters } from '../../context/PostsContext';
import './ImageViewer.scss';
import twitterIcon from '../../icons/social/twitter.webp';
import pixivIcon from '../../icons/social/pixiv.webp';
import redditIcon from '../../icons/social/reddit.webp';

interface Props { post: Post; }



const ImageViewer: React.FC<Props> = ({ post }) => {

    const getArtist = useGetArtist();
    const getCharacters = useGetCharacters();

    const artist = getArtist(post.artistId);
    const characters = getCharacters(post.characterIds);

    const isGallery = post.url.length > 1;
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentImage = post.url[currentIndex];

    const formattedDate = post.date ? new Date(post.date).toLocaleString('en-US', dateFormatOptions) : 'Unknown date';



    const handleChangeIndex = (direction: number) => {
        if (!isGallery) return;
        setCurrentIndex(prev => (prev + direction + post.url.length) % post.url.length);
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
                    <img src={currentImage} alt="Reddit Post" className="image" />
                </div>
                {isGallery && (
                    <div className="gallery-controls">
                        <button onClick={() => handleChangeIndex(-1)} aria-label="Previous image">◀</button>
                        <span className="gallery-index">{`${currentIndex + 1} / ${post.url.length}`}</span>
                        <button onClick={() => handleChangeIndex(1)} aria-label="Next image">▶</button>
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
                    {post.src && (
                        <div className="info-item">
                            <div className="label">Source:</div>
                            <div className="value">
                                <a href={post.src} target="_blank" rel="noopener noreferrer" className="source-link" title={post.src}>{post.src}</a>
                            </div>
                        </div>
                    )}
                    {characters.length > 0 && (
                        <div className="info-item">
                            <div className="label">{characters.length === 1 ? 'Character:' : 'Characters:'}</div>
                            <div className="value">{characters.map(c => c.name).join(', ')}</div>
                        </div>
                    )}
                    {post.date && (
                        <div className="info-item">
                            <div className="label">Translated:</div>
                            <div className="value">{formattedDate}</div>
                        </div>
                    )}
                </div>
                <div className="info-comment">
                    <div className="label">
                        <div className="info-icons">
                            {renderIconLink(post.reddit, "Reddit post", redditIcon, "Reddit")}
                        </div>
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