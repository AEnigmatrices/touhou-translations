import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Link, IconButton, Tooltip, Chip, Skeleton, Avatar } from '@mui/material';
import { dateFormatOptions, replaceXWithNitter } from '../ImageViewer.utils';
import styles from './InfoSection.styles';
import type { Post, Artist, Character } from '../../../types/data';

interface Props {
    post: Post;
    artist: Artist | null;
    characters: Character[];
}

const BASE_URL = import.meta.env.BASE_URL;
const twitterIcon = `${BASE_URL}icons/social/twitter.webp`;
const nitterIcon = `${BASE_URL}icons/social/nitter.webp`;
const pixivIcon = `${BASE_URL}icons/social/pixiv.webp`;
const redditIcon = `${BASE_URL}icons/social/reddit.webp`;

const CHARACTER_PREVIEW_COUNT = 4;

const InfoSection: React.FC<Props> = ({ post, artist, characters }) => {

    const [showAllCharacters, setShowAllCharacters] = useState(false);
    const [showNitter, setShowNitter] = useState(false);

    const isTwitterUrl = post.src ? /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)/.test(post.src) : false;
    const nitterUrl = post.src ? replaceXWithNitter(post.src) : null;
    const formattedDate = post.date ? new Date(post.date).toLocaleString('en-US', dateFormatOptions) : 'Unknown date';

    const displayedUrl = showNitter && nitterUrl ? nitterUrl : post.src;



    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) => {
        if (!href) return null;
        return (
            <Tooltip title={altText} arrow placement="top">
                <IconButton component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} sx={styles.iconButton} size="small">
                    <img src={iconSrc} alt={altText} />
                </IconButton>
            </Tooltip>
        );
    };

    const toggleUrl = () => setShowNitter(prev => !prev);



    return (
        <Box sx={styles.root}>
            <Box sx={styles.infoGrid}>
                <Typography component="div" sx={styles.infoItemLabel}>Artist:</Typography>
                <Box sx={styles.infoItemValue}>
                    {!artist ? (
                        <Skeleton width={120} />
                    ) : (
                        <>
                            <Typography>{artist.name}</Typography>
                            <Box sx={styles.infoIcons}>
                                {renderIconLink(artist.linkTwitter, 'Twitter profile', twitterIcon, 'Twitter')}
                                {renderIconLink(artist.linkTwitter?.replace('x.com', 'nitter.net'), 'Nitter profile', nitterIcon, 'Nitter')}
                                {renderIconLink(artist.linkPixiv, 'Pixiv profile', pixivIcon, 'Pixiv')}
                            </Box>
                        </>
                    )}
                </Box>

                {post.src && (
                    <>
                        <Typography component="div" sx={styles.infoItemLabel}>Source:</Typography>
                        <Box sx={styles.sourceContainer}>
                            <Link href={displayedUrl} target="_blank" rel="noopener noreferrer" sx={styles.sourceLink}>
                                {displayedUrl}
                            </Link>
                            {isTwitterUrl && nitterUrl && (
                                <Chip
                                    size="small"
                                    label={showNitter ? 'Show Twitter Mirror' : 'Show Nitter Mirror'}
                                    onClick={toggleUrl}
                                    clickable
                                    sx={{ cursor: 'pointer', userSelect: 'none' }}
                                />
                            )}
                        </Box>
                    </>
                )}

                {post.date && (
                    <>
                        <Typography component="div" sx={styles.infoItemLabel}>Translated:</Typography>
                        <Typography sx={styles.infoItemValue}>{formattedDate}</Typography>
                    </>
                )}
            </Box>

            {characters.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 1 }}>
                        {characters.length === 1 ? 'Character' : 'Characters'}
                    </Typography>
                    <Box sx={styles.infoItemValue}>
                        <Box sx={styles.charactersWrapper}>
                            {(showAllCharacters ? characters : characters.slice(0, CHARACTER_PREVIEW_COUNT)).map((c) => (
                                <Chip
                                    key={c.id}
                                    label={c.short_name}
                                    component="a"
                                    href={`${BASE_URL}gallery?character=${c.id}`}
                                    clickable
                                    sx={styles.characterChip}
                                    avatar={c.portrait ? (<Avatar src={`${BASE_URL}${c.portrait}`} alt={c.name} variant="rounded" />) : undefined}
                                />
                            ))}
                        </Box>
                        {characters.length > CHARACTER_PREVIEW_COUNT && (
                            <Box sx={styles.showAllToggleWrapper}>
                                <Chip
                                    label={showAllCharacters ? 'Show fewer' : `Show all (${characters.length})`}
                                    onClick={() => setShowAllCharacters(prev => !prev)}
                                    clickable
                                    sx={styles.showAllToggle}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    {post.reddit && renderIconLink(post.reddit, 'Reddit post', redditIcon, 'Reddit')}
                    <Typography sx={{ fontWeight: 600, fontSize: '1.25rem' }}>TL Commentary</Typography>
                </Box>
                <Box sx={styles.infoItemValueComment}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.desc}</ReactMarkdown>
                </Box>
            </Box>
        </Box>
    );
};

export default InfoSection;