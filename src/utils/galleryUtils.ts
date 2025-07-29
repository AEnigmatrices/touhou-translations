export const getCharacterPortraits = (id: string): string => {
    return `${import.meta.env.BASE_URL}portraits/characters/${id}.webp`;
};

export const getArtistPortraits = (id: string): string => {
    return `${import.meta.env.BASE_URL}portraits/artists/${id}.webp`;
};

const placeholderFilenames = [
    "demoman.webp",
    "engineer.webp",
    "heavy.webp",
    "medic.webp",
    "pyro.webp",
    "scout.webp",
    "sniper.webp",
    "soldier.webp",
    "spy.webp"
];

export const getRandomPlaceholder = (): string => {
    const index = Math.floor(Math.random() * placeholderFilenames.length);
    return `${import.meta.env.BASE_URL}portraits/placeholders/${placeholderFilenames[index]}`;
};