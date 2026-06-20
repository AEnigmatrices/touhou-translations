import type { Artist, Character, GalleryPost, HomePost, Post, RelatedPost } from '../types/data';

interface PostIndexEntry {
    chunk: string;
    prevPostId: string | null;
    nextPostId: string | null;
}

interface PostDetailData {
    post: Post;
    artist: Artist | null;
    characters: Character[];
    artistPosts: RelatedPost[];
    prevPostId: string | null;
    nextPostId: string | null;
}

const postChunkModules = import.meta.glob<{ default: Post[] }>('../../generated/posts/*.json');

export const fetchPostIds = async (): Promise<string[]> =>
    (await import('../../generated/post-ids.json')).default;

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

export const fetchPostDetail = async (postId: string): Promise<PostDetailData | null> => {
    const postIndex = (await import('../../generated/post-index.json')).default as Record<string, PostIndexEntry>;
    const entry = postIndex[postId];
    if (!entry) return null;

    const chunkLoader = postChunkModules[`../../generated/posts/${entry.chunk}.json`];
    if (!chunkLoader) return null;

    const [postModule, artistsModule, charactersModule, artistPostsModule] = await Promise.all([
        chunkLoader(),
        import('../../generated/artists.json'),
        import('../../generated/characters.json'),
        import('../../generated/artist-posts.json')
    ]);
    const post = postModule.default.find(candidate => candidate.reddit.includes(`/comments/${postId}`));
    if (!post) return null;

    const artists = artistsModule.default as Artist[];
    const characters = charactersModule.default as Character[];
    const artistPosts = artistPostsModule.default as Record<string, RelatedPost[]>;
    const characterIds = new Set(post.characterIds);

    return {
        post,
        artist: artists.find(artist => artist.id === post.artistId) ?? null,
        characters: characters.filter(character => characterIds.has(character.id)),
        artistPosts: artistPosts[post.artistId] ?? [],
        prevPostId: entry.prevPostId,
        nextPostId: entry.nextPostId
    };
};
