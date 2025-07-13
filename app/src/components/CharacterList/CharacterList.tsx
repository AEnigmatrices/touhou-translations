import React from "react";
import ProfileItem from "../ProfileItem/ProfileItem";
import { getCharacterImages } from "../../utils/galleryUtils";
import type { Character } from "../../types/data";
import "./CharacterList.scss";

interface Props { characters: Character[]; }



const CharacterList: React.FC<Props> = ({ characters }) => {
    return (
        <ul className="character-list">
            {characters.map((character) => {
                const imageUrl = getCharacterImages(character.id);
                const toUrl = `/gallery?character=${character.id}`;
                return (
                    <ProfileItem
                        key={character.id}
                        name={character.name}
                        imageUrl={imageUrl}
                        description={`${character.artworkCount} artwork${character.artworkCount !== 1 ? "s" : ""}`}
                        link={toUrl}
                    />
                );
            })}
        </ul>
    );
};

export default CharacterList;
