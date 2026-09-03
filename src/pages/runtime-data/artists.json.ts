import type { APIRoute } from 'astro';
import { getArtists } from '../../lib/content/projections';

export const GET: APIRoute = async () => new Response(
    JSON.stringify(await getArtists()),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
);
