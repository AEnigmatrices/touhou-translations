import { lazy, Suspense, useEffect, useMemo, useRef, useState, type JSX } from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { getCharacterPortraits, getArtistPortraits, getRandomPlaceholder } from "../../utils/galleryUtils";
import ArtworkCountSortButton from "../ArtworkCountSortButton/ArtworkCountSortButton";
import styles from "./ListPage.styles";
import type { Artist, Character, SortOrder } from "../../types/data";
import validPortraits from "../../../data/valid-portraits.json"

interface Props { mode: typeof MODE_CHARACTER | typeof MODE_ARTIST; }

const ProfileItem = lazy(() => import("../ProfileItem/ProfileItem"));

const MODE_CHARACTER = "character";
const MODE_ARTIST = "artist";
const BASE_URL = import.meta.env.BASE_URL;
const PAGE_SIZE = 25;



const ListPage = ({ mode }: Props): JSX.Element => {

    const title = mode === MODE_CHARACTER ? "Character List" : "Artist List";
    const ariaLabel = mode === MODE_CHARACTER ? "Search Characters" : "Search Artists";

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("none");

    const [data, setData] = useState<{ characters: Character[]; artists: Artist[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const loadMoreRef = useRef<HTMLDivElement | null>(null)



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

    const items = data ? (mode === MODE_CHARACTER ? data.characters : data.artists) : [];
    const searchedItems = useMemo(() => search(items, searchQuery), [items, searchQuery]);
    const sortedItems = useMemo(() => sort(searchedItems, sortOrder), [searchedItems, sortOrder]);



    const toggleSortOrder = () =>
        setSortOrder(prev => (prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"));

    const renderListItems = (): JSX.Element[] => {
        return sortedItems.slice(0, visibleCount).map((item) => {
            const isCharacter = mode === MODE_CHARACTER;
            const id = item.id;
            const name = item.name;
            const artworkCountText = `${item.artworkCount} artwork${item.artworkCount !== 1 ? "s" : ""}`;
            const hasPortrait = isCharacter
                ? validPortraits.characters.includes(id)
                : validPortraits.artists.includes(id);
            const imageUrl = hasPortrait
                ? (isCharacter ? getCharacterPortraits(id) : getArtistPortraits(id))
                : getRandomPlaceholder();
            const toUrl = isCharacter
                ? `${BASE_URL}gallery?character=${id}`
                : `${BASE_URL}gallery?artist=${id}`;

            return (
                <Suspense fallback={null}>
                    <ProfileItem key={id} name={name} imageUrl={imageUrl} description={artworkCountText} link={toUrl} />
                </Suspense>
            );
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [charactersRes, artistsRes] = await Promise.all([
                    fetch(`${BASE_URL}data/processed-data/characters.json`),
                    fetch(`${BASE_URL}data/processed-data/artists.json`),
                ]);

                if (!charactersRes.ok || !artistsRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const characters = await charactersRes.json();
                const artists = await artistsRes.json();

                setData({ characters, artists });
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

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
            {visibleCount < sortedItems.length && <Box ref={loadMoreRef} sx={{ height: "1px" }} />}
        </Container>
    );
};

export default ListPage;