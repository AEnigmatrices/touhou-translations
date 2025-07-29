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
  "_chunk-5VbIjd0t.js": {
    "file": "assets/chunks/chunk-5VbIjd0t.js",
    "name": "Container",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-D61w7_Dp.js"
    ]
  },
  "_chunk-B2DdoSdk.js": {
    "file": "assets/chunks/chunk-B2DdoSdk.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-_uikHEpB.js"
    ]
  },
  "_chunk-B2e-mG_b.js": {
    "file": "assets/chunks/chunk-B2e-mG_b.js",
    "name": "IconButton",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-DNIcQWvD.js"
    ]
  },
  "_chunk-B4W9Xeix.js": {
    "file": "assets/chunks/chunk-B4W9Xeix.js",
    "name": "Link",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-tKfP6WH1.js"
    ]
  },
  "_chunk-BEuHMtr0.js": {
    "file": "assets/chunks/chunk-BEuHMtr0.js",
    "name": "Stack",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-D61w7_Dp.js"
    ]
  },
  "_chunk-Bkj-tmll.js": {
    "file": "assets/chunks/chunk-Bkj-tmll.js",
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
  "_chunk-BlJ83HWw.js": {
    "file": "assets/chunks/chunk-BlJ83HWw.js",
    "name": "TextField",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-DxBKhejp.js",
      "_chunk-DpbVk_AS.js",
      "_chunk-B2DdoSdk.js"
    ]
  },
  "_chunk-Cg7ZFXhX.js": {
    "file": "assets/chunks/chunk-Cg7ZFXhX.js",
    "name": "navigate",
    "imports": [
      "_chunk-Bkj-tmll.js"
    ]
  },
  "_chunk-D61w7_Dp.js": {
    "file": "assets/chunks/chunk-D61w7_Dp.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-DCnbhFwa.js"
    ]
  },
  "_chunk-DCnbhFwa.js": {
    "file": "assets/chunks/chunk-DCnbhFwa.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-_uikHEpB.js"
    ]
  },
  "_chunk-DNIcQWvD.js": {
    "file": "assets/chunks/chunk-DNIcQWvD.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-B2DdoSdk.js"
    ]
  },
  "_chunk-DpbVk_AS.js": {
    "file": "assets/chunks/chunk-DpbVk_AS.js",
    "name": "List",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-DsjnYPVQ.js",
      "_chunk-B2DdoSdk.js"
    ]
  },
  "_chunk-DsjnYPVQ.js": {
    "file": "assets/chunks/chunk-DsjnYPVQ.js",
    "name": "index",
    "imports": [
      "_chunk-_uikHEpB.js"
    ]
  },
  "_chunk-DxBKhejp.js": {
    "file": "assets/chunks/chunk-DxBKhejp.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-_uikHEpB.js"
    ]
  },
  "_chunk-Dzt8AatK.js": {
    "file": "assets/chunks/chunk-Dzt8AatK.js",
    "name": "useAppData",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-vVMEvpwG.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-DxBKhejp.js",
      "_chunk-DpbVk_AS.js",
      "_chunk-BlJ83HWw.js",
      "_chunk-B2e-mG_b.js",
      "_chunk-5VbIjd0t.js",
      "_chunk-tKfP6WH1.js"
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
  "_chunk-_uikHEpB.js": {
    "file": "assets/chunks/chunk-_uikHEpB.js",
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
  "_chunk-tKfP6WH1.js": {
    "file": "assets/chunks/chunk-tKfP6WH1.js",
    "name": "Typography",
    "imports": [
      "_chunk-_uikHEpB.js"
    ]
  },
  "_chunk-vVMEvpwG.js": {
    "file": "assets/chunks/chunk-vVMEvpwG.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-Cg7ZFXhX.js",
      "_chunk-Bkj-tmll.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-tKfP6WH1.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.UJyoyP4V.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-Bkj-tmll.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-CwkxipRM.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-B4W9Xeix.js",
      "_chunk-5VbIjd0t.js",
      "_chunk-BEuHMtr0.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-D61w7_Dp.js",
      "_chunk-DCnbhFwa.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-BlnzmCfR.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-Cg7ZFXhX.js",
      "_chunk-Bkj-tmll.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-DCnbhFwa.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-B2e-mG_b.js",
      "_chunk-DpbVk_AS.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DsjnYPVQ.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.uWdshblR.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.COLDePr6.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-BEuHMtr0.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-BlJ83HWw.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-DxBKhejp.js",
      "_chunk-DpbVk_AS.js",
      "_chunk-PSOkAIay.js",
      "_chunk-D61w7_Dp.js",
      "_chunk-DCnbhFwa.js",
      "_chunk-DsjnYPVQ.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.4q7e1bAv.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-Bkj-tmll.js",
      "_chunk-Dzt8AatK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-vVMEvpwG.js",
      "_chunk-Cg7ZFXhX.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-DxBKhejp.js",
      "_chunk-DpbVk_AS.js",
      "_chunk-DsjnYPVQ.js",
      "_chunk-BlJ83HWw.js",
      "_chunk-B2e-mG_b.js",
      "_chunk-5VbIjd0t.js",
      "_chunk-D61w7_Dp.js",
      "_chunk-DCnbhFwa.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.BUdAIXfy.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-Bkj-tmll.js",
      "_chunk-Dzt8AatK.js",
      "_chunk-PSOkAIay.js",
      "_chunk-vVMEvpwG.js",
      "_chunk-Cg7ZFXhX.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-DxBKhejp.js",
      "_chunk-DpbVk_AS.js",
      "_chunk-DsjnYPVQ.js",
      "_chunk-BlJ83HWw.js",
      "_chunk-B2e-mG_b.js",
      "_chunk-5VbIjd0t.js",
      "_chunk-D61w7_Dp.js",
      "_chunk-DCnbhFwa.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.D8s1MweL.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-vVMEvpwG.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-5VbIjd0t.js",
      "_chunk-BEuHMtr0.js",
      "_chunk-DxBKhejp.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-PSOkAIay.js",
      "_chunk-Cg7ZFXhX.js",
      "_chunk-Bkj-tmll.js",
      "_chunk-D61w7_Dp.js",
      "_chunk-DCnbhFwa.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.ZY4fLmoJ.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.DimZchtc.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-_uikHEpB.js",
      "_chunk-DNIcQWvD.js",
      "_chunk-B4W9Xeix.js",
      "_chunk-B2e-mG_b.js",
      "_chunk-tKfP6WH1.js",
      "_chunk-DsjnYPVQ.js",
      "_chunk-vVMEvpwG.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B2DdoSdk.js",
      "_chunk-Cg7ZFXhX.js",
      "_chunk-Bkj-tmll.js"
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
