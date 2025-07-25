export interface Post {
    date: number;
    reddit: string;
    url: string[];
    src: string;
    desc: string;
    artistId: string;
    characterIds: string[];
}

export interface Artist {
    id: string;
    name: string;
    linkTwitter?: string;
    linkPixiv?: string;
    artworkCount: number;
}

export interface Character {
    id: string;
    name: string;
    work: string[];
    artworkCount: number;
}

export interface PostEntryForm {
    date: number;
    reddit: string;
    urls: string;
    src: string;
    desc: string;
    artistId: string;
    characterIds: string;
}

export interface ArtistRaw {
    id: string;
    name: string;
    linkTwitter?: string;
    linkPixiv?: string;
}

export interface CharacterRaw {
    id: string;
    name: string;
    work: string[];
}

export type SortOrder = "none" | "asc" | "desc";