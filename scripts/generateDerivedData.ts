import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildDerivedData } from '../src/utils/fetchData';
import { extractRedditId } from '../src/utils/extractRedditId';
import type { ArtistRaw, CharacterRaw, GalleryPost, HomePost, Post, RelatedPost } from '../src/types/data';
import { printValidationResult, validateData } from './validateData';

interface PostIndexEntry {
    chunk: string;
    prevPostId: string | null;
    nextPostId: string | null;
}

const readJson = <T>(filePath: string): T => JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
const writeJson = (filePath: string, value: unknown): void => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(value), 'utf8');
};

export const generateDerivedData = (rootDir = process.cwd()): void => {
    const validation = validateData(rootDir);
    printValidationResult(validation);
    if (validation.errors.length > 0) throw new Error('Cannot generate runtime data from invalid source data.');

    const generatedDir = path.join(rootDir, 'generated');
    const generatedPostsDir = path.join(generatedDir, 'posts');
    const postsDir = path.join(rootDir, 'data', 'posts');
    const posts = fs.readdirSync(postsDir)
        .filter(file => file.endsWith('.json'))
        .sort()
        .flatMap(file => readJson<Post[]>(path.join(postsDir, file)))
        .sort((a, b) => a.date - b.date);
    const artistsRaw = readJson<ArtistRaw[]>(path.join(rootDir, 'data', 'artists.json'));
    const charactersRaw = readJson<CharacterRaw[]>(path.join(rootDir, 'data', 'characters.json'));
    const derived = buildDerivedData(posts, artistsRaw, charactersRaw);

    fs.rmSync(generatedDir, { recursive: true, force: true });
    fs.mkdirSync(generatedPostsDir, { recursive: true });

    const chunks = new Map<string, Post[]>();
    const postIndex: Record<string, PostIndexEntry> = {};
    const artistPosts: Record<string, RelatedPost[]> = {};
    const homePosts: HomePost[] = [];
    const galleryPosts: GalleryPost[] = [];
    const postIds: string[] = [];

    for (const post of posts) {
        const id = extractRedditId(post.reddit);
        if (!id) continue;

        const date = new Date(post.date);
        const chunk = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
        const chunkPosts = chunks.get(chunk) ?? [];
        chunkPosts.push(post);
        chunks.set(chunk, chunkPosts);

        const adjacent = derived.adjacentPostIdsByPostId.get(id) ?? { prevPostId: null, nextPostId: null };
        postIndex[id] = { chunk, ...adjacent };
        postIds.push(id);

        const summary: HomePost = { id, img: post.url[0], nsfw: post.nsfw, date: post.date };
        homePosts.push(summary);
        galleryPosts.push({ ...summary, artistId: post.artistId, characterIds: post.characterIds });

        const related = artistPosts[post.artistId] ?? [];
        related.push({ id, img: post.url[0], nsfw: post.nsfw });
        artistPosts[post.artistId] = related;
    }

    for (const [chunk, chunkPosts] of chunks) {
        writeJson(path.join(generatedPostsDir, `${chunk}.json`), chunkPosts);
    }

    writeJson(path.join(generatedDir, 'post-ids.json'), postIds);
    writeJson(path.join(generatedDir, 'home-posts.json'), homePosts);
    writeJson(path.join(generatedDir, 'gallery-posts.json'), galleryPosts);
    writeJson(path.join(generatedDir, 'artists.json'), derived.artists);
    writeJson(path.join(generatedDir, 'characters.json'), derived.characters);
    writeJson(path.join(generatedDir, 'post-index.json'), postIndex);
    writeJson(path.join(generatedDir, 'artist-posts.json'), artistPosts);

    console.log(`Generated runtime data for ${postIds.length} posts across ${chunks.size} monthly chunks.`);
};

const isCliRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCliRun) generateDerivedData();
