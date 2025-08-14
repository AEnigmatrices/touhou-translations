import React, { useState, useEffect } from 'react';
import { ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';
import { useAppData } from '../../renderer/useAppData';
import { extractRedditId } from '../../utils/extractRedditId';
import GalleryImage from './GalleryImage';
import styles from './Gallery.styles';
import type { Post } from '../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

interface Props {
    posts?: Post[];
}

const Gallery: React.FC<Props> = ({ posts }) => {
    const { posts: allPosts } = useAppData();
    const [loadedIndex, setLoadedIndex] = useState(-1);
    const displayedPosts = posts || allPosts;

    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const columns = isMdUp ? 4 : 2;

    const handleImageLoad = (index: number) => {
        if (index + 1 < displayedPosts.length) {
            setTimeout(() => setLoadedIndex(index + 1), 600);
        }
    };

    useEffect(() => {
        if (!displayedPosts.length) return;
        setLoadedIndex(-1);
        const timer = setTimeout(() => setLoadedIndex(0), 600);
        return () => clearTimeout(timer);
    }, [displayedPosts]);

    if (!displayedPosts.length) return <p>No posts available.</p>;

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <ImageList variant="masonry" cols={columns} gap={16}>
                {displayedPosts.map((post, index) => {
                    if (!post.url?.length) return null;
                    const imageUrl = post.url[0];
                    const redditId = extractRedditId(post.reddit);
                    if (!redditId) return null;

                    return (
                        <ImageListItem key={post.date} sx={styles.item}>
                            {index <= loadedIndex ? (
                                <a
                                    href={`${BASE_URL}posts/${redditId}`}
                                    aria-label="View post details"
                                    tabIndex={0}
                                    style={{ display: 'block', width: '100%' }}
                                >
                                    <GalleryImage
                                        src={imageUrl}
                                        alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                                        onLoad={() => handleImageLoad(index)}
                                    />
                                </a>
                            ) : (
                                <div style={{ width: '100%', aspectRatio: '1 / 1', backgroundColor: '#f0f0f0', }} />
                            )}
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </div>
    );
};

export default Gallery;