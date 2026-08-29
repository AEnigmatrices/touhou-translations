import adapter from '@sveltejs/adapter-static';
import type { Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

const config: Config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            fallback: '404.html'
        }),
        inlineStyleThreshold: 8192,
        csp: {
            directives: {
                'default-src': ['self'],
                'base-uri': ['self'],
                'connect-src': ['self'],
                'font-src': ['self'],
                'form-action': ['self'],
                'frame-src': ['https://www.youtube-nocookie.com'],
                'img-src': [
                    'self',
                    'data:',
                    'https://i.redd.it',
                    'https://i.ytimg.com'
                ],
                'object-src': ['none'],
                'script-src': ['self'],
                'style-src': ['self'],
                'style-src-attr': ['unsafe-inline'],
                'worker-src': ['self']
            }
        },
        files: {
            assets: 'public',
            routes: process.env.SVELTEKIT_ROUTES_DIR ?? 'src/routes'
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
