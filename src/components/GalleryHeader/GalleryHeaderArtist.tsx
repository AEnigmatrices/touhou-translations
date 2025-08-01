import React from 'react';
import ProfileItem from '../ProfileItem/ProfileItem';
import type { Artist } from '../../types/data';

interface Props { artist: Artist & { artworkCount: number }; }

const GalleryHeaderArtist: React.FC<Props> = ({ artist }) => {
    const description = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? 's' : ''}`;
    const imageUrl = `${import.meta.env.BASE_URL}${artist.portrait}`;

    return (
        <a href="/touhou-translations/artists" aria-label="Back to artists list">
            <ProfileItem
                name={artist.name}
                imageUrl={imageUrl}
                description={description}
            />
        </a>
    );
};

export default GalleryHeaderArtist;