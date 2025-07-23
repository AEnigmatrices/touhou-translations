import React, { useEffect, useMemo, useState } from "react";
import { useGetArtists } from "../../context/PostsContext";
import { searchArtists, sortArtists } from "./ArtistPage.utils";
import ArtistList from "../../components/ArtistList/ArtistList";
import ArtworkCountSortButton from "../../components/ArtworkCountSortButton/ArtworkCountSortButton";
import { Box, Container, TextField, Typography } from "@mui/material";
import styles from "./ArtistPage.styles";
import type { SortOrder } from "../../types/data";



const ArtistPage: React.FC = () => {
    const artists = useGetArtists()();

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("none");

    const searchedArtists = useMemo(() => searchArtists(artists, searchQuery), [artists, searchQuery]);
    const sortedArtists = useMemo(() => sortArtists(searchedArtists, sortOrder), [searchedArtists, sortOrder]);



    const toggleSortOrder = () => setSortOrder(prev => (prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"));



    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);



    return (
        <Container maxWidth="lg" sx={styles.container}>
            <Box sx={styles.box}>
                <Typography variant="h4" component="h2" sx={styles.typography}>Artist List</Typography>
                <TextField
                    label="Search by ID or Name" variant="outlined" value={searchInput} sx={styles.textField}
                    onChange={(e) => setSearchInput(e.target.value)} slotProps={styles.textFieldSlotProps}
                />
                <ArtworkCountSortButton sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
            </Box>
            <ArtistList artists={sortedArtists} />
        </Container>
    );
};

export default ArtistPage;