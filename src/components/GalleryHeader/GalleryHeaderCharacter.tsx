import React from 'react';
import ProfileItem from '../ProfileItem/ProfileItem';
import type { Character } from '../../types/data';

interface Props { character: Character & { artworkCount: number }; }

const GalleryHeaderCharacter: React.FC<Props> = ({ character }) => {
    const description = `${character.artworkCount} artwork${character.artworkCount !== 1 ? 's' : ''}`;
    const imageUrl = `${import.meta.env.BASE_URL}${character.portrait}`;

    return (
        <a href="/touhou-translations/characters" aria-label="Back to characters list">
            <ProfileItem
                name={character.name}
                imageUrl={imageUrl}
                description={description}
            />
        </a>
    );
};

export default GalleryHeaderCharacter;