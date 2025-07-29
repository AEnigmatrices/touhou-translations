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
  "_chunk-8ETcVkig.js": {
    "file": "assets/chunks/chunk-8ETcVkig.js",
    "name": "useData",
    "imports": [
      "_chunk-DT8--IiI.js"
    ]
  },
  "_chunk-BwmKIKRd.js": {
    "file": "assets/chunks/chunk-BwmKIKRd.js",
    "name": "List",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-sRTGZkXE.js",
      "_chunk-P9SFHX56.js"
    ]
  },
  "_chunk-C-k81qJO.js": {
    "file": "assets/chunks/chunk-C-k81qJO.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-DC7O2aj_.js"
    ]
  },
  "_chunk-CAUxoxtB.js": {
    "file": "assets/chunks/chunk-CAUxoxtB.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-yIc5hqub.js",
      "_chunk-E8XaFBDk.js",
      "_chunk-DtkB0HlI.js"
    ]
  },
  "_chunk-CDPf7GWC.js": {
    "file": "assets/chunks/chunk-CDPf7GWC.js",
    "name": "IconButton",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-DtkB0HlI.js"
    ]
  },
  "_chunk-CGM_kA3N.js": {
    "file": "assets/chunks/chunk-CGM_kA3N.js",
    "name": "Stack",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-C-k81qJO.js"
    ]
  },
  "_chunk-COW_fGfu.js": {
    "file": "assets/chunks/chunk-COW_fGfu.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-DT8--IiI.js"
    ]
  },
  "_chunk-Cs-fTHsW.js": {
    "file": "assets/chunks/chunk-Cs-fTHsW.js",
    "name": "Link",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-P9SFHX56.js"
    ]
  },
  "_chunk-Cy9sAgBf.js": {
    "file": "assets/chunks/chunk-Cy9sAgBf.js",
    "name": "TextField",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-COW_fGfu.js",
      "_chunk-BwmKIKRd.js",
      "_chunk-P9SFHX56.js"
    ]
  },
  "_chunk-D-ibFxoL.js": {
    "file": "assets/chunks/chunk-D-ibFxoL.js",
    "name": "ListPage",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-CAUxoxtB.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-P9SFHX56.js",
      "_chunk-COW_fGfu.js",
      "_chunk-BwmKIKRd.js",
      "_chunk-Cy9sAgBf.js",
      "_chunk-CDPf7GWC.js",
      "_chunk-PDL_P4Oi.js"
    ]
  },
  "_chunk-DC7O2aj_.js": {
    "file": "assets/chunks/chunk-DC7O2aj_.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-DT8--IiI.js"
    ]
  },
  "_chunk-DT8--IiI.js": {
    "file": "assets/chunks/chunk-DT8--IiI.js",
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
  "_chunk-DtkB0HlI.js": {
    "file": "assets/chunks/chunk-DtkB0HlI.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-P9SFHX56.js"
    ]
  },
  "_chunk-E8XaFBDk.js": {
    "file": "assets/chunks/chunk-E8XaFBDk.js",
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
  "_chunk-P9SFHX56.js": {
    "file": "assets/chunks/chunk-P9SFHX56.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-DT8--IiI.js"
    ]
  },
  "_chunk-PDL_P4Oi.js": {
    "file": "assets/chunks/chunk-PDL_P4Oi.js",
    "name": "Container",
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-C-k81qJO.js"
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
  "_chunk-sRTGZkXE.js": {
    "file": "assets/chunks/chunk-sRTGZkXE.js",
    "name": "index",
    "imports": [
      "_chunk-DT8--IiI.js"
    ]
  },
  "_chunk-yIc5hqub.js": {
    "file": "assets/chunks/chunk-yIc5hqub.js",
    "name": "navigate",
    "imports": [
      "_chunk-E8XaFBDk.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.ioioy-Qf.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-E8XaFBDk.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-Dzs3G_ut.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-Cs-fTHsW.js",
      "_chunk-PDL_P4Oi.js",
      "_chunk-CGM_kA3N.js",
      "_chunk-PSOkAIay.js",
      "_chunk-P9SFHX56.js",
      "_chunk-C-k81qJO.js",
      "_chunk-DC7O2aj_.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-CRv8drE7.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-yIc5hqub.js",
      "_chunk-E8XaFBDk.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-P9SFHX56.js",
      "_chunk-DC7O2aj_.js",
      "_chunk-CDPf7GWC.js",
      "_chunk-BwmKIKRd.js",
      "_chunk-PSOkAIay.js",
      "_chunk-sRTGZkXE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.BEbo2GEI.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-CGM_kA3N.js",
      "_chunk-Cy9sAgBf.js",
      "_chunk-P9SFHX56.js",
      "_chunk-COW_fGfu.js",
      "_chunk-BwmKIKRd.js",
      "_chunk-PSOkAIay.js",
      "_chunk-C-k81qJO.js",
      "_chunk-DC7O2aj_.js",
      "_chunk-sRTGZkXE.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.CqDYPudI.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-D-ibFxoL.js",
      "_chunk-8ETcVkig.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CAUxoxtB.js",
      "_chunk-yIc5hqub.js",
      "_chunk-E8XaFBDk.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-P9SFHX56.js",
      "_chunk-COW_fGfu.js",
      "_chunk-BwmKIKRd.js",
      "_chunk-sRTGZkXE.js",
      "_chunk-Cy9sAgBf.js",
      "_chunk-CDPf7GWC.js",
      "_chunk-PDL_P4Oi.js",
      "_chunk-C-k81qJO.js",
      "_chunk-DC7O2aj_.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.BPcmggVm.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-D-ibFxoL.js",
      "_chunk-8ETcVkig.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CAUxoxtB.js",
      "_chunk-yIc5hqub.js",
      "_chunk-E8XaFBDk.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-P9SFHX56.js",
      "_chunk-COW_fGfu.js",
      "_chunk-BwmKIKRd.js",
      "_chunk-sRTGZkXE.js",
      "_chunk-Cy9sAgBf.js",
      "_chunk-CDPf7GWC.js",
      "_chunk-PDL_P4Oi.js",
      "_chunk-C-k81qJO.js",
      "_chunk-DC7O2aj_.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.CShonvHY.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-CAUxoxtB.js",
      "_chunk-P9SFHX56.js",
      "_chunk-PDL_P4Oi.js",
      "_chunk-CGM_kA3N.js",
      "_chunk-COW_fGfu.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-PSOkAIay.js",
      "_chunk-yIc5hqub.js",
      "_chunk-E8XaFBDk.js",
      "_chunk-C-k81qJO.js",
      "_chunk-DC7O2aj_.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.Si8CsCMd.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.CuxjhM5F.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DT8--IiI.js",
      "_chunk-8ETcVkig.js",
      "_chunk-DtkB0HlI.js",
      "_chunk-Cs-fTHsW.js",
      "_chunk-CDPf7GWC.js",
      "_chunk-sRTGZkXE.js",
      "_chunk-CAUxoxtB.js",
      "_chunk-PSOkAIay.js",
      "_chunk-P9SFHX56.js",
      "_chunk-yIc5hqub.js",
      "_chunk-E8XaFBDk.js"
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
