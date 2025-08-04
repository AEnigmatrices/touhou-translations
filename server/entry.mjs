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
  "_chunk-7g1eDZjT.js": {
    "file": "assets/chunks/chunk-7g1eDZjT.js",
    "name": "_onRenderClient",
    "imports": [
      "_chunk-D9JR3qC9.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "_chunk-BMgvJb4i.js": {
    "file": "assets/chunks/chunk-BMgvJb4i.js",
    "name": "TextField",
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-c2Hfze4I.js",
      "_chunk-D50RKJrQ.js",
      "_chunk-BPXGsDTk.js"
    ]
  },
  "_chunk-BPXGsDTk.js": {
    "file": "assets/chunks/chunk-BPXGsDTk.js",
    "name": "useControlled",
    "imports": [
      "_chunk-7g1eDZjT.js"
    ]
  },
  "_chunk-BxbUYQvw.js": {
    "file": "assets/chunks/chunk-BxbUYQvw.js",
    "name": "Button",
    "imports": [
      "_chunk-7g1eDZjT.js"
    ]
  },
  "_chunk-C8vK1dlm.js": {
    "file": "assets/chunks/chunk-C8vK1dlm.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-D9JR3qC9.js"
    ]
  },
  "_chunk-CHhjPktV.js": {
    "file": "assets/chunks/chunk-CHhjPktV.js",
    "name": "ListPage",
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-C8vK1dlm.js",
      "_chunk-CumgCfNQ.js",
      "_chunk-BMgvJb4i.js"
    ]
  },
  "_chunk-CVY5GSqa.js": {
    "file": "assets/chunks/chunk-CVY5GSqa.js",
    "name": "ExpandMore",
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-BPXGsDTk.js"
    ]
  },
  "_chunk-CumgCfNQ.js": {
    "file": "assets/chunks/chunk-CumgCfNQ.js",
    "name": "Tooltip",
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-BPXGsDTk.js",
      "_chunk-D50RKJrQ.js"
    ]
  },
  "_chunk-D50RKJrQ.js": {
    "file": "assets/chunks/chunk-D50RKJrQ.js",
    "name": "Grow",
    "imports": [
      "_chunk-7g1eDZjT.js"
    ]
  },
  "_chunk-D9JR3qC9.js": {
    "file": "assets/chunks/chunk-D9JR3qC9.js",
    "name": "renderPageClientSide",
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
  "_chunk-c2Hfze4I.js": {
    "file": "assets/chunks/chunk-c2Hfze4I.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-7g1eDZjT.js"
    ]
  },
  "_src_renderer_index-54ec5530.5WxSgp76.css": {
    "file": "assets/static/src_renderer_index-54ec5530.5WxSgp76.css",
    "src": "_src_renderer_index-54ec5530.5WxSgp76.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.DIjRCmNc.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-D9JR3qC9.js"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.CE7480x-.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-D9JR3qC9.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.Qwh3cCEY.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-CVY5GSqa.js",
      "_chunk-BMgvJb4i.js",
      "_chunk-BxbUYQvw.js",
      "_chunk-D9JR3qC9.js",
      "_chunk-BPXGsDTk.js",
      "_chunk-c2Hfze4I.js",
      "_chunk-D50RKJrQ.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.CV08shxC.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-D9JR3qC9.js",
      "_chunk-CHhjPktV.js",
      "_chunk-C8vK1dlm.js",
      "_chunk-CumgCfNQ.js",
      "_chunk-BPXGsDTk.js",
      "_chunk-D50RKJrQ.js",
      "_chunk-BMgvJb4i.js",
      "_chunk-c2Hfze4I.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.ClcgaLzv.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-D9JR3qC9.js",
      "_chunk-CHhjPktV.js",
      "_chunk-C8vK1dlm.js",
      "_chunk-CumgCfNQ.js",
      "_chunk-BPXGsDTk.js",
      "_chunk-D50RKJrQ.js",
      "_chunk-BMgvJb4i.js",
      "_chunk-c2Hfze4I.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.BevCAQtH.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-C8vK1dlm.js",
      "_chunk-c2Hfze4I.js",
      "_chunk-BPXGsDTk.js",
      "_chunk-BxbUYQvw.js",
      "_chunk-D9JR3qC9.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.BYBAxqLG.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-D9JR3qC9.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.VTn4TG-c.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-7g1eDZjT.js",
      "_chunk-D9JR3qC9.js",
      "_chunk-CVY5GSqa.js",
      "_chunk-C8vK1dlm.js",
      "_chunk-CumgCfNQ.js",
      "_chunk-BPXGsDTk.js",
      "_chunk-D50RKJrQ.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
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
