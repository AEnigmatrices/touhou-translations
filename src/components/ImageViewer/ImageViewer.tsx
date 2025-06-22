import { useEffect, useState } from 'react';
import type { Artist, Character, Post } from '../../types/data';
import ReactMarkdown from 'react-markdown';
import artistsData from '../../data/artists.json';
import charactersData from '../../data/characters.json';
import './ImageViewer.scss';

type Props = { selectedPost: Post };

const typedArtists = artistsData as Record<string, Artist>;
const typedCharacters = charactersData as Record<string, Character>;



const ImageViewer: React.FC<Props> = ({ selectedPost }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [postTitle, setPostTitle] = useState<string | null>(null);
    const [postLink, setPostLink] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const artist = typedArtists[selectedPost.artistId] ?? null;
    const characters = selectedPost.characterIds.map(id => typedCharacters[id]).filter(Boolean) as Character[];



    useEffect(() => {
        const fetchRedditImage = async () => {
            setLoading(true);
            setError(null);
            setImageUrl(null);
            setPostTitle(null);

            try {
                const response = await fetch(selectedPost.url);
                const data = await response.json();
                const postData = data[0]?.data?.children[0]?.data;

                if (postData?.title) setPostTitle(postData.title);
                else setError('No title found.');

                if (postData?.permalink) setPostLink(`https://www.reddit.com${postData.permalink}`);
                else setError('No permalink found.');

                if (postData?.url?.match(/\.(jpg|jpeg|png|gif)$/i)) setImageUrl(postData.url);
                else setError('No direct image URL found.');
            } catch {
                setError('Failed to fetch image.');
            } finally {
                setLoading(false);
            }
        };

        fetchRedditImage();
    }, [selectedPost]);



    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!imageUrl || !postTitle || !postLink) return null;

    return (
        <div className="image-viewer">
            <div>
                <h1 className="post-title">
                    <a href={postLink} target="_blank" rel="noopener noreferrer" aria-label="View Reddit post">
                        {postTitle}
                    </a>
                </h1>
                <div className="image-section">
                    <a href={selectedPost.src} target="_blank" rel="noopener noreferrer" aria-label="View source">
                        <img src={imageUrl} alt="Reddit Post" className="image" />
                    </a>
                </div>
            </div>
            <div className="info-section">
                <div className="info-grid">
                    {artist && (
                        <div className="info-item">
                            <div className="label">Artist:</div>
                            <div className="value">
                                {artist.name}
                                <div className="info-icons">
                                    {artist.linkTwitter && (
                                        <a
                                            href={artist.linkTwitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Twitter profile"
                                            className="icon-button twitter"
                                        >
                                            <img src="icons/twitter.png" alt="Twitter" />
                                        </a>
                                    )}
                                    {artist.linkPixiv && (
                                        <a
                                            href={artist.linkPixiv}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Pixiv profile"
                                            className="icon-button pixiv"
                                        >
                                            <img src="icons/pixiv.png" alt="Pixiv" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {characters.length > 0 && (
                        <div className="info-item">
                            <div className="label">Characters:</div>
                            <div className="value">{characters.map(c => c.name).join(', ')}</div>
                        </div>
                    )}
                </div>
                <div className="info-comment">
                    <div className="label">TL Commentary:</div>
                    <div className="value"><ReactMarkdown>{selectedPost.desc}</ReactMarkdown></div>
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;
