import { useEffect, useState } from 'react';
import type { Artist, Character, Post } from '../../types/data';
import artistsData from '../../assets/data/artists.json';
import charactersData from '../../assets/data/characters.json';
import './ImageViewer.css';

type Props = { post: Post };

const typedArtists = artistsData as Record<string, Artist>;
const typedCharacters = charactersData as Record<string, Character>;



const ImageViewer: React.FC<Props> = ({ post }) => {
    const [postTitle, setPostTitle] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const artist = typedArtists[post.artistId] ?? null;
    const characters = post.characterIds.map(id => typedCharacters[id]).filter(Boolean) as Character[];



    useEffect(() => {
        const fetchRedditImage = async () => {
            setLoading(true);
            setError(null);
            setImageUrl(null);
            setPostTitle(null);

            try {
                const response = await fetch(post.url);
                const data = await response.json();
                const postData = data[0]?.data?.children[0]?.data;

                if (postData?.title) setPostTitle(postData.title);
                else setError('No title found.');

                if (postData?.url?.match(/\.(jpg|jpeg|png|gif)$/i)) setImageUrl(postData.url);
                else setError('No direct image URL found.');
            } catch {
                setError('Failed to fetch image.');
            } finally {
                setLoading(false);
            }
        };

        fetchRedditImage();
    }, [post]);



    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!imageUrl || !postTitle) return null;

    return (
        <div className="image-viewer">
            <div>
                <h2 className="post-title">{postTitle}</h2>
                <div className="image-section">
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer" aria-label="View source">
                        <img src={imageUrl} alt="Reddit Post" className="image" />
                    </a>
                </div>
            </div>
            <div className="info-section">
                {artist && <p><strong>Artist:</strong> {artist.name}</p>}
                {characters.length > 0 && <p><strong>Characters:</strong> {characters.map(c => c.name).join(', ')}</p>}
                <p><strong>TL Commentary:</strong> {post.desc}</p>
            </div>
        </div>
    );
};

export default ImageViewer;
