import { fetchPosts } from "../../../utils/fetchData";
import { extractRedditId } from "../../../utils/extractRedditId";
import type { Post } from "../../../types/data";

type PageContext = { data?: Record<string, unknown>; };
type Return = { url: string; pageContext?: PageContext };


const onBeforePrerenderStart = async (): Promise<Return[]> => {
    try {
        const posts = await fetchPosts();

        const postPages: Return[] = posts
            .map((post: Post) => {
                const redditId = extractRedditId(post.reddit);
                if (!redditId) {
                    console.warn("Skipping post: could not extract Reddit ID from", post.reddit);
                    return null;
                }
                return { url: `/posts/${redditId}`, pageContext: { data: { post } } };
            })
            .filter(Boolean) as Return[];

        return postPages;

    } catch (error) {
        console.error("Failed to generate prerender routes:", error);
        return [];
    }
}

export { onBeforePrerenderStart };