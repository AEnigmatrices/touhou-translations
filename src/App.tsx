import { useEffect, useState } from 'react';
import './App.css';



const App = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRedditImage = async () => {
            try {
                const response = await fetch('https://www.reddit.com/r/touhou/comments/1lfpvw1/koishi_wants_kokoro_to_smile_tl.json');
                const data = await response.json();

                const post = data[0]?.data?.children[0]?.data;
                console.log(post)
                const url = post?.url;

                if (url && /\.(jpg|jpeg|png|gif)$/.test(url)) {
                    setImageUrl(url);
                } else {
                    setError('No direct image URL found.');
                }
            } catch (err) {
                setError('Failed to fetch image.');
            } finally {
                setLoading(false);
            }
        };
        fetchRedditImage();
    }, []);

    return (
        <>
            <h1>Reddit Image Viewer</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && <img src={imageUrl} alt="Reddit Post" style={{ maxWidth: '100%' }} />}
        </>
    );
};



export default App;
