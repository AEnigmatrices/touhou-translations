import React from 'react';
import ProfileItem from '../../../components/ProfileItem/ProfileItem';
import { getArtistPortraits } from '../../../utils/galleryUtils';
import type { Artist } from '../../../types/data';

interface Props { artist: Artist & { artworkCount: number }; }

const GalleryHeaderArtist: React.FC<Props> = ({ artist }) => {
    const description = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? 's' : ''}`;

    return (
        <div className="gallery-page__header">
            <a href="/artists" className="gallery-page__header-link" aria-label="Back to artists list">
                <ProfileItem
                    name={artist.name}
                    imageUrl={getArtistPortraits(artist.id)}
                    description={description}
                />
            </a>
        </div>
    );
};

export default GalleryHeaderArtist;