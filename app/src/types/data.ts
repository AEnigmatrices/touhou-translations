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
}

export interface Character {
    id: string;
    name: string;
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