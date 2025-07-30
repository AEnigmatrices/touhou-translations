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
  "_chunk-7rGSMBfU.js": {
    "file": "assets/chunks/chunk-7rGSMBfU.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-BKL2sMDd.js"
    ]
  },
  "_chunk-B73EcVIQ.js": {
    "file": "assets/chunks/chunk-B73EcVIQ.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-ByRXgnm_.js"
    ]
  },
  "_chunk-BDuZGfAC.js": {
    "file": "assets/chunks/chunk-BDuZGfAC.js",
    "name": "Typography",
    "imports": [
      "_chunk-ByRXgnm_.js"
    ]
  },
  "_chunk-BKL2sMDd.js": {
    "file": "assets/chunks/chunk-BKL2sMDd.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-ByRXgnm_.js"
    ]
  },
  "_chunk-BQBKq_vd.js": {
    "file": "assets/chunks/chunk-BQBKq_vd.js",
    "name": "navigate",
    "imports": [
      "_chunk-C6kuNIi9.js"
    ]
  },
  "_chunk-Bj2ig20f.js": {
    "file": "assets/chunks/chunk-Bj2ig20f.js",
    "name": "List",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-CavdWZaq.js",
      "_chunk-rT7M4gdC.js",
      "_chunk-B73EcVIQ.js"
    ]
  },
  "_chunk-BuQN6KjJ.js": {
    "file": "assets/chunks/chunk-BuQN6KjJ.js",
    "name": "ListPage",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-uq3PL0DR.js",
      "_chunk-CavdWZaq.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-Cm7qT4VX.js",
      "_chunk-Bj2ig20f.js",
      "_chunk-C8p419fL.js",
      "_chunk-Q7h_r-cp.js",
      "_chunk-Zin-WjUZ.js",
      "_chunk-BDuZGfAC.js"
    ]
  },
  "_chunk-Bwbn27B_.js": {
    "file": "assets/chunks/chunk-Bwbn27B_.js",
    "name": "useAppData",
    "imports": [
      "_chunk-ByRXgnm_.js"
    ]
  },
  "_chunk-ByRXgnm_.js": {
    "file": "assets/chunks/chunk-ByRXgnm_.js",
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
  "_chunk-BzuSktJY.js": {
    "file": "assets/chunks/chunk-BzuSktJY.js",
    "name": "Stack",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-7rGSMBfU.js"
    ]
  },
  "_chunk-C6kuNIi9.js": {
    "file": "assets/chunks/chunk-C6kuNIi9.js",
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
  "_chunk-C8p419fL.js": {
    "file": "assets/chunks/chunk-C8p419fL.js",
    "name": "TextField",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-CavdWZaq.js",
      "_chunk-Cm7qT4VX.js",
      "_chunk-Bj2ig20f.js",
      "_chunk-B73EcVIQ.js"
    ]
  },
  "_chunk-CavdWZaq.js": {
    "file": "assets/chunks/chunk-CavdWZaq.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-B73EcVIQ.js"
    ]
  },
  "_chunk-Cm7qT4VX.js": {
    "file": "assets/chunks/chunk-Cm7qT4VX.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-ByRXgnm_.js"
    ]
  },
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-Q7h_r-cp.js": {
    "file": "assets/chunks/chunk-Q7h_r-cp.js",
    "name": "IconButton",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-CavdWZaq.js"
    ]
  },
  "_chunk-USZluRco.js": {
    "file": "assets/chunks/chunk-USZluRco.js",
    "name": "Link",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-BDuZGfAC.js"
    ]
  },
  "_chunk-Zin-WjUZ.js": {
    "file": "assets/chunks/chunk-Zin-WjUZ.js",
    "name": "Container",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-7rGSMBfU.js"
    ]
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-rT7M4gdC.js": {
    "file": "assets/chunks/chunk-rT7M4gdC.js",
    "name": "index",
    "imports": [
      "_chunk-ByRXgnm_.js"
    ]
  },
  "_chunk-uq3PL0DR.js": {
    "file": "assets/chunks/chunk-uq3PL0DR.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-BQBKq_vd.js",
      "_chunk-C6kuNIi9.js",
      "_chunk-CavdWZaq.js",
      "_chunk-BDuZGfAC.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.B1miJ1cd.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-C6kuNIi9.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-NpWBFiGI.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-USZluRco.js",
      "_chunk-Zin-WjUZ.js",
      "_chunk-BzuSktJY.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-7rGSMBfU.js",
      "_chunk-BKL2sMDd.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-fHpywZs0.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-BQBKq_vd.js",
      "_chunk-C6kuNIi9.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CavdWZaq.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-BKL2sMDd.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-Q7h_r-cp.js",
      "_chunk-Bj2ig20f.js",
      "_chunk-PSOkAIay.js",
      "_chunk-rT7M4gdC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.SZd1AkgR.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.Bl27vf9H.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-CavdWZaq.js",
      "_chunk-BzuSktJY.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-C8p419fL.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-Cm7qT4VX.js",
      "_chunk-Bj2ig20f.js",
      "_chunk-PSOkAIay.js",
      "_chunk-7rGSMBfU.js",
      "_chunk-BKL2sMDd.js",
      "_chunk-rT7M4gdC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.DL9HRR9m.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-C6kuNIi9.js",
      "_chunk-BuQN6KjJ.js",
      "_chunk-Bwbn27B_.js",
      "_chunk-PSOkAIay.js",
      "_chunk-uq3PL0DR.js",
      "_chunk-BQBKq_vd.js",
      "_chunk-CavdWZaq.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-Cm7qT4VX.js",
      "_chunk-Bj2ig20f.js",
      "_chunk-rT7M4gdC.js",
      "_chunk-C8p419fL.js",
      "_chunk-Q7h_r-cp.js",
      "_chunk-Zin-WjUZ.js",
      "_chunk-7rGSMBfU.js",
      "_chunk-BKL2sMDd.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.B3_irj2E.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-C6kuNIi9.js",
      "_chunk-BuQN6KjJ.js",
      "_chunk-Bwbn27B_.js",
      "_chunk-PSOkAIay.js",
      "_chunk-uq3PL0DR.js",
      "_chunk-BQBKq_vd.js",
      "_chunk-CavdWZaq.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-Cm7qT4VX.js",
      "_chunk-Bj2ig20f.js",
      "_chunk-rT7M4gdC.js",
      "_chunk-C8p419fL.js",
      "_chunk-Q7h_r-cp.js",
      "_chunk-Zin-WjUZ.js",
      "_chunk-7rGSMBfU.js",
      "_chunk-BKL2sMDd.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.br46r8iH.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-uq3PL0DR.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-Zin-WjUZ.js",
      "_chunk-BzuSktJY.js",
      "_chunk-Cm7qT4VX.js",
      "_chunk-CavdWZaq.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BQBKq_vd.js",
      "_chunk-C6kuNIi9.js",
      "_chunk-7rGSMBfU.js",
      "_chunk-BKL2sMDd.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.BskbJZb3.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.wRHTgcEv.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-ByRXgnm_.js",
      "_chunk-C6kuNIi9.js",
      "_chunk-Bwbn27B_.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CavdWZaq.js",
      "_chunk-USZluRco.js",
      "_chunk-Q7h_r-cp.js",
      "_chunk-BDuZGfAC.js",
      "_chunk-rT7M4gdC.js",
      "_chunk-uq3PL0DR.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B73EcVIQ.js",
      "_chunk-BQBKq_vd.js"
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
