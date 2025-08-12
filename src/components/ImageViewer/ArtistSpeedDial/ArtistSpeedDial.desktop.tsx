import { Avatar, Box, SpeedDial, SpeedDialAction } from '@mui/material';
import styles from './ArtistSpeedDial.styles';
import type { FC } from 'react';
import type { ArtistSpeedDialProps } from './ArtistSpeedDial.types';


const ArtistSpeedDialDesktop: FC<ArtistSpeedDialProps> = ({ artist, speedDialActions, open, onOpen, onClose, imageUrl }) => {
    return (
        <Box sx={styles.desktopContainer}>
            <SpeedDial
                ariaLabel="Artist links"
                direction="right"
                open={open}
                onOpen={onOpen}
                onClose={onClose}
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
                            onClose();
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
};

export default ArtistSpeedDialDesktop;