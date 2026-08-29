import { json, type RequestHandler } from '@sveltejs/kit';
import { getPostIds } from '$lib/server/postPageData';

export const prerender = true;

export const GET: RequestHandler = async () => json(await getPostIds());
