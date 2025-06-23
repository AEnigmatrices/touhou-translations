import { useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import postsData from '../data/posts.json';
import type { Post } from '../types/data';
import { createRoutes } from './routes';

const typedPosts = postsData as Post[];

const AppRoutes = () => {
    const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
    const post = typedPosts[currentPostIndex];

    const routes = useMemo(() =>
        createRoutes(post, currentPostIndex, setCurrentPostIndex, typedPosts.length),
        [post, currentPostIndex, setCurrentPostIndex]
    );

    return useRoutes(routes);
};

export default AppRoutes;
