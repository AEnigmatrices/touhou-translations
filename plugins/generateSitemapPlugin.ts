import fs from 'fs';
import path from 'path';
import { extractRedditId } from './../src/utils/extractRedditId';
import type { Plugin } from 'vite';

const generateSitemapPlugin: Plugin = {
    name: 'generate-sitemap',
    closeBundle() {
        const BASE_URL = 'https://aenigmatrices.github.io/touhou-translations/';
        const outDir = path.resolve(__dirname, '../dist/client');
        const postsDir = path.resolve(__dirname, '../data/posts');

        const staticRoutes = ['', 'gallery', 'artists', 'characters'];
        const generalUrls = staticRoutes.map(route =>
            `${BASE_URL}${route}${route ? '/' : ''}`
        );

        let posts: { reddit: string }[] = [];
        try {
            const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.json'));
            for (const file of files) {
                const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
                const data = JSON.parse(raw);
                if (Array.isArray(data)) {
                    posts = posts.concat(data.filter((p): p is { reddit: string } => !!p?.reddit));
                }
            }
        } catch (error) {
            console.warn('Failed to read or parse post files:', error);
        }

        const postUrls: string[] = [];
        posts.forEach(post => {
            const id = extractRedditId(post.reddit);
            if (id) postUrls.push(`${BASE_URL}posts/${id}/`);
        });

        generalUrls.sort();
        postUrls.sort();

        const makeXml = (urls: string[]) => (
            `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`
        );

        const generalPath = path.join(outDir, 'sitemap-general.xml');
        const postsPath = path.join(outDir, 'sitemap-posts.xml');
        const indexPath = path.join(outDir, 'sitemap.xml');

        fs.writeFileSync(generalPath, makeXml(generalUrls), 'utf-8');
        fs.writeFileSync(postsPath, makeXml(postUrls), 'utf-8');

        const indexXml =
            `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE_URL}sitemap-general.xml</loc></sitemap>
  <sitemap><loc>${BASE_URL}sitemap-posts.xml</loc></sitemap>
</sitemapindex>`;

        fs.writeFileSync(indexPath, indexXml, 'utf-8');

        console.log(`Generated:
  • ${generalUrls.length} general URLs
  • ${postUrls.length} post URLs
  • sitemap index at ${indexPath}`);
    }
};

export default generateSitemapPlugin;
