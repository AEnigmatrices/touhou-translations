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
  "_chunk-BCH6eGJh.js": {
    "file": "assets/chunks/chunk-BCH6eGJh.js",
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
  "_chunk-BV01OUAn.js": {
    "file": "assets/chunks/chunk-BV01OUAn.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-C4E5TGWw.js"
    ]
  },
  "_chunk-Bt3GlRT6.js": {
    "file": "assets/chunks/chunk-Bt3GlRT6.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-D0RzieBz.js"
    ]
  },
  "_chunk-C3_e3s3P.js": {
    "file": "assets/chunks/chunk-C3_e3s3P.js",
    "name": "index",
    "imports": [
      "_chunk-D0RzieBz.js"
    ]
  },
  "_chunk-C4E5TGWw.js": {
    "file": "assets/chunks/chunk-C4E5TGWw.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-D0RzieBz.js"
    ]
  },
  "_chunk-C78WsqaB.js": {
    "file": "assets/chunks/chunk-C78WsqaB.js",
    "name": "Stack",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-DDpyBizk.js"
    ]
  },
  "_chunk-CMl_73J4.js": {
    "file": "assets/chunks/chunk-CMl_73J4.js",
    "name": "Link",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-D3M8p-Em.js"
    ]
  },
  "_chunk-ChNqhGmZ.js": {
    "file": "assets/chunks/chunk-ChNqhGmZ.js",
    "name": "useAppData",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-DYwEadep.js",
      "_chunk-BV01OUAn.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-DHBzTtSM.js",
      "_chunk-pBgKZLiS.js",
      "_chunk-GzK_nhCm.js",
      "_chunk-QAd5Ghxh.js",
      "_chunk-MasToj_v.js",
      "_chunk-D3M8p-Em.js"
    ]
  },
  "_chunk-D0RzieBz.js": {
    "file": "assets/chunks/chunk-D0RzieBz.js",
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
  "_chunk-D3M8p-Em.js": {
    "file": "assets/chunks/chunk-D3M8p-Em.js",
    "name": "Typography",
    "imports": [
      "_chunk-D0RzieBz.js"
    ]
  },
  "_chunk-DDpyBizk.js": {
    "file": "assets/chunks/chunk-DDpyBizk.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-Bt3GlRT6.js"
    ]
  },
  "_chunk-DHBzTtSM.js": {
    "file": "assets/chunks/chunk-DHBzTtSM.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-D0RzieBz.js"
    ]
  },
  "_chunk-DYwEadep.js": {
    "file": "assets/chunks/chunk-DYwEadep.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-Df-kgBCy.js",
      "_chunk-BCH6eGJh.js",
      "_chunk-BV01OUAn.js",
      "_chunk-D3M8p-Em.js"
    ]
  },
  "_chunk-Df-kgBCy.js": {
    "file": "assets/chunks/chunk-Df-kgBCy.js",
    "name": "navigate",
    "imports": [
      "_chunk-BCH6eGJh.js"
    ]
  },
  "_chunk-GzK_nhCm.js": {
    "file": "assets/chunks/chunk-GzK_nhCm.js",
    "name": "TextField",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-BV01OUAn.js",
      "_chunk-DHBzTtSM.js",
      "_chunk-pBgKZLiS.js",
      "_chunk-C4E5TGWw.js"
    ]
  },
  "_chunk-MasToj_v.js": {
    "file": "assets/chunks/chunk-MasToj_v.js",
    "name": "Container",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-DDpyBizk.js"
    ]
  },
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-QAd5Ghxh.js": {
    "file": "assets/chunks/chunk-QAd5Ghxh.js",
    "name": "IconButton",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-BV01OUAn.js"
    ]
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-pBgKZLiS.js": {
    "file": "assets/chunks/chunk-pBgKZLiS.js",
    "name": "List",
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-BV01OUAn.js",
      "_chunk-C3_e3s3P.js",
      "_chunk-C4E5TGWw.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.BPpOzO5F.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-BCH6eGJh.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-BBO6U57u.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-CMl_73J4.js",
      "_chunk-MasToj_v.js",
      "_chunk-C78WsqaB.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-DDpyBizk.js",
      "_chunk-Bt3GlRT6.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-BxZy01LA.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-Df-kgBCy.js",
      "_chunk-BCH6eGJh.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BV01OUAn.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-Bt3GlRT6.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-QAd5Ghxh.js",
      "_chunk-pBgKZLiS.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C3_e3s3P.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.CWPXr7OA.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.D6lmCU0J.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-BV01OUAn.js",
      "_chunk-C78WsqaB.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-GzK_nhCm.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-DHBzTtSM.js",
      "_chunk-pBgKZLiS.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DDpyBizk.js",
      "_chunk-Bt3GlRT6.js",
      "_chunk-C3_e3s3P.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.CT_8swqp.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-BCH6eGJh.js",
      "_chunk-ChNqhGmZ.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DYwEadep.js",
      "_chunk-Df-kgBCy.js",
      "_chunk-BV01OUAn.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-DHBzTtSM.js",
      "_chunk-pBgKZLiS.js",
      "_chunk-C3_e3s3P.js",
      "_chunk-GzK_nhCm.js",
      "_chunk-QAd5Ghxh.js",
      "_chunk-MasToj_v.js",
      "_chunk-DDpyBizk.js",
      "_chunk-Bt3GlRT6.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.Dd0jqnXx.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-BCH6eGJh.js",
      "_chunk-ChNqhGmZ.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DYwEadep.js",
      "_chunk-Df-kgBCy.js",
      "_chunk-BV01OUAn.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-DHBzTtSM.js",
      "_chunk-pBgKZLiS.js",
      "_chunk-C3_e3s3P.js",
      "_chunk-GzK_nhCm.js",
      "_chunk-QAd5Ghxh.js",
      "_chunk-MasToj_v.js",
      "_chunk-DDpyBizk.js",
      "_chunk-Bt3GlRT6.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.DxzAiB63.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-DYwEadep.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-MasToj_v.js",
      "_chunk-C78WsqaB.js",
      "_chunk-DHBzTtSM.js",
      "_chunk-BV01OUAn.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Df-kgBCy.js",
      "_chunk-BCH6eGJh.js",
      "_chunk-DDpyBizk.js",
      "_chunk-Bt3GlRT6.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.BxgXNV28.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.CJ8PYGio.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-D0RzieBz.js",
      "_chunk-BV01OUAn.js",
      "_chunk-CMl_73J4.js",
      "_chunk-QAd5Ghxh.js",
      "_chunk-D3M8p-Em.js",
      "_chunk-C3_e3s3P.js",
      "_chunk-DYwEadep.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C4E5TGWw.js",
      "_chunk-Df-kgBCy.js",
      "_chunk-BCH6eGJh.js"
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
