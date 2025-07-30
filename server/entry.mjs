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
  "_chunk-B1iAPYy5.js": {
    "file": "assets/chunks/chunk-B1iAPYy5.js",
    "name": "TextField",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-CJCwHyOh.js",
      "_chunk-CtYbwimc.js",
      "_chunk-BuqUELJx.js"
    ]
  },
  "_chunk-BIBLTmBG.js": {
    "file": "assets/chunks/chunk-BIBLTmBG.js",
    "name": "Link",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-BuqUELJx.js",
      "_chunk-Dr3RPRdg.js"
    ]
  },
  "_chunk-Bi7xQzuf.js": {
    "file": "assets/chunks/chunk-Bi7xQzuf.js",
    "name": "navigate",
    "imports": [
      "_chunk-C9m6n-Ns.js"
    ]
  },
  "_chunk-BuqUELJx.js": {
    "file": "assets/chunks/chunk-BuqUELJx.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-D_E01v2v.js"
    ]
  },
  "_chunk-BzMsTC_s.js": {
    "file": "assets/chunks/chunk-BzMsTC_s.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-D_E01v2v.js"
    ]
  },
  "_chunk-C8wmb5UY.js": {
    "file": "assets/chunks/chunk-C8wmb5UY.js",
    "name": "Container",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-DlziOD3H.js"
    ]
  },
  "_chunk-C9m6n-Ns.js": {
    "file": "assets/chunks/chunk-C9m6n-Ns.js",
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
  "_chunk-CE5Kk4NI.js": {
    "file": "assets/chunks/chunk-CE5Kk4NI.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-Bi7xQzuf.js",
      "_chunk-C9m6n-Ns.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-Dr3RPRdg.js"
    ]
  },
  "_chunk-CJCwHyOh.js": {
    "file": "assets/chunks/chunk-CJCwHyOh.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-D_E01v2v.js"
    ]
  },
  "_chunk-Ch8RsaTJ.js": {
    "file": "assets/chunks/chunk-Ch8RsaTJ.js",
    "name": "IconButton",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-YWJJuFBI.js"
    ]
  },
  "_chunk-Cld6k6jn.js": {
    "file": "assets/chunks/chunk-Cld6k6jn.js",
    "name": "ListPage",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-CE5Kk4NI.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-BuqUELJx.js",
      "_chunk-CJCwHyOh.js",
      "_chunk-CtYbwimc.js",
      "_chunk-B1iAPYy5.js",
      "_chunk-Ch8RsaTJ.js",
      "_chunk-C8wmb5UY.js",
      "_chunk-Dr3RPRdg.js"
    ]
  },
  "_chunk-Cppx6fcc.js": {
    "file": "assets/chunks/chunk-Cppx6fcc.js",
    "name": "Stack",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-DlziOD3H.js"
    ]
  },
  "_chunk-CtYbwimc.js": {
    "file": "assets/chunks/chunk-CtYbwimc.js",
    "name": "List",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-u0LB6n34.js",
      "_chunk-BuqUELJx.js"
    ]
  },
  "_chunk-D_E01v2v.js": {
    "file": "assets/chunks/chunk-D_E01v2v.js",
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
  "_chunk-DlziOD3H.js": {
    "file": "assets/chunks/chunk-DlziOD3H.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-BzMsTC_s.js"
    ]
  },
  "_chunk-Dr3RPRdg.js": {
    "file": "assets/chunks/chunk-Dr3RPRdg.js",
    "name": "Typography",
    "imports": [
      "_chunk-D_E01v2v.js"
    ]
  },
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-YWJJuFBI.js": {
    "file": "assets/chunks/chunk-YWJJuFBI.js",
    "name": "useAppData",
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-BuqUELJx.js"
    ]
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-u0LB6n34.js": {
    "file": "assets/chunks/chunk-u0LB6n34.js",
    "name": "index",
    "imports": [
      "_chunk-D_E01v2v.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.V5Z2Emob.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-C9m6n-Ns.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-nZLLeQ-G.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-BIBLTmBG.js",
      "_chunk-C8wmb5UY.js",
      "_chunk-Cppx6fcc.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BuqUELJx.js",
      "_chunk-DlziOD3H.js",
      "_chunk-BzMsTC_s.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-WRb8Sj0L.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-Bi7xQzuf.js",
      "_chunk-C9m6n-Ns.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BuqUELJx.js",
      "_chunk-BzMsTC_s.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-Ch8RsaTJ.js",
      "_chunk-CtYbwimc.js",
      "_chunk-PSOkAIay.js",
      "_chunk-u0LB6n34.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.BGKNi7T2.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.DX8sFjND.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-Cppx6fcc.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-B1iAPYy5.js",
      "_chunk-BuqUELJx.js",
      "_chunk-CJCwHyOh.js",
      "_chunk-CtYbwimc.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DlziOD3H.js",
      "_chunk-BzMsTC_s.js",
      "_chunk-u0LB6n34.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.BDrWYQAa.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-C9m6n-Ns.js",
      "_chunk-Cld6k6jn.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CE5Kk4NI.js",
      "_chunk-Bi7xQzuf.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-BuqUELJx.js",
      "_chunk-CJCwHyOh.js",
      "_chunk-CtYbwimc.js",
      "_chunk-u0LB6n34.js",
      "_chunk-B1iAPYy5.js",
      "_chunk-Ch8RsaTJ.js",
      "_chunk-C8wmb5UY.js",
      "_chunk-DlziOD3H.js",
      "_chunk-BzMsTC_s.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.Dup9hJE1.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-C9m6n-Ns.js",
      "_chunk-Cld6k6jn.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CE5Kk4NI.js",
      "_chunk-Bi7xQzuf.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-BuqUELJx.js",
      "_chunk-CJCwHyOh.js",
      "_chunk-CtYbwimc.js",
      "_chunk-u0LB6n34.js",
      "_chunk-B1iAPYy5.js",
      "_chunk-Ch8RsaTJ.js",
      "_chunk-C8wmb5UY.js",
      "_chunk-DlziOD3H.js",
      "_chunk-BzMsTC_s.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.CjdvGgV_.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CE5Kk4NI.js",
      "_chunk-BuqUELJx.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-C8wmb5UY.js",
      "_chunk-Cppx6fcc.js",
      "_chunk-CJCwHyOh.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Bi7xQzuf.js",
      "_chunk-C9m6n-Ns.js",
      "_chunk-DlziOD3H.js",
      "_chunk-BzMsTC_s.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.OyUkkVyv.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.DrSmd6TK.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D_E01v2v.js",
      "_chunk-C9m6n-Ns.js",
      "_chunk-YWJJuFBI.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BIBLTmBG.js",
      "_chunk-Ch8RsaTJ.js",
      "_chunk-Dr3RPRdg.js",
      "_chunk-u0LB6n34.js",
      "_chunk-CE5Kk4NI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BuqUELJx.js",
      "_chunk-Bi7xQzuf.js"
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
