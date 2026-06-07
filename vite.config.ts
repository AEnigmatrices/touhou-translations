import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import pwaPlugin from './plugins/pwaPlugin';
import postDataPlugin from './plugins/postDataPlugin';

const dataPath = fileURLToPath(new URL('./data', import.meta.url));

const productionPlugins = process.env.NODE_ENV === 'production'
    ? [pwaPlugin]
    : [];

export default defineConfig({
    plugins: [sveltekit(), postDataPlugin, ...productionPlugins],
    server: {
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd()), dataPath]
        },
        open: '/'
    }
});
