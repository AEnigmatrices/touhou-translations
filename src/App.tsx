import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ImageViewer from './components/ImageViewer';
import postsData from './data/posts.json';
import type { Post } from './types/data';
import './styles/App.scss';

const typedPosts = postsData as Post[];

const App = () => {
    const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
    const post = typedPosts[currentPostIndex];

    const isLocal = import.meta.env.MODE === 'development';

    const csp = `
        default-src 'self';
        script-src 'self';
        style-src 'self' ${isLocal ? "'unsafe-inline'" : ''};
        img-src 'self' https://i.redd.it;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://www.reddit.com;
        frame-ancestors 'none';
        base-uri 'self';
    `.trim();

    return (
        <>
            <Helmet>
                <meta httpEquiv="Content-Security-Policy" content={csp} />
            </Helmet>

            <h1>Reddit Image Viewer</h1>
            <div style={{ marginTop: '1.5rem' }}>
                <button disabled={currentPostIndex === 0} onClick={() => setCurrentPostIndex(i => i - 1)}>Previous</button>
                <button disabled={currentPostIndex === typedPosts.length - 1} onClick={() => setCurrentPostIndex(i => i + 1)} style={{ marginLeft: '1rem' }}>Next</button>
            </div>
            <ImageViewer selectedPost={post} />
        </>
    );
};

export default App;
