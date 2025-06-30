import React from "react";
import { getGradient } from "../../utils/gradientUtils";
import type { Character } from "../../types/data";
import "./CharacterList.scss";

interface Props { characters: Character[]; getCharacterImage: (id: string) => string | null; }

const CharacterList: React.FC<Props> = ({ characters, getCharacterImage }) => {

    const baseHue = Math.floor(Math.random() * 360);

    return (
        <ul className="character-list">
            {characters.map((character, index) => {
                const hue = Math.round(baseHue + (240 * index) / Math.max(characters.length - 1, 1)) % 360;
                const gradient = getGradient(hue, 25, 87);
                const gradientPlaceholder = getGradient(hue, 25, 73);

                const imageUrl = getCharacterImage(character.id);

                return (
                    <li key={character.id} className="character-item" tabIndex={0} aria-label={`Character: ${character.name}`}>
                        <div className="character-image-wrapper" style={{ background: gradient }}>
                            {imageUrl ? (
                                <img src={imageUrl} alt={character.name} className="character-image" loading="lazy" />
                            ) : (
                                <div className="character-image-placeholder" aria-hidden="true" style={{ background: gradientPlaceholder }} />
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
