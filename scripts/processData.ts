import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import type { Post, CharacterRaw, ArtistRaw, Character, Artist } from '../src/types/data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDir = resolve(__dirname, '../data/posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.json'));

const posts: Post[] = postFiles.flatMap(file => {
    const content = fs.readFileSync(resolve(postsDir, file), 'utf-8');
    return JSON.parse(content) as Post[];
});

const rawCharacters = JSON.parse(fs.readFileSync(resolve(__dirname, '../data/characters.json'), 'utf-8'));
const getCharacterArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        for (const id of post.characterIds) {
            countMap[id] = (countMap[id] ?? 0) + 1;
        }
    }
    return countMap;
};

const characterCountMap = getCharacterArtworkCounts(posts);
const characters: Character[] = (rawCharacters as CharacterRaw[]).map(c => ({
    ...c,
    artworkCount: characterCountMap[c.id] ?? 0
}));

const rawArtists = JSON.parse(fs.readFileSync(resolve(__dirname, '../data/artists.json'), 'utf-8'));
const getArtistArtworkCounts = (posts: Post[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    for (const post of posts) {
        const id = post.artistId;
        countMap[id] = (countMap[id] ?? 0) + 1;
    }
    return countMap;
};

const artistCountMap = getArtistArtworkCounts(posts);
const artists: Artist[] = (rawArtists as ArtistRaw[]).map(a => ({
    ...a,
    artworkCount: artistCountMap[a.id] ?? 0
}));

const outputDir = resolve(__dirname, '../data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
    resolve(__dirname, '../data/processed-data.ts'),
    `// This file is auto-generated. Do not edit manually.
import type { Post, Character, Artist } from '../src/types/data';

export const posts: Post[] = ${JSON.stringify(posts, null, 2)};

export const characters: Character[] = ${JSON.stringify(characters, null, 2)};

export const artists: Artist[] = ${JSON.stringify(artists, null, 2)};
`
);

console.log('Data processing completed successfully!');