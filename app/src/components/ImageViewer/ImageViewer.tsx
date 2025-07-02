import type { Post } from '../../types/data';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { replaceXWithNitter } from '../../utils/urlUtils';
import { dateFormatOptions } from '../../utils/dateUtils';
import { useGetArtist, useGetCharacters } from '../../context/PostsContext';
import './ImageViewer.scss';
import twitterIcon from '../../icons/social/twitter.webp';
import nitterIcon from '../../icons/social/nitter.webp';
import pixivIcon from '../../icons/social/pixiv.webp';
import redditIcon from '../../icons/social/reddit.webp';

interface Props { post: Post; }



const ImageViewer: React.FC<Props> = ({ post }) => {

    const getArtist = useGetArtist();
    const getCharacters = useGetCharacters();

    const artist = getArtist(post.artistId);
    const characters = getCharacters(post.characterIds);

    const [currentIndex, setCurrentIndex] = useState(0);

    const isGallery = post.url.length > 1;
    const currentImage = post.url[currentIndex];

    const nitterUrl = post.src ? replaceXWithNitter(post.src) : null;
    const formattedDate = post.date ? new Date(post.date).toLocaleString('en-US', dateFormatOptions) : 'Unknown date';



    const handleChangeIndex = (direction: number) => {
        if (!isGallery) return;
        setCurrentIndex(prev => (prev + direction + post.url.length) % post.url.length);
    };

    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) => {
        if (!href) return null;
        const name = `image-viewer__icon-button image-viewer__icon-button-link--${altText.toLowerCase()}`
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={name}>
                <img src={iconSrc} alt={altText} />
            </a>
        );
    };

    if (!currentImage || !post.src) return null;



    return (
        <div className="image-viewer">
            <div className="image-viewer__image-section">
                <div className="image-viewer__image-display">
                    <img src={currentImage} alt="Translated Image" className="image-viewer__image" />
                </div>
                {isGallery && (
                    <div className="image-viewer__gallery-controls">
                        <button onClick={() => handleChangeIndex(-1)} aria-label="Previous image">◀</button>
                        <span className="image-viewer__gallery-index">{`${currentIndex + 1} / ${post.url.length}`}</span>
                        <button onClick={() => handleChangeIndex(1)} aria-label="Next image">▶</button>
                    </div>
                )}
            </div>
            <div className="image-viewer__info-section">
                <div className="image-viewer__info-grid">
                    {artist && (
                        <div className="image-viewer__info-item">
                            <div className="image-viewer__label">Artist:</div>
                            <div className="image-viewer__value">
                                {artist.name}
                                <div className="image-viewer__info-icons">
                                    {artist.linkTwitter && renderIconLink(artist.linkTwitter, "Twitter profile", twitterIcon, "Twitter")}
                                    {artist.linkTwitter && renderIconLink(artist.linkTwitter.replace('x.com', 'nitter.net'), "Nitter profile", nitterIcon, "Nitter")}
                                    {artist.linkPixiv && renderIconLink(artist.linkPixiv, "Pixiv profile", pixivIcon, "Pixiv")}
                                </div>
                            </div>
                        </div>
                    )}
                    {post.src && (
                        <div className="image-viewer__info-item">
                            <div className="image-viewer__label">Source:</div>
                            <div className="image-viewer__value">
                                <a href={post.src} target="_blank" rel="noopener noreferrer" className="image-viewer__source-link" title={post.src}  >
                                    {post.src}
                                </a>
                            </div>
                        </div>
                    )}
                    {nitterUrl && (
                        <div className="image-viewer__info-item">
                            <div className="image-viewer__label">Nitter Mirror:</div>
                            <div className="image-viewer__value">
                                <a href={nitterUrl} target="_blank" rel="noopener noreferrer" className="image-viewer__source-link" title={nitterUrl}>
                                    {nitterUrl}
                                </a>
                            </div>
                        </div>
                    )}
                    {characters.length > 0 && (
                        <div className="image-viewer__info-item">
                            <div className="image-viewer__label">
                                {characters.length === 1 ? 'Character:' : 'Characters:'}
                            </div>
                            <div className="image-viewer__value">
                                {characters.map(c => c.name).join(', ')}
                            </div>
                        </div>
                    )}
                    {post.date && (
                        <div className="image-viewer__info-item">
                            <div className="image-viewer__label">Translated:</div>
                            <div className="image-viewer__value">{formattedDate}</div>
                        </div>
                    )}
                </div>
                <div className="image-viewer__info-comment">
                    <div className="image-viewer__label image-viewer__label--comment">
                        <div className="image-viewer__info-icons image-viewer__info-icons--label">
                            {post.reddit && renderIconLink(post.reddit, "Reddit post", redditIcon, "Reddit")}
                        </div>
                        TL Commentary:
                    </div>
                    <div className="image-viewer__value--comment">
                        <ReactMarkdown>{post.desc}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;