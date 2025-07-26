import React from 'react';
import { Box } from '@mui/material';
import { useGetPosts } from '../../context/PostsContext';
import { extractRedditId } from '../../utils/extractRedditId';
import GalleryImage from './GalleryImage';
import styles from './Gallery.styles';
import type { Post } from '../../types/data';

const BASE_URL = import.meta.env.BASE_URL || '/';

interface Props {
    posts?: Post[];
}

const Gallery: React.FC<Props> = ({ posts }) => {
    const allPosts = useGetPosts();
    const displayedPosts = posts || allPosts;

    if (!displayedPosts.length) return <p>No posts available.</p>;

    return (
        <Box component="section" sx={styles.grid} aria-label="Gallery grid">
            {displayedPosts.map((post) => {
                if (!post.url || post.url.length === 0) return null;

                const imageUrl = post.url[0];
                const redditId = extractRedditId(post.reddit);
                if (!redditId) return null;

                return (
                    <Box key={post.date} component="div" sx={styles.item}>
                        <a
                            href={`${BASE_URL}posts/${redditId}`}
                            aria-label="View post details"
                            tabIndex={0}
                            style={{ display: 'block', width: '100%', height: '100%' }}
                        >
                            <GalleryImage
                                src={imageUrl}
                                alt={`Gallery post from ${new Date(post.date).toLocaleDateString()}`}
                            />
                        </a>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Gallery;