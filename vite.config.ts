import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import postDataPlugin from './plugins/postDataPlugin';

const dataPath = fileURLToPath(new URL('./data', import.meta.url));

export default defineConfig({
    plugins: [sveltekit(), postDataPlugin],
    server: {
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd()), dataPath]
        },
        open: '/'
    }
});
