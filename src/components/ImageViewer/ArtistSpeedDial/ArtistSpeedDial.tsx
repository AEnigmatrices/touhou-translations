import React from 'react';
import { Avatar, Box, Typography, SpeedDial, SpeedDialAction, useTheme, useMediaQuery } from '@mui/material';
import styles from './ArtistSpeedDial.styles';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const imageUrl = `${baseUrl}${artist.portrait}`;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const speedDialActions = [
        ...(artist.linkTwitter
            ? [
                {
                    icon: <Avatar src={twitterIcon} alt="Twitter" sx={{ width: 52, height: 52 }} />,
                    name: 'Twitter',
                    href: artist.linkTwitter,
                },
                {
                    icon: <Avatar src={nitterIcon} alt="Nitter" sx={{ width: 52, height: 52 }} />,
                    name: 'Nitter',
                    href: artist.linkTwitter.replace('x.com', 'nitter.net'),
                },
            ]
            : []),
        ...(artist.linkPixiv
            ? [
                {
                    icon: <Avatar src={pixivIcon} alt="Pixiv" sx={{ width: 52, height: 52 }} />,
                    name: 'Pixiv',
                    href: artist.linkPixiv,
                },
            ]
            : []),
    ];

    if (!isMobile) {
        return (
            <Box sx={styles.desktopContainer}>
                <SpeedDial
                    ariaLabel="Artist links"
                    direction="right"
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    FabProps={{ sx: styles.speedDialFab }}
                    icon={<Avatar src={imageUrl} alt={artist.name} sx={{ width: 32, height: 32 }} />}
                    sx={styles.desktopSpeedDial}
                >
                    {speedDialActions.map((action, idx) => (
                        <SpeedDialAction
                            key={idx}
                            icon={action.icon}
                            onClick={() => {
                                if (action.href) window.open(action.href, '_blank', 'noopener');
                                handleClose();
                            }}
                            slotProps={{
                                fab: { sx: styles.speedDialActionFab },
                                tooltip: {
                                    title: action.name,
                                    placement: 'top',
                                    classes: { tooltip: 'custom-tooltip' },
                                },
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>
        );
    }

    return (
        <Box sx={styles.container}>
            <Box sx={styles.innerWrapper}>
                <Box sx={styles.nameTag} className={open ? 'MuiBox-root--open' : ''}>
                    <Typography variant="body1">{artist.name}</Typography>
                </Box>

                <Box sx={styles.avatarWrapper}>
                    <SpeedDial
                        ariaLabel="Artist links"
                        direction="up"
                        open={open}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        FabProps={{ sx: styles.speedDialFab }}
                        icon={<Avatar src={imageUrl} alt={artist.name} />}
                    >
                        {speedDialActions.map((action, idx) => (
                            <SpeedDialAction
                                key={idx}
                                icon={action.icon}
                                onClick={() => {
                                    if (action.href) window.open(action.href, '_blank', 'noopener');
                                    handleClose();
                                }}
                                slotProps={{
                                    fab: { sx: styles.speedDialActionFab },
                                    tooltip: {
                                        title: action.name,
                                        placement: 'left',
                                        classes: { tooltip: 'custom-tooltip' },
                                    },
                                }}
                            />
                        ))}
                    </SpeedDial>
                </Box>
            </Box>
        </Box>
    );
};

export default ArtistSpeedDial;