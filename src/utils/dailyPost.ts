import type { HomePost } from '../types/data';

const millisecondsPerDay = 86_400_000;

export const selectDailyPost = (
    posts: readonly HomePost[],
    timestamp = Date.now()
): HomePost | null => {
    if (posts.length === 0) return null;

    const day = Math.floor(timestamp / millisecondsPerDay);
    return posts[((day % posts.length) + posts.length) % posts.length];
};
