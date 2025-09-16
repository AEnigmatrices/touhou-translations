import artists from '../../../../data/artists.json';

interface ArtistFormInput {
    id: string;
    name: string;
    linkTwitter?: string;
    linkPixiv?: string;
}

const PLACEHOLDER_FILENAMES = [
    "demoman.webp",
    "engineer.webp",
    "heavy.webp",
    "medic.webp",
    "pyro.webp",
    "scout.webp",
    "sniper.webp",
    "soldier.webp",
    "spy.webp",
];

const headers = { 'Content-Type': 'application/json' };



export const TWITTER_URL_PATTERN = /^(https?:\/\/)?(www\.)?x\.com\/.+$/i;
export const PIXIV_URL_PATTERN = /^https?:\/\/(www\.)?pixiv\.net\/.+$/i;

export const validateNewArtistId = async (id: string): Promise<true | string> => {
    const trimmed = id.trim();
    const exists = await new Promise<boolean>((resolve) => {
        setTimeout(() => { resolve(artists.some(artist => artist.id === trimmed)); }, 200);
    });
    return exists ? 'Artist ID already exists.' : true;
};

export const submitNewArtist = async (artist: ArtistFormInput): Promise<void> => {
    const response = await fetch('/api/artists', { method: 'POST', headers, body: JSON.stringify(artist) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to add artist');
};

export const getRandomPlaceholder = (): string => {
    const index = Math.floor(Math.random() * PLACEHOLDER_FILENAMES.length);
    return `portraits/placeholders/${PLACEHOLDER_FILENAMES[index]}`;
}