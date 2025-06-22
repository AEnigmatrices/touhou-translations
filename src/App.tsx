import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Placeholder from './components/Placeholder';
import postsData from './data/posts.json';
import type { Post } from './types/data';
import './App.scss';

const typedPosts = postsData as Post[];

const App = () => {
    const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
    const post = typedPosts[currentPostIndex];

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
                <Routes>
                    <Route path="/" element={<Home post={post} currentPostIndex={currentPostIndex} setCurrentPostIndex={setCurrentPostIndex} totalPosts={typedPosts.length} />} />
                    <Route path="/search" element={<Placeholder title="Search" />} />
                    <Route path="/characters" element={<Placeholder title="Characters" />} />
                    <Route path="/artists" element={<Placeholder title="Artists" />} />
                    <Route path="/gallery" element={<Placeholder title="Gallery" />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
