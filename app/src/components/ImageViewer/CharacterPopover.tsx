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

    const imageUrl = getCharacterImages(character.id);
    const description = typeof character.artworkCount === 'number'
        ? `${character.artworkCount} artwork${character.artworkCount !== 1 ? 's' : ''}`
        : undefined;



    useEffect(() => {
        if (character && position) {
            setVisible(false);
            const timer = setTimeout(() => { setVisible(true); }, 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [character, position]);



    return createPortal(
        <div
            className={`character-popover ${visible ? 'visible' : ''}`}
            style={{ top: position.y, left: position.x }}
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
