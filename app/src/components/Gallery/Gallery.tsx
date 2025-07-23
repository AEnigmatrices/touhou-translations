import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useGetPosts } from '../../context/PostsContext';
import type { Post } from '../../types/data';
import GalleryImage from './GalleryImage';
import styles from './Gallery.styles';

interface Props { posts: Post[]; }



const Gallery: React.FC<Props> = ({ posts }) => {
    const allPosts = useGetPosts();

    if (!posts || posts.length === 0) return <p>No posts available.</p>;

    return (
        <Box component="section" sx={styles.grid} aria-label="Gallery grid">
            {posts.map((post) => {
                if (!post.url || post.url.length === 0) return null;
                const imageUrl = post.url[0];

                const postIndex = allPosts.findIndex((p) => p === post);
                if (postIndex === -1) return null;

                return (
                    <Box
                        key={post.date} component={Link} to={`/post/${postIndex + 1}`}
                        aria-label="View post details" sx={styles.item} tabIndex={0}
                    >
                        <GalleryImage src={imageUrl} alt={`Gallery post from ${post.date}`} />
                    </Box>
                );
            })}
        </Box>
    );
};

export default Gallery;