import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { Container, Box, Typography, TextField } from "@mui/material";
import { b as useGetCharacters, c as useGetArtists } from "./chunk-B0ZWQo0U.js";
import { g as getCharacterPortraits, a as getArtistPortraits, P as ProfileItem } from "./chunk-Bgyqguoc.js";
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
const BASE_URL = "/touhou-translations/";
const ListPage = ({ mode }) => {
  const items = mode === MODE_CHARACTER ? useGetCharacters()() : useGetArtists()();
  const title = mode === MODE_CHARACTER ? "Character List" : "Artist List";
  const ariaLabel = mode === MODE_CHARACTER ? "Search Characters" : "Search Artists";
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const search = (data, query) => data.filter(
    ({ id, name }) => [id, name].some((field) => field.toLowerCase().includes(query.toLowerCase()))
  );
  const sort = (data, order) => order === "none" ? data : [...data].sort(
    (a, b) => order === "asc" ? a.artworkCount - b.artworkCount : b.artworkCount - a.artworkCount
  );
  const searchedItems = useMemo(() => search(items, searchQuery), [items, searchQuery]);
  const sortedItems = useMemo(() => sort(searchedItems, sortOrder), [searchedItems, sortOrder]);
  const toggleSortOrder = () => setSortOrder((prev) => prev === "none" ? "desc" : prev === "desc" ? "asc" : "none");
  const renderListItems = () => {
    return sortedItems.map((item) => {
      const isCharacter = mode === MODE_CHARACTER;
      const id = item.id;
      const name = item.name;
      const artworkCountText = `${item.artworkCount} artwork${item.artworkCount !== 1 ? "s" : ""}`;
      const imageUrl = isCharacter ? getCharacterPortraits(id) : getArtistPortraits(id);
      const toUrl = isCharacter ? `${BASE_URL}gallery?character=${id}` : `${BASE_URL}gallery?artist=${id}`;
      return /* @__PURE__ */ jsx(ProfileItem, { name, imageUrl, description: artworkCountText, link: toUrl }, id);
    });
  };
  useEffect(() => {
    const timeout = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);
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
    /* @__PURE__ */ jsx(Box, { component: "ul", sx: styles.listGrid, children: renderListItems() })
  ] });
};
export {
  ListPage as L
};
