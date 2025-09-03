import type { PageContextServer } from 'vike/types';
import { fetchDailyPost } from '../../utils/fetchData';

const data = async (_pageContext: PageContextServer) => {
    const dailyPost = await fetchDailyPost();
    return { dailyPost };
};

export { data };
export type Data = Awaited<ReturnType<typeof data>>;