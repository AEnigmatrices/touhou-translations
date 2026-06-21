import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const generatedDirectories = [
    '.svelte-kit',
    'build',
    'dist',
    'generated',
    'playwright-report',
    'test-results'
];

for (const directory of generatedDirectories) {
    fs.rmSync(path.join(rootDir, directory), { recursive: true, force: true });
}
