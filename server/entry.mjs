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
  "_chunk-1P7lFR0R.js": {
    "file": "assets/chunks/chunk-1P7lFR0R.js",
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
  "_chunk-B74M5ANt.js": {
    "file": "assets/chunks/chunk-B74M5ANt.js",
    "name": "Link",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-QluFiGla.js",
      "_chunk-LyBWuAeu.js"
    ]
  },
  "_chunk-BAwYxSHb.js": {
    "file": "assets/chunks/chunk-BAwYxSHb.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-Bj2tYrPR.js"
    ]
  },
  "_chunk-BMRLx3uz.js": {
    "file": "assets/chunks/chunk-BMRLx3uz.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-QluFiGla.js"
    ]
  },
  "_chunk-BTjHIEU1.js": {
    "file": "assets/chunks/chunk-BTjHIEU1.js",
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
  "_chunk-BdtLYtnk.js": {
    "file": "assets/chunks/chunk-BdtLYtnk.js",
    "name": "IconButton",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BMRLx3uz.js"
    ]
  },
  "_chunk-Bj2tYrPR.js": {
    "file": "assets/chunks/chunk-Bj2tYrPR.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-1P7lFR0R.js"
    ]
  },
  "_chunk-Ci9JX_ec.js": {
    "file": "assets/chunks/chunk-Ci9JX_ec.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-1P7lFR0R.js"
    ]
  },
  "_chunk-CoSD7CzC.js": {
    "file": "assets/chunks/chunk-CoSD7CzC.js",
    "name": "index",
    "imports": [
      "_chunk-1P7lFR0R.js"
    ]
  },
  "_chunk-CpoQ3I7l.js": {
    "file": "assets/chunks/chunk-CpoQ3I7l.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-bFbcroE4.js",
      "_chunk-BTjHIEU1.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-LyBWuAeu.js"
    ]
  },
  "_chunk-CqSpO4hV.js": {
    "file": "assets/chunks/chunk-CqSpO4hV.js",
    "name": "List",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-CoSD7CzC.js",
      "_chunk-QluFiGla.js"
    ]
  },
  "_chunk-D7EwVC70.js": {
    "file": "assets/chunks/chunk-D7EwVC70.js",
    "name": "Container",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BAwYxSHb.js"
    ]
  },
  "_chunk-DCQnYvbA.js": {
    "file": "assets/chunks/chunk-DCQnYvbA.js",
    "name": "Stack",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BAwYxSHb.js"
    ]
  },
  "_chunk-DLas_LHC.js": {
    "file": "assets/chunks/chunk-DLas_LHC.js",
    "name": "useAppData",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-CpoQ3I7l.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-QluFiGla.js",
      "_chunk-Ci9JX_ec.js",
      "_chunk-CqSpO4hV.js",
      "_chunk-w_9sFO3i.js",
      "_chunk-BdtLYtnk.js",
      "_chunk-D7EwVC70.js",
      "_chunk-LyBWuAeu.js"
    ]
  },
  "_chunk-LyBWuAeu.js": {
    "file": "assets/chunks/chunk-LyBWuAeu.js",
    "name": "Typography",
    "imports": [
      "_chunk-1P7lFR0R.js"
    ]
  },
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-QluFiGla.js": {
    "file": "assets/chunks/chunk-QluFiGla.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-1P7lFR0R.js"
    ]
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-bFbcroE4.js": {
    "file": "assets/chunks/chunk-bFbcroE4.js",
    "name": "navigate",
    "imports": [
      "_chunk-BTjHIEU1.js"
    ]
  },
  "_chunk-w_9sFO3i.js": {
    "file": "assets/chunks/chunk-w_9sFO3i.js",
    "name": "TextField",
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-Ci9JX_ec.js",
      "_chunk-CqSpO4hV.js",
      "_chunk-QluFiGla.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.LhAKIefr.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-BTjHIEU1.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-H9CuIxtN.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-B74M5ANt.js",
      "_chunk-D7EwVC70.js",
      "_chunk-DCQnYvbA.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-PSOkAIay.js",
      "_chunk-QluFiGla.js",
      "_chunk-BAwYxSHb.js",
      "_chunk-Bj2tYrPR.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-DAGSOy03.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-bFbcroE4.js",
      "_chunk-BTjHIEU1.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-QluFiGla.js",
      "_chunk-Bj2tYrPR.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-BdtLYtnk.js",
      "_chunk-CqSpO4hV.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CoSD7CzC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.B21_loub.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.DMjrv7-K.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-DCQnYvbA.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-w_9sFO3i.js",
      "_chunk-QluFiGla.js",
      "_chunk-Ci9JX_ec.js",
      "_chunk-CqSpO4hV.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BAwYxSHb.js",
      "_chunk-Bj2tYrPR.js",
      "_chunk-CoSD7CzC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.B88TgRgf.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BTjHIEU1.js",
      "_chunk-DLas_LHC.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CpoQ3I7l.js",
      "_chunk-bFbcroE4.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-QluFiGla.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-Ci9JX_ec.js",
      "_chunk-CqSpO4hV.js",
      "_chunk-CoSD7CzC.js",
      "_chunk-w_9sFO3i.js",
      "_chunk-BdtLYtnk.js",
      "_chunk-D7EwVC70.js",
      "_chunk-BAwYxSHb.js",
      "_chunk-Bj2tYrPR.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.BTrWPySD.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BTjHIEU1.js",
      "_chunk-DLas_LHC.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CpoQ3I7l.js",
      "_chunk-bFbcroE4.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-QluFiGla.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-Ci9JX_ec.js",
      "_chunk-CqSpO4hV.js",
      "_chunk-CoSD7CzC.js",
      "_chunk-w_9sFO3i.js",
      "_chunk-BdtLYtnk.js",
      "_chunk-D7EwVC70.js",
      "_chunk-BAwYxSHb.js",
      "_chunk-Bj2tYrPR.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.BaYuSPmx.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CpoQ3I7l.js",
      "_chunk-QluFiGla.js",
      "_chunk-D7EwVC70.js",
      "_chunk-DCQnYvbA.js",
      "_chunk-Ci9JX_ec.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-PSOkAIay.js",
      "_chunk-bFbcroE4.js",
      "_chunk-BTjHIEU1.js",
      "_chunk-BAwYxSHb.js",
      "_chunk-Bj2tYrPR.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.BlxcmFma.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.Bq5H4c6g.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-1P7lFR0R.js",
      "_chunk-BMRLx3uz.js",
      "_chunk-B74M5ANt.js",
      "_chunk-BdtLYtnk.js",
      "_chunk-LyBWuAeu.js",
      "_chunk-CoSD7CzC.js",
      "_chunk-CpoQ3I7l.js",
      "_chunk-PSOkAIay.js",
      "_chunk-QluFiGla.js",
      "_chunk-bFbcroE4.js",
      "_chunk-BTjHIEU1.js"
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
