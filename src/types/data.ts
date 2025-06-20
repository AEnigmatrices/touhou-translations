export interface Post {
    url: string;
    src: string;
    desc: string;
    artistId: string;
    characterIds: string[];
}

export interface Artist {
    name: string;
    profile1?: string;
    profile2?: string;
}

export interface Character {
    name: string;
}
