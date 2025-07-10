import type { Post, Artist, Character } from "../types/data";

const baseUrl = import.meta.env.VITE_DATA_BASE_URL;

const fetchJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${baseUrl}/${path}`);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return res.json();
};



export const fetchPosts = async (): Promise<Post[]> => {
    const fileList = ["posts-2024.json"];
    const postsArrays = await Promise.all(
        fileList.map(filename => fetchJson<Post[]>(`posts/${filename}`))
    );
    const allPosts = postsArrays.flat();
    return allPosts
        .filter(p => p.date)
        .sort((a, b) => a.date - b.date);
};

export const fetchArtists = (): Promise<Artist[]> => fetchJson<Artist[]>("artists.json");

export const fetchCharacters = (): Promise<Character[]> => fetchJson("characters.json");