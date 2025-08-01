import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { calculatePopoverPosition, formatArtworkDescription } from './ProfilePopover.utils';
import Box from '@mui/material/Box';
import ProfileItem from '../ProfileItem/ProfileItem';
import getPopoverStyles from './ProfilePopover.styles';
import type { Character, Artist } from '../../types/data';

interface Props { data: Character | Artist | null; position: { x: number; y: number } | null; }

const POPOVER_OFFSET = 10;
const POPOVER_SIZE = { width: 320, height: 200 };



const ProfilePopover: React.FC<Props> = ({ data, position }) => {
    const [visible, setVisible] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(position);

    const imageUrl = data ? `${import.meta.env.BASE_URL}${data.portrait}` : '';
    const description = formatArtworkDescription(data?.artworkCount ?? 0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setCurrentPosition(calculatePopoverPosition(e, POPOVER_OFFSET, POPOVER_SIZE));
    }, []);

    useEffect(() => {
        if (data && position) {
            setVisible(false);
            setCurrentPosition(position);
            const timer = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [data, position]);

    useEffect(() => {
        if (!data) return;
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [data, handleMouseMove]);

    return createPortal(
        <Box
            sx={getPopoverStyles(visible && data !== null && position !== null, currentPosition ?? { x: 0, y: 0 })}
            aria-hidden={!visible || !data || !position}
        >
            {data && position && (
                <ProfileItem name={data.name} imageUrl={imageUrl} description={description} />
            )}
        </Box>,
        document.body
    );
};

export default ProfilePopover;