import type { Artist, Character, GeneratedPost, RelatedPost } from '../../types/data';
import { extractRedditId } from '../../utils/extractRedditId';

interface PostIndexEntry {
    chunk: string;
    prevPostId: string | null;
    nextPostId: string | null;
}

interface SharedPostData {
    postIndex: Record<string, PostIndexEntry>;
    artists: Artist[];
    characters: Character[];
    artistPosts: Record<string, RelatedPost[]>;
}

export interface PostPageData {
    id: string;
    post: GeneratedPost;
    artist: Artist | null;
    characters: Character[];
    relatedPosts: RelatedPost[];
    prevPostId: string | null;
    nextPostId: string | null;
}

const postChunkModules = import.meta.glob<{ default: GeneratedPost[] }>('../../../generated/posts/*.json');
let sharedPostDataPromise: Promise<SharedPostData> | undefined;

export const getPostIds = async (): Promise<string[]> =>
    (await import('../../../generated/post-ids.json')).default;

const getSharedPostData = (): Promise<SharedPostData> => {
    sharedPostDataPromise ??= Promise.all([
        import('../../../generated/post-index.json'),
        import('../../../generated/artists.json'),
        import('../../../generated/characters.json'),
        import('../../../generated/artist-posts.json')
    ]).then(([postIndexModule, artistsModule, charactersModule, artistPostsModule]) => ({
        postIndex: postIndexModule.default as Record<string, PostIndexEntry>,
        artists: artistsModule.default as Artist[],
        characters: charactersModule.default as Character[],
        artistPosts: artistPostsModule.default as Record<string, RelatedPost[]>
    }));

    return sharedPostDataPromise;
};

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
    const sharedData = await getSharedPostData();
    const entry = sharedData.postIndex[postId];
    if (!entry) return null;

    const chunkLoader = postChunkModules[`../../../generated/posts/${entry.chunk}.json`];
    if (!chunkLoader) return null;

    const postModule = await chunkLoader();
    const post = postModule.default.find(candidate => extractRedditId(candidate.reddit) === postId);
    if (!post) return null;

    const characterIds = new Set(post.characterIds);

    return {
        id: postId,
        post,
        artist: sharedData.artists.find(artist => artist.id === post.artistId) ?? null,
        characters: sharedData.characters.filter(character => characterIds.has(character.id)),
        relatedPosts: selectRelatedPosts(sharedData.artistPosts[post.artistId] ?? [], postId),
        prevPostId: entry.prevPostId,
        nextPostId: entry.nextPostId
    };
};
