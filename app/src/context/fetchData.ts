import type { Post, Artist, Character } from "../types/data";



const baseUrl = "https://raw.githubusercontent.com/AEnigmatrices/touhou-translations/main/data";

const fetchJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${baseUrl}/${path}`);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return res.json();
};



export const fetchPosts = async (): Promise<Post[]> =>
    (await fetchJson<Post[]>("posts.json"))
        .filter(p => p.date)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const fetchArtists = (): Promise<Record<string, Artist>> => fetchJson("artists.json");

export const fetchCharacters = (): Promise<Record<string, Character>> => fetchJson("characters.json");
