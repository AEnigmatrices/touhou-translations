import React from 'react';
import { Link } from 'react-router-dom';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import { getArtistImages } from '../../utils/galleryUtils';
import type { Artist } from '../../types/data';

interface Props { artist: Artist & { artworkCount: number }; }



const GalleryHeaderArtist: React.FC<Props> = ({ artist }) => {
    const description = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? 's' : ''}`;

    return (
        <div className="gallery-page__header">
            <Link to="/artists" className="gallery-page__header-link" aria-label={`Back to artists list`}>
                <ProfileItem
                    name={artist.name}
                    imageUrl={getArtistImages(artist.id)}
                    description={description}
                />
            </Link>
        </div>
    );
};

export default GalleryHeaderArtist;
