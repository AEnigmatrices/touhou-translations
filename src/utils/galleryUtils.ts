const characterPortraits: Record<string, string> = import.meta.glob(
    "../icons/characters/portraits/*.webp", { eager: true, query: "?url", import: "default" }
);

const artistPortraits: Record<string, string> = import.meta.glob(
    "../icons/artists/*.webp", { eager: true, query: "?url", import: "default" }
);

const placeholderImages: Record<string, string> = import.meta.glob(
    "../icons/placeholders/*.webp", { eager: true, query: "?url", import: "default" }
);



export const getCharacterPortraits = (id: string): string | null => {
    const path = `../icons/characters/portraits/${id}.webp`;
    if (path in characterPortraits) return characterPortraits[path];

    const placeholders = Object.values(placeholderImages);
    return placeholders.length ? placeholders[Math.floor(Math.random() * placeholders.length)] : null;
};



export const getArtistPortraits = (id: string): string | null => {
    const path = `../icons/artists/${id}.webp`;
    if (path in artistPortraits) return artistPortraits[path];

    const placeholders = Object.values(placeholderImages);
    return placeholders.length ? placeholders[Math.floor(Math.random() * placeholders.length)] : null;
};



export const getGradient = (hue: number, saturation: number, lightness: number): string => {
    const hue2 = (hue + 20) % 360;
    return `linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%), hsl(${hue2}, ${saturation}%, ${lightness}%))`;
}