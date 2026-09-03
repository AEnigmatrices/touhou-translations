import {
    getArtists,
    getCharacters,
    getGalleryPosts,
    getHomePosts
} from '../lib/content/projections';
import type { Artist, Character, GalleryPost, HomePost } from '../types/data';

export const fetchHomePosts = (): Promise<HomePost[]> => getHomePosts();

export const fetchGalleryData = async (): Promise<{ posts: GalleryPost[] }> => ({
    posts: await getGalleryPosts()
});

export const fetchArtistsData = async (): Promise<{ artists: Artist[] }> => ({
    artists: await getArtists()
});

export const fetchCharactersData = async (): Promise<{ characters: Character[] }> => ({
    characters: await getCharacters()
});
