import artists from '../../../data/artists.json';

export const validateArtistId = (id: string): true | string => {
    const trimmed = id.trim();
    const exists = artists.some(artist => artist.id === trimmed);
    return exists || 'Artist ID does not exist.';
}