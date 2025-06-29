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
    name: string;
    linkTwitter?: string;
    linkPixiv?: string;
}

export interface Character {
    name: string;
}
