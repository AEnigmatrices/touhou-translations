import React, { useState, useEffect } from "react";
import CharacterList from "../../components/CharacterList/CharacterList";
import { useGetCharacters } from "../../context/PostsContext";
import "./CharacterPage.scss";



const CharacterPage: React.FC = () => {
    const getCharacters = useGetCharacters();
    const characters = getCharacters();

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    const lowerQuery = searchQuery.toLowerCase();
    const filteredCharacters = characters.filter(({ id, name }) =>
        id.toLowerCase().includes(lowerQuery) || name.toLowerCase().includes(lowerQuery)
    );

    return (
        <div className="character-page">
            <div className="character-page__header">
                <h2>Character List</h2>
                <input
                    type="text" placeholder="Search by ID or Name..." aria-label="Search Characters"
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <CharacterList characters={filteredCharacters} />
        </div>
    );
};

export default CharacterPage;