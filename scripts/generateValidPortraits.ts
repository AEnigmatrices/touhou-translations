import fs from 'fs/promises';
import path from 'path';

const ROOT_DIR = path.resolve('.'); // Project root
const OUTPUT_DIR = path.join(ROOT_DIR, 'data');
const PORTRAITS_DIR = path.join(ROOT_DIR, 'public', 'portraits');
const CHARACTER_THUMB_DIR = path.join(PORTRAITS_DIR, 'characters', 'thumb_80x80');
const ARTIST_THUMB_DIR = path.join(PORTRAITS_DIR, 'artists', 'thumb_80x80');

const getIdsFromDir = async (dir) => {
    try {
        const files = await fs.readdir(dir);
        return files
            .filter((f) => f.endsWith('_80x80.webp'))
            .map((f) => f.replace('_80x80.webp', ''));
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
        return [];
    }
}

const generate = async () => {
    const characters = await getIdsFromDir(CHARACTER_THUMB_DIR);
    const artists = await getIdsFromDir(ARTIST_THUMB_DIR);

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const outputData = { characters, artists };

    await fs.writeFile(
        path.join(OUTPUT_DIR, 'valid-portraits.json'),
        JSON.stringify(outputData, null, 2),
        'utf-8'
    );

    console.log(`Generated valid-portraits.json with ${characters.length} characters and ${artists.length} artists.`);
}

generate().catch((err) => {
    console.error('Failed to generate valid portraits JSON:', err);
});