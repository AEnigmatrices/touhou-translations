import { fetchDerivedData } from '../utils/fetchData';
import { extractRedditId } from '../utils/extractRedditId';

export const prerender = true;
export const trailingSlash = 'always';

export const load = async () => {
    const { posts } = await fetchDerivedData();
    const randomPostIds = posts
        .map(post => extractRedditId(post.reddit))
        .filter(id => id);

    return { randomPostIds };
};
