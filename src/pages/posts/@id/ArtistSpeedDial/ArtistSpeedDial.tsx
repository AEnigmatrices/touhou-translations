import { useState, type FC } from 'react';
import { Avatar } from '@mui/material';
import ArtistSpeedDialDesktop from './ArtistSpeedDial.desktop';
import ArtistSpeedDialMobile from './ArtistSpeedDial.mobile';
import type { Artist, SpeedDialAction } from './ArtistSpeedDial.types';

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const speedDialActions: SpeedDialAction[] = [
        ...(artist.linkTwitter
            ? [{
                icon: <Avatar src={twitterIcon} alt="Twitter" sx={{ width: 52, height: 52 }} />,
                name: 'Twitter',
                href: artist.linkTwitter,
            },
            {
                icon: <Avatar src={nitterIcon} alt="Nitter" sx={{ width: 52, height: 52 }} />,
                name: 'Nitter',
                href: artist.linkTwitter.replace('x.com', 'nitter.net'),
            },] : []),
        ...(artist.linkPixiv
            ? [{
                icon: <Avatar src={pixivIcon} alt="Pixiv" sx={{ width: 52, height: 52 }} />,
                name: 'Pixiv',
                href: artist.linkPixiv,
            },] : []),
    ];

    return isMobile ? (
        <ArtistSpeedDialMobile artist={artist} speedDialActions={speedDialActions} open={open} onOpen={handleOpen} onClose={handleClose} imageUrl={imageUrl} />
    ) : (
        <ArtistSpeedDialDesktop artist={artist} speedDialActions={speedDialActions} open={open} onOpen={handleOpen} onClose={handleClose} imageUrl={imageUrl} />
    );
};

export default ArtistSpeedDial;