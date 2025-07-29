import { render } from 'vike/abort';
import { fetchPosts, fetchCharacters } from '../../context/fetchData';
import { getCharacterArtworkCounts } from './../../context/PostsContext';
import type { CharacterRaw } from '../../types/data';

export type Data = Awaited<ReturnType<typeof data>>;


export const data = async () => {
    const characters = fetchCharacters();
    if (!characters || characters.length === 0) throw render(404, 'No characters found');

    const posts = fetchPosts();
    const artworkCounts = getCharacterArtworkCounts(posts);

    const charactersWithCount = characters.map((character: CharacterRaw) => ({
        ...character, artworkCount: artworkCounts[character.id] ?? 0
    }));
    return { characters: charactersWithCount };
};