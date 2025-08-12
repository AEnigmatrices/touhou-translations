import { Avatar, Box, Typography, SpeedDial, SpeedDialAction } from '@mui/material';
import styles from './ArtistSpeedDial.styles';
import type { FC } from 'react';
import type { ArtistSpeedDialProps } from './ArtistSpeedDial.types';


const ArtistSpeedDialMobile: FC<ArtistSpeedDialProps> = ({ artist, speedDialActions, open, onOpen, onClose, imageUrl }) => {
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
                        onOpen={onOpen}
                        onClose={onClose}
                        FabProps={{ sx: styles.speedDialFab }}
                        icon={<Avatar src={imageUrl} alt={artist.name} />}
                    >
                        {speedDialActions.map((action, idx) => (
                            <SpeedDialAction
                                key={idx}
                                icon={action.icon}
                                onClick={() => {
                                    if (action.href) window.open(action.href, '_blank', 'noopener');
                                    onClose();
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

export default ArtistSpeedDialMobile;