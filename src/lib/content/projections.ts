import type { Artist, Character, GalleryPost, HomePost } from '../../types/data';
import { extractRedditId } from '../../utils/extractRedditId';
import { getArchive } from './archive';

export const getHomePosts = async (): Promise<HomePost[]> => {
    const archive = await getArchive();
    return archive.posts.map(post => {
        const media = archive.mediaByArtworkUrl[post.url[0]];
        return {
            id: extractRedditId(post.reddit),
            img: post.url[0],
            ...(media?.imageSources.length ? { imgSources: media.imageSources } : {}),
            nsfw: post.nsfw,
            date: post.date
        };
    });
};

export const getGalleryPosts = async (): Promise<GalleryPost[]> => {
    const archive = await getArchive();
    return archive.posts.map(post => {
        const media = archive.mediaByArtworkUrl[post.url[0]];
        return {
            id: extractRedditId(post.reddit),
            img: post.url[0],
            ...(media?.imageSources.length ? { imgSources: media.imageSources } : {}),
            nsfw: post.nsfw,
            date: post.date,
            artistId: post.artistId,
            characterIds: post.characterIds
        };
    });
};

export const getArtists = async (): Promise<Artist[]> => (await getArchive()).artists;
export const getCharacters = async (): Promise<Character[]> => (await getArchive()).characters;
