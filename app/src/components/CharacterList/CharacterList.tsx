import React from "react";
import type { Character } from "../../types/data";
import "./CharacterList.scss";

interface Props { characters: Character[]; getCharacterImage: (id: string) => string | null; }

const CharacterList: React.FC<Props> = ({ characters, getCharacterImage }) => {
    return (
        <ul className="character-list">
            {characters.map((character) => {
                const imageUrl = getCharacterImage(character.id);
                return (
                    <li key={character.id} className="character-item" tabIndex={0} aria-label={`Character: ${character.name}`}>
                        <div className="character-image-wrapper">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={character.name}
                                    className="character-image"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="character-image-placeholder" aria-hidden="true" />
                            )}
                        </div>
                        <div className="character-info">
                            <span className="character-name">{character.name}</span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};


export default CharacterList;
