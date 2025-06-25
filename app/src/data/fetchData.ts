import type { Post, Artist, Character } from "../types/data";

const baseUrl =
    "https://raw.githubusercontent.com/AEnigmatrices/touhou-translations/main/data";

export const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${baseUrl}/posts.json`);
    if (!res.ok) throw new Error("Failed to fetch posts.json");
    const posts = await res.json();
    return posts
        .filter((p: Post) => p.date)
        .sort(
            (a: Post, b: Post) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
        );
};

export const fetchArtists = async (): Promise<Record<string, Artist>> => {
    const res = await fetch(`${baseUrl}/artists.json`);
    if (!res.ok) throw new Error("Failed to fetch artists.json");
    return res.json();
};

export const fetchCharacters = async (): Promise<Record<string, Character>> => {
    const res = await fetch(`${baseUrl}/characters.json`);
    if (!res.ok) throw new Error("Failed to fetch characters.json");
    return res.json();
};
