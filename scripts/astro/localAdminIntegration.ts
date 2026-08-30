import type { AstroIntegration } from 'astro';
import postDataHotUpdatePlugin from '../vite/postDataHotUpdatePlugin.ts';

const adminApiEntrypoint = new URL('./adminApi.ts', import.meta.url);

const localAdminIntegration = (): AstroIntegration => ({
    name: 'touhou-translations-local-admin',
    hooks: {
        'astro:config:setup': ({ command, injectRoute, updateConfig }) => {
            if (command !== 'dev') return;

            injectRoute({
                pattern: '/admin',
                entrypoint: new URL('../../src/dev/AdminPage.astro', import.meta.url)
            });
            for (const pattern of ['/api/reddit-data', '/api/posts', '/api/artists']) {
                injectRoute({
                    pattern,
                    entrypoint: adminApiEntrypoint,
                    prerender: false
                });
            }
            updateConfig({
                vite: {
                    plugins: [postDataHotUpdatePlugin]
                }
            });
        }
    }
});

export default localAdminIntegration;
