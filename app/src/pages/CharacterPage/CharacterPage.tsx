import React from "react";
import { useGetCharacters } from "../../context/PostsContext";
import "./CharacterPage.scss";

const characterImages: Record<string, string> = import.meta.glob(
    "../../icons/characters/*.webp",
    { eager: true, query: "?url", import: "default" }
);

const CharacterPage: React.FC = () => {
    const getCharacters = useGetCharacters();
    const characters = getCharacters();

    const getCharacterImage = (id: string): string | null => {
        const relativePath = `../../icons/characters/${id}.webp`;
        return characterImages[relativePath] ?? null;
    };

    return (
        <div className="character-page">
            <h1>Character List</h1>
            <ul>
                {characters.map((character) => {
                    const imageUrl = getCharacterImage(character.id);
                    return (
                        <li key={character.id} className="character-item">
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={character.name}
                                    className="character-image"
                                />
                            )}
                            <span className="character-name">{character.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CharacterPage;
