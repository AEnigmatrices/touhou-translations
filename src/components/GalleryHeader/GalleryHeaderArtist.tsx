import React from 'react';
import ProfileItem from '../ProfileItem/ProfileItem';
import { getArtistPortraits } from '../../utils/galleryUtils';
import type { Artist } from '../../types/data';

interface Props { artist: Artist & { artworkCount: number }; }

const GalleryHeaderArtist: React.FC<Props> = ({ artist }) => {
    const description = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? 's' : ''}`;

    return (
        <a href="/touhou-translations/artists" aria-label="Back to artists list">
            <ProfileItem
                name={artist.name}
                imageUrl={getArtistPortraits(artist.id)}
                description={description}
            />
        </a>
    );
};

export default GalleryHeaderArtist;