import { useState, type FC } from 'react';
import { navigate } from 'vike/client/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Link, IconButton, Tooltip, Chip, Button, useTheme, useMediaQuery } from '@mui/material';
import ArtistSpeedDial from '../ArtistSpeedDial/ArtistSpeedDial';
import { dateFormatOptions, replaceXWithNitter } from '../posts.utils';
import CharacterChips from '../CharacterChips/CharacterChips';
import SeeMoreArtist from './SeeMoreArtist/SeeMoreArtist';
import styles from './InfoSection.styles';
import type { Post, Artist, Character } from '../../../../types/data';

interface Props {
    post: Post;
    artist: Artist | null;
    characters: Character[];
    artistPosts: { id: string; img: string }[];
    prevPostId?: string | null;
    nextPostId?: string | null;
}

const baseUrl = import.meta.env.BASE_URL;
const redditIcon = `${baseUrl}icons/social/reddit.webp`;


const InfoSection: FC<Props> = ({ post, artist, characters, artistPosts, prevPostId, nextPostId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showNitter, setShowNitter] = useState(false);

    const isTwitterUrl = post.src ? /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)/.test(post.src) : false;
    const nitterUrl = post.src ? replaceXWithNitter(post.src) : null;
    const formattedDate = post.date ? new Date(post.date).toLocaleString('en-US', dateFormatOptions) : 'Unknown date';

    const displayedUrl = showNitter && nitterUrl ? nitterUrl : post.src;



    const toggleUrl = () => setShowNitter((prev) => !prev);

    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) =>
        href ? (
            <Tooltip title={altText} arrow placement="top">
                <IconButton component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} sx={styles.iconButton} size="small">
                    <img src={iconSrc} alt={altText} />
                </IconButton>
            </Tooltip>
        ) : null;

    const handleNavigate = (postId: string | null | undefined) => {
        if (postId) navigate(`${baseUrl}posts/${postId}`);
    };



    return (
        <Box sx={styles.root}>
            <Box sx={styles.infoGrid}>
                {artist && !isMobile && (
                    <>
                        <Typography component="div" sx={styles.infoItemLabel}>
                            Artist:
                        </Typography>
                        <ArtistSpeedDial artist={artist} isMobile={false} />
                    </>
                )}

                {post.src && (
                    <>
                        <Typography component="div" sx={styles.infoItemLabel}>
                            Source:
                        </Typography>
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
                        <Typography component="div" sx={styles.infoItemLabel}>
                            Translated:
                        </Typography>
                        <Typography sx={styles.infoItemValue}>
                            {formattedDate}
                        </Typography>
                    </>
                )}
            </Box>

            {characters.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 1 }} >
                        {characters.length === 1 ? 'Character' : 'Characters'}
                    </Typography>
                    <CharacterChips characters={characters} />
                </Box>
            )}

            {post.desc && (
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }} >
                        {post.reddit && renderIconLink(post.reddit, 'Reddit post', redditIcon, 'Reddit')}
                        <Typography sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
                            TL Commentary
                        </Typography>
                    </Box>
                    <Box sx={styles.infoItemValueComment}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.desc}
                        </ReactMarkdown>
                    </Box>
                </Box>
            )}

            {(prevPostId || nextPostId) && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" disabled={!prevPostId} onClick={() => handleNavigate(prevPostId)}>
                        Previous
                    </Button>

                    <Button variant="contained" disabled={!nextPostId} onClick={() => handleNavigate(nextPostId)}>
                        Next
                    </Button>
                </Box>
            )}

            {artistPosts.length > 0 && (<SeeMoreArtist artistName={artist?.name} artistPosts={artistPosts} />)}

            {artist && isMobile && <ArtistSpeedDial artist={artist} isMobile={true} />}
        </Box>
    );
};

export default InfoSection;