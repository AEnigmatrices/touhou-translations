export interface Post {
    id: number;
    url: string;
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
