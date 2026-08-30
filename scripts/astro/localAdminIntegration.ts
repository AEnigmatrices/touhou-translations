import fs from 'node:fs';
import path from 'node:path';
import type { AstroIntegration } from 'astro';
import type { Plugin } from 'vite';
import postDataHotUpdatePlugin from '../vite/postDataHotUpdatePlugin.ts';

const adminApiEntrypoint = new URL('./adminApi.ts', import.meta.url);
const portraitDirectory = path.resolve(process.cwd(), 'src/assets/portraits');

const localPortraitAssetsPlugin: Plugin = {
    name: 'touhou-translations-local-portrait-assets',
    configureServer(server) {
        server.middlewares.use((request, response, next) => {
            const pathname = request.url ? new URL(request.url, 'http://localhost').pathname : '';
            if (!pathname.startsWith('/portraits/')) {
                next();
                return;
            }

            const relativePath = decodeURIComponent(pathname.slice('/portraits/'.length));
            const filePath = path.resolve(portraitDirectory, relativePath);
            if (!filePath.startsWith(`${portraitDirectory}${path.sep}`) || !fs.existsSync(filePath)) {
                next();
                return;
            }

            response.statusCode = 200;
            response.setHeader('Content-Type', 'image/webp');
            fs.createReadStream(filePath).pipe(response);
        });
    }
};

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
                    plugins: [postDataHotUpdatePlugin, localPortraitAssetsPlugin]
                }
            });
        }
    }
});

export default localAdminIntegration;
