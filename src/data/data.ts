import postsJson from "./jsons/posts.json";
import artistsJson from "./jsons/artists.json";
import charactersJson from "./jsons/characters.json";
import type { Post, Artist, Character } from "../types/data";

export const posts = postsJson as Post[];
export const artists = artistsJson as Record<string, Artist>;
export const characters = charactersJson as Record<string, Character>;

export const sortedPosts = posts
    .filter((post) => post.date)
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getArtist = (id: string): Artist | null => artists[id] ?? null;

export const getCharacters = (ids: string[]): Character[] => {
    return ids.map((id) => characters[id]).filter(Boolean) as Character[];
};
