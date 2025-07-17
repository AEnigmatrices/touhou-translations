import React, { useCallback, useEffect, useState } from 'react';
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



    const handleMouseMove = useCallback((e: MouseEvent) => {
        const offset = 10;
        const popoverSize = { width: 320, height: 200 };

        const x = (e.clientX + offset + popoverSize.width > window.innerWidth)
            ? e.clientX - offset - popoverSize.width
            : e.clientX + offset;

        const y = (e.clientY + offset + popoverSize.height > window.innerHeight)
            ? e.clientY - offset - popoverSize.height
            : e.clientY + offset;

        setCurrentPosition({ x, y });
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