import { useEffect, useState } from 'react';
import postsData from './assets/data/posts.json';
import artistsData from './assets/data/artists.json';
import charactersData from './assets/data/characters.json';
import type { Post, Artist, Character } from './types/data';
import './App.css';

const typedPosts = postsData as Post[];
const typedArtists = artistsData as Record<string, Artist>;
const typedCharacters = charactersData as Record<string, Character>;



const App = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);

    const post = typedPosts[currentPostIndex];
    const artist = post ? typedArtists[post.artistId] : null;
    const characterList = post?.characterIds
        .map(id => typedCharacters[id])
        .filter(Boolean) as Character[] | undefined;



    const fetchRedditImage = async () => {
        resetState();
        try {
            const response = await fetch(post.url);
            const data = await response.json();

            const redditPost = data[0]?.data?.children[0]?.data;
            const url = redditPost?.url;

            if (url && /\.(jpg|jpeg|png|gif)$/i.test(url)) {
                setImageUrl(url);
            } else {
                setError('No direct image URL found.');
            }
        } catch {
            setError('Failed to fetch image.');
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setLoading(true); setError(null); setImageUrl(null);
    };

    const setNoUrl = (message: string) => {
        setError(message); setLoading(false); setImageUrl(null);
    };



    useEffect(() => {
        if (!post?.url) {
            setNoUrl('No post link found.'); return;
        }
        fetchRedditImage();
    }, [post]);



    return (
        <>
            <h1>Reddit Image Viewer</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && (
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1' }}>
                        <img src={imageUrl} alt="Reddit Post" style={{ width: '100%', maxWidth: '600px' }} />
                    </div>
                    <div style={{ flex: '1' }}>
                        {artist && <p><strong>Artist:</strong> {artist.name}</p>}
                        {characterList && characterList.length > 0 && (
                            <p><strong>Characters:</strong> {characterList.map(c => c.name).join(', ')}</p>
                        )}
                        <p><strong>Source:</strong>{' '}<a href={post.src} target="_blank" rel="noopener noreferrer">{post.src}</a></p>
                        <p><strong>Commentary:</strong> {post.desc}</p>
                    </div>
                </div>
            )}
            <div style={{ marginTop: '1.5rem' }}>
                <button
                    disabled={currentPostIndex === 0}
                    onClick={() => setCurrentPostIndex(i => i - 1)}
                >
                    Previous
                </button>
                <button
                    disabled={currentPostIndex === typedPosts.length - 1}
                    onClick={() => setCurrentPostIndex(i => i + 1)}
                    style={{ marginLeft: '1rem' }}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default App;
