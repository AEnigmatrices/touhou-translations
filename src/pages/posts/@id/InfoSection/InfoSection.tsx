import { useState, type FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArtistSpeedDial from '../ArtistSpeedDial/ArtistSpeedDial';
import { dateFormatOptions, replaceXWithNitter } from '../posts.utils';
import CharacterChips from '../CharacterChips/CharacterChips';
import MenuButtons from './MenuButtons/MenuButtons';
import SeeMoreArtist from './SeeMoreArtist/SeeMoreArtist';
import styles from './styles.module.css';
import type { Post, Artist, Character } from '../../../../types/data';

interface Props {
    post: Post;
    artist: Artist | null;
    characters: Character[];
    artistPosts: { id: string; img: string; nsfw: boolean; }[];
    prevPostId: string | null;
    nextPostId: string | null;
}

const baseUrl = import.meta.env.BASE_URL;
const redditIcon = `${baseUrl}icons/social/reddit.webp`;


const InfoSection: FC<Props> = ({ post, artist, characters, artistPosts, prevPostId, nextPostId }) => {
    const [showNitter, setShowNitter] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

    const isTwitterUrl = post.src ? /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)/.test(post.src) : false;
    const nitterUrl = post.src ? replaceXWithNitter(post.src) : null;
    const formattedDate = post.date ? new Date(post.date).toLocaleString('en-US', dateFormatOptions) : 'Unknown date';

    const displayedUrl = showNitter && nitterUrl ? nitterUrl : post.src;



    const toggleUrl = () => setShowNitter((prev) => !prev);

    const getDisplayUrl = (url: string): string => {
        try {
            const parsed = new URL(url);
            const host = parsed.hostname.replace(/^www\./, '');
            const path = parsed.pathname.length > 20 ? parsed.pathname.slice(0, 20) + '…' : parsed.pathname;
            return `${host}${path}`;
        } catch {
            return url;
        }
    };

    const renderIconLink = (href: string | undefined, ariaLabel: string, iconSrc: string, altText: string) =>
        href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} title={altText} className={styles.iconButton}>
                <img src={iconSrc} alt="" />
            </a>
        ) : null;



    return (
        <aside className={styles.root}>
            <div className={styles.infoGrid}>
                {artist && !isMobile && (
                    <>
                        <div className={styles.infoItemLabel}>
                            Artist:
                        </div>
                        <ArtistSpeedDial artist={artist} isMobile={false} />
                    </>
                )}

                {post.src && (
                    <>
                        <div className={styles.infoItemLabel}>
                            Source:
                        </div>
                        <div className={styles.sourceContainer}>
                            <a href={displayedUrl} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                                {getDisplayUrl(displayedUrl)}
                            </a>
                            {isTwitterUrl && nitterUrl && (
                                <button
                                    type="button"
                                    onClick={toggleUrl}
                                    className={styles.chipButton}
                                >
                                    {showNitter ? 'Show Twitter Mirror' : 'Show Nitter Mirror'}
                                </button>
                            )}
                        </div>
                    </>
                )}

                {post.date && (
                    <>
                        <div className={styles.infoItemLabel}>
                            Translated:
                        </div>
                        <div className={styles.infoItemValue}>
                            {formattedDate}
                        </div>
                    </>
                )}
            </div>

            {characters.length > 0 && (
                <section className={styles.block}>
                    <h3 className={styles.sectionTitle}>
                        {characters.length === 1 ? 'Character' : 'Characters'}
                    </h3>
                    <CharacterChips characters={characters} />
                </section>
            )}

            {post.desc && (
                <section className={styles.block}>
                    <div className={styles.commentHeader}>
                        {post.reddit && renderIconLink(post.reddit, 'Reddit post', redditIcon, 'Reddit')}
                        <h3 className={styles.commentTitle}>
                            TL Commentary
                        </h3>
                    </div>
                    <div className={styles.infoItemValueComment}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.desc}
                        </ReactMarkdown>
                    </div>
                </section>
            )}

            {(prevPostId || nextPostId) && (
                <MenuButtons
                    prevPostId={prevPostId}
                    nextPostId={nextPostId}
                    urls={post.url}
                    redditUrl={post.reddit}
                />
            )}

            {artistPosts.length > 0 && artist && (
                <SeeMoreArtist
                    artistId={artist.id}
                    artistName={artist.name}
                    artistPosts={artistPosts}
                />
            )}

            {artist && isMobile && <ArtistSpeedDial artist={artist} isMobile={true} />}
        </aside>
    );
};

export default InfoSection;
