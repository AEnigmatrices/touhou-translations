import { useState, type FC } from 'react';
import styles from './styles.module.css';
import type { Artist } from './ArtistSpeedDial.types';

const baseUrl = import.meta.env.BASE_URL;
const twitterIcon = `${baseUrl}icons/social/twitter.webp`;
const nitterIcon = `${baseUrl}icons/social/nitter.webp`;
const pixivIcon = `${baseUrl}icons/social/pixiv.webp`;

interface Props {
    artist: Artist;
    isMobile: boolean;
}

const ArtistSpeedDial: FC<Props> = ({ artist, isMobile }) => {
    const imageUrl = `${baseUrl}${artist.portrait}`;
    const [open, setOpen] = useState(false);

    const actions = [
        ...(artist.linkTwitter
            ? [{
                icon: twitterIcon,
                name: 'Twitter',
                href: artist.linkTwitter,
            },
            {
                icon: nitterIcon,
                name: 'Nitter',
                href: artist.linkTwitter.replace('x.com', 'nitter.net'),
            },] : []),
        ...(artist.linkPixiv
            ? [{
                icon: pixivIcon,
                name: 'Pixiv',
                href: artist.linkPixiv,
            },] : []),
    ];

    return (
        <div className={`${styles.root} ${isMobile ? styles.mobile : styles.desktop}`}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(prev => !prev)}
                aria-expanded={open}
                aria-label={`Artist links for ${artist.name}`}
            >
                <img src={imageUrl} alt="" className={styles.avatar} />
            </button>
            <span className={`${styles.nameTag} ${open ? styles.open : ''}`}>{artist.name}</span>
            {open && (
                <div className={styles.actions}>
                    {actions.map(action => (
                        <a
                            key={action.name}
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.action}
                            aria-label={action.name}
                            title={action.name}
                        >
                            <img src={action.icon} alt="" />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtistSpeedDial;
