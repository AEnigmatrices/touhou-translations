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
  "_chunk-BC66dhqO.js": {
    "file": "assets/chunks/chunk-BC66dhqO.js",
    "name": "Link",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-Bho7K7wM.js"
    ]
  },
  "_chunk-BFmQgm_3.js": {
    "file": "assets/chunks/chunk-BFmQgm_3.js",
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
  "_chunk-BeWZhBUA.js": {
    "file": "assets/chunks/chunk-BeWZhBUA.js",
    "name": "Container",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-DY2ZcdJ5.js"
    ]
  },
  "_chunk-Bf4LkXgL.js": {
    "file": "assets/chunks/chunk-Bf4LkXgL.js",
    "name": "index",
    "imports": [
      "_chunk-BFmQgm_3.js"
    ]
  },
  "_chunk-Bho7K7wM.js": {
    "file": "assets/chunks/chunk-Bho7K7wM.js",
    "name": "Typography",
    "imports": [
      "_chunk-BFmQgm_3.js"
    ]
  },
  "_chunk-BsOo8lG6.js": {
    "file": "assets/chunks/chunk-BsOo8lG6.js",
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
  "_chunk-CChV4U-9.js": {
    "file": "assets/chunks/chunk-CChV4U-9.js",
    "name": "IconButton",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-i_CtEnuq.js"
    ]
  },
  "_chunk-CKFzrttb.js": {
    "file": "assets/chunks/chunk-CKFzrttb.js",
    "name": "useAppData",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-CmvAFYMu.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-ClxaNChd.js",
      "_chunk-s35a6dlN.js",
      "_chunk-CtWrbyIv.js",
      "_chunk-CChV4U-9.js",
      "_chunk-BeWZhBUA.js",
      "_chunk-Bho7K7wM.js"
    ]
  },
  "_chunk-CR9w6sbl.js": {
    "file": "assets/chunks/chunk-CR9w6sbl.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-BFmQgm_3.js"
    ]
  },
  "_chunk-CRIvEfek.js": {
    "file": "assets/chunks/chunk-CRIvEfek.js",
    "name": "navigate",
    "imports": [
      "_chunk-BsOo8lG6.js"
    ]
  },
  "_chunk-ClxaNChd.js": {
    "file": "assets/chunks/chunk-ClxaNChd.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-BFmQgm_3.js"
    ]
  },
  "_chunk-CmvAFYMu.js": {
    "file": "assets/chunks/chunk-CmvAFYMu.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-CRIvEfek.js",
      "_chunk-BsOo8lG6.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-Bho7K7wM.js"
    ]
  },
  "_chunk-Cs0BfJcG.js": {
    "file": "assets/chunks/chunk-Cs0BfJcG.js",
    "name": "Stack",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-DY2ZcdJ5.js"
    ]
  },
  "_chunk-CtWrbyIv.js": {
    "file": "assets/chunks/chunk-CtWrbyIv.js",
    "name": "TextField",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-ClxaNChd.js",
      "_chunk-s35a6dlN.js",
      "_chunk-CR9w6sbl.js"
    ]
  },
  "_chunk-DKPRGRgv.js": {
    "file": "assets/chunks/chunk-DKPRGRgv.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-BFmQgm_3.js"
    ]
  },
  "_chunk-DY2ZcdJ5.js": {
    "file": "assets/chunks/chunk-DY2ZcdJ5.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-DKPRGRgv.js"
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
  "_chunk-i_CtEnuq.js": {
    "file": "assets/chunks/chunk-i_CtEnuq.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-CR9w6sbl.js"
    ]
  },
  "_chunk-s35a6dlN.js": {
    "file": "assets/chunks/chunk-s35a6dlN.js",
    "name": "List",
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-Bf4LkXgL.js",
      "_chunk-CR9w6sbl.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.Baw9GU-m.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-BsOo8lG6.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-DoQcZhhc.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-BC66dhqO.js",
      "_chunk-BeWZhBUA.js",
      "_chunk-Cs0BfJcG.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-DY2ZcdJ5.js",
      "_chunk-DKPRGRgv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-CyMMWVB0.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-CRIvEfek.js",
      "_chunk-BsOo8lG6.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-DKPRGRgv.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-CChV4U-9.js",
      "_chunk-s35a6dlN.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Bf4LkXgL.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.CMz3f30H.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.Db5XrSjp.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-Cs0BfJcG.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-CtWrbyIv.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-ClxaNChd.js",
      "_chunk-s35a6dlN.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DY2ZcdJ5.js",
      "_chunk-DKPRGRgv.js",
      "_chunk-Bf4LkXgL.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.CTnnECrT.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-BsOo8lG6.js",
      "_chunk-CKFzrttb.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CmvAFYMu.js",
      "_chunk-CRIvEfek.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-ClxaNChd.js",
      "_chunk-s35a6dlN.js",
      "_chunk-Bf4LkXgL.js",
      "_chunk-CtWrbyIv.js",
      "_chunk-CChV4U-9.js",
      "_chunk-BeWZhBUA.js",
      "_chunk-DY2ZcdJ5.js",
      "_chunk-DKPRGRgv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.C_fKmLFu.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-BsOo8lG6.js",
      "_chunk-CKFzrttb.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CmvAFYMu.js",
      "_chunk-CRIvEfek.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-ClxaNChd.js",
      "_chunk-s35a6dlN.js",
      "_chunk-Bf4LkXgL.js",
      "_chunk-CtWrbyIv.js",
      "_chunk-CChV4U-9.js",
      "_chunk-BeWZhBUA.js",
      "_chunk-DY2ZcdJ5.js",
      "_chunk-DKPRGRgv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.DpLXCQXX.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CmvAFYMu.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-BeWZhBUA.js",
      "_chunk-Cs0BfJcG.js",
      "_chunk-ClxaNChd.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CRIvEfek.js",
      "_chunk-BsOo8lG6.js",
      "_chunk-DY2ZcdJ5.js",
      "_chunk-DKPRGRgv.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.DavAxUeh.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.9w6At1Ka.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BFmQgm_3.js",
      "_chunk-i_CtEnuq.js",
      "_chunk-BC66dhqO.js",
      "_chunk-CChV4U-9.js",
      "_chunk-Bho7K7wM.js",
      "_chunk-Bf4LkXgL.js",
      "_chunk-CmvAFYMu.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CR9w6sbl.js",
      "_chunk-CRIvEfek.js",
      "_chunk-BsOo8lG6.js"
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
