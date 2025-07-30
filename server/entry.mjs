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
  "_chunk-0mkyugRY.js": {
    "file": "assets/chunks/chunk-0mkyugRY.js",
    "name": "TextField",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-CWHFDgDj.js",
      "_chunk-gXDFmhdw.js",
      "_chunk-CHIWB-tm.js"
    ]
  },
  "_chunk-70wUnHTE.js": {
    "file": "assets/chunks/chunk-70wUnHTE.js",
    "name": "index",
    "imports": [
      "_chunk-BMDyibAK.js"
    ]
  },
  "_chunk-B2DhZ9P1.js": {
    "file": "assets/chunks/chunk-B2DhZ9P1.js",
    "name": "navigate",
    "imports": [
      "_chunk-CxAl3UIe.js"
    ]
  },
  "_chunk-B57q0L2H.js": {
    "file": "assets/chunks/chunk-B57q0L2H.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-B2DhZ9P1.js",
      "_chunk-CxAl3UIe.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-tGEpzyyi.js"
    ]
  },
  "_chunk-BMDyibAK.js": {
    "file": "assets/chunks/chunk-BMDyibAK.js",
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
  "_chunk-Bf-HVCEs.js": {
    "file": "assets/chunks/chunk-Bf-HVCEs.js",
    "name": "Link",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-tGEpzyyi.js"
    ]
  },
  "_chunk-BqM0eUVS.js": {
    "file": "assets/chunks/chunk-BqM0eUVS.js",
    "name": "IconButton",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CXuo2Xpg.js"
    ]
  },
  "_chunk-C8L-Hqna.js": {
    "file": "assets/chunks/chunk-C8L-Hqna.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CfYjQaIp.js"
    ]
  },
  "_chunk-CHIWB-tm.js": {
    "file": "assets/chunks/chunk-CHIWB-tm.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-BMDyibAK.js"
    ]
  },
  "_chunk-CHzzVgnY.js": {
    "file": "assets/chunks/chunk-CHzzVgnY.js",
    "name": "ListPage",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-B57q0L2H.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-CWHFDgDj.js",
      "_chunk-gXDFmhdw.js",
      "_chunk-0mkyugRY.js",
      "_chunk-BqM0eUVS.js",
      "_chunk-Cvd45qvm.js",
      "_chunk-tGEpzyyi.js"
    ]
  },
  "_chunk-CWHFDgDj.js": {
    "file": "assets/chunks/chunk-CWHFDgDj.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-BMDyibAK.js"
    ]
  },
  "_chunk-CXuo2Xpg.js": {
    "file": "assets/chunks/chunk-CXuo2Xpg.js",
    "name": "useAppData",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CHIWB-tm.js"
    ]
  },
  "_chunk-CfYjQaIp.js": {
    "file": "assets/chunks/chunk-CfYjQaIp.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-BMDyibAK.js"
    ]
  },
  "_chunk-Cvd45qvm.js": {
    "file": "assets/chunks/chunk-Cvd45qvm.js",
    "name": "Container",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-C8L-Hqna.js"
    ]
  },
  "_chunk-CxAl3UIe.js": {
    "file": "assets/chunks/chunk-CxAl3UIe.js",
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
  "_chunk-D1G1G9Sf.js": {
    "file": "assets/chunks/chunk-D1G1G9Sf.js",
    "name": "Stack",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-C8L-Hqna.js"
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
  "_chunk-gXDFmhdw.js": {
    "file": "assets/chunks/chunk-gXDFmhdw.js",
    "name": "List",
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-70wUnHTE.js",
      "_chunk-CHIWB-tm.js"
    ]
  },
  "_chunk-tGEpzyyi.js": {
    "file": "assets/chunks/chunk-tGEpzyyi.js",
    "name": "Typography",
    "imports": [
      "_chunk-BMDyibAK.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.CRptol5g.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-CxAl3UIe.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-Czj-b9PY.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-Bf-HVCEs.js",
      "_chunk-Cvd45qvm.js",
      "_chunk-D1G1G9Sf.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-C8L-Hqna.js",
      "_chunk-CfYjQaIp.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-0I7pMYIl.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-B2DhZ9P1.js",
      "_chunk-CxAl3UIe.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-CfYjQaIp.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-BqM0eUVS.js",
      "_chunk-gXDFmhdw.js",
      "_chunk-PSOkAIay.js",
      "_chunk-70wUnHTE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.CTGqz2zb.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.BPwSU3ru.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-D1G1G9Sf.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-0mkyugRY.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-CWHFDgDj.js",
      "_chunk-gXDFmhdw.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C8L-Hqna.js",
      "_chunk-CfYjQaIp.js",
      "_chunk-70wUnHTE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.CKK56Oof.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CxAl3UIe.js",
      "_chunk-CHzzVgnY.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B57q0L2H.js",
      "_chunk-B2DhZ9P1.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-CWHFDgDj.js",
      "_chunk-gXDFmhdw.js",
      "_chunk-70wUnHTE.js",
      "_chunk-0mkyugRY.js",
      "_chunk-BqM0eUVS.js",
      "_chunk-Cvd45qvm.js",
      "_chunk-C8L-Hqna.js",
      "_chunk-CfYjQaIp.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.BdOrjksK.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CxAl3UIe.js",
      "_chunk-CHzzVgnY.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B57q0L2H.js",
      "_chunk-B2DhZ9P1.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-CWHFDgDj.js",
      "_chunk-gXDFmhdw.js",
      "_chunk-70wUnHTE.js",
      "_chunk-0mkyugRY.js",
      "_chunk-BqM0eUVS.js",
      "_chunk-Cvd45qvm.js",
      "_chunk-C8L-Hqna.js",
      "_chunk-CfYjQaIp.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.Zd57s6yj.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-B57q0L2H.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-Cvd45qvm.js",
      "_chunk-D1G1G9Sf.js",
      "_chunk-CWHFDgDj.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B2DhZ9P1.js",
      "_chunk-CxAl3UIe.js",
      "_chunk-C8L-Hqna.js",
      "_chunk-CfYjQaIp.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.DQSrWoxl.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.GLA1K8oz.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BMDyibAK.js",
      "_chunk-CxAl3UIe.js",
      "_chunk-CXuo2Xpg.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-Bf-HVCEs.js",
      "_chunk-BqM0eUVS.js",
      "_chunk-tGEpzyyi.js",
      "_chunk-70wUnHTE.js",
      "_chunk-B57q0L2H.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CHIWB-tm.js",
      "_chunk-B2DhZ9P1.js"
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
