import { i as import1 } from "../chunks/chunk-2WB3rLjB.js";
import { jsx } from "react/jsx-runtime";
import { render } from "vike/abort";
import { L as ListPage } from "../chunks/chunk-CjFP8Lfq.js";
import { u as useAppData } from "../chunks/chunk-Cz_pmYco.js";
import "react-dom/server";
import "vike/server";
import "@emotion/react";
import "@emotion/server/create-instance";
import "@emotion/cache";
import "react";
import "@mui/material";
import "@mui/material/styles";
import "../chunks/chunk-D4yE-5Mp.js";
import "vike/client/router";
import "@mui/material/IconButton";
import "@mui/material/Tooltip";
import "@mui/icons-material/Collections";
import "@mui/icons-material/ArrowUpward";
import "@mui/icons-material/ArrowDownward";
/*! src/pages/artists/+Page.tsx [vike:pluginModuleBanner] */
const Page = () => {
  const { artists, loading, error } = useAppData();
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  if (error) throw render(500, error.message);
  if (!artists || artists.length === 0) throw render(404, "No artists found");
  return /* @__PURE__ */ jsx(ListPage, { mode: "artist", artists });
};
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
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
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/artists/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  }
};
export {
  configValuesSerialized
};
