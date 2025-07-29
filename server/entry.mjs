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
  "_chunk-AHuY4rSa.js": {
    "file": "assets/chunks/chunk-AHuY4rSa.js",
    "name": "Typography",
    "imports": [
      "_chunk-DA5yWYln.js"
    ]
  },
  "_chunk-B3g7nQbl.js": {
    "file": "assets/chunks/chunk-B3g7nQbl.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-DA5yWYln.js"
    ]
  },
  "_chunk-B7_vMgDn.js": {
    "file": "assets/chunks/chunk-B7_vMgDn.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-DA5yWYln.js"
    ]
  },
  "_chunk-BDlFxRIi.js": {
    "file": "assets/chunks/chunk-BDlFxRIi.js",
    "name": "TextField",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-CklMRyqa.js",
      "_chunk-B3g7nQbl.js",
      "_chunk-DPYYLHXa.js",
      "_chunk-Gx3Nlccd.js"
    ]
  },
  "_chunk-BNXUCGFa.js": {
    "file": "assets/chunks/chunk-BNXUCGFa.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-B7_vMgDn.js"
    ]
  },
  "_chunk-B_9NU2we.js": {
    "file": "assets/chunks/chunk-B_9NU2we.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-SNMsDPsS.js",
      "_chunk-L8Mtn2ra.js",
      "_chunk-CklMRyqa.js",
      "_chunk-AHuY4rSa.js"
    ]
  },
  "_chunk-CklMRyqa.js": {
    "file": "assets/chunks/chunk-CklMRyqa.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-Gx3Nlccd.js"
    ]
  },
  "_chunk-CwYfLwdG.js": {
    "file": "assets/chunks/chunk-CwYfLwdG.js",
    "name": "Stack",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-BNXUCGFa.js"
    ]
  },
  "_chunk-DA5yWYln.js": {
    "file": "assets/chunks/chunk-DA5yWYln.js",
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
  "_chunk-DI7t-qdy.js": {
    "file": "assets/chunks/chunk-DI7t-qdy.js",
    "name": "index",
    "imports": [
      "_chunk-DA5yWYln.js"
    ]
  },
  "_chunk-DPYYLHXa.js": {
    "file": "assets/chunks/chunk-DPYYLHXa.js",
    "name": "List",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-CklMRyqa.js",
      "_chunk-DI7t-qdy.js",
      "_chunk-Gx3Nlccd.js"
    ]
  },
  "_chunk-DeD2clpP.js": {
    "file": "assets/chunks/chunk-DeD2clpP.js",
    "name": "Container",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-BNXUCGFa.js"
    ]
  },
  "_chunk-Gx3Nlccd.js": {
    "file": "assets/chunks/chunk-Gx3Nlccd.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-DA5yWYln.js"
    ]
  },
  "_chunk-L8Mtn2ra.js": {
    "file": "assets/chunks/chunk-L8Mtn2ra.js",
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
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-Pnn-DrT-.js": {
    "file": "assets/chunks/chunk-Pnn-DrT-.js",
    "name": "useAppData",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-B_9NU2we.js",
      "_chunk-CklMRyqa.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-B3g7nQbl.js",
      "_chunk-DPYYLHXa.js",
      "_chunk-BDlFxRIi.js",
      "_chunk-qvLDy2RN.js",
      "_chunk-DeD2clpP.js",
      "_chunk-AHuY4rSa.js"
    ]
  },
  "_chunk-SNMsDPsS.js": {
    "file": "assets/chunks/chunk-SNMsDPsS.js",
    "name": "navigate",
    "imports": [
      "_chunk-L8Mtn2ra.js"
    ]
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-piPnNIpc.js": {
    "file": "assets/chunks/chunk-piPnNIpc.js",
    "name": "Link",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-AHuY4rSa.js"
    ]
  },
  "_chunk-qvLDy2RN.js": {
    "file": "assets/chunks/chunk-qvLDy2RN.js",
    "name": "IconButton",
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-CklMRyqa.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.tVwekVIz.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-L8Mtn2ra.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-BGtLswd8.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-piPnNIpc.js",
      "_chunk-DeD2clpP.js",
      "_chunk-CwYfLwdG.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-BNXUCGFa.js",
      "_chunk-B7_vMgDn.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-CdkR31Q_.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-SNMsDPsS.js",
      "_chunk-L8Mtn2ra.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CklMRyqa.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-B7_vMgDn.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-qvLDy2RN.js",
      "_chunk-DPYYLHXa.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DI7t-qdy.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.D7YfajWm.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.Cphqv_6D.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-CklMRyqa.js",
      "_chunk-CwYfLwdG.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-BDlFxRIi.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-B3g7nQbl.js",
      "_chunk-DPYYLHXa.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BNXUCGFa.js",
      "_chunk-B7_vMgDn.js",
      "_chunk-DI7t-qdy.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.DppWveBe.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-L8Mtn2ra.js",
      "_chunk-Pnn-DrT-.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B_9NU2we.js",
      "_chunk-SNMsDPsS.js",
      "_chunk-CklMRyqa.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-B3g7nQbl.js",
      "_chunk-DPYYLHXa.js",
      "_chunk-DI7t-qdy.js",
      "_chunk-BDlFxRIi.js",
      "_chunk-qvLDy2RN.js",
      "_chunk-DeD2clpP.js",
      "_chunk-BNXUCGFa.js",
      "_chunk-B7_vMgDn.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.vkXqwsyy.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-L8Mtn2ra.js",
      "_chunk-Pnn-DrT-.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B_9NU2we.js",
      "_chunk-SNMsDPsS.js",
      "_chunk-CklMRyqa.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-B3g7nQbl.js",
      "_chunk-DPYYLHXa.js",
      "_chunk-DI7t-qdy.js",
      "_chunk-BDlFxRIi.js",
      "_chunk-qvLDy2RN.js",
      "_chunk-DeD2clpP.js",
      "_chunk-BNXUCGFa.js",
      "_chunk-B7_vMgDn.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.Cdw5b-NI.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-B_9NU2we.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-DeD2clpP.js",
      "_chunk-CwYfLwdG.js",
      "_chunk-B3g7nQbl.js",
      "_chunk-CklMRyqa.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-PSOkAIay.js",
      "_chunk-SNMsDPsS.js",
      "_chunk-L8Mtn2ra.js",
      "_chunk-BNXUCGFa.js",
      "_chunk-B7_vMgDn.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.I4UlQ72g.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.0JeAVfR9.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DA5yWYln.js",
      "_chunk-CklMRyqa.js",
      "_chunk-piPnNIpc.js",
      "_chunk-qvLDy2RN.js",
      "_chunk-AHuY4rSa.js",
      "_chunk-DI7t-qdy.js",
      "_chunk-B_9NU2we.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Gx3Nlccd.js",
      "_chunk-SNMsDPsS.js",
      "_chunk-L8Mtn2ra.js"
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
