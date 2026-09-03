import type { APIRoute } from 'astro';
import { getGalleryPosts } from '../../lib/content/projections';

export const GET: APIRoute = async () => new Response(
    JSON.stringify(await getGalleryPosts()),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
);
