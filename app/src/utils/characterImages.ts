const characterImages: Record<string, string> = import.meta.glob(
    "../icons/characters/*.webp",
    { eager: true, query: "?url", import: "default" }
);

export const getCharacterImages = (id: string): string | null => {
    const relativePath = `../icons/characters/${id}.webp`;
    return characterImages[relativePath] ?? null;
};