import React, { useState } from 'react';
import type { Post } from '../../types/data';
import { useGetArtist, useGetCharacters } from '../../context/PostsContext';
import { dateFormatOptions, replaceXWithNitter } from '../../utils/postUtils';
import ImageSection from './ImageSection';
import InfoSection from './InfoSection';
import './ImageViewer.scss';

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
        const name = `image-viewer__icon-button image-viewer__icon-button-link--${altText.toLowerCase()}`;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={name}>
                <img src={iconSrc} alt={altText} />
            </a>
        );
    };

    if (!currentImage || !post.src) return null;

    return (
        <div className="image-viewer">
            <ImageSection
                currentImage={currentImage}
                isGallery={isGallery}
                currentIndex={currentIndex}
                urls={post.url}
                handleChangeIndex={handleChangeIndex}
            />
            <InfoSection
                post={post}
                artist={artist}
                characters={characters}
                nitterUrl={nitterUrl}
                formattedDate={formattedDate}
                renderIconLink={renderIconLink}
            />
        </div>
    );
};

export default ImageViewer;
