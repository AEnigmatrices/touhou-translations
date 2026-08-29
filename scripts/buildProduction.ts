import fs from 'node:fs';
import path from 'node:path';
import { build } from 'vite';

const rootDir = path.resolve(import.meta.dirname, '..');
const sourceRoutesDir = path.join(rootDir, 'src', 'routes');
const productionRoutesDir = path.join(rootDir, 'src', '.production-routes');
const adminRoutesDir = path.join(sourceRoutesDir, 'admin');

const isInsideAdminRoute = (source: string): boolean => {
    const relativePath = path.relative(adminRoutesDir, source);
    return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
};

fs.rmSync(productionRoutesDir, { recursive: true, force: true });
const buildStartedAt = performance.now();

try {
    fs.cpSync(sourceRoutesDir, productionRoutesDir, {
        recursive: true,
        filter: source => !isInsideAdminRoute(source)
    });

    process.env.SVELTEKIT_ROUTES_DIR = 'src/.production-routes';
    await build({ mode: 'production' });
    const elapsedSeconds = (performance.now() - buildStartedAt) / 1000;
    console.log(`Production build completed in ${elapsedSeconds.toFixed(1)} seconds.`);
} finally {
    delete process.env.SVELTEKIT_ROUTES_DIR;
    fs.rmSync(productionRoutesDir, { recursive: true, force: true });
}
