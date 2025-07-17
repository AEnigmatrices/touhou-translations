import React, { useEffect, useMemo, useState } from "react";
import { useGetArtists } from "../../context/PostsContext";
import { searchArtists, sortArtists } from "./ArtistPage.utils";
import ArtistList from "../../components/ArtistList/ArtistList";
import ArtworkCountSortButton from "../../components/ArtworkCountSortButton/ArtworkCountSortButton";
import "./ArtistPage.scss";



const ArtistPage: React.FC = () => {
    const artists = useGetArtists()();

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

    const searchedArtists = useMemo(() => searchArtists(artists, searchQuery), [artists, searchQuery]);
    const sortedArtists = useMemo(() => sortArtists(searchedArtists, sortOrder), [searchedArtists, sortOrder]);



    const toggleSortOrder = () => setSortOrder(prev => (prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"));



    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);



    return (
        <div className="artist-page">
            <div className="artist-page__header">
                <h2>Artist List</h2>
                <input
                    type="text" placeholder="Search by ID or Name..." aria-label="Search Artists"
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                />
                <ArtworkCountSortButton sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
            </div>
            <ArtistList artists={sortedArtists} />
        </div>
    );
};

export default ArtistPage;