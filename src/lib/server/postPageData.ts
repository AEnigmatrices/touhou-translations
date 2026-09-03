import type { Artist, Character, GeneratedPost, RelatedPost } from '../../types/data';
import { getArchive } from '../content/archive';
import { extractRedditId } from '../../utils/extractRedditId';
import { markdownExcerpt, renderMarkdown } from '../../utils/renderMarkdown';

export interface PostPageData {
    id: string;
    post: GeneratedPost;
    artist: Artist | null;
    characters: Character[];
    relatedPosts: RelatedPost[];
    prevPostId: string | null;
    nextPostId: string | null;
}

export const getPostIds = async (): Promise<string[]> =>
    (await getArchive()).postIds;

const selectRelatedPosts = (posts: RelatedPost[], currentPostId: string, limit = 4): RelatedPost[] => {
    if (posts.length <= 1 || limit <= 0) return [];

    const currentIndex = posts.findIndex(post => post.id === currentPostId);
    if (currentIndex === -1) return posts.filter(post => post.id !== currentPostId).slice(0, limit);

    const selected: RelatedPost[] = [];
    for (let offset = 1; offset < posts.length && selected.length < limit; offset += 1) {
        const candidate = posts[(currentIndex + offset) % posts.length];
        if (candidate.id !== currentPostId) selected.push(candidate);
    }

    return selected;
};

export const getPostPageData = async (postId: string): Promise<PostPageData | null> => {
    const archive = await getArchive();
    const sourcePost = archive.postByRedditId.get(postId);
    if (!sourcePost) return null;

    const { desc, ...postWithoutDescription } = sourcePost;
    const imageDimensions = sourcePost.url.map(url => archive.mediaByArtworkUrl[url]?.imageDimensions ?? null);
    const imageSources = sourcePost.url.map(url => archive.mediaByArtworkUrl[url]?.imageSources ?? []);
    const post: GeneratedPost = {
        ...postWithoutDescription,
        ...(archive.hasMediaMetadata ? { imageDimensions, imageSources } : {}),
        htmlDescription: renderMarkdown(desc),
        metadataDescription: markdownExcerpt(desc)
    };

    const characterIds = new Set(post.characterIds);
    const adjacent = archive.adjacentPostIdsByPostId.get(postId) ?? {
        prevPostId: null,
        nextPostId: null
    };
    const artistPosts = archive.artistPostsByArtistId.get(post.artistId) ?? [];
    const relatedPosts = artistPosts.map(candidate => {
        const id = extractRedditId(candidate.reddit);
        const media = archive.mediaByArtworkUrl[candidate.url[0]];
        return {
            id,
            img: candidate.url[0],
            ...(media?.imageSources.length ? { imgSources: media.imageSources } : {}),
            nsfw: candidate.nsfw
        };
    });

    return {
        id: postId,
        post,
        artist: archive.artistById.get(post.artistId) ?? null,
        characters: archive.characters.filter(character => characterIds.has(character.id)),
        relatedPosts: selectRelatedPosts(relatedPosts, postId),
        prevPostId: adjacent.prevPostId,
        nextPostId: adjacent.nextPostId
    };
};
