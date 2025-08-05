import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
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
    const displayedPosts = posts || allPosts;

    if (!displayedPosts.length) return <p>No posts available.</p>;

    return (
        <ImageList variant="masonry" cols={4} gap={16}>
            {displayedPosts.map((post) => {
                if (!post.url?.length) return null;

                const imageUrl = post.url[0];
                const redditId = extractRedditId(post.reddit);
                if (!redditId) return null;

                return (
                    <ImageListItem key={post.date} sx={styles.item}>
                        <a href={`${BASE_URL}posts/${redditId}`} aria-label="View post details" tabIndex={0} style={{ display: 'block', width: '100%' }} >
                            <GalleryImage src={imageUrl} alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`} />
                        </a>
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
};

export default Gallery;