import { setGlobalContext_buildEntry } from "vike/__internal";
import { resolveRoute } from "vike/routing";
/*! src/pages/posts/@id/+route.ts [vike:pluginModuleBanner] */
const route = (pageContext) => {
  if (pageContext.urlPathname === "/posts" || pageContext.urlPathname === "/posts/") {
    return { routeParams: { id: "" } };
  }
  return resolveRoute("/posts/@id", pageContext.urlPathname);
};
const import1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  route
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:entry:server [vike:pluginModuleBanner] */
const pageFilesLazy = {};
const pageFilesEager = {};
const pageFilesExportNamesLazy = {};
const pageFilesExportNamesEager = {};
const pageFilesList = [];
const neverLoaded = {};
const pageConfigsSerialized = [
  {
    pageId: "/src/pages/_error",
    isErrorPage: true,
    routeFilesystem: void 0,
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/src/pages/_error", moduleExports: import("./entries/src_pages_error.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/renderer/+config.ts", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/src/pages/admin",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/admin", "definedAtLocation": "/src/pages/admin/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/src/pages/admin", moduleExports: import("./entries/src_pages_admin.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/renderer/+config.ts", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/src/pages/artists",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/artists", "definedAtLocation": "/src/pages/artists/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/src/pages/artists", moduleExports: import("./entries/src_pages_artists.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/renderer/+config.ts", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/src/pages/characters",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/characters", "definedAtLocation": "/src/pages/characters/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/src/pages/characters", moduleExports: import("./entries/src_pages_characters.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/renderer/+config.ts", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/src/pages/gallery",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/gallery", "definedAtLocation": "/src/pages/gallery/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/src/pages/gallery", moduleExports: import("./entries/src_pages_gallery.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/renderer/+config.ts", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/src/pages/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/", "definedAtLocation": "/src/pages/index/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/src/pages/index", moduleExports: import("./entries/src_pages_index.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/renderer/+config.ts", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/src/pages/posts/@id",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/posts/@id", "definedAtLocation": "/src/pages/posts/@id/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/src/pages/posts/@id", moduleExports: import("./entries/src_pages_posts_-id.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["route"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/pages/posts/@id/+route.ts", "fileExportPathToShowToUser": [] },
        valueSerialized: {
          type: "plus-file",
          exportValues: import1
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/src/renderer/+config.ts", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  }
];
const pageConfigGlobalSerialized = {
  configValuesSerialized: {}
};
const pageFilesLazyIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyIsomorph = { ...pageFilesLazyIsomorph1 };
pageFilesLazy[".page"] = pageFilesLazyIsomorph;
const pageFilesExportNamesEagerIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerIsomorph = { ...pageFilesExportNamesEagerIsomorph1 };
pageFilesExportNamesEager[".page"] = pageFilesExportNamesEagerIsomorph;
const pageFilesLazyServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyServer = { ...pageFilesLazyServer1 };
pageFilesLazy[".page.server"] = pageFilesLazyServer;
const pageFilesExportNamesEagerServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerServer = { ...pageFilesExportNamesEagerServer1 };
pageFilesExportNamesEager[".page.server"] = pageFilesExportNamesEagerServer;
const pageFilesEagerRoute1 = /* @__PURE__ */ Object.assign({});
const pageFilesEagerRoute = { ...pageFilesEagerRoute1 };
pageFilesEager[".page.route"] = pageFilesEagerRoute;
const pageFilesExportNamesEagerClient1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerClient = { ...pageFilesExportNamesEagerClient1 };
pageFilesExportNamesEager[".page.client"] = pageFilesExportNamesEagerClient;
const virtualFileExports = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  neverLoaded,
  pageConfigGlobalSerialized,
  pageConfigsSerialized,
  pageFilesEager,
  pageFilesExportNamesEager,
  pageFilesExportNamesLazy,
  pageFilesLazy,
  pageFilesList
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:@brillout/vite-plugin-server-entry:serverEntry [vike:pluginModuleBanner] */
{
  const assetsManifest = {
  "_chunk-5lAjeaFv.js": {
    "file": "assets/chunks/chunk-5lAjeaFv.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-cBTvXd1n.js"
    ]
  },
  "_chunk-B1ONzjct.js": {
    "file": "assets/chunks/chunk-B1ONzjct.js",
    "name": "List",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-CNgsYlyE.js",
      "_chunk-weWh6ljP.js"
    ]
  },
  "_chunk-BBf9dubG.js": {
    "file": "assets/chunks/chunk-BBf9dubG.js",
    "name": "Link",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-weWh6ljP.js",
      "_chunk-HjwEvMdy.js"
    ]
  },
  "_chunk-BKZQtAqt.js": {
    "file": "assets/chunks/chunk-BKZQtAqt.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-DqkEop7C.js",
      "_chunk-Ce2b-Pf-.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-HjwEvMdy.js"
    ]
  },
  "_chunk-BLQMF4IF.js": {
    "file": "assets/chunks/chunk-BLQMF4IF.js",
    "name": "TextField",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-C6AmNxQg.js",
      "_chunk-B1ONzjct.js",
      "_chunk-weWh6ljP.js"
    ]
  },
  "_chunk-C6AmNxQg.js": {
    "file": "assets/chunks/chunk-C6AmNxQg.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-cBTvXd1n.js"
    ]
  },
  "_chunk-C87b7CqE.js": {
    "file": "assets/chunks/chunk-C87b7CqE.js",
    "name": "IconButton",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-C9jbnMaf.js"
    ]
  },
  "_chunk-C9jbnMaf.js": {
    "file": "assets/chunks/chunk-C9jbnMaf.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-weWh6ljP.js"
    ]
  },
  "_chunk-CNgsYlyE.js": {
    "file": "assets/chunks/chunk-CNgsYlyE.js",
    "name": "index",
    "imports": [
      "_chunk-cBTvXd1n.js"
    ]
  },
  "_chunk-CXod9guf.js": {
    "file": "assets/chunks/chunk-CXod9guf.js",
    "name": "useAppData",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-BKZQtAqt.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-weWh6ljP.js",
      "_chunk-C6AmNxQg.js",
      "_chunk-B1ONzjct.js",
      "_chunk-BLQMF4IF.js",
      "_chunk-C87b7CqE.js",
      "_chunk-Cyisf5vY.js",
      "_chunk-HjwEvMdy.js"
    ]
  },
  "_chunk-Ce2b-Pf-.js": {
    "file": "assets/chunks/chunk-Ce2b-Pf-.js",
    "name": "renderPageClientSide",
    "imports": [
      "_chunk-PSOkAIay.js"
    ],
    "dynamicImports": [
      "virtual:vike:pageConfigLazy:client:/src/pages/_error",
      "virtual:vike:pageConfigLazy:client:/src/pages/admin",
      "virtual:vike:pageConfigLazy:client:/src/pages/artists",
      "virtual:vike:pageConfigLazy:client:/src/pages/characters",
      "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
      "virtual:vike:pageConfigLazy:client:/src/pages/index",
      "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id"
    ]
  },
  "_chunk-ChecCrYR.js": {
    "file": "assets/chunks/chunk-ChecCrYR.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-5lAjeaFv.js"
    ]
  },
  "_chunk-Cyisf5vY.js": {
    "file": "assets/chunks/chunk-Cyisf5vY.js",
    "name": "Container",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-ChecCrYR.js"
    ]
  },
  "_chunk-DqkEop7C.js": {
    "file": "assets/chunks/chunk-DqkEop7C.js",
    "name": "navigate",
    "imports": [
      "_chunk-Ce2b-Pf-.js"
    ]
  },
  "_chunk-HjwEvMdy.js": {
    "file": "assets/chunks/chunk-HjwEvMdy.js",
    "name": "Typography",
    "imports": [
      "_chunk-cBTvXd1n.js"
    ]
  },
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-cBTvXd1n.js": {
    "file": "assets/chunks/chunk-cBTvXd1n.js",
    "name": "_onRenderClient",
    "imports": [
      "_chunk-PSOkAIay.js"
    ],
    "dynamicImports": [
      "src/components/Navbar/Navbar.tsx",
      "src/components/Footer/Footer.tsx"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "_chunk-weWh6ljP.js": {
    "file": "assets/chunks/chunk-weWh6ljP.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-cBTvXd1n.js"
    ]
  },
  "_chunk-zap-hI2s.js": {
    "file": "assets/chunks/chunk-zap-hI2s.js",
    "name": "Stack",
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-ChecCrYR.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.CNQUvmi_.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-Ce2b-Pf-.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-BhckTVB3.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-BBf9dubG.js",
      "_chunk-Cyisf5vY.js",
      "_chunk-zap-hI2s.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-PSOkAIay.js",
      "_chunk-weWh6ljP.js",
      "_chunk-ChecCrYR.js",
      "_chunk-5lAjeaFv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-DpyzN-kE.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-DqkEop7C.js",
      "_chunk-Ce2b-Pf-.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-weWh6ljP.js",
      "_chunk-5lAjeaFv.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-C87b7CqE.js",
      "_chunk-B1ONzjct.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CNgsYlyE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.CS-vkYq9.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.XK-GRM_d.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-zap-hI2s.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-BLQMF4IF.js",
      "_chunk-weWh6ljP.js",
      "_chunk-C6AmNxQg.js",
      "_chunk-B1ONzjct.js",
      "_chunk-PSOkAIay.js",
      "_chunk-ChecCrYR.js",
      "_chunk-5lAjeaFv.js",
      "_chunk-CNgsYlyE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.2OlAVLDr.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-Ce2b-Pf-.js",
      "_chunk-CXod9guf.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BKZQtAqt.js",
      "_chunk-DqkEop7C.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-weWh6ljP.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-C6AmNxQg.js",
      "_chunk-B1ONzjct.js",
      "_chunk-CNgsYlyE.js",
      "_chunk-BLQMF4IF.js",
      "_chunk-C87b7CqE.js",
      "_chunk-Cyisf5vY.js",
      "_chunk-ChecCrYR.js",
      "_chunk-5lAjeaFv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.xhBc06rp.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-Ce2b-Pf-.js",
      "_chunk-CXod9guf.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BKZQtAqt.js",
      "_chunk-DqkEop7C.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-weWh6ljP.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-C6AmNxQg.js",
      "_chunk-B1ONzjct.js",
      "_chunk-CNgsYlyE.js",
      "_chunk-BLQMF4IF.js",
      "_chunk-C87b7CqE.js",
      "_chunk-Cyisf5vY.js",
      "_chunk-ChecCrYR.js",
      "_chunk-5lAjeaFv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.BcWC7Koa.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BKZQtAqt.js",
      "_chunk-weWh6ljP.js",
      "_chunk-Cyisf5vY.js",
      "_chunk-zap-hI2s.js",
      "_chunk-C6AmNxQg.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DqkEop7C.js",
      "_chunk-Ce2b-Pf-.js",
      "_chunk-ChecCrYR.js",
      "_chunk-5lAjeaFv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.4v5HkeoO.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.CXllcnmn.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-cBTvXd1n.js",
      "_chunk-C9jbnMaf.js",
      "_chunk-BBf9dubG.js",
      "_chunk-C87b7CqE.js",
      "_chunk-HjwEvMdy.js",
      "_chunk-CNgsYlyE.js",
      "_chunk-BKZQtAqt.js",
      "_chunk-PSOkAIay.js",
      "_chunk-weWh6ljP.js",
      "_chunk-DqkEop7C.js",
      "_chunk-Ce2b-Pf-.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  }
};
  const buildInfo = {
    "versionAtBuildTime": "0.4.236",
    "usesClientRouter": false,
    "viteConfigRuntime": {
      "root": "/home/runner/work/touhou-translations/touhou-translations",
      "build": {
        "outDir": "/home/runner/work/touhou-translations/touhou-translations/dist/"
      },
      "_baseViteOriginal": "/touhou-translations/",
      "vitePluginServerEntry": {}
    }
  };
  setGlobalContext_buildEntry({
    virtualFileExports,
    assetsManifest,
    buildInfo
  });
}
