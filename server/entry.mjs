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
  "_chunk-BKG7bx98.js": {
    "file": "assets/chunks/chunk-BKG7bx98.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-C2by2Pxp.js"
    ]
  },
  "_chunk-BSPPyBXV.js": {
    "file": "assets/chunks/chunk-BSPPyBXV.js",
    "name": "TextField",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-C4haDlpM.js",
      "_chunk-xttD6p6X.js",
      "_chunk-DuB5TprT.js",
      "_chunk-BKG7bx98.js"
    ]
  },
  "_chunk-BU_Ed6J6.js": {
    "file": "assets/chunks/chunk-BU_Ed6J6.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-DImrOqRg.js"
    ]
  },
  "_chunk-C2by2Pxp.js": {
    "file": "assets/chunks/chunk-C2by2Pxp.js",
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
  "_chunk-C4haDlpM.js": {
    "file": "assets/chunks/chunk-C4haDlpM.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-BKG7bx98.js"
    ]
  },
  "_chunk-C_ooIWcE.js": {
    "file": "assets/chunks/chunk-C_ooIWcE.js",
    "name": "Link",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-BKG7bx98.js"
    ]
  },
  "_chunk-Cq18-GLJ.js": {
    "file": "assets/chunks/chunk-Cq18-GLJ.js",
    "name": "useData",
    "imports": [
      "_chunk-C2by2Pxp.js"
    ]
  },
  "_chunk-DImrOqRg.js": {
    "file": "assets/chunks/chunk-DImrOqRg.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-C2by2Pxp.js"
    ]
  },
  "_chunk-DL0icjRO.js": {
    "file": "assets/chunks/chunk-DL0icjRO.js",
    "name": "Stack",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-BU_Ed6J6.js"
    ]
  },
  "_chunk-DlQvrt32.js": {
    "file": "assets/chunks/chunk-DlQvrt32.js",
    "name": "index",
    "imports": [
      "_chunk-C2by2Pxp.js"
    ]
  },
  "_chunk-DuB5TprT.js": {
    "file": "assets/chunks/chunk-DuB5TprT.js",
    "name": "List",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-C4haDlpM.js",
      "_chunk-DlQvrt32.js",
      "_chunk-BKG7bx98.js"
    ]
  },
  "_chunk-Dz95my7A.js": {
    "file": "assets/chunks/chunk-Dz95my7A.js",
    "name": "galleryUtils"
  },
  "_chunk-EpH9Ctno.js": {
    "file": "assets/chunks/chunk-EpH9Ctno.js",
    "name": "ListPage",
    "imports": [
      "_chunk-PSOkAIay.js",
      "_chunk-C2by2Pxp.js",
      "_chunk-Dz95my7A.js",
      "_chunk-C4haDlpM.js",
      "_chunk-BKG7bx98.js",
      "_chunk-xttD6p6X.js",
      "_chunk-DuB5TprT.js",
      "_chunk-BSPPyBXV.js",
      "_chunk-dOYE9mlH.js",
      "_chunk-L0Gsdfd6.js"
    ],
    "dynamicImports": [
      "src/components/ProfileItem/ProfileItem.tsx"
    ]
  },
  "_chunk-L0Gsdfd6.js": {
    "file": "assets/chunks/chunk-L0Gsdfd6.js",
    "name": "Container",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-BU_Ed6J6.js"
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
  "_chunk-dOYE9mlH.js": {
    "file": "assets/chunks/chunk-dOYE9mlH.js",
    "name": "IconButton",
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-C4haDlpM.js"
    ]
  },
  "_chunk-fSq0x51c.js": {
    "file": "assets/chunks/chunk-fSq0x51c.js",
    "name": "navigate",
    "imports": [
      "_chunk-lAWsPT7n.js"
    ]
  },
  "_chunk-lAWsPT7n.js": {
    "file": "assets/chunks/chunk-lAWsPT7n.js",
    "name": "renderPageClientSide",
    "imports": [
      "_chunk-PSOkAIay.js"
    ],
    "dynamicImports": [
      "virtual:vike:pageConfigLazy:client:/src/pages/admin",
      "virtual:vike:pageConfigLazy:client:/src/pages/artists",
      "virtual:vike:pageConfigLazy:client:/src/pages/characters",
      "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
      "virtual:vike:pageConfigLazy:client:/src/pages/index",
      "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id"
    ]
  },
  "_chunk-xttD6p6X.js": {
    "file": "assets/chunks/chunk-xttD6p6X.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-C2by2Pxp.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.C3q9jfwH.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-lAWsPT7n.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-CWcATqM5.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-C_ooIWcE.js",
      "_chunk-L0Gsdfd6.js",
      "_chunk-DL0icjRO.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BKG7bx98.js",
      "_chunk-BU_Ed6J6.js",
      "_chunk-DImrOqRg.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-xua40vxN.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-fSq0x51c.js",
      "_chunk-lAWsPT7n.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-C4haDlpM.js",
      "_chunk-BKG7bx98.js",
      "_chunk-DImrOqRg.js",
      "_chunk-dOYE9mlH.js",
      "_chunk-DuB5TprT.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DlQvrt32.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/ProfileItem/ProfileItem.tsx": {
    "file": "assets/chunks/chunk-DNI9M9yU.js",
    "name": "ProfileItem",
    "src": "src/components/ProfileItem/ProfileItem.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-fSq0x51c.js",
      "_chunk-lAWsPT7n.js",
      "_chunk-Dz95my7A.js",
      "_chunk-C4haDlpM.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BKG7bx98.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.X8o4a-3d.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-C4haDlpM.js",
      "_chunk-DL0icjRO.js",
      "_chunk-BSPPyBXV.js",
      "_chunk-BKG7bx98.js",
      "_chunk-xttD6p6X.js",
      "_chunk-DuB5TprT.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BU_Ed6J6.js",
      "_chunk-DImrOqRg.js",
      "_chunk-DlQvrt32.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.BMVk8L5G.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-EpH9Ctno.js",
      "_chunk-Cq18-GLJ.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Dz95my7A.js",
      "_chunk-C4haDlpM.js",
      "_chunk-BKG7bx98.js",
      "_chunk-xttD6p6X.js",
      "_chunk-DuB5TprT.js",
      "_chunk-DlQvrt32.js",
      "_chunk-BSPPyBXV.js",
      "_chunk-dOYE9mlH.js",
      "_chunk-L0Gsdfd6.js",
      "_chunk-BU_Ed6J6.js",
      "_chunk-DImrOqRg.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.CJC6E556.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-EpH9Ctno.js",
      "_chunk-Cq18-GLJ.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Dz95my7A.js",
      "_chunk-C4haDlpM.js",
      "_chunk-BKG7bx98.js",
      "_chunk-xttD6p6X.js",
      "_chunk-DuB5TprT.js",
      "_chunk-DlQvrt32.js",
      "_chunk-BSPPyBXV.js",
      "_chunk-dOYE9mlH.js",
      "_chunk-L0Gsdfd6.js",
      "_chunk-BU_Ed6J6.js",
      "_chunk-DImrOqRg.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.BzjdnVzf.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-_MjiKTlx.js",
      "src/components/ProfileItem/ProfileItem.tsx",
      "_chunk-Dz95my7A.js",
      "_chunk-BKG7bx98.js",
      "_chunk-L0Gsdfd6.js",
      "_chunk-DL0icjRO.js",
      "_chunk-xttD6p6X.js",
      "_chunk-C4haDlpM.js",
      "_chunk-PSOkAIay.js",
      "_chunk-fSq0x51c.js",
      "_chunk-lAWsPT7n.js",
      "_chunk-BU_Ed6J6.js",
      "_chunk-DImrOqRg.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.DZ9vJ26p.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.CFbimNIA.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C2by2Pxp.js",
      "_chunk-Cq18-GLJ.js",
      "_chunk-C4haDlpM.js",
      "_chunk-C_ooIWcE.js",
      "_chunk-dOYE9mlH.js",
      "_chunk-DlQvrt32.js",
      "_chunk-Dz95my7A.js",
      "src/components/ProfileItem/ProfileItem.tsx",
      "_chunk-PSOkAIay.js",
      "_chunk-BKG7bx98.js",
      "_chunk-fSq0x51c.js",
      "_chunk-lAWsPT7n.js"
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
