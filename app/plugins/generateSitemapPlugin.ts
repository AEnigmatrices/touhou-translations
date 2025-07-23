import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

const generateSitemapPlugin: Plugin = {
    name: 'generate-sitemap',
    closeBundle() {
        const BASE_URL = 'https://aenigmatrices.github.io/touhou-translations';
        const postsDir = path.resolve(__dirname, '../../data/posts');

        let posts: any[] = [];
        try {
            const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.json'));
            files.forEach(file => {
                const filePath = path.join(postsDir, file);
                const raw = fs.readFileSync(filePath, 'utf-8');
                const data = JSON.parse(raw);
                if (Array.isArray(data)) {
                    posts = posts.concat(data);
                }
            });
        } catch {
            posts = [];
        }

        const staticRoutes = ['', 'search', 'characters', 'artists', 'gallery'];
        const urls = staticRoutes.map(route => `${BASE_URL}${route ? '/' + route : ''}`);

        posts.forEach((post, index) => {
            if (post) urls.push(`${BASE_URL}/post/${index + 1}`);
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
            urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n') +
            `\n</urlset>`;

        const outputPath = path.resolve(__dirname, '../dist', 'sitemap.xml');
        fs.writeFileSync(outputPath, xml, 'utf-8');

        console.log(`Sitemap generated with ${urls.length} URLs at ${outputPath}`);
    }
};

export default generateSitemapPlugin;