import { fetchHomePosts } from '../utils/generatedData';

export const load = async () => {
    const dailyPostCandidates = await fetchHomePosts();

    return { dailyPostCandidates };
};
