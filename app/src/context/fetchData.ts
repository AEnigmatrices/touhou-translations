import type { Post, Artist, Character } from "../types/data";

const baseUrl = import.meta.env.VITE_DATA_BASE_URL;

const fetchJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${baseUrl}/${path}`);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return res.json();
};



export const fetchPosts = async (): Promise<Post[]> =>
    (await fetchJson<Post[]>("posts.json"))
        .filter(p => p.date)
        .sort((a, b) => a.date - b.date);

export const fetchArtists = (): Promise<Artist[]> => fetchJson<Artist[]>("artists.json");

export const fetchCharacters = (): Promise<Character[]> => fetchJson("characters.json");