import { fetchCharacters, fetchPosts } from '../../context/fetchData';
import { getCharacterArtworkCounts } from '../../context/PostsContext';
import type { OnBeforePrerenderStartAsync } from 'vike/types';
import type { Character } from '../../types/data';


export const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async () => {
    try {
        const characters = fetchCharacters();
        if (!characters || characters.length === 0) return [];

        const posts = fetchPosts();
        const artworkCounts = getCharacterArtworkCounts(posts);

        const charactersWithCount: Character[] = characters.map((char) => ({
            ...char, artworkCount: artworkCounts[char.id] ?? 0,
        }));

        return [{ url: '/characters', pageContext: { data: { characters: charactersWithCount } } }];

    } catch (error) {
        console.error('Failed to generate prerender routes for characters:', error);
        return [];
    }
};