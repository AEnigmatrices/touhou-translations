import type { APIRoute, GetStaticPaths } from 'astro';
import { getHomePosts } from '../../../lib/content/projections';
import type { HomePost } from '../../../types/data';

interface Props {
    post: HomePost;
}

export const getStaticPaths = (async () => (
    (await getHomePosts()).map((post, index) => ({
        params: { index: String(index) },
        props: { post }
    }))
)) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => new Response(
    JSON.stringify((props as Props).post),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
);
