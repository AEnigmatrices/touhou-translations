import { error, type ServerLoad } from '@sveltejs/kit';
import { getPostIds, getPostPageData, type PostPageData } from '$lib/server/postPageData';

export const prerender = true;

export const entries = async (): Promise<Array<{ id: string }>> =>
    (await getPostIds()).map(id => ({ id }));

export const load: ServerLoad<{ id: string }, Record<string, never>, PostPageData> = async ({ params }) => {
    const postData = await getPostPageData(params.id);
    if (!postData) error(404, 'Post not found.');

    return postData;
};
