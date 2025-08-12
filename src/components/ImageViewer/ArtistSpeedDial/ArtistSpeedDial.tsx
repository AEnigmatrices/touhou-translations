import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { StyledSpeedDial, StyledSpeedDialAction } from './ArtistSpeedDial.styles';

interface Props {
    artist: {
        name: string;
        portrait: string;
        linkTwitter?: string;
        linkPixiv?: string;
    };
}

const baseUrl = import.meta.env.BASE_URL;
const twitterIcon = `${baseUrl}icons/social/twitter.webp`;
const nitterIcon = `${baseUrl}icons/social/nitter.webp`;
const pixivIcon = `${baseUrl}icons/social/pixiv.webp`;

const ArtistSpeedDial: React.FC<Props> = ({ artist }) => {
    const imageUrl = `${baseUrl}${artist.portrait}`;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const speedDialActions = [
        ...(artist.linkTwitter
            ? [
                { icon: <Avatar src={twitterIcon} alt="Twitter" />, name: 'Twitter', href: artist.linkTwitter },
                { icon: <Avatar src={nitterIcon} alt="Nitter" />, name: 'Nitter', href: artist.linkTwitter.replace('x.com', 'nitter.net') }
            ] : []),
        ...(artist.linkPixiv ? [{ icon: <Avatar src={pixivIcon} alt="Pixiv" />, name: 'Pixiv', href: artist.linkPixiv }] : []),
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 84,
                right: 16,
                zIndex: theme => theme.zIndex.tooltip + 1,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: 72,
                    height: 72,
                    overflow: 'visible'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        right: '100%',
                        top: '50%',
                        transform: open ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(10px)',
                        transition: 'all 0.3s ease-in-out',
                        backgroundColor: 'background.paper',
                        padding: '8px 16px',
                        borderRadius: 2,
                        boxShadow: 4,
                        whiteSpace: 'nowrap',
                        opacity: open ? 1 : 0,
                        pointerEvents: 'none',
                        marginRight: 1
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {artist.name}
                    </Typography>
                </Box>

                <Box sx={{ position: 'absolute', right: 0, bottom: 0 }}>
                    <StyledSpeedDial
                        ariaLabel="Artist links"
                        direction="up"
                        open={open}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        FabProps={{ size: 'medium' }}
                        icon={<Avatar src={imageUrl} alt={artist.name} />}
                    >
                        {speedDialActions.map((action, idx) => (
                            <StyledSpeedDialAction
                                key={idx}
                                icon={action.icon}
                                onClick={() => {
                                    if (action.href) window.open(action.href, '_blank', 'noopener');
                                    handleClose();
                                }}
                                slotProps={{ tooltip: { title: action.name, placement: 'left' } }}
                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
            </Box>
        </Box>
    );
};

export default ArtistSpeedDial;