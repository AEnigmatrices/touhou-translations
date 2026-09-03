import type { APIRoute } from 'astro';
import { getCharacters } from '../../lib/content/projections';

export const GET: APIRoute = async () => new Response(
    JSON.stringify(await getCharacters()),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
);
