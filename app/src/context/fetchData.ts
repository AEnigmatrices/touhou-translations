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
        .map(p => ({ ...p, date: p.date * 1000, }))
        .sort((a, b) => a.date - b.date);

export const fetchArtists = (): Promise<Record<string, Artist>> => fetchJson("artists.json");

export const fetchCharacters = (): Promise<Record<string, Character>> => fetchJson("characters.json");