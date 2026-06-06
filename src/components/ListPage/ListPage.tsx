import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import ProfileItem from "../ProfileItem/ProfileItem";
import ArtworkCountSortButton from "./components/ArtworkCountSortButton/ArtworkCountSortButton";
import styles from "./styles.module.css";
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
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<SortOrder>(mode === MODE_ARTIST ? "desc" : "none");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);



    const searchedItems = useMemo(() => {
        if (!searchQuery) return allItems;
        return allItems.filter(({ id, name }) => [id, name].some(field => field.toLowerCase().includes(searchQuery.toLowerCase())));

    }, [allItems, searchQuery]);

    const sortedItems = useMemo(() => {
        const compare = (a: Character | Artist, b: Character | Artist) => {
            if (sortOrder === "none") return mode === MODE_ARTIST ? a.id.localeCompare(b.id) : 0;
            const primaryDiff = sortOrder === "asc"
                ? a.artworkCount - b.artworkCount
                : b.artworkCount - a.artworkCount;
            if (primaryDiff !== 0) return primaryDiff;
            const [aSecondary, bSecondary] = mode === MODE_CHARACTER
                ? [(a as Character).artistCount, (b as Character).artistCount]
                : [(a as Artist).characterCount, (b as Artist).characterCount];
            return sortOrder === "asc" ? aSecondary - bSecondary : bSecondary - aSecondary;
        };
        return [...searchedItems].sort(compare);

    }, [searchedItems, sortOrder, mode]);



    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"));
    };

    const handleToggleSelectMode = () => {
        if (isSelectMode && selectedItems.length === 0) {
            setIsSelectMode(false);
        } else {
            setIsSelectMode(!isSelectMode);
        }
    };

    const handleNavigateSelected = () => {
        if (selectedItems.length === 0) return;
        const queryKey = mode === MODE_CHARACTER ? "characters" : "artists";
        const url = `${BASE_URL}gallery?${queryKey}=${selectedItems.join(",")}`;
        window.location.href = url;
    };

    const handleToggleItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
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

            const selected = selectedItems.includes(id);
            const galleryLink = `${BASE_URL}gallery?${mode === MODE_CHARACTER ? "characters" : "artist"}=${selectedItems.join(",") || id}`;

            return (
                <ProfileItem
                    key={id}
                    name={name}
                    imageUrl={imageUrl}
                    description1={artworkCountText}
                    description2={extraCountText}
                    link={isSelectMode ? undefined : galleryLink}
                    isSelectMode={isSelectMode}
                    isSelected={selected}
                    onToggleSelect={() => handleToggleItem(id)}
                />
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



    return (
        <section className={styles.container}>
            <div className={styles.toolbar}>
                <h2 className={styles.title}>{title}</h2>
                <label className={styles.searchLabel}>
                    <span className={styles.visuallyHidden}>Search by ID or Name</span>
                    <input
                    placeholder="Search by ID or Name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    aria-label={ariaLabel}
                    className={styles.searchInput}
                    />
                </label>
                {mode === MODE_CHARACTER && (
                    <div className={styles.selectTools}>
                        <button
                            type="button"
                            className={`${styles.selectToggle} ${isSelectMode ? styles.selectToggleActive : ''}`}
                            onClick={handleToggleSelectMode}
                            aria-label="Toggle multi-select mode"
                            aria-pressed={isSelectMode}
                        >
                            <span aria-hidden="true">{isSelectMode ? '☑' : '☐'}</span>
                            <span>
                                {isSelectMode
                                    ? selectedItems.length > 0
                                        ? `${selectedItems.length} Selected`
                                        : "Multi-Select ON"
                                    : "Multi-Select OFF"}
                            </span>
                        </button>

                        {isSelectMode && selectedItems.length > 0 && (
                            <button
                                type="button"
                                className={styles.primaryButton}
                                onClick={handleNavigateSelected}
                            >
                                View Selected
                            </button>
                        )}
                    </div>
                )}

                <ArtworkCountSortButton sortOrder={sortOrder} onToggleSortOrder={toggleSortOrder} />
            </div>
            <ul className={styles.listGrid}>
                {renderListItems()}
            </ul>
            {visibleCount < sortedItems.length && <div ref={loadMoreRef} className={styles.loadMore} />}
        </section>
    );
};

export default ListPage;
