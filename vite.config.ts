import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import { searchForWorkspaceRoot } from 'vite';
import { defineConfig } from 'vitest/config';
import postDataPlugin from './plugins/postDataPlugin';

const dataPath = fileURLToPath(new URL('./data', import.meta.url));

export default defineConfig({
    plugins: [sveltekit(), postDataPlugin],
    server: {
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd()), dataPath]
        },
        open: '/'
    },
    build: {
        sourcemap: true
    },
    test: {
        environment: 'node',
        include: ['src/**/*.test.ts', 'scripts/**/*.test.ts']
    }
});
