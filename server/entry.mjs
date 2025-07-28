import { setGlobalContext_buildEntry } from "vike/__internal";
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
  "_chunk-6H89TBZK.js": {
    "file": "assets/chunks/chunk-6H89TBZK.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-C4VNTfWv.js"
    ]
  },
  "_chunk-BDsMNZfD.js": {
    "file": "assets/chunks/chunk-BDsMNZfD.js",
    "name": "IconButton",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-D-w4ENBI.js"
    ]
  },
  "_chunk-BUG7hrub.js": {
    "file": "assets/chunks/chunk-BUG7hrub.js",
    "name": "TextField",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-6H89TBZK.js",
      "_chunk-aB7XUVUy.js",
      "_chunk-CQpRRGGk.js"
    ]
  },
  "_chunk-B_wC8VOP.js": {
    "file": "assets/chunks/chunk-B_wC8VOP.js",
    "name": "Stack",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-CvevYXJZ.js"
    ]
  },
  "_chunk-BrtnqX1V.js": {
    "file": "assets/chunks/chunk-BrtnqX1V.js",
    "name": "ListPage",
    "imports": [
      "_chunk-PSOkAIay.js",
      "_chunk-C4VNTfWv.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-6H89TBZK.js",
      "_chunk-aB7XUVUy.js",
      "_chunk-BUG7hrub.js",
      "_chunk-BDsMNZfD.js",
      "_chunk-CbH1JAXr.js"
    ],
    "dynamicImports": [
      "src/components/ProfileItem/ProfileItem.tsx"
    ]
  },
  "_chunk-C4VNTfWv.js": {
    "file": "assets/chunks/chunk-C4VNTfWv.js",
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
  "_chunk-C7fdFraG.js": {
    "file": "assets/chunks/chunk-C7fdFraG.js",
    "name": "navigate",
    "imports": [
      "_chunk-DfceSlZ5.js"
    ]
  },
  "_chunk-CQpRRGGk.js": {
    "file": "assets/chunks/chunk-CQpRRGGk.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-C4VNTfWv.js"
    ]
  },
  "_chunk-CbH1JAXr.js": {
    "file": "assets/chunks/chunk-CbH1JAXr.js",
    "name": "Container",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-CvevYXJZ.js"
    ]
  },
  "_chunk-Cdrrkdr8.js": {
    "file": "assets/chunks/chunk-Cdrrkdr8.js",
    "name": "Link",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-CQpRRGGk.js"
    ]
  },
  "_chunk-CvevYXJZ.js": {
    "file": "assets/chunks/chunk-CvevYXJZ.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-HQ9UtQdK.js"
    ]
  },
  "_chunk-D-w4ENBI.js": {
    "file": "assets/chunks/chunk-D-w4ENBI.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-CQpRRGGk.js"
    ]
  },
  "_chunk-DX7Qly_r.js": {
    "file": "assets/chunks/chunk-DX7Qly_r.js",
    "name": "index",
    "imports": [
      "_chunk-C4VNTfWv.js"
    ]
  },
  "_chunk-DfceSlZ5.js": {
    "file": "assets/chunks/chunk-DfceSlZ5.js",
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
  "_chunk-HQ9UtQdK.js": {
    "file": "assets/chunks/chunk-HQ9UtQdK.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-C4VNTfWv.js"
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
  "_chunk-aB7XUVUy.js": {
    "file": "assets/chunks/chunk-aB7XUVUy.js",
    "name": "List",
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-DX7Qly_r.js",
      "_chunk-CQpRRGGk.js"
    ]
  },
  "_chunk-ySyhLtxq.js": {
    "file": "assets/chunks/chunk-ySyhLtxq.js",
    "name": "galleryUtils"
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.JRJpJH31.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-DfceSlZ5.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-DrxMrWSR.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-Cdrrkdr8.js",
      "_chunk-CbH1JAXr.js",
      "_chunk-B_wC8VOP.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-CvevYXJZ.js",
      "_chunk-HQ9UtQdK.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-BPh-kZvA.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-C7fdFraG.js",
      "_chunk-DfceSlZ5.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-HQ9UtQdK.js",
      "_chunk-BDsMNZfD.js",
      "_chunk-aB7XUVUy.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DX7Qly_r.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/ProfileItem/ProfileItem.tsx": {
    "file": "assets/chunks/chunk-DUe4Cprm.js",
    "name": "ProfileItem",
    "src": "src/components/ProfileItem/ProfileItem.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-C7fdFraG.js",
      "_chunk-DfceSlZ5.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CQpRRGGk.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.CLH3npSY.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-B_wC8VOP.js",
      "_chunk-BUG7hrub.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-6H89TBZK.js",
      "_chunk-aB7XUVUy.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CvevYXJZ.js",
      "_chunk-HQ9UtQdK.js",
      "_chunk-DX7Qly_r.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.BcL1ITd6.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-BrtnqX1V.js",
      "_chunk-PSOkAIay.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-6H89TBZK.js",
      "_chunk-aB7XUVUy.js",
      "_chunk-DX7Qly_r.js",
      "_chunk-BUG7hrub.js",
      "_chunk-BDsMNZfD.js",
      "_chunk-CbH1JAXr.js",
      "_chunk-CvevYXJZ.js",
      "_chunk-HQ9UtQdK.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.BuGu61cP.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-BrtnqX1V.js",
      "_chunk-PSOkAIay.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-6H89TBZK.js",
      "_chunk-aB7XUVUy.js",
      "_chunk-DX7Qly_r.js",
      "_chunk-BUG7hrub.js",
      "_chunk-BDsMNZfD.js",
      "_chunk-CbH1JAXr.js",
      "_chunk-CvevYXJZ.js",
      "_chunk-HQ9UtQdK.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.3kSc1KbE.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-_MjiKTlx.js",
      "src/components/ProfileItem/ProfileItem.tsx",
      "_chunk-ySyhLtxq.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-CbH1JAXr.js",
      "_chunk-B_wC8VOP.js",
      "_chunk-6H89TBZK.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C7fdFraG.js",
      "_chunk-DfceSlZ5.js",
      "_chunk-CvevYXJZ.js",
      "_chunk-HQ9UtQdK.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.BN413QNF.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.fFaylYiN.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-C4VNTfWv.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-D-w4ENBI.js",
      "_chunk-Cdrrkdr8.js",
      "_chunk-BDsMNZfD.js",
      "_chunk-DX7Qly_r.js",
      "_chunk-ySyhLtxq.js",
      "src/components/ProfileItem/ProfileItem.tsx",
      "_chunk-PSOkAIay.js",
      "_chunk-CQpRRGGk.js",
      "_chunk-C7fdFraG.js",
      "_chunk-DfceSlZ5.js"
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
