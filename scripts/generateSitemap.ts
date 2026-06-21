import fs from 'node:fs';
import path from 'node:path';
import type { Post } from '../src/types/data';
import { extractRedditId } from '../src/utils/extractRedditId';
import { SITE_URL } from '../src/utils/siteMetadata';

interface SitemapEntry {
    loc: string;
    lastmod?: string;
}

const outDir = path.resolve('build');
const postsDir = path.resolve('data', 'posts');
const staticRoutes = ['', 'gallery', 'artists', 'characters'];

const escapeXml = (value: string): string => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const makeUrlSet = (entries: SitemapEntry[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `
    <lastmod>${entry.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`;

const posts = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.json'))
    .sort()
    .flatMap(file => JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf8')) as Post[])
    .sort((a, b) => b.date - a.date);

const latestPostDate = posts[0] ? new Date(posts[0].date).toISOString().slice(0, 10) : undefined;
const generalEntries = staticRoutes.map(route => ({
    loc: `${SITE_URL}${route}${route ? '/' : ''}`,
    lastmod: latestPostDate
}));
const postEntries = posts.flatMap(post => {
    const id = extractRedditId(post.reddit);
    return id ? [{
        loc: `${SITE_URL}posts/${id}/`,
        lastmod: new Date(post.date).toISOString().slice(0, 10)
    }] : [];
});

if (!fs.existsSync(outDir)) {
    console.error(`Build output not found: ${outDir}`);
    process.exit(1);
}

fs.writeFileSync(path.join(outDir, 'sitemap-general.xml'), makeUrlSet(generalEntries), 'utf8');
fs.writeFileSync(path.join(outDir, 'sitemap-posts.xml'), makeUrlSet(postEntries), 'utf8');
fs.writeFileSync(
    path.join(outDir, 'sitemap_index.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}sitemap-general.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}sitemap-posts.xml</loc>
  </sitemap>
</sitemapindex>
`,
    'utf8'
);

console.log(`Generated sitemap for ${generalEntries.length} static URLs and ${postEntries.length} post URLs.`);
