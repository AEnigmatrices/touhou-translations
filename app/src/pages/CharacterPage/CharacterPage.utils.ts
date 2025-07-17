import type { Character } from "../../types/data";

export const searchCharacters = (characters: Character[], query: string): Character[] =>
    characters.filter(({ id, name }) =>
        [id, name].some(field => field.toLowerCase().includes(query.toLowerCase()))
    );

export const sortArtworkCounts = (characters: Character[], order: "asc" | "desc" | "none"): Character[] =>
    order === "none"
        ? characters
        : [...characters].sort((a, b) => order === "asc"
            ? a.artworkCount - b.artworkCount
            : b.artworkCount - a.artworkCount
        );
