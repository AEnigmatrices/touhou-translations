import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ProfileItem from '../ProfileItem/ProfileItem';
import { getCharacterImages } from '../../utils/galleryUtils';
import type { Character } from '../../types/data';
import './CharacterPopover.scss';

interface Props {
    character: Character | null;
    position: { x: number; y: number } | null;
}



const CharacterPopover: React.FC<Props> = ({ character, position }) => {
    if (!character || !position) return null;

    const [visible, setVisible] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(position);

    const imageUrl = getCharacterImages(character.id);
    const description = typeof character.artworkCount === 'number'
        ? `${character.artworkCount} artwork${character.artworkCount !== 1 ? 's' : ''}`
        : undefined;



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
        const handleMouseMove = (e: MouseEvent) => setCurrentPosition({ x: e.clientX + 10, y: e.clientY + 10 });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [character]);



    return createPortal(
        <div
            className={`character-popover ${visible ? 'visible' : ''}`}
            style={{ top: currentPosition.y, left: currentPosition.x }}
        >
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