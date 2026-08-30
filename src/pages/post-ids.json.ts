import type { APIRoute } from 'astro';
import { getPostIds } from '../lib/server/postPageData';

export const GET: APIRoute = async () => new Response(
    JSON.stringify(await getPostIds()),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
);
