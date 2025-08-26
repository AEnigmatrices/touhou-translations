import type { PageContextServer } from 'vike/types';
import { fetchDailyPost } from '../../utils/fetchData';

const data = (_pageContext: PageContextServer) => {
    const dailyPost = fetchDailyPost();
    return { dailyPost };
};

export { data };
export type Data = Awaited<ReturnType<typeof data>>;