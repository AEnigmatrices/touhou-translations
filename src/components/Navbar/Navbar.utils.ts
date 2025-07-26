import React from 'react';
import { extractRedditId } from '../../utils/extractRedditId';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface ElevationScrollProps {
    children: React.ReactElement<{ elevation?: number }>;
}

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export const ElevationScroll: React.FC<ElevationScrollProps> = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
}

export const navLinks = [
    { label: 'Home', to: `${BASE_PATH}/` },
    { label: 'Characters', to: `${BASE_PATH}/characters` },
    { label: 'Artists', to: `${BASE_PATH}/artists` },
    { label: 'Gallery', to: `${BASE_PATH}/gallery` },
    ...(import.meta.env.VITE_ENABLE_ADMIN === "true"
        ? [{ label: 'Admin', to: `${BASE_PATH}/admin` }]
        : []),
];

export const getRandomPostPath = (posts: { reddit: string }[]): string => {
    if (!posts || posts.length === 0) return `${BASE_PATH}/`;
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    const redditId = extractRedditId(randomPost.reddit);
    return redditId ? `${BASE_PATH}/posts/${redditId}` : `${BASE_PATH}/`;
}