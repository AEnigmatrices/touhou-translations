import type { Artist, SortOrder } from "../../types/data";

export const searchArtists = (artists: Artist[], query: string): Artist[] =>
    artists.filter(({ id, name }) =>
        [id, name].some(field => field.toLowerCase().includes(query.toLowerCase()))
    );

export const sortArtists = (artists: Artist[], order: SortOrder): Artist[] =>
    order === "none"
        ? artists
        : [...artists].sort((a, b) => order === "asc"
            ? a.artworkCount - b.artworkCount
            : b.artworkCount - a.artworkCount
        );