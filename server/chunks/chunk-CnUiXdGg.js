import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState, useRef, useEffect } from "react";
import { Container, Box, Typography, TextField } from "@mui/material";
import { P as ProfileItem } from "./chunk-CYdkaobM.js";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CollectionsIcon from "@mui/icons-material/Collections";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
/*! src/components/ArtworkCountSortButton/ArtworkCountSortButton.constants.ts [vike:pluginModuleBanner] */
const ariaSortMap = {
  none: "none",
  asc: "ascending",
  desc: "descending"
};
const iconMap = {
  asc: ArrowUpwardIcon,
  desc: ArrowDownwardIcon,
  none: CollectionsIcon
};
/*! src/components/ArtworkCountSortButton/ArtworkCountSortButton.tsx [vike:pluginModuleBanner] */
const getAriaSort = (order) => ariaSortMap[order];
const ArtworkCountSortIconButton = ({ sortOrder, onToggleSortOrder }) => {
  const IconComponent = iconMap[sortOrder] ?? iconMap.none;
  return /* @__PURE__ */ jsx(Tooltip, { title: "Sort by Artwork Count", arrow: true, children: /* @__PURE__ */ jsx(
    IconButton,
    {
      "aria-label": "Sort by Artwork Count",
      "aria-pressed": sortOrder !== "none",
      "aria-sort": getAriaSort(sortOrder),
      onClick: onToggleSortOrder,
      color: sortOrder === "none" ? "default" : "primary",
      size: "medium",
      children: /* @__PURE__ */ jsx(IconComponent, {})
    }
  ) });
};
/*! src/components/ListPage/ListPage.styles.ts [vike:pluginModuleBanner] */
const styles = {
  container: {
    py: 4
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    mb: 5,
    px: 2
  },
  typography: {
    flexBasis: "100%",
    textAlign: "center",
    color: "text.primary",
    fontWeight: 600,
    mb: 2,
    letterSpacing: "0.05em"
  },
  textField: {
    maxWidth: 300,
    flexGrow: 1,
    minWidth: 220
  },
  listGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    listStyle: "none",
    padding: 0,
    margin: 0,
    "@media (max-width:1024px)": {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
    "@media (max-width:768px)": {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    "@media (max-width:480px)": {
      gridTemplateColumns: "1fr"
    }
  }
};
/*! src/components/ListPage/ListPage.tsx [vike:pluginModuleBanner] */
const MODE_CHARACTER = "character";
const MODE_ARTIST = "artist";
const BASE_URL = "/touhou-translations/";
const PAGE_SIZE = 25;
const ListPage = ({ mode, characters, artists }) => {
  const title = mode === MODE_CHARACTER ? "Character List" : "Artist List";
  const ariaLabel = mode === MODE_CHARACTER ? "Search Characters" : "Search Artists";
  if (mode === MODE_CHARACTER && !characters || mode === MODE_ARTIST && !artists) {
    throw new Error(`${mode} data prop is required`);
  }
  const allItems = useMemo(() => mode === MODE_CHARACTER ? characters : artists, [mode, characters, artists]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef(null);
  const searchedItems = useMemo(() => {
    if (!searchQuery) return allItems;
    return allItems.filter(({ id, name }) => [id, name].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [allItems, searchQuery]);
  const sortedItems = useMemo(() => {
    if (sortOrder === "none") return searchedItems;
    return [...searchedItems].sort((a, b) => sortOrder === "asc" ? a.artworkCount - b.artworkCount : b.artworkCount - a.artworkCount);
  }, [searchedItems, sortOrder]);
  const toggleSortOrder = () => {
    setSortOrder((prev) => prev === "none" ? "desc" : prev === "desc" ? "asc" : "none");
  };
  const renderListItems = () => {
    return sortedItems.slice(0, visibleCount).map((item) => {
      const id = item.id;
      const name = item.name;
      const artworkCountText = `${item.artworkCount} artwork${item.artworkCount !== 1 ? "s" : ""}`;
      const imageUrl = `${BASE_URL}${item.portrait}`;
      const toUrl = mode === MODE_CHARACTER ? `${BASE_URL}gallery?character=${id}` : `${BASE_URL}gallery?artist=${id}`;
      return /* @__PURE__ */ jsx(ProfileItem, { name, imageUrl, description: artworkCountText, link: toUrl }, id);
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
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [sortedItems]);
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, sortOrder]);
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "lg", sx: styles.container, children: [
    /* @__PURE__ */ jsxs(Box, { sx: styles.box, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", component: "h2", sx: styles.typography, children: title }),
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Search by ID or Name",
          variant: "outlined",
          value: searchInput,
          sx: styles.textField,
          onChange: (e) => setSearchInput(e.target.value),
          slotProps: { input: { "aria-label": ariaLabel } }
        }
      ),
      /* @__PURE__ */ jsx(ArtworkCountSortIconButton, { sortOrder, onToggleSortOrder: toggleSortOrder })
    ] }),
    /* @__PURE__ */ jsx(Box, { component: "ul", sx: styles.listGrid, children: renderListItems() }),
    visibleCount < sortedItems.length && /* @__PURE__ */ jsx(Box, { ref: loadMoreRef, sx: { height: "1px" } })
  ] });
};
export {
  ListPage as L
};
