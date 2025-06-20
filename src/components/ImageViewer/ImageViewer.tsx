import React from 'react';
import type { Artist, Character, Post } from '../../types/data';
import './ImageViewer.css';

type Props = { postTitle: string; imageUrl: string; artist: Artist | null; characters: Character[] | undefined; post: Post; };



const ImageViewer: React.FC<Props> = ({ postTitle, imageUrl, artist, characters, post }) => {
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
                {artist && (
                    <p>
                        <strong>Artist:</strong> {artist.name}
                    </p>
                )}
                {characters && characters.length > 0 && (
                    <p>
                        <strong>Characters:</strong> {characters.map(c => c.name).join(', ')}
                    </p>
                )}
                <p>
                    <strong>TL Commentary:</strong> {post.desc}
                </p>
            </div>
        </div>
    );
};

export default ImageViewer;
