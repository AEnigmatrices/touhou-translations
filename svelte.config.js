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
        csp: {
            directives: {
                'default-src': ['self'],
                'base-uri': ['self'],
                'connect-src': ['self'],
                'font-src': ['self', 'https://fonts.gstatic.com'],
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
                'style-src': ['self', 'https://fonts.googleapis.com'],
                'style-src-attr': ['unsafe-inline'],
                'worker-src': ['self']
            }
        },
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
