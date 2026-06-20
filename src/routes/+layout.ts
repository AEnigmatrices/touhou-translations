import { fetchPostIds } from '../utils/generatedData';

export const prerender = true;
export const trailingSlash = 'always';

export const load = async () => {
    return { randomPostIds: await fetchPostIds() };
};
