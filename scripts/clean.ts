import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const generatedPaths = [
    '.astro',
    '.cache',
    'build',
    'dist',
    'generated',
    'playwright-report',
    'test-results'
];

for (const relativePath of generatedPaths) {
    fs.rmSync(path.join(rootDir, relativePath), { recursive: true, force: true });
}
