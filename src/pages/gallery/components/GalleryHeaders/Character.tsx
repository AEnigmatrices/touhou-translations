import React from 'react';
import ProfileItem from '../../../../components/ProfileItem/ProfileItem';
import type { Character } from '../../../../types/data';

interface Props { character: Character & { artworkCount: number; artistCount: number }; }

const GalleryHeaderCharacter: React.FC<Props> = ({ character }) => {
    const description1 = `${character.artworkCount} artwork${character.artworkCount !== 1 ? 's' : ''}`;
    const description2 = `${character.artistCount} artist${character.artistCount !== 1 ? 's' : ''}`;
    const imageUrl = `${import.meta.env.BASE_URL}${character.portrait}`;

    return (
        <a href="/touhou-translations/characters" aria-label="Back to characters list">
            <ProfileItem
                name={character.name}
                imageUrl={imageUrl}
                description1={description1}
                description2={description2}
            />
        </a>
    );
};

export default GalleryHeaderCharacter;