import React from "react";
import { useGetCharacters } from "../../context/PostsContext";
import CharacterList from "../../components/CharacterList/CharacterList";
import "./CharacterPage.scss";

const characterImages: Record<string, string> = import.meta.glob("../../icons/characters/*.webp", { eager: true, query: "?url", import: "default" });

const CharacterPage: React.FC = () => {
    const getCharacters = useGetCharacters();
    const characters = getCharacters();

    const getCharacterImage = (id: string): string | null => {
        const relativePath = `../../icons/characters/${id}.webp`;
        return characterImages[relativePath] ?? null;
    };

    return (
        <div className="character-page">
            <h2>Character List</h2>
            <CharacterList characters={characters} getCharacterImage={getCharacterImage} />
        </div>
    );
};

export default CharacterPage;
