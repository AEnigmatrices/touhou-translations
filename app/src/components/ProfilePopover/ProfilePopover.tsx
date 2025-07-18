import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCharacterPortraits, getArtistPortraits } from '../../utils/galleryUtils';
import { calculatePopoverPosition, formatArtworkDescription } from './ProfilePopover.utils';
import ProfileItem from '../ProfileItem/ProfileItem';
import './ProfilePopover.scss';
import type { Character, Artist } from '../../types/data';

interface Props { data: Character | Artist | null; type: 'character' | 'artist'; position: { x: number; y: number } | null; }

const POPOVER_OFFSET = 10;
const POPOVER_SIZE = { width: 320, height: 200 };



const ProfilePopover: React.FC<Props> = ({ data, type, position }) => {
    if (!data || !position) return null;

    const [visible, setVisible] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(position);

    const imageUrl = type === 'artist' ? getArtistPortraits(data.id) : getCharacterPortraits(data.id);
    const description = formatArtworkDescription(data.artworkCount);

    const handleMouseMove = useCallback((e: MouseEvent) => { setCurrentPosition(calculatePopoverPosition(e, POPOVER_OFFSET, POPOVER_SIZE)); }, []);



    useEffect(() => {
        if (data && position) {
            setVisible(false);
            setCurrentPosition(position);
            const timer = setTimeout(() => { setVisible(true); }, 10);
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
        <div className={`profile-popover ${visible ? 'visible' : ''}`} style={{ top: currentPosition.y, left: currentPosition.x }}>
            <ProfileItem name={data.name} imageUrl={imageUrl} description={description} />
        </div>,
        document.body
    );
};

export default ProfilePopover;
