import { fetchPosts } from "../../../context/fetchData";

export default async () => {
    try {
        const posts = await fetchPosts();
        return posts.map((_, index) => `/posts/${index + 1}`);
    } catch (error) {
        console.error('Failed to fetch posts for pre-rendering:', error);
        return [];
    }
}