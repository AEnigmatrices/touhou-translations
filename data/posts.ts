import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import type { Post } from '../src/types/data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDir = resolve(__dirname, './posts');

const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.json'));

export const posts: Post[] = postFiles.flatMap(file => {
    const content = fs.readFileSync(resolve(postsDir, file), 'utf-8');
    return JSON.parse(content) as Post[];
});
