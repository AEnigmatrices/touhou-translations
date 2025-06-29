import React from "react";
import { useGetCharacters } from "../../context/PostsContext";
import "./CharacterPage.scss";

const CharacterPage: React.FC = () => {
    const getCharacters = useGetCharacters();

    const characters = getCharacters();

    return (
        <div className="character-page">
            <h1>Character List</h1>
            <ul>
                {characters.map((character) => (
                    <li key={character.id}>{character.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterPage;
