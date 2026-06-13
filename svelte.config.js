import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            fallback: '404.html'
        }),
        files: {
            assets: 'public'
        },
        paths: {
            base: dev ? '' : '/touhou-translations'
        },
        serviceWorker: {
            files: file => /^(favicon\.ico|robots\.txt|manifest\.webmanifest|icons\/pwa\/.*\.png)$/.test(file)
        }
    }
};

export default config;
