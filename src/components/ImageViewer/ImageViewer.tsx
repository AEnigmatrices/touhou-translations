import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useAppData } from '../../renderer/useAppData';
import ImageSection from './ImageSection/ImageSection';
import InfoSection from './InfoSection/InfoSection';
import type { Post } from '../../types/data';
import styles from './ImageViewer.styles';

interface Props { post: Post; }



const ImageViewer: React.FC<Props> = ({ post }) => {

    const { artists, characters: allCharacters } = useAppData();

    const artist = artists.find(a => a.id === post.artistId) ?? null;
    const characters = allCharacters.filter(c => post.characterIds.includes(c.id));

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChangeIndex = (direction: number) => {
        if (post.url.length <= 1) return;
        setCurrentIndex((prev) => (prev + direction + post.url.length) % post.url.length);
    };

    if (!post.url.length || !post.src) return null;

    return (
        <Box sx={styles.root}>
            <ImageSection currentIndex={currentIndex} urls={post.url} handleChangeIndex={handleChangeIndex} />
            <InfoSection post={post} artist={artist} characters={characters} />
        </Box>
    );
};

export default ImageViewer;