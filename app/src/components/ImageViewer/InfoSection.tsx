import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { useGetCharacter } from '../../context/PostsContext';
import { dateFormatOptions, replaceXWithNitter } from '../../utils/postUtils';
import ProfilePopover from '../ProfilePopover/ProfilePopover';
import twitterIcon from '../../icons/social/twitter.webp';
import nitterIcon from '../../icons/social/nitter.webp';
import pixivIcon from '../../icons/social/pixiv.webp';
import redditIcon from '../../icons/social/reddit.webp';
import './InfoSection.scss';
import type { Post, Artist, Character } from '../../types/data';

interface Props {
    post: Post;
    artist: Artist | null;
    characters: Character[];
}



const InfoSection: React.FC<Props> = ({ post, artist, characters }) => {

    const [hoveredCharacterData, setHoveredCharacterData] = useState<Character | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number } | null>(null);

    const nitterUrl = post.src ? replaceXWithNitter(post.src) : null;
    const formattedDate = post.date ? new Date(post.date).toLocaleString('en-US', dateFormatOptions) : 'Unknown date';

    const getCharacter = useGetCharacter();



    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) => {
        if (!href) return null;
        const name = `info-section__icon-button info-section__icon-button-link--${altText.toLowerCase()}`;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={name}>
                <img src={iconSrc} alt={altText} />
            </a>
        );
    };

    const handleCharacterMouseEnter = (e: React.MouseEvent, id: string) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setTooltipPosition({ x: rect.right + 8, y: rect.top });
        const fullCharacter = getCharacter(id);
        setHoveredCharacterData(fullCharacter);
    };



    return (
        <>
            <div className="info-section">
                <div className="info-section__info-grid">
                    {artist && (<div className="info-section__info-item">
                        <div className="info-section__label">Artist:</div>
                        <div className="info-section__value">
                            {artist.name}
                            <div className="info-section__info-icons">
                                {artist.linkTwitter && renderIconLink(artist.linkTwitter, 'Twitter profile', twitterIcon, 'Twitter')}
                                {artist.linkTwitter && renderIconLink(artist.linkTwitter.replace('x.com', 'nitter.net'), 'Nitter profile', nitterIcon, 'Nitter')}
                                {artist.linkPixiv && renderIconLink(artist.linkPixiv, 'Pixiv profile', pixivIcon, 'Pixiv')}
                            </div>
                        </div>
                    </div>)}
                    {post.src && (<div className="info-section__info-item">
                        <div className="info-section__label">Source:</div>
                        <div className="info-section__value">
                            <a href={post.src} target="_blank" rel="noopener noreferrer" className="info-section__source-link" title={post.src}>
                                {post.src}
                            </a>
                        </div>
                    </div>)}
                    {nitterUrl && (<div className="info-section__info-item">
                        <div className="info-section__label">Nitter Mirror:</div>
                        <div className="info-section__value">
                            <a href={nitterUrl} target="_blank" rel="noopener noreferrer" className="info-section__source-link" title={nitterUrl}>
                                {nitterUrl}
                            </a>
                        </div>
                    </div>)}
                    {characters.length > 0 && (<div className="info-section__info-item">
                        <div className="info-section__label">
                            {characters.length === 1 ? 'Character:' : 'Characters:'}
                        </div>
                        <div className="info-section__value">
                            <div className="info-section__characters-wrapper">
                                {characters.map((c, index) => (
                                    <React.Fragment key={c.id}>
                                        <Link
                                            to={`/gallery?character=${c.id}`} onMouseEnter={(e) => handleCharacterMouseEnter(e, c.id)}
                                            className="info-section__character-link" onMouseLeave={() => setHoveredCharacterData(null)}
                                        >
                                            {c.name}
                                        </Link>
                                        {index < characters.length - 1 && ', '}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>)}
                    {post.date && (<div className="info-section__info-item">
                        <div className="info-section__label">Translated:</div>
                        <div className="info-section__value">{formattedDate}</div>
                    </div>)}
                </div>

                <div className="info-section__info-comment">
                    <div className="info-section__label info-section__label--comment">
                        <div className="info-section__info-icons info-section__info-icons--label">
                            {post.reddit && renderIconLink(post.reddit, 'Reddit post', redditIcon, 'Reddit')}
                        </div>
                        TL Commentary:
                    </div>
                    <div className="info-section__value--comment">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.desc}</ReactMarkdown>
                    </div>
                </div>
            </div>
            <ProfilePopover data={hoveredCharacterData} type="character" position={tooltipPosition} />
        </>
    );
};

export default InfoSection;
