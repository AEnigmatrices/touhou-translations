import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://aenigmatrices.github.io/touhou-translations/';
const outDir = path.resolve('build');
const staticRoutes = ['', 'gallery', 'artists', 'characters'];

const escapeXml = (str: string): string =>
    str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

const makeXml = (urls: string[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${escapeXml(u)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

const generalUrls = staticRoutes
    .map(route => `${BASE_URL}${route}${route ? '/' : ''}`)
    .sort();

if (!fs.existsSync(outDir)) {
    console.error(`Build output not found: ${outDir}`);
    process.exit(1);
}

fs.writeFileSync(path.join(outDir, 'sitemap-general.xml'), makeXml(generalUrls), 'utf-8');
fs.writeFileSync(
    path.join(outDir, 'sitemap_index.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}sitemap-general.xml</loc>
  </sitemap>
</sitemapindex>
`,
    'utf-8'
);

console.log(`Generated sitemap for ${generalUrls.length} static URLs.`);
