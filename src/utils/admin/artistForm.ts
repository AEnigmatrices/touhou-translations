import type { ArtistRaw } from '../../types/data';

export interface ArtistEntryForm {
    id: string;
    name: string;
    linkTwitter: string;
    linkPixiv: string;
}

const PLACEHOLDER_FILENAMES = [
    'demoman.webp',
    'engineer.webp',
    'heavy.webp',
    'medic.webp',
    'pyro.webp',
    'scout.webp',
    'sniper.webp',
    'soldier.webp',
    'spy.webp'
];

export const TWITTER_URL_PATTERN = /^https:\/\/(?:www\.)?(?:x|twitter)\.com\/[^/]+\/?$/i;
export const PIXIV_URL_PATTERN = /^https:\/\/(?:www\.)?pixiv\.net\/(?:en\/)?users\/\d+\/?$/i;

export const filterArtistOptions = (
    artists: readonly ArtistRaw[],
    value: string,
    limit = 12
): ArtistRaw[] => {
    const query = value.trim().toLocaleLowerCase();
    if (!query) return artists.slice(0, limit);

    return artists
        .map((artist, index) => {
            const id = artist.id.toLocaleLowerCase();
            const name = artist.name.toLocaleLowerCase();
            const rank = id === query
                ? 0
                : name === query
                ? 1
                : id.startsWith(query)
                ? 2
                : name.startsWith(query)
                ? 3
                : id.includes(query)
                ? 4
                : name.includes(query)
                ? 5
                : null;
            return { artist, index, rank };
        })
        .filter((result): result is { artist: ArtistRaw; index: number; rank: number } => result.rank !== null)
        .sort((left, right) => left.rank - right.rank || left.index - right.index)
        .slice(0, limit)
        .map(result => result.artist);
};

export const getRandomPlaceholder = (): string => {
    const filename = PLACEHOLDER_FILENAMES[Math.floor(Math.random() * PLACEHOLDER_FILENAMES.length)];
    return `portraits/placeholders/${filename}`;
};

export const validateArtistForm = (
    form: ArtistEntryForm,
    existingArtistIds: ReadonlySet<string>
): string => {
    const id = form.id.trim();
    if (!id) return 'Artist ID is required.';
    if (!/^[a-z0-9_]+$/.test(id)) return 'Artist ID may contain only lowercase letters, numbers, and underscores.';
    if (existingArtistIds.has(id)) return 'Artist ID already exists.';
    if (!form.name.trim()) return 'Artist name is required.';
    if (form.linkTwitter.trim() && !TWITTER_URL_PATTERN.test(form.linkTwitter.trim())) {
        return 'Enter a valid X or Twitter profile URL.';
    }
    if (form.linkPixiv.trim() && !PIXIV_URL_PATTERN.test(form.linkPixiv.trim())) {
        return 'Enter a valid Pixiv user URL.';
    }
    return '';
};

export const buildArtistEntry = (
    form: ArtistEntryForm,
    portrait = getRandomPlaceholder()
): ArtistRaw => ({
    id: form.id.trim(),
    name: form.name.trim(),
    ...(form.linkTwitter.trim() ? { linkTwitter: form.linkTwitter.trim() } : {}),
    ...(form.linkPixiv.trim() ? { linkPixiv: form.linkPixiv.trim() } : {}),
    portrait
});
