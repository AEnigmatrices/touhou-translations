import React, { useState, useEffect } from "react";
import ArtistList from "../../components/ArtistList/ArtistList";
import { useGetArtists } from "../../context/PostsContext";
import "./ArtistPage.scss";



const ArtistPage: React.FC = () => {
    const getArtists = useGetArtists();
    const artists = getArtists();

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    const lowerQuery = searchQuery.toLowerCase();
    const filteredArtists = artists.filter(({ id, name }) =>
        id.toLowerCase().includes(lowerQuery) || name.toLowerCase().includes(lowerQuery)
    );

    return (
        <div className="artist-page">
            <div className="artist-page__header">
                <h2>Artist List</h2>
                <input
                    type="text" placeholder="Search by ID or Name..." aria-label="Search Artists"
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <ArtistList artists={filteredArtists} />
        </div>
    );
};

export default ArtistPage;
