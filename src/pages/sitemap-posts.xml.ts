import type { APIRoute } from 'astro';
import { getArchive } from '../lib/content/archive';
import { makeUrlSet } from '../lib/content/sitemap';
import { extractRedditId } from '../utils/extractRedditId';
import { SITE_URL } from '../utils/siteMetadata';

export const GET: APIRoute = async () => {
    const posts = [...(await getArchive()).posts].sort((left, right) => right.date - left.date);
    return new Response(makeUrlSet(posts.map(post => ({
        loc: `${SITE_URL}posts/${extractRedditId(post.reddit)}/`,
        lastmod: new Date(post.date).toISOString().slice(0, 10)
    }))), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
