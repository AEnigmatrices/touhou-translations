import { useState } from 'react';
import ImageViewer from './components/ImageViewer';
import postsData from './assets/data/posts.json';
import type { Post } from './types/data';
import './App.scss';

const typedPosts = postsData as Post[];

const App = () => {
    const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
    const post = typedPosts[currentPostIndex];

    return (
        <>
            <h1>Reddit Image Viewer</h1>
            <div style={{ marginTop: '1.5rem' }}>
                <button disabled={currentPostIndex === 0} onClick={() => setCurrentPostIndex(i => i - 1)}>Previous</button>
                <button disabled={currentPostIndex === typedPosts.length - 1} onClick={() => setCurrentPostIndex(i => i + 1)} style={{ marginLeft: '1rem' }}>Next</button>
            </div>
            <ImageViewer post={post} />
        </>
    );
};

export default App;
