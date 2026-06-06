import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

const generateSitemapPlugin: Plugin = {
    name: 'generate-sitemap',
    closeBundle() {
        const BASE_URL = 'https://aenigmatrices.github.io/touhou-translations/';
        const outDir = path.resolve(__dirname, '../dist/client');

        const staticRoutes = ['', 'gallery', 'artists', 'characters'];

        const escapeXml = (str: string): string =>
            str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');

        const generalUrls = staticRoutes.map(route =>
            `${BASE_URL}${route}${route ? '/' : ''}`
        );

        generalUrls.sort();

        const makeXml = (urls: string[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${escapeXml(u)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

        const generalPath = path.join(outDir, 'sitemap-general.xml');
        const indexPath = path.join(outDir, 'sitemap_index.xml');

        fs.writeFileSync(generalPath, makeXml(generalUrls), 'utf-8');

        const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}sitemap-general.xml</loc>
  </sitemap>
</sitemapindex>
`;

        fs.writeFileSync(indexPath, indexXml, 'utf-8');

        console.log(`Generated:
  • ${generalUrls.length} general URLs
  • sitemap index at ${indexPath}`);
    }
};

export default generateSitemapPlugin;
