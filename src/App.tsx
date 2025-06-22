import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Link, useRoutes } from 'react-router-dom';
import postsData from './data/posts.json';
import type { Post } from './types/data';
import { createRoutes } from './routes';
import './App.scss';

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



const App = () => {
    return (
        <Router basename="/touhou-translations/">
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/characters">Characters</Link>
                <Link to="/artists">Artists</Link>
                <Link to="/gallery">Gallery</Link>
            </nav>
            <main style={{ padding: '1.5rem' }}>
                <AppRoutes />
            </main>
        </Router>
    );
};

export default App;
