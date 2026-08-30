import type { AstroIntegration } from 'astro';
import postDataPlugin from '../vite/postDataPlugin.ts';

const localAdminIntegration = (): AstroIntegration => ({
    name: 'touhou-translations-local-admin',
    hooks: {
        'astro:config:setup': ({ command, injectRoute, updateConfig }) => {
            if (command !== 'dev') return;

            injectRoute({
                pattern: '/admin',
                entrypoint: new URL('../../src/dev/AdminPage.astro', import.meta.url)
            });
            updateConfig({
                vite: {
                    plugins: [postDataPlugin]
                }
            });
        }
    }
});

export default localAdminIntegration;
