import { f as fetchArtists, b as fetchPosts, g as getArtistArtworkCounts, i as import1 } from "../chunks/chunk-ZayQ6bkZ.js";
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
/*! src/pages/artists/+onBeforePrerenderStart.ts [vike:pluginModuleBanner] */
const onBeforePrerenderStart = async () => {
  try {
    const artists = fetchArtists();
    if (!artists || artists.length === 0) return [];
    const posts = fetchPosts();
    const artworkCounts = getArtistArtworkCounts(posts);
    const artistsWithCount = artists.map((char) => ({
      ...char,
      artworkCount: artworkCounts[char.id] ?? 0
    }));
    return [{ url: "/artists", pageContext: { data: { artists: artistsWithCount } } }];
  } catch (error) {
    console.error("Failed to generate prerender routes for artists:", error);
    return [];
  }
};
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onBeforePrerenderStart
}, Symbol.toStringTag, { value: "Module" }));
/*! src/pages/artists/+Page.tsx [vike:pluginModuleBanner] */
const Page = () => {
  const { artists } = useData();
  return /* @__PURE__ */ jsx(ListPage, { mode: "artist", artists });
};
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
/*! src/pages/artists/+data.ts [vike:pluginModuleBanner] */
const data = async () => {
  const artists = fetchArtists();
  if (!artists || artists.length === 0) throw render(404, "No artists found");
  const posts = fetchPosts();
  const artworkCounts = getArtistArtworkCounts(posts);
  const artistsWithCount = artists.map((artist) => ({
    ...artist,
    artworkCount: artworkCounts[artist.id] ?? 0
  }));
  return { artists: artistsWithCount };
};
const import4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:pageConfigLazy:server:/src/pages/artists [vike:pluginModuleBanner] */
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
    definedAtData: { "filePathToShowToUser": "/src/pages/artists/+onBeforePrerenderStart.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/artists/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import3
    }
  },
  ["data"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/artists/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import4
    }
  }
};
export {
  configValuesSerialized
};
