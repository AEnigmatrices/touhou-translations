export interface Post {
    date: number;
    reddit: string;
    url: string[];
    src: string;
    desc: string;
    artistId: string;
    characterIds: string[];
    nsfw: boolean;
}

export interface ResponsiveImageSource {
    url: string;
    width: number;
}

export interface PortraitImage {
    src: string;
    srcset: string;
    width: number;
    height: number;
}

export interface HomePost {
    id: string;
    img: string;
    imgSources?: ResponsiveImageSource[];
    nsfw: boolean;
    date: number;
}

export interface GalleryPost extends HomePost {
    artistId: string;
    characterIds: string[];
}

export interface RelatedPost {
    id: string;
    img: string;
    imgSources?: ResponsiveImageSource[];
    nsfw: boolean;
}

export interface ImageDimensions {
    width: number;
    height: number;
}

export interface GeneratedPost extends Omit<Post, 'desc'> {
    imageDimensions?: Array<ImageDimensions | null>;
    imageSources?: ResponsiveImageSource[][];
    htmlDescription: string;
    metadataDescription: string;
}

export interface Artist {
    id: string;
    name: string;
    linkTwitter?: string;
    linkPixiv?: string;
    portrait: string;
    artworkCount: number;
    characterCount: number;
}

export interface Character {
    id: string;
    name: string;
    short_name: string;
    work: string[];
    portrait: string;
    artworkCount: number;
    artistCount: number;
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
    short_name: string;
    work: string[];
    portrait: string;
}

export type SortOrder = "none" | "asc" | "desc";
