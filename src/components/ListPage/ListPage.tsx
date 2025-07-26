import { useEffect, useMemo, useState, type JSX } from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { getCharacterPortraits } from "../../utils/galleryUtils";
import { getArtistPortraits } from "../../utils/galleryUtils";
import ArtworkCountSortButton from "../ArtworkCountSortButton/ArtworkCountSortButton";
import ProfileItem from "../ProfileItem/ProfileItem";
import styles from "./ListPage.styles";
import type { Artist, Character, SortOrder } from "../../types/data";
import { characters } from "../../../data/processed-data";
import { artists } from "../../../data/processed-data";

interface ListPageProps { mode: typeof MODE_CHARACTER | typeof MODE_ARTIST; }

const MODE_CHARACTER = "character";
const MODE_ARTIST = "artist";
const BASE_URL = import.meta.env.BASE_URL || '/';

const ListPage = ({ mode }: ListPageProps): JSX.Element => {

    const items = mode === MODE_CHARACTER ? characters : artists;
    const title = mode === MODE_CHARACTER ? "Character List" : "Artist List";
    const ariaLabel = mode === MODE_CHARACTER ? "Search Characters" : "Search Artists";

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("none");



    const search = (data: (Character | Artist)[], query: string): (Character | Artist)[] =>
        data.filter(({ id, name }) =>
            [id, name].some(field => field.toLowerCase().includes(query.toLowerCase()))
        );

    const sort = (data: (Character | Artist)[], order: SortOrder): (Character | Artist)[] =>
        order === "none"
            ? data
            : [...data].sort((a, b) =>
                order === "asc" ? a.artworkCount - b.artworkCount : b.artworkCount - a.artworkCount
            );

    const searchedItems = useMemo(() => search(items, searchQuery), [items, searchQuery]);
    const sortedItems = useMemo(() => sort(searchedItems, sortOrder), [searchedItems, sortOrder]);



    const toggleSortOrder = () =>
        setSortOrder(prev => (prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"));

    const renderListItems = (): JSX.Element[] => {
        return sortedItems.map((item) => {
            const isCharacter = mode === MODE_CHARACTER;
            const id = item.id;
            const name = item.name;
            const artworkCountText = `${item.artworkCount} artwork${item.artworkCount !== 1 ? "s" : ""}`;
            const imageUrl = isCharacter
                ? getCharacterPortraits(id)
                : getArtistPortraits(id);
            const toUrl = isCharacter
                ? `${BASE_URL}gallery?character=${id}`
                : `${BASE_URL}gallery?artist=${id}`;

            return <ProfileItem key={id} name={name} imageUrl={imageUrl} description={artworkCountText} link={toUrl} />
        });
    };



    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);



    return (
        <Container maxWidth="lg" sx={styles.container}>
            <Box sx={styles.box}>
                <Typography variant="h4" component="h2" sx={styles.typography}>{title}</Typography>
                <TextField
                    label="Search by ID or Name" variant="outlined" value={searchInput} sx={styles.textField}
                    onChange={(e) => setSearchInput(e.target.value)} slotProps={{ input: { "aria-label": ariaLabel } }}
                />
                <ArtworkCountSortButton sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
            </Box>
            <Box component="ul" sx={styles.listGrid}>
                {renderListItems()}
            </Box>
        </Container>
    );
};

export default ListPage;