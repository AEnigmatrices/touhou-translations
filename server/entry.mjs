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
  "_chunk-BGvXkWyR.js": {
    "file": "assets/chunks/chunk-BGvXkWyR.js",
    "name": "Typography",
    "imports": [
      "_chunk-BhEAYpst.js"
    ]
  },
  "_chunk-BK6pxUd8.js": {
    "file": "assets/chunks/chunk-BK6pxUd8.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-dGKtB6So.js"
    ]
  },
  "_chunk-BKyKLG7g.js": {
    "file": "assets/chunks/chunk-BKyKLG7g.js",
    "name": "Stack",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-B_Oqs3t4.js"
    ]
  },
  "_chunk-B_Oqs3t4.js": {
    "file": "assets/chunks/chunk-B_Oqs3t4.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-DdGMz4lE.js"
    ]
  },
  "_chunk-BhEAYpst.js": {
    "file": "assets/chunks/chunk-BhEAYpst.js",
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
  "_chunk-C0EnBM2Y.js": {
    "file": "assets/chunks/chunk-C0EnBM2Y.js",
    "name": "navigate",
    "imports": [
      "_chunk-NU1TZeb4.js"
    ]
  },
  "_chunk-C4VZ6Mz2.js": {
    "file": "assets/chunks/chunk-C4VZ6Mz2.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-C0EnBM2Y.js",
      "_chunk-NU1TZeb4.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-BGvXkWyR.js"
    ]
  },
  "_chunk-CWjLTlfU.js": {
    "file": "assets/chunks/chunk-CWjLTlfU.js",
    "name": "IconButton",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-BK6pxUd8.js"
    ]
  },
  "_chunk-CmPq5tJt.js": {
    "file": "assets/chunks/chunk-CmPq5tJt.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-BhEAYpst.js"
    ]
  },
  "_chunk-DdGMz4lE.js": {
    "file": "assets/chunks/chunk-DdGMz4lE.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-BhEAYpst.js"
    ]
  },
  "_chunk-DqGgsTOM.js": {
    "file": "assets/chunks/chunk-DqGgsTOM.js",
    "name": "index",
    "imports": [
      "_chunk-BhEAYpst.js"
    ]
  },
  "_chunk-Dua4o9EH.js": {
    "file": "assets/chunks/chunk-Dua4o9EH.js",
    "name": "Link",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-dGKtB6So.js",
      "_chunk-BGvXkWyR.js"
    ]
  },
  "_chunk-Jv1di2ZK.js": {
    "file": "assets/chunks/chunk-Jv1di2ZK.js",
    "name": "List",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-DqGgsTOM.js",
      "_chunk-dGKtB6So.js"
    ]
  },
  "_chunk-NU1TZeb4.js": {
    "file": "assets/chunks/chunk-NU1TZeb4.js",
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
  "_chunk-ONMUjqEk.js": {
    "file": "assets/chunks/chunk-ONMUjqEk.js",
    "name": "useAppData",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-C4VZ6Mz2.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-dGKtB6So.js",
      "_chunk-CmPq5tJt.js",
      "_chunk-Jv1di2ZK.js",
      "_chunk-vxDbpcLl.js",
      "_chunk-CWjLTlfU.js",
      "_chunk-mDrhh8D1.js",
      "_chunk-BGvXkWyR.js"
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
  "_chunk-dGKtB6So.js": {
    "file": "assets/chunks/chunk-dGKtB6So.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-BhEAYpst.js"
    ]
  },
  "_chunk-mDrhh8D1.js": {
    "file": "assets/chunks/chunk-mDrhh8D1.js",
    "name": "Container",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-B_Oqs3t4.js"
    ]
  },
  "_chunk-vxDbpcLl.js": {
    "file": "assets/chunks/chunk-vxDbpcLl.js",
    "name": "TextField",
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-CmPq5tJt.js",
      "_chunk-Jv1di2ZK.js",
      "_chunk-dGKtB6So.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.D0mAj_Tp.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-NU1TZeb4.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-DcjeWfmE.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-Dua4o9EH.js",
      "_chunk-mDrhh8D1.js",
      "_chunk-BKyKLG7g.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-PSOkAIay.js",
      "_chunk-dGKtB6So.js",
      "_chunk-B_Oqs3t4.js",
      "_chunk-DdGMz4lE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-C7L1MZf-.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-C0EnBM2Y.js",
      "_chunk-NU1TZeb4.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-dGKtB6So.js",
      "_chunk-DdGMz4lE.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-CWjLTlfU.js",
      "_chunk-Jv1di2ZK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DqGgsTOM.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.DvRF-PIl.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.g1zu-feP.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-BKyKLG7g.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-vxDbpcLl.js",
      "_chunk-dGKtB6So.js",
      "_chunk-CmPq5tJt.js",
      "_chunk-Jv1di2ZK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B_Oqs3t4.js",
      "_chunk-DdGMz4lE.js",
      "_chunk-DqGgsTOM.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.rZCa2wnE.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-NU1TZeb4.js",
      "_chunk-ONMUjqEk.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C4VZ6Mz2.js",
      "_chunk-C0EnBM2Y.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-dGKtB6So.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-CmPq5tJt.js",
      "_chunk-Jv1di2ZK.js",
      "_chunk-DqGgsTOM.js",
      "_chunk-vxDbpcLl.js",
      "_chunk-CWjLTlfU.js",
      "_chunk-mDrhh8D1.js",
      "_chunk-B_Oqs3t4.js",
      "_chunk-DdGMz4lE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.DxG5GFh3.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-NU1TZeb4.js",
      "_chunk-ONMUjqEk.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C4VZ6Mz2.js",
      "_chunk-C0EnBM2Y.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-dGKtB6So.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-CmPq5tJt.js",
      "_chunk-Jv1di2ZK.js",
      "_chunk-DqGgsTOM.js",
      "_chunk-vxDbpcLl.js",
      "_chunk-CWjLTlfU.js",
      "_chunk-mDrhh8D1.js",
      "_chunk-B_Oqs3t4.js",
      "_chunk-DdGMz4lE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.D6rhtrvS.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-C4VZ6Mz2.js",
      "_chunk-dGKtB6So.js",
      "_chunk-mDrhh8D1.js",
      "_chunk-BKyKLG7g.js",
      "_chunk-CmPq5tJt.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C0EnBM2Y.js",
      "_chunk-NU1TZeb4.js",
      "_chunk-B_Oqs3t4.js",
      "_chunk-DdGMz4lE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.Cq0xYL_A.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.Db9cP4P2.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BhEAYpst.js",
      "_chunk-BK6pxUd8.js",
      "_chunk-Dua4o9EH.js",
      "_chunk-CWjLTlfU.js",
      "_chunk-BGvXkWyR.js",
      "_chunk-DqGgsTOM.js",
      "_chunk-C4VZ6Mz2.js",
      "_chunk-PSOkAIay.js",
      "_chunk-dGKtB6So.js",
      "_chunk-C0EnBM2Y.js",
      "_chunk-NU1TZeb4.js"
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
