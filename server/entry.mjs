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
  "_chunk-B1d5pyUT.js": {
    "file": "assets/chunks/chunk-B1d5pyUT.js",
    "name": "ListPage",
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-BtWJHsDt.js",
      "_chunk-BoQDc36g.js",
      "_chunk-Cbfujf8x.js"
    ]
  },
  "_chunk-B2G0kzkp.js": {
    "file": "assets/chunks/chunk-B2G0kzkp.js",
    "name": "_onRenderClient",
    "imports": [
      "_chunk-RKoV7cHN.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "_chunk-BoQDc36g.js": {
    "file": "assets/chunks/chunk-BoQDc36g.js",
    "name": "Tooltip",
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-Low8CgXJ.js",
      "_chunk-DwGDqnRR.js"
    ]
  },
  "_chunk-BtWJHsDt.js": {
    "file": "assets/chunks/chunk-BtWJHsDt.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-RKoV7cHN.js"
    ]
  },
  "_chunk-CE5O1rzy.js": {
    "file": "assets/chunks/chunk-CE5O1rzy.js",
    "name": "Button",
    "imports": [
      "_chunk-B2G0kzkp.js"
    ]
  },
  "_chunk-Cbfujf8x.js": {
    "file": "assets/chunks/chunk-Cbfujf8x.js",
    "name": "TextField",
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-CvPOh32b.js",
      "_chunk-DwGDqnRR.js",
      "_chunk-Low8CgXJ.js"
    ]
  },
  "_chunk-CvPOh32b.js": {
    "file": "assets/chunks/chunk-CvPOh32b.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-B2G0kzkp.js"
    ]
  },
  "_chunk-DwGDqnRR.js": {
    "file": "assets/chunks/chunk-DwGDqnRR.js",
    "name": "Grow",
    "imports": [
      "_chunk-B2G0kzkp.js"
    ]
  },
  "_chunk-Low8CgXJ.js": {
    "file": "assets/chunks/chunk-Low8CgXJ.js",
    "name": "useControlled",
    "imports": [
      "_chunk-B2G0kzkp.js"
    ]
  },
  "_chunk-RKoV7cHN.js": {
    "file": "assets/chunks/chunk-RKoV7cHN.js",
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
  "_chunk-sWbdYKWL.js": {
    "file": "assets/chunks/chunk-sWbdYKWL.js",
    "name": "ExpandMore",
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-Low8CgXJ.js"
    ]
  },
  "_src_renderer_index-54ec5530.5WxSgp76.css": {
    "file": "assets/static/src_renderer_index-54ec5530.5WxSgp76.css",
    "src": "_src_renderer_index-54ec5530.5WxSgp76.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.rrZga2jR.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-RKoV7cHN.js"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.D8K6LUtk.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-RKoV7cHN.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.Bw_8MXp6.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-sWbdYKWL.js",
      "_chunk-Cbfujf8x.js",
      "_chunk-CE5O1rzy.js",
      "_chunk-RKoV7cHN.js",
      "_chunk-Low8CgXJ.js",
      "_chunk-CvPOh32b.js",
      "_chunk-DwGDqnRR.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.shQWJgJR.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-RKoV7cHN.js",
      "_chunk-B1d5pyUT.js",
      "_chunk-BtWJHsDt.js",
      "_chunk-BoQDc36g.js",
      "_chunk-Low8CgXJ.js",
      "_chunk-DwGDqnRR.js",
      "_chunk-Cbfujf8x.js",
      "_chunk-CvPOh32b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.ehvcopfj.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-RKoV7cHN.js",
      "_chunk-B1d5pyUT.js",
      "_chunk-BtWJHsDt.js",
      "_chunk-BoQDc36g.js",
      "_chunk-Low8CgXJ.js",
      "_chunk-DwGDqnRR.js",
      "_chunk-Cbfujf8x.js",
      "_chunk-CvPOh32b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.D3Xa3Tev.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-BtWJHsDt.js",
      "_chunk-CvPOh32b.js",
      "_chunk-Low8CgXJ.js",
      "_chunk-CE5O1rzy.js",
      "_chunk-RKoV7cHN.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.BIz8dcGL.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-RKoV7cHN.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.5WxSgp76.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.BL9nxvtw.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-B2G0kzkp.js",
      "_chunk-RKoV7cHN.js",
      "_chunk-sWbdYKWL.js",
      "_chunk-BtWJHsDt.js",
      "_chunk-BoQDc36g.js",
      "_chunk-Low8CgXJ.js",
      "_chunk-DwGDqnRR.js"
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
