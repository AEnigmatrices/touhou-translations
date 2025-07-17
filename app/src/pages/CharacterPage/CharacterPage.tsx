import React, { useEffect, useMemo, useState } from "react";
import { useGetCharacters } from "../../context/PostsContext";
import { searchCharacters, sortArtworkCounts } from "./CharacterPage.utils";
import CharacterList from "../../components/CharacterList/CharacterList";
import ArtworkCountSortButton from "../../components/ArtworkCountSortButton/ArtworkCountSortButton";
import "./CharacterPage.scss";
import type { SortOrder } from "../../types/data";



const CharacterPage: React.FC = () => {
    const characters = useGetCharacters()();

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("none");

    const searchedCharacters = useMemo(() => searchCharacters(characters, searchQuery), [characters, searchQuery]);
    const sortedCharacters = useMemo(() => sortArtworkCounts(searchedCharacters, sortOrder), [searchedCharacters, sortOrder]);



    const toggleSortOrder = () => setSortOrder((prev) => (prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"));



    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);



    return (
        <div className="character-page">
            <div className="character-page__header">
                <h2>Character List</h2>
                <input
                    type="text" placeholder="Search by ID or Name..." aria-label="Search Characters"
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                />
                <ArtworkCountSortButton sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
            </div>
            <CharacterList characters={sortedCharacters} />
        </div>
    );
};

export default CharacterPage;