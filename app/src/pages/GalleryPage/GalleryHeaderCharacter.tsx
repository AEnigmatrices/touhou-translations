import React from 'react';
import { Link } from 'react-router-dom';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import { getCharacterPortraits } from '../../utils/galleryUtils';
import type { Character } from '../../types/data';

interface Props { character: Character & { artworkCount: number }; }



const GalleryHeaderCharacter: React.FC<Props> = ({ character }) => {
    const description = `${character.artworkCount} artwork${character.artworkCount !== 1 ? 's' : ''}`;

    return (
        <div className="gallery-page__header">
            <Link to="/characters" className="gallery-page__header-link" aria-label={`Back to characters list`}>
                <ProfileItem
                    name={character.name}
                    imageUrl={getCharacterPortraits(character.id)}
                    description={description}
                />
            </Link>
        </div>
    );
};

export default GalleryHeaderCharacter;
