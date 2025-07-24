import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { useGetCharacter } from '../../context/PostsContext';
import { dateFormatOptions, replaceXWithNitter } from './ImageViewer.utils';
import ProfilePopover from '../ProfilePopover/ProfilePopover';
import twitterIcon from '../../icons/social/twitter.webp';
import nitterIcon from '../../icons/social/nitter.webp';
import pixivIcon from '../../icons/social/pixiv.webp';
import redditIcon from '../../icons/social/reddit.webp';
import styles from './InfoSection.styles';
import type { Post, Artist, Character } from '../../types/data';

interface Props {
    post: Post;
    artist: Artist | null;
    characters: Character[];
}



const InfoSection: React.FC<Props> = ({ post, artist, characters }) => {

    const [hoveredCharacterData, setHoveredCharacterData] = useState<Character | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

    const nitterUrl = post.src ? replaceXWithNitter(post.src) : null;
    const formattedDate = post.date ? new Date(post.date).toLocaleString('en-US', dateFormatOptions) : 'Unknown date';

    const getCharacter = useGetCharacter();



    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) => {
        if (!href) return null;
        return (
            <IconButton component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} sx={styles.iconButton} size="small">
                <img src={iconSrc} alt={altText} />
            </IconButton>
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
            <Box sx={styles.root}>
                <Box sx={styles.infoGrid}>
                    {artist && (
                        <>
                            <Typography component="div" sx={styles.infoItemLabel}>
                                Artist:
                            </Typography>
                            <Box sx={styles.infoItemValue}>
                                <Typography>{artist.name}</Typography>
                                <Box sx={styles.infoIcons}>
                                    {renderIconLink(artist.linkTwitter, 'Twitter profile', twitterIcon, 'Twitter')}
                                    {renderIconLink(artist.linkTwitter?.replace('x.com', 'nitter.net'), 'Nitter profile', nitterIcon, 'Nitter')}
                                    {renderIconLink(artist.linkPixiv, 'Pixiv profile', pixivIcon, 'Pixiv')}
                                </Box>
                            </Box>
                        </>
                    )}

                    {post.src && (
                        <>
                            <Typography component="div" sx={styles.infoItemLabel}>
                                Source:
                            </Typography>
                            <Link href={post.src} target="_blank" rel="noopener noreferrer" sx={styles.sourceLink} title={post.src}>
                                {post.src}
                            </Link>
                        </>
                    )}

                    {nitterUrl && (
                        <>
                            <Typography component="div" sx={styles.infoItemLabel}>
                                Nitter Mirror:
                            </Typography>
                            <Link href={nitterUrl} target="_blank" rel="noopener noreferrer" sx={styles.sourceLink} title={nitterUrl}>
                                {nitterUrl}
                            </Link>
                        </>
                    )}

                    {characters.length > 0 && (
                        <>
                            <Typography component="div" sx={styles.infoItemLabel}>
                                {characters.length === 1 ? 'Character:' : 'Characters:'}
                            </Typography>
                            <Box sx={styles.infoItemValue}>
                                <Box sx={styles.charactersWrapper}>
                                    {characters.map((c, idx) => (
                                        <React.Fragment key={c.id}>
                                            <Link
                                                component="a"
                                                href={`/gallery?character=${c.id}`}
                                                sx={styles.characterLink}
                                            >
                                                {c.name}
                                            </Link>
                                            {idx < characters.length - 1 && ', '}
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}

                    {post.date && (
                        <>
                            <Typography component="div" sx={styles.infoItemLabel}>
                                Translated:
                            </Typography>
                            <Typography sx={styles.infoItemValue}>{formattedDate}</Typography>
                        </>
                    )}
                </Box>

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: -1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {post.reddit && renderIconLink(post.reddit, 'Reddit post', redditIcon, 'Reddit')}
                        </Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '1.25rem' }}>TL Commentary:</Typography>
                    </Box>
                    <Box sx={styles.infoItemValueComment}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.desc}</ReactMarkdown>
                    </Box>
                </Box>
            </Box>

            <ProfilePopover data={hoveredCharacterData} type="character" position={tooltipPosition} />
        </>
    );
};

export default InfoSection;