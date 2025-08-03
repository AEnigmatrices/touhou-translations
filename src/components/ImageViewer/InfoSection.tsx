import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Link, IconButton, Tooltip, Accordion, AccordionSummary, AccordionDetails, Chip, Skeleton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppData } from '../../renderer/useAppData';
import { dateFormatOptions, replaceXWithNitter } from './ImageViewer.utils';
import ProfilePopover from '../ProfilePopover/ProfilePopover';
import styles from './InfoSection.styles';
import type { Post, Artist, Character } from '../../types/data';

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

const InfoSection: React.FC<Props> = ({ post, artist, characters }) => {

    const { characters: allCharacters } = useAppData();

    const [hoveredCharacterData, setHoveredCharacterData] = useState<Character | null>(null);
    const [showNitter, setShowNitter] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
    const hoverTimeoutRef = useRef<number | null>(null);

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

    const handleCharacterMouseEnter = (e: React.MouseEvent, id: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const newPosition = { x: rect.right + 8, y: rect.top };

        hoverTimeoutRef.current = window.setTimeout(() => {
            const fullCharacter = allCharacters.find(c => c.id === id) ?? null;
            setHoveredCharacterData(fullCharacter);
            setTooltipPosition(newPosition);
        }, 250);
    };

    const handleCharacterMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setHoveredCharacterData(null);
        setTooltipPosition(null);
    };

    const toggleUrl = () => setShowNitter(prev => !prev);



    return (
        <>
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

                    {characters.length > 0 && (
                        <>
                            <Typography component="div" sx={styles.infoItemLabel}>{characters.length === 1 ? 'Character:' : 'Characters:'}</Typography>
                            <Box sx={styles.infoItemValue}>
                                <Box sx={styles.charactersWrapper}>
                                    {characters.map((c) => (
                                        <Chip
                                            key={c.id}
                                            label={c.name}
                                            component="a"
                                            href={`${BASE_URL}gallery?character=${c.id}`}
                                            onMouseEnter={(e) => handleCharacterMouseEnter(e, c.id)}
                                            onMouseLeave={handleCharacterMouseLeave}
                                            clickable
                                            sx={styles.characterChip}
                                        />
                                    ))}
                                </Box>
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

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {post.reddit && renderIconLink(post.reddit, 'Reddit post', redditIcon, 'Reddit')}
                            <Typography sx={{ fontWeight: 600, fontSize: '1.25rem' }}>TL Commentary</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={styles.infoItemValueComment}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.desc}</ReactMarkdown>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <ProfilePopover data={hoveredCharacterData} position={tooltipPosition} />
        </>
    );
};

export default InfoSection;