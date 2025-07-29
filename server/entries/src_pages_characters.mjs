import { i as import1 } from "../chunks/chunk-fNEiddaa.js";
import { jsx } from "react/jsx-runtime";
import { render } from "vike/abort";
import { u as useAppData, L as ListPage } from "../chunks/chunk-Bfpd3uMt.js";
import "react-dom/server";
import "vike/server";
import "@emotion/react";
import "@emotion/server/create-instance";
import "@emotion/cache";
import "react";
import "@mui/material";
import "@mui/material/styles";
import "../chunks/chunk-BDphuR0i.js";
import "vike/client/router";
import "@mui/material/IconButton";
import "@mui/material/Tooltip";
import "@mui/icons-material/Collections";
import "@mui/icons-material/ArrowUpward";
import "@mui/icons-material/ArrowDownward";
/*! src/pages/characters/+Page.tsx [vike:pluginModuleBanner] */
const Page = () => {
  const { characters, loading, error } = useAppData();
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  if (error) throw render(500, error.message);
  if (!characters || characters.length === 0) throw render(404, "No characters found");
  return /* @__PURE__ */ jsx(ListPage, { mode: "character", characters });
};
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
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
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/characters/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  }
};
export {
  configValuesSerialized
};
