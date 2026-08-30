import { defineConfig } from 'astro/config';
import localAdminIntegration from './scripts/astro/localAdminIntegration.ts';

const dev = process.argv.includes('dev');

export default defineConfig({
    site: 'https://aenigmatrices.github.io',
    base: dev ? '/' : '/touhou-translations',
    outDir: './build',
    cacheDir: './.astro',
    output: 'static',
    trailingSlash: 'always',
    build: {
        format: 'directory'
    },
    markdown: {
        syntaxHighlight: false
    },
    devToolbar: {
        enabled: false
    },
    integrations: [localAdminIntegration()],
    security: {
        csp: {
            directives: [
                "default-src 'self'",
                "base-uri 'self'",
                "connect-src 'self'",
                "font-src 'self'",
                "form-action 'self'",
                'frame-src https://www.youtube-nocookie.com',
                "img-src 'self' data: https://i.redd.it https://preview.redd.it https://i.ytimg.com",
                "object-src 'none'",
                "worker-src 'self'"
            ],
            scriptDirective: {
                resources: ["'self'"]
            },
            styleDirective: {
                resources: [
                    { resource: "'self'", kind: 'element' },
                    { resource: "'unsafe-inline'", kind: 'attribute' }
                ]
            }
        }
    }
});
