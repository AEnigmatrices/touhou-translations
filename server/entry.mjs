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
  "_chunk-B8fsOBFI.js": {
    "file": "assets/chunks/chunk-B8fsOBFI.js",
    "name": "List",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-chaOyH_b.js",
      "_chunk-C2FS37vN.js"
    ]
  },
  "_chunk-BF6QKPjw.js": {
    "file": "assets/chunks/chunk-BF6QKPjw.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-eRi0MuOb.js"
    ]
  },
  "_chunk-C2FS37vN.js": {
    "file": "assets/chunks/chunk-C2FS37vN.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-DSDq2sXi.js"
    ]
  },
  "_chunk-C3OW2nod.js": {
    "file": "assets/chunks/chunk-C3OW2nod.js",
    "name": "Stack",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-BF6QKPjw.js"
    ]
  },
  "_chunk-CnQQ4HMx.js": {
    "file": "assets/chunks/chunk-CnQQ4HMx.js",
    "name": "ListPage",
    "imports": [
      "_chunk-PSOkAIay.js",
      "_chunk-DSDq2sXi.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-C2FS37vN.js",
      "_chunk-DFRXFM3a.js",
      "_chunk-B8fsOBFI.js",
      "_chunk-Dbom_Ofw.js",
      "_chunk-DeN7F8xr.js",
      "_chunk-CvcxSCLm.js"
    ],
    "dynamicImports": [
      "src/components/ProfileItem/ProfileItem.tsx"
    ]
  },
  "_chunk-Cqt8-HH3.js": {
    "file": "assets/chunks/chunk-Cqt8-HH3.js",
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
  "_chunk-CvcxSCLm.js": {
    "file": "assets/chunks/chunk-CvcxSCLm.js",
    "name": "Container",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-BF6QKPjw.js"
    ]
  },
  "_chunk-DFRXFM3a.js": {
    "file": "assets/chunks/chunk-DFRXFM3a.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-DSDq2sXi.js"
    ]
  },
  "_chunk-DSDq2sXi.js": {
    "file": "assets/chunks/chunk-DSDq2sXi.js",
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
  "_chunk-DTI_cKdK.js": {
    "file": "assets/chunks/chunk-DTI_cKdK.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-C2FS37vN.js"
    ]
  },
  "_chunk-Dbom_Ofw.js": {
    "file": "assets/chunks/chunk-Dbom_Ofw.js",
    "name": "TextField",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-DFRXFM3a.js",
      "_chunk-B8fsOBFI.js",
      "_chunk-C2FS37vN.js"
    ]
  },
  "_chunk-DeN7F8xr.js": {
    "file": "assets/chunks/chunk-DeN7F8xr.js",
    "name": "IconButton",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-DTI_cKdK.js"
    ]
  },
  "_chunk-EyaR2Thy.js": {
    "file": "assets/chunks/chunk-EyaR2Thy.js",
    "name": "Link",
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-C2FS37vN.js"
    ]
  },
  "_chunk-Gj-DQS5e.js": {
    "file": "assets/chunks/chunk-Gj-DQS5e.js",
    "name": "navigate",
    "imports": [
      "_chunk-Cqt8-HH3.js"
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
  "_chunk-chaOyH_b.js": {
    "file": "assets/chunks/chunk-chaOyH_b.js",
    "name": "index",
    "imports": [
      "_chunk-DSDq2sXi.js"
    ]
  },
  "_chunk-eRi0MuOb.js": {
    "file": "assets/chunks/chunk-eRi0MuOb.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-DSDq2sXi.js"
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
    "file": "assets/entries/entry-client-routing.Bkq19wQ9.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-Cqt8-HH3.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-Dwr2iVUp.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-EyaR2Thy.js",
      "_chunk-CvcxSCLm.js",
      "_chunk-C3OW2nod.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C2FS37vN.js",
      "_chunk-BF6QKPjw.js",
      "_chunk-eRi0MuOb.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-CziPCRn4.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-Gj-DQS5e.js",
      "_chunk-Cqt8-HH3.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-C2FS37vN.js",
      "_chunk-eRi0MuOb.js",
      "_chunk-DeN7F8xr.js",
      "_chunk-B8fsOBFI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-chaOyH_b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/ProfileItem/ProfileItem.tsx": {
    "file": "assets/chunks/chunk-DuRqBmMJ.js",
    "name": "ProfileItem",
    "src": "src/components/ProfileItem/ProfileItem.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-Gj-DQS5e.js",
      "_chunk-Cqt8-HH3.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C2FS37vN.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.DPvVcG3F.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-C3OW2nod.js",
      "_chunk-Dbom_Ofw.js",
      "_chunk-C2FS37vN.js",
      "_chunk-DFRXFM3a.js",
      "_chunk-B8fsOBFI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BF6QKPjw.js",
      "_chunk-eRi0MuOb.js",
      "_chunk-chaOyH_b.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.BFuy40cN.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-CnQQ4HMx.js",
      "_chunk-PSOkAIay.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-C2FS37vN.js",
      "_chunk-DFRXFM3a.js",
      "_chunk-B8fsOBFI.js",
      "_chunk-chaOyH_b.js",
      "_chunk-Dbom_Ofw.js",
      "_chunk-DeN7F8xr.js",
      "_chunk-CvcxSCLm.js",
      "_chunk-BF6QKPjw.js",
      "_chunk-eRi0MuOb.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.7i_0lZTx.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-CnQQ4HMx.js",
      "_chunk-PSOkAIay.js",
      "_chunk-ySyhLtxq.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-C2FS37vN.js",
      "_chunk-DFRXFM3a.js",
      "_chunk-B8fsOBFI.js",
      "_chunk-chaOyH_b.js",
      "_chunk-Dbom_Ofw.js",
      "_chunk-DeN7F8xr.js",
      "_chunk-CvcxSCLm.js",
      "_chunk-BF6QKPjw.js",
      "_chunk-eRi0MuOb.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.DMUW9b1B.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-_MjiKTlx.js",
      "src/components/ProfileItem/ProfileItem.tsx",
      "_chunk-ySyhLtxq.js",
      "_chunk-C2FS37vN.js",
      "_chunk-CvcxSCLm.js",
      "_chunk-C3OW2nod.js",
      "_chunk-DFRXFM3a.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Gj-DQS5e.js",
      "_chunk-Cqt8-HH3.js",
      "_chunk-BF6QKPjw.js",
      "_chunk-eRi0MuOb.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.DXyyowtc.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.CwxXsW_8.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DSDq2sXi.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-DTI_cKdK.js",
      "_chunk-EyaR2Thy.js",
      "_chunk-DeN7F8xr.js",
      "_chunk-chaOyH_b.js",
      "_chunk-ySyhLtxq.js",
      "src/components/ProfileItem/ProfileItem.tsx",
      "_chunk-PSOkAIay.js",
      "_chunk-C2FS37vN.js",
      "_chunk-Gj-DQS5e.js",
      "_chunk-Cqt8-HH3.js"
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
