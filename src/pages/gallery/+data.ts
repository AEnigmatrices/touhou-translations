import type { PageContextServer } from 'vike/types';
import { fetchPostsData } from '../../utils/fetchData';

const data = async (_pageContext: PageContextServer) => {
    const { posts, artists, characters } = fetchPostsData();
    return { posts, artists, characters };
};

export { data };
export type Data = Awaited<ReturnType<typeof data>>;