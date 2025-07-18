import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCharacterImages } from '../../utils/galleryUtils';
import { calculatePopoverPosition, formatArtworkDescription } from './CharacterPopover.utils';
import ProfileItem from '../ProfileItem/ProfileItem';
import './CharacterPopover.scss';
import type { Character } from '../../types/data';

interface Props { character: Character | null; position: { x: number; y: number } | null; }

const POPOVER_OFFSET = 10;
const POPOVER_SIZE = { width: 320, height: 200 };



const CharacterPopover: React.FC<Props> = ({ character, position }) => {
    if (!character || !position) return null;

    const [visible, setVisible] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(position);

    const imageUrl = getCharacterImages(character.id);
    const description = formatArtworkDescription(character.artworkCount);



    const handleMouseMove = useCallback((e: MouseEvent) => {
        setCurrentPosition(calculatePopoverPosition(e, POPOVER_OFFSET, POPOVER_SIZE));
    }, []);



    useEffect(() => {
        if (character && position) {
            setVisible(false);
            setCurrentPosition(position);
            const timer = setTimeout(() => { setVisible(true); }, 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [character, position]);

    useEffect(() => {
        if (!character) return;
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, [character, handleMouseMove]);



    return createPortal(
        <div className={`character-popover ${visible ? 'visible' : ''}`} style={{ top: currentPosition.y, left: currentPosition.x }}>
            <ProfileItem
                name={character.name}
                imageUrl={imageUrl}
                description={description}
            />
        </div>,
        document.body
    );
};

export default CharacterPopover;
