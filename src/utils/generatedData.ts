import type { Artist, Character, GalleryPost, HomePost } from '../types/data';

export const fetchHomePosts = async (): Promise<HomePost[]> =>
    (await import('../../generated/home-posts.json')).default;

export const fetchGalleryData = async (): Promise<{ posts: GalleryPost[] }> => ({
    posts: (await import('../../generated/gallery-posts.json')).default
});

export const fetchArtistsData = async (): Promise<{ artists: Artist[] }> => ({
    artists: (await import('../../generated/artists.json')).default
});

export const fetchCharactersData = async (): Promise<{ characters: Character[] }> => ({
    characters: (await import('../../generated/characters.json')).default
});
