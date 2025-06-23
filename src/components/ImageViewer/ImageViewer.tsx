import type { Artist, Character, Post } from '../../types/data';
import ReactMarkdown from 'react-markdown';
import artistsData from '../../data/artists.json';
import charactersData from '../../data/characters.json';
import './ImageViewer.scss';
import twitterIcon from '../../icons/twitter.png';
import pixivIcon from '../../icons/pixiv.png';
import redditIcon from '../../icons/reddit.png';

interface Props {
    selectedPost: Post;
    postTitle: string | null;
    postLink: string | null;
    imageUrl: string | null;
    loading: boolean;
    error: string | null;
}

const typedArtists = artistsData as Record<string, Artist>;
const typedCharacters = charactersData as Record<string, Character>;



const ImageViewer: React.FC<Props> = ({ selectedPost, postTitle, postLink, imageUrl, loading, error }) => {

    const artist = typedArtists[selectedPost.artistId] ?? null;
    const characters = selectedPost.characterIds.map(id => typedCharacters[id]).filter(Boolean) as Character[];



    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) => {
        if (!href) return null;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={`icon-button ${altText.toLowerCase()}`}>
                <img src={iconSrc} alt={altText} />
            </a>
        );
    };



    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!imageUrl || !postTitle || !postLink) return null;

    return (
        <div className="image-viewer">
            <div>
                <h1 className="post-title">
                    {postTitle}
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
                                    {renderIconLink(artist.linkTwitter, "Twitter profile", twitterIcon, "Twitter")}
                                    {renderIconLink(artist.linkPixiv, "Pixiv profile", pixivIcon, "Pixiv")}
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
                    <div className="label">
                        {renderIconLink(postLink, "Reddit post", redditIcon, "Reddit")}
                        TL Commentary:
                    </div>
                    <div className="value">
                        <ReactMarkdown>{selectedPost.desc}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;
