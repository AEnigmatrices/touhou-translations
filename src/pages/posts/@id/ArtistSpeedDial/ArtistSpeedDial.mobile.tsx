import { Avatar, Box, Typography, SpeedDial, SpeedDialAction, type SxProps, type Theme } from '@mui/material';
import styles from './ArtistSpeedDial.styles';
import type { FC } from 'react';
import type { SystemStyleObject } from '@mui/system';
import type { ArtistSpeedDialProps } from './ArtistSpeedDial.types';


const ArtistSpeedDialMobile: FC<ArtistSpeedDialProps> = ({ artist, speedDialActions, open, onOpen, onClose, imageUrl }) => {

    const getContainerSx = (): SxProps<Theme> => (theme: Theme) => {
        const base = typeof styles.container === 'function'
            ? styles.container(theme)
            : styles.container;
        return { ...(base as SystemStyleObject<Theme>), pointerEvents: open ? 'auto' : 'none' };
    };

    return (
        <Box sx={getContainerSx()}>
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