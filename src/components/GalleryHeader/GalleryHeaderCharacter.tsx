import React from 'react';
import ProfileItem from '../ProfileItem/ProfileItem';
import { getCharacterPortraits } from '../../utils/galleryUtils';
import type { Character } from '../../types/data';

interface Props { character: Character & { artworkCount: number }; }

const GalleryHeaderCharacter: React.FC<Props> = ({ character }) => {
    const description = `${character.artworkCount} artwork${character.artworkCount !== 1 ? 's' : ''}`;

    return (
        <a href="/touhou-translations/characters" className="gallery-page__header-link" aria-label="Back to characters list">
            <ProfileItem
                name={character.name}
                imageUrl={getCharacterPortraits(character.id)}
                description={description}
            />
        </a>
    );
};

export default GalleryHeaderCharacter;