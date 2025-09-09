import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import ProfileItem from "../ProfileItem/ProfileItem";
import ArtworkCountSortButton from "../ArtworkCountSortButton/ArtworkCountSortButton";
import styles from "./ListPage.styles";
import type { Character, Artist, SortOrder } from "../../types/data";
interface Props {
    mode: typeof MODE_CHARACTER | typeof MODE_ARTIST;
    characters?: Character[];
    artists?: Artist[];
}

const MODE_CHARACTER = "character";
const MODE_ARTIST = "artist";
const BASE_URL = import.meta.env.BASE_URL;
const PAGE_SIZE = 25;



const ListPage = ({ mode, characters, artists }: Props): JSX.Element => {
    const title = mode === MODE_CHARACTER ? "Character List" : "Artist List";
    const ariaLabel = mode === MODE_CHARACTER ? "Search Characters" : "Search Artists";

    if ((mode === MODE_CHARACTER && !characters) || (mode === MODE_ARTIST && !artists)) {
        throw new Error(`${mode} data prop is required`);
    }

    const allItems = useMemo(() => (mode === MODE_CHARACTER ? characters! : artists!), [mode, characters, artists]);

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("none");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);



    const searchedItems = useMemo(() => {
        if (!searchQuery) return allItems;
        return allItems.filter(({ id, name }) => [id, name].some(field => field.toLowerCase().includes(searchQuery.toLowerCase())));

    }, [allItems, searchQuery]);

    const sortedItems = useMemo(() => {
        if (sortOrder === "none") return searchedItems;
        return [...searchedItems].sort((a, b) => sortOrder === "asc" ? a.artworkCount - b.artworkCount : b.artworkCount - a.artworkCount);

    }, [searchedItems, sortOrder]);



    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"));
    };

    const renderListItems = (): JSX.Element[] => {
        return sortedItems.slice(0, visibleCount).map((item) => {
            const id = item.id;
            const name = item.name;
            const artworkCountText = `${item.artworkCount} artwork${item.artworkCount !== 1 ? "s" : ""}`;
            const extraCountText = mode === MODE_CHARACTER
                ? `${(item as Character).artistCount} artist${(item as Character).artistCount !== 1 ? "s" : ""}`
                : `${(item as Artist).characterCount} character${(item as Artist).characterCount !== 1 ? "s" : ""}`;
            const imageUrl = `${BASE_URL}${item.portrait}`;
            const toUrl = mode === MODE_CHARACTER
                ? `${BASE_URL}gallery?character=${id}`
                : `${BASE_URL}gallery?artist=${id}`;
            return <ProfileItem key={id} name={name} imageUrl={imageUrl} description1={artworkCountText} description2={extraCountText} link={toUrl} />
        });
    };



    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedItems.length));
                }
            },
            { rootMargin: "100px" }
        );
        const current = loadMoreRef.current;
        if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, [sortedItems]);

    useEffect(() => { setVisibleCount(PAGE_SIZE); }, [searchQuery, sortOrder]);



    return (
        <Container maxWidth="xl" sx={styles.container}>
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
            {visibleCount < sortedItems.length && <Box ref={loadMoreRef} sx={{ height: "1px" }} />}
        </Container>
    );
};

export default ListPage;