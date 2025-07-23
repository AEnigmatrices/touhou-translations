import React, { useEffect, useMemo, useState } from "react";
import { useGetCharacters } from "../../context/PostsContext";
import { searchCharacters, sortArtworkCounts } from "./CharacterPage.utils";
import CharacterList from "../../components/CharacterList/CharacterList";
import ArtworkCountSortButton from "../../components/ArtworkCountSortButton/ArtworkCountSortButton";
import { Box, Container, TextField, Typography } from "@mui/material";
import styles from "./CharacterPage.styles";
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
        <Container maxWidth="lg" sx={styles.container}>
            <Box sx={styles.box}>
                <Typography variant="h4" component="h2" sx={styles.typography}>Character List</Typography>
                <TextField
                    label="Search by ID or Name" variant="outlined" value={searchInput} sx={styles.textField}
                    onChange={(e) => setSearchInput(e.target.value)} slotProps={styles.textFieldSlotProps}
                />
                <ArtworkCountSortButton sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
            </Box>
            <CharacterList characters={sortedCharacters} />
        </Container>
    );
};

export default CharacterPage;