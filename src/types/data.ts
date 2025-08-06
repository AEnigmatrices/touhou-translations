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
    portrait: string;
    artworkCount: number;
}

export interface Character {
    id: string;
    name: string;
    work: string[];
    portrait: string;
    artworkCount: number;
}

export interface PostEntryForm {
    date: number;
    reddit: string;
    urls: string;
    src: string;
    desc: string;
    artistId: string;
    characterIds: string[];
}

export interface ArtistRaw {
    id: string;
    name: string;
    linkTwitter?: string;
    linkPixiv?: string;
    portrait: string;
}

export interface CharacterRaw {
    id: string;
    name: string;
    work: string[];
    portrait: string;
}

export type SortOrder = "none" | "asc" | "desc";