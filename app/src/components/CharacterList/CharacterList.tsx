import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCharacterImages } from "../../utils/characterImages";
import { getGradient } from "../../utils/gradientUtils";
import { useGetCharacters } from "../../context/PostsContext";
import "./CharacterList.scss";



const CharacterList: React.FC = () => {

    const getCharacters = useGetCharacters();
    const characters = getCharacters();
    const baseHue = Math.floor(Math.random() * 360);

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const lowerQuery = searchQuery.toLowerCase();
    const filteredCharacters = characters.filter(({ id, name }) =>
        id.toLowerCase().includes(lowerQuery) ||
        name.toLowerCase().includes(lowerQuery)
    );



    useEffect(() => {
        const timeout = setTimeout(() => { setSearchQuery(searchInput); }, 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);



    return (
        <>
            <input
                type="text" className="character-list__search" placeholder="Search by ID or Name..." value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} aria-label="Search Characters"
            />
            <ul className="character-list">
                {filteredCharacters.map((character, index) => {
                    const hue = Math.round(baseHue + (240 * index) / Math.max(filteredCharacters.length - 1, 1)) % 360;
                    const gradient = getGradient(hue, 25, 87);
                    const gradientPlaceholder = getGradient(hue, 25, 73);
                    const imageUrl = getCharacterImages(character.id);
                    const toUrl = `/gallery?character=${character.id}`;

                    return (
                        <li key={character.id} className="character-list__item" aria-label={`Character: ${character.name}`}>
                            <Link to={toUrl} className="character-list__link">
                                <div className="character-list__image-wrapper" style={{ background: gradient }}>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt={character.name} className="character-list__image" loading="lazy" />
                                    ) : (
                                        <div className="character-list__image-placeholder" aria-hidden="true" style={{ background: gradientPlaceholder }} />
                                    )}
                                </div>
                                <div className="character-list__info">
                                    <span className="character-list__name">{character.name}</span>
                                    <span className="character-list__description">
                                        {character.artworkCount} artwork{character.artworkCount !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharacterList;