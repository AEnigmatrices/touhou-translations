import React, { useState } from 'react';
import ImageSection from './ImageSection';
import InfoSection from './InfoSection';
import { useGetArtist, useGetCharacters } from '../../context/PostsContext';
import type { Post } from '../../types/data';
import './ImageViewer.scss';

interface Props { post: Post; }



const ImageViewer: React.FC<Props> = ({ post }) => {
    const getArtist = useGetArtist();
    const getCharacters = useGetCharacters();
    const artist = getArtist(post.artistId);
    const characters = getCharacters(post.characterIds);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChangeIndex = (direction: number) => {
        if (post.url.length <= 1) return;
        setCurrentIndex(prev => (prev + direction + post.url.length) % post.url.length);
    };

    if (!post.url.length || !post.src) return null;

    return (
        <div className="image-viewer">
            <ImageSection currentIndex={currentIndex} urls={post.url} handleChangeIndex={handleChangeIndex} />
            <InfoSection post={post} artist={artist} characters={characters} />
        </div>
    );
};

export default ImageViewer;
