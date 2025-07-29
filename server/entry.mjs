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
  "_chunk-BL-RAuH8.js": {
    "file": "assets/chunks/chunk-BL-RAuH8.js",
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
  "_chunk-BM-GhOzC.js": {
    "file": "assets/chunks/chunk-BM-GhOzC.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-OeZTFR8s.js"
    ]
  },
  "_chunk-BY2sX63J.js": {
    "file": "assets/chunks/chunk-BY2sX63J.js",
    "name": "navigate",
    "imports": [
      "_chunk-BL-RAuH8.js"
    ]
  },
  "_chunk-Bd_rTGgC.js": {
    "file": "assets/chunks/chunk-Bd_rTGgC.js",
    "name": "Typography",
    "imports": [
      "_chunk-OeZTFR8s.js"
    ]
  },
  "_chunk-BobBQq8c.js": {
    "file": "assets/chunks/chunk-BobBQq8c.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-Dg_bes6x.js"
    ]
  },
  "_chunk-Bwgj_03_.js": {
    "file": "assets/chunks/chunk-Bwgj_03_.js",
    "name": "index",
    "imports": [
      "_chunk-OeZTFR8s.js"
    ]
  },
  "_chunk-By_MJhyK.js": {
    "file": "assets/chunks/chunk-By_MJhyK.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BY2sX63J.js",
      "_chunk-BL-RAuH8.js",
      "_chunk-BobBQq8c.js",
      "_chunk-Bd_rTGgC.js"
    ]
  },
  "_chunk-CRP8Hs9x.js": {
    "file": "assets/chunks/chunk-CRP8Hs9x.js",
    "name": "Container",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-m7vthVRx.js"
    ]
  },
  "_chunk-CdkWU138.js": {
    "file": "assets/chunks/chunk-CdkWU138.js",
    "name": "List",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BobBQq8c.js",
      "_chunk-Bwgj_03_.js",
      "_chunk-Dg_bes6x.js"
    ]
  },
  "_chunk-CuemFz1q.js": {
    "file": "assets/chunks/chunk-CuemFz1q.js",
    "name": "ListPage",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-By_MJhyK.js",
      "_chunk-BobBQq8c.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-rbTI8qks.js",
      "_chunk-CdkWU138.js",
      "_chunk-hmRlCole.js",
      "_chunk-DlAQBaiU.js",
      "_chunk-CRP8Hs9x.js",
      "_chunk-Bd_rTGgC.js"
    ]
  },
  "_chunk-Dg_bes6x.js": {
    "file": "assets/chunks/chunk-Dg_bes6x.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-OeZTFR8s.js"
    ]
  },
  "_chunk-DlAQBaiU.js": {
    "file": "assets/chunks/chunk-DlAQBaiU.js",
    "name": "IconButton",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BobBQq8c.js"
    ]
  },
  "_chunk-DvKnCCFe.js": {
    "file": "assets/chunks/chunk-DvKnCCFe.js",
    "name": "Link",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-Bd_rTGgC.js"
    ]
  },
  "_chunk-OeZTFR8s.js": {
    "file": "assets/chunks/chunk-OeZTFR8s.js",
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
  "_chunk-OiMQS97e.js": {
    "file": "assets/chunks/chunk-OiMQS97e.js",
    "name": "Stack",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-m7vthVRx.js"
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
  "_chunk-hmRlCole.js": {
    "file": "assets/chunks/chunk-hmRlCole.js",
    "name": "TextField",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BobBQq8c.js",
      "_chunk-rbTI8qks.js",
      "_chunk-CdkWU138.js",
      "_chunk-Dg_bes6x.js"
    ]
  },
  "_chunk-m7vthVRx.js": {
    "file": "assets/chunks/chunk-m7vthVRx.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BM-GhOzC.js"
    ]
  },
  "_chunk-rbTI8qks.js": {
    "file": "assets/chunks/chunk-rbTI8qks.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-OeZTFR8s.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.CCa9Bs0K.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-BL-RAuH8.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-D6bXEfjY.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-DvKnCCFe.js",
      "_chunk-CRP8Hs9x.js",
      "_chunk-OiMQS97e.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-m7vthVRx.js",
      "_chunk-BM-GhOzC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-CxIuzu_A.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BY2sX63J.js",
      "_chunk-BL-RAuH8.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BobBQq8c.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-BM-GhOzC.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-DlAQBaiU.js",
      "_chunk-CdkWU138.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Bwgj_03_.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.gZ_BC8VZ.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.PUJ0Eh5x.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BobBQq8c.js",
      "_chunk-OiMQS97e.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-hmRlCole.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-rbTI8qks.js",
      "_chunk-CdkWU138.js",
      "_chunk-PSOkAIay.js",
      "_chunk-m7vthVRx.js",
      "_chunk-BM-GhOzC.js",
      "_chunk-Bwgj_03_.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.DBRUfRts.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BL-RAuH8.js",
      "_chunk-CuemFz1q.js",
      "_chunk-PSOkAIay.js",
      "_chunk-By_MJhyK.js",
      "_chunk-BY2sX63J.js",
      "_chunk-BobBQq8c.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-rbTI8qks.js",
      "_chunk-CdkWU138.js",
      "_chunk-Bwgj_03_.js",
      "_chunk-hmRlCole.js",
      "_chunk-DlAQBaiU.js",
      "_chunk-CRP8Hs9x.js",
      "_chunk-m7vthVRx.js",
      "_chunk-BM-GhOzC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.BWpsDJ7n.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BL-RAuH8.js",
      "_chunk-CuemFz1q.js",
      "_chunk-PSOkAIay.js",
      "_chunk-By_MJhyK.js",
      "_chunk-BY2sX63J.js",
      "_chunk-BobBQq8c.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-rbTI8qks.js",
      "_chunk-CdkWU138.js",
      "_chunk-Bwgj_03_.js",
      "_chunk-hmRlCole.js",
      "_chunk-DlAQBaiU.js",
      "_chunk-CRP8Hs9x.js",
      "_chunk-m7vthVRx.js",
      "_chunk-BM-GhOzC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.BRV60FgF.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-By_MJhyK.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-CRP8Hs9x.js",
      "_chunk-OiMQS97e.js",
      "_chunk-rbTI8qks.js",
      "_chunk-BobBQq8c.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BY2sX63J.js",
      "_chunk-BL-RAuH8.js",
      "_chunk-m7vthVRx.js",
      "_chunk-BM-GhOzC.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.DWXPs0NX.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.CUoOwaXM.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-OeZTFR8s.js",
      "_chunk-BobBQq8c.js",
      "_chunk-DvKnCCFe.js",
      "_chunk-DlAQBaiU.js",
      "_chunk-Bd_rTGgC.js",
      "_chunk-Bwgj_03_.js",
      "_chunk-By_MJhyK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Dg_bes6x.js",
      "_chunk-BY2sX63J.js",
      "_chunk-BL-RAuH8.js"
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
