import fs from 'node:fs';
import path from 'node:path';
import type { HomePost } from '../src/types/data';

const rootDir = path.resolve(import.meta.dirname, '..');
const generatedDir = path.join(rootDir, 'generated');
const publicDir = path.join(rootDir, 'public');
const runtimeDir = path.join(publicDir, 'runtime-data');
const dailyPostsDir = path.join(runtimeDir, 'daily-posts');

const copyGeneratedFile = (filename: string, destination: string): void => {
    const source = path.join(generatedDir, filename);
    if (!fs.existsSync(source)) throw new Error(`Generated runtime data is missing: ${source}`);
    fs.copyFileSync(source, destination);
};

fs.rmSync(runtimeDir, { recursive: true, force: true });
fs.mkdirSync(dailyPostsDir, { recursive: true });

copyGeneratedFile('gallery-posts.json', path.join(runtimeDir, 'gallery-posts.json'));
copyGeneratedFile('artists.json', path.join(runtimeDir, 'artists.json'));
copyGeneratedFile('characters.json', path.join(runtimeDir, 'characters.json'));
copyGeneratedFile('post-ids.json', path.join(publicDir, 'post-ids.json'));

const homePosts = JSON.parse(
    fs.readFileSync(path.join(generatedDir, 'home-posts.json'), 'utf8')
) as HomePost[];

homePosts.forEach((post, index) => {
    fs.writeFileSync(
        path.join(dailyPostsDir, `${index}.json`),
        JSON.stringify(post),
        'utf8'
    );
});

console.log(`Published browser runtime data for ${homePosts.length} daily-post candidates.`);
