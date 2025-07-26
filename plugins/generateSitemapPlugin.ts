import fs from 'fs';
import path from 'path';
import { extractRedditId } from './../src/utils/extractRedditId';
import type { Plugin } from 'vite';

const generateSitemapPlugin: Plugin = {
    name: 'generate-sitemap',
    closeBundle() {
        const BASE_URL = 'https://aenigmatrices.github.io/touhou-translations';
        const postsDir = path.resolve(__dirname, '../data/posts');

        const staticRoutes = ['', 'gallery', 'artists', 'characters'];
        const urls: string[] = staticRoutes.map(route =>
            `${BASE_URL}/${route}`
        );

        let posts: { reddit: string }[] = [];
        try {
            const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.json'));
            for (const file of files) {
                const filePath = path.join(postsDir, file);
                const raw = fs.readFileSync(filePath, 'utf-8');
                const data = JSON.parse(raw);
                if (Array.isArray(data)) {
                    posts = posts.concat(data.filter((p): p is { reddit: string } => !!p?.reddit));
                }
            }
        } catch (error) {
            console.warn('Failed to read or parse post files:', error);
        }

        posts.forEach(post => {
            const redditId = extractRedditId(post.reddit);
            if (redditId) {
                urls.push(`${BASE_URL}/posts/${redditId}`);
            }
        });

        urls.sort();

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`.trim();

        const outputPath = path.resolve(__dirname, '../dist', 'sitemap.xml');
        fs.writeFileSync(outputPath, xml, 'utf-8');

        console.log(`✅ Sitemap generated with ${urls.length} URLs at ${outputPath}`);
    }
};

export default generateSitemapPlugin;