import { fetchPosts } from "../../../context/fetchData";
import { extractRedditId } from "../../../utils/extractRedditId";
import type { Post } from "../../../types/data";
import type { OnBeforePrerenderStartAsync } from "vike/types";


export const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async () => {
    try {
        const posts = await fetchPosts();

        const routes = posts
            .map((post: Post) => {
                const redditId = extractRedditId(post.reddit);
                if (!redditId) {
                    console.warn("Skipping post: could not extract Reddit ID from", post.reddit);
                    return null;
                }
                return {
                    url: `/posts/${redditId}`,
                    pageContext: { data: { post }, postId: redditId }
                };
            })
            .filter(Boolean);

        return routes as any;
    } catch (error) {
        console.error("Failed to generate prerender routes:", error);
        return [];
    }
};