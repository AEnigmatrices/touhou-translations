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
  "_chunk-2IGozH2b.js": {
    "file": "assets/chunks/chunk-2IGozH2b.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-HrtNzeo4.js"
    ]
  },
  "_chunk-2_VY9akz.js": {
    "file": "assets/chunks/chunk-2_VY9akz.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-2IGozH2b.js"
    ]
  },
  "_chunk-BPfAxXil.js": {
    "file": "assets/chunks/chunk-BPfAxXil.js",
    "name": "useAppData",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-fJga59lm.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-L7izK-fX.js",
      "_chunk-Crb7crUK.js",
      "_chunk-C6coa7Sz.js",
      "_chunk-BXWFeqQh.js",
      "_chunk-eZO0FKjS.js",
      "_chunk-C9p-moQi.js"
    ]
  },
  "_chunk-BQB8-lv2.js": {
    "file": "assets/chunks/chunk-BQB8-lv2.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-VFVo6jsn.js"
    ]
  },
  "_chunk-BXWFeqQh.js": {
    "file": "assets/chunks/chunk-BXWFeqQh.js",
    "name": "IconButton",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-BQB8-lv2.js"
    ]
  },
  "_chunk-BYCA_Zrw.js": {
    "file": "assets/chunks/chunk-BYCA_Zrw.js",
    "name": "Link",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-C9p-moQi.js"
    ]
  },
  "_chunk-BxIT6R8K.js": {
    "file": "assets/chunks/chunk-BxIT6R8K.js",
    "name": "index",
    "imports": [
      "_chunk-HrtNzeo4.js"
    ]
  },
  "_chunk-C6coa7Sz.js": {
    "file": "assets/chunks/chunk-C6coa7Sz.js",
    "name": "TextField",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-L7izK-fX.js",
      "_chunk-Crb7crUK.js",
      "_chunk-VFVo6jsn.js"
    ]
  },
  "_chunk-C9p-moQi.js": {
    "file": "assets/chunks/chunk-C9p-moQi.js",
    "name": "Typography",
    "imports": [
      "_chunk-HrtNzeo4.js"
    ]
  },
  "_chunk-CWBkpv_O.js": {
    "file": "assets/chunks/chunk-CWBkpv_O.js",
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
  "_chunk-CZ4ST2Db.js": {
    "file": "assets/chunks/chunk-CZ4ST2Db.js",
    "name": "Stack",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-2_VY9akz.js"
    ]
  },
  "_chunk-ChLoD9B1.js": {
    "file": "assets/chunks/chunk-ChLoD9B1.js",
    "name": "navigate",
    "imports": [
      "_chunk-CWBkpv_O.js"
    ]
  },
  "_chunk-Crb7crUK.js": {
    "file": "assets/chunks/chunk-Crb7crUK.js",
    "name": "List",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-BxIT6R8K.js",
      "_chunk-VFVo6jsn.js"
    ]
  },
  "_chunk-HrtNzeo4.js": {
    "file": "assets/chunks/chunk-HrtNzeo4.js",
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
  "_chunk-L7izK-fX.js": {
    "file": "assets/chunks/chunk-L7izK-fX.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-HrtNzeo4.js"
    ]
  },
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-VFVo6jsn.js": {
    "file": "assets/chunks/chunk-VFVo6jsn.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-HrtNzeo4.js"
    ]
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-eZO0FKjS.js": {
    "file": "assets/chunks/chunk-eZO0FKjS.js",
    "name": "Container",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-2_VY9akz.js"
    ]
  },
  "_chunk-fJga59lm.js": {
    "file": "assets/chunks/chunk-fJga59lm.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-ChLoD9B1.js",
      "_chunk-CWBkpv_O.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-C9p-moQi.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.DQ53Pr6m.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-CWBkpv_O.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-B-bU6VwX.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-BYCA_Zrw.js",
      "_chunk-eZO0FKjS.js",
      "_chunk-CZ4ST2Db.js",
      "_chunk-C9p-moQi.js",
      "_chunk-PSOkAIay.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-2_VY9akz.js",
      "_chunk-2IGozH2b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-Cyx36U7e.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-ChLoD9B1.js",
      "_chunk-CWBkpv_O.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-2IGozH2b.js",
      "_chunk-C9p-moQi.js",
      "_chunk-BXWFeqQh.js",
      "_chunk-Crb7crUK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BxIT6R8K.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.DAgAj7X7.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.D-FdfbRf.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-CZ4ST2Db.js",
      "_chunk-C9p-moQi.js",
      "_chunk-C6coa7Sz.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-L7izK-fX.js",
      "_chunk-Crb7crUK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-2_VY9akz.js",
      "_chunk-2IGozH2b.js",
      "_chunk-BxIT6R8K.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.yKNClVgx.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-CWBkpv_O.js",
      "_chunk-BPfAxXil.js",
      "_chunk-PSOkAIay.js",
      "_chunk-fJga59lm.js",
      "_chunk-ChLoD9B1.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-C9p-moQi.js",
      "_chunk-L7izK-fX.js",
      "_chunk-Crb7crUK.js",
      "_chunk-BxIT6R8K.js",
      "_chunk-C6coa7Sz.js",
      "_chunk-BXWFeqQh.js",
      "_chunk-eZO0FKjS.js",
      "_chunk-2_VY9akz.js",
      "_chunk-2IGozH2b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.C_-ulIW6.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-CWBkpv_O.js",
      "_chunk-BPfAxXil.js",
      "_chunk-PSOkAIay.js",
      "_chunk-fJga59lm.js",
      "_chunk-ChLoD9B1.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-C9p-moQi.js",
      "_chunk-L7izK-fX.js",
      "_chunk-Crb7crUK.js",
      "_chunk-BxIT6R8K.js",
      "_chunk-C6coa7Sz.js",
      "_chunk-BXWFeqQh.js",
      "_chunk-eZO0FKjS.js",
      "_chunk-2_VY9akz.js",
      "_chunk-2IGozH2b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.BVP8q6Ph.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-fJga59lm.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-eZO0FKjS.js",
      "_chunk-CZ4ST2Db.js",
      "_chunk-L7izK-fX.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-C9p-moQi.js",
      "_chunk-PSOkAIay.js",
      "_chunk-ChLoD9B1.js",
      "_chunk-CWBkpv_O.js",
      "_chunk-2_VY9akz.js",
      "_chunk-2IGozH2b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.CIHn3oxL.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-C9p-moQi.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.B-V9Xshv.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-HrtNzeo4.js",
      "_chunk-BQB8-lv2.js",
      "_chunk-BYCA_Zrw.js",
      "_chunk-BXWFeqQh.js",
      "_chunk-C9p-moQi.js",
      "_chunk-BxIT6R8K.js",
      "_chunk-fJga59lm.js",
      "_chunk-PSOkAIay.js",
      "_chunk-VFVo6jsn.js",
      "_chunk-ChLoD9B1.js",
      "_chunk-CWBkpv_O.js"
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
