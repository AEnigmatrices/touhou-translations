import React from "react";
import type { Character } from "../../types/data";
import "./CharacterList.scss";

interface Props { characters: Character[]; getCharacterImage: (id: string) => string | null; }

const CharacterList: React.FC<Props> = ({ characters, getCharacterImage }) => {
    return (
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
    );
};

export default CharacterList;
