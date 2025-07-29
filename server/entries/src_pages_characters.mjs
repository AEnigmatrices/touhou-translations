import { c as fetchCharacters, b as fetchPosts, d as getCharacterArtworkCounts, i as import1 } from "../chunks/chunk-ZayQ6bkZ.js";
import { jsx } from "react/jsx-runtime";
import { L as ListPage } from "../chunks/chunk-B69oECoH.js";
import { u as useData } from "../chunks/chunk-Cu_rZyQE.js";
import { render } from "vike/abort";
import "react-dom/server";
import "vike/server";
import "@emotion/react";
import "@emotion/server/create-instance";
import "@emotion/cache";
import "react";
import "@mui/material";
import "@mui/material/styles";
import "../chunks/chunk-DHOET97D.js";
import "vike/client/router";
import "@mui/material/IconButton";
import "@mui/material/Tooltip";
import "@mui/icons-material/Collections";
import "@mui/icons-material/ArrowUpward";
import "@mui/icons-material/ArrowDownward";
/*! src/pages/characters/+onBeforePrerenderStart.ts [vike:pluginModuleBanner] */
const onBeforePrerenderStart = async () => {
  try {
    const characters = fetchCharacters();
    if (!characters || characters.length === 0) return [];
    const posts = fetchPosts();
    const artworkCounts = getCharacterArtworkCounts(posts);
    const charactersWithCount = characters.map((char) => ({
      ...char,
      artworkCount: artworkCounts[char.id] ?? 0
    }));
    return [{ url: "/characters", pageContext: { data: { characters: charactersWithCount } } }];
  } catch (error) {
    console.error("Failed to generate prerender routes for characters:", error);
    return [];
  }
};
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onBeforePrerenderStart
}, Symbol.toStringTag, { value: "Module" }));
/*! src/pages/characters/+Page.tsx [vike:pluginModuleBanner] */
const Page = () => {
  const { characters } = useData();
  return /* @__PURE__ */ jsx(ListPage, { mode: "character", characters });
};
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
/*! src/pages/characters/+data.ts [vike:pluginModuleBanner] */
const data = async () => {
  const characters = fetchCharacters();
  if (!characters || characters.length === 0) throw render(404, "No characters found");
  const posts = fetchPosts();
  const artworkCounts = getCharacterArtworkCounts(posts);
  const charactersWithCount = characters.map((character) => ({
    ...character,
    artworkCount: artworkCounts[character.id] ?? 0
  }));
  return { characters: charactersWithCount };
};
const import4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:pageConfigLazy:server:/src/pages/characters [vike:pluginModuleBanner] */
const configValuesSerialized = {
  ["isClientRuntimeLoaded"]: {
    type: "computed",
    definedAtData: null,
    valueSerialized: {
      type: "js-serialized",
      value: true
    }
  },
  ["onRenderHtml"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/renderer/+onRenderHtml.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import1
    }
  },
  ["onBeforePrerenderStart"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/characters/+onBeforePrerenderStart.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/characters/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import3
    }
  },
  ["data"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/characters/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import4
    }
  }
};
export {
  configValuesSerialized
};
