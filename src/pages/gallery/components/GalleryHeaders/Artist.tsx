import React from 'react';
import ProfileItem from '../../../../components/ProfileItem/ProfileItem';
import type { Artist } from '../../../../types/data';

interface Props { artist: Artist & { artworkCount: number; characterCount: number }; }

const GalleryHeaderArtist: React.FC<Props> = ({ artist }) => {
    const description1 = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? 's' : ''}`;
    const description2 = `${artist.characterCount} character${artist.characterCount !== 1 ? 's' : ''}`;
    const imageUrl = `${import.meta.env.BASE_URL}${artist.portrait}`;

    return (
        <a href="/touhou-translations/artists" aria-label="Back to artists list">
            <ProfileItem
                name={artist.name}
                imageUrl={imageUrl}
                description1={description1}
                description2={description2}
            />
        </a>
    );
};

export default GalleryHeaderArtist;