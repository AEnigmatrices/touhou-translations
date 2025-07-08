import artists from '../../../data/artists.json';

export const validateArtistId = (id: string): true | string => {
    const trimmed = id.trim();
    const exists = artists.some(artist => artist.id === trimmed);
    return exists || 'Artist ID does not exist.';
}

export const validateNewArtistId = async (id: string): Promise<true | string> => {
    const trimmed = id.trim();
    const exists = await new Promise<boolean>((resolve) => {
        setTimeout(() => { resolve(artists.some(artist => artist.id === trimmed)); }, 200);
    });
    return exists ? 'Artist ID already exists.' : true;
};