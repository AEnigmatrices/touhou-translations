import React from 'react';
import { createPortal } from 'react-dom';
import ProfileItem from '../ProfileItem/ProfileItem';
import { getCharacterImages } from '../../utils/galleryUtils';
import type { Character } from '../../types/data';

interface Props {
    character: Character | null;
    position: { x: number; y: number } | null;
}

const CharacterPopover: React.FC<Props> = ({ character, position }) => {
    if (!character || !position) return null;

    const imageUrl = getCharacterImages(character.id);
    const description = typeof character.artworkCount === 'number'
        ? `${character.artworkCount} artwork${character.artworkCount !== 1 ? 's' : ''}`
        : undefined;

    return createPortal(
        <div style={{ position: 'fixed', top: position.y, left: position.x, zIndex: 9999, pointerEvents: 'none' }}>
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
