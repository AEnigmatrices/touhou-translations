export const getCharacterPortraits = (id: string): string => {
    return `${import.meta.env.BASE_URL}portraits/characters/thumb_80x80/${id}_80x80.webp`;
};

export const getArtistPortraits = (id: string): string => {
    return `${import.meta.env.BASE_URL}portraits/artists/thumb_80x80/${id}_80x80.webp`;
};

const placeholderFilenames = [
    "demoman_80x80.webp",
    "engineer_80x80.webp",
    "heavy_80x80.webp",
    "medic_80x80.webp",
    "pyro_80x80.webp",
    "scout_80x80.webp",
    "sniper_80x80.webp",
    "soldier_80x80.webp",
    "spy_80x80.webp"
];

export const getRandomPlaceholder = (): string => {
    const index = Math.floor(Math.random() * placeholderFilenames.length);
    return `${import.meta.env.BASE_URL}portraits/placeholders/thumb_80x80/${placeholderFilenames[index]}`;
};