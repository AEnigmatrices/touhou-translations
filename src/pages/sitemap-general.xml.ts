import type { APIRoute } from 'astro';
import { getArchive } from '../lib/content/archive';
import { makeUrlSet } from '../lib/content/sitemap';
import { SITE_URL } from '../utils/siteMetadata';

const staticRoutes = ['', 'gallery', 'artists', 'characters'];

export const GET: APIRoute = async () => {
    const posts = (await getArchive()).posts;
    const latestPostDate = posts.at(-1) ? new Date(posts.at(-1)!.date).toISOString().slice(0, 10) : undefined;
    return new Response(makeUrlSet(staticRoutes.map(route => ({
        loc: `${SITE_URL}${route}${route ? '/' : ''}`,
        lastmod: latestPostDate
    }))), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
