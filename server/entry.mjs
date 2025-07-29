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
  "_chunk-B5J0sYUA.js": {
    "file": "assets/chunks/chunk-B5J0sYUA.js",
    "name": "Link",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-ZwRzGMrw.js"
    ]
  },
  "_chunk-B5qfRCk3.js": {
    "file": "assets/chunks/chunk-B5qfRCk3.js",
    "name": "ProfileItem",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-DGJ0hEHx.js",
      "_chunk-Cqg6jIDc.js",
      "_chunk-D443NAGl.js",
      "_chunk-ZwRzGMrw.js"
    ]
  },
  "_chunk-BEhAjDcS.js": {
    "file": "assets/chunks/chunk-BEhAjDcS.js",
    "name": "Stack",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-CI0sPsTU.js"
    ]
  },
  "_chunk-Bc0o_Xx8.js": {
    "file": "assets/chunks/chunk-Bc0o_Xx8.js",
    "name": "IconButton",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-D443NAGl.js"
    ]
  },
  "_chunk-BvBW9Nc4.js": {
    "file": "assets/chunks/chunk-BvBW9Nc4.js",
    "name": "isFocusVisible",
    "imports": [
      "_chunk-DckmddjN.js"
    ]
  },
  "_chunk-C3V9rn-n.js": {
    "file": "assets/chunks/chunk-C3V9rn-n.js",
    "name": "getThemeProps",
    "imports": [
      "_chunk-DckmddjN.js"
    ]
  },
  "_chunk-CI0sPsTU.js": {
    "file": "assets/chunks/chunk-CI0sPsTU.js",
    "name": "useThemeProps",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-C3V9rn-n.js"
    ]
  },
  "_chunk-CQJBhp7s.js": {
    "file": "assets/chunks/chunk-CQJBhp7s.js",
    "name": "index",
    "imports": [
      "_chunk-DckmddjN.js"
    ]
  },
  "_chunk-Cqg6jIDc.js": {
    "file": "assets/chunks/chunk-Cqg6jIDc.js",
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
  "_chunk-D443NAGl.js": {
    "file": "assets/chunks/chunk-D443NAGl.js",
    "name": "ButtonBase",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-BvBW9Nc4.js"
    ]
  },
  "_chunk-DD6r9H56.js": {
    "file": "assets/chunks/chunk-DD6r9H56.js",
    "name": "List",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-D443NAGl.js",
      "_chunk-CQJBhp7s.js",
      "_chunk-BvBW9Nc4.js"
    ]
  },
  "_chunk-DGJ0hEHx.js": {
    "file": "assets/chunks/chunk-DGJ0hEHx.js",
    "name": "navigate",
    "imports": [
      "_chunk-Cqg6jIDc.js"
    ]
  },
  "_chunk-DckmddjN.js": {
    "file": "assets/chunks/chunk-DckmddjN.js",
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
  "_chunk-Di6ZIXL6.js": {
    "file": "assets/chunks/chunk-Di6ZIXL6.js",
    "name": "TextField",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-D443NAGl.js",
      "_chunk-jjLQMOyg.js",
      "_chunk-DD6r9H56.js",
      "_chunk-BvBW9Nc4.js"
    ]
  },
  "_chunk-DkvlA8J_.js": {
    "file": "assets/chunks/chunk-DkvlA8J_.js",
    "name": "Container",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-CI0sPsTU.js"
    ]
  },
  "_chunk-N8KGgXDR.js": {
    "file": "assets/chunks/chunk-N8KGgXDR.js",
    "name": "useAppData",
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-B5qfRCk3.js",
      "_chunk-D443NAGl.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-jjLQMOyg.js",
      "_chunk-DD6r9H56.js",
      "_chunk-Di6ZIXL6.js",
      "_chunk-Bc0o_Xx8.js",
      "_chunk-DkvlA8J_.js",
      "_chunk-ZwRzGMrw.js"
    ]
  },
  "_chunk-PSOkAIay.js": {
    "file": "assets/chunks/chunk-PSOkAIay.js",
    "name": "preload-helper"
  },
  "_chunk-ZwRzGMrw.js": {
    "file": "assets/chunks/chunk-ZwRzGMrw.js",
    "name": "Typography",
    "imports": [
      "_chunk-DckmddjN.js"
    ]
  },
  "_chunk-_MjiKTlx.js": {
    "file": "assets/chunks/chunk-_MjiKTlx.js",
    "name": "extractRedditId"
  },
  "_chunk-jjLQMOyg.js": {
    "file": "assets/chunks/chunk-jjLQMOyg.js",
    "name": "useFormControl",
    "imports": [
      "_chunk-DckmddjN.js"
    ]
  },
  "_src_renderer_index-54ec5530.BBfZVkUH.css": {
    "file": "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css",
    "src": "_src_renderer_index-54ec5530.BBfZVkUH.css"
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.C8YvBHXr.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-Cqg6jIDc.js",
      "_chunk-PSOkAIay.js"
    ]
  },
  "src/components/Footer/Footer.tsx": {
    "file": "assets/chunks/chunk-DvdSJKen.js",
    "name": "Footer",
    "src": "src/components/Footer/Footer.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-B5J0sYUA.js",
      "_chunk-DkvlA8J_.js",
      "_chunk-BEhAjDcS.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-CI0sPsTU.js",
      "_chunk-C3V9rn-n.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "src/components/Navbar/Navbar.tsx": {
    "file": "assets/chunks/chunk-Dq1MrY1H.js",
    "name": "Navbar",
    "src": "src/components/Navbar/Navbar.tsx",
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-DGJ0hEHx.js",
      "_chunk-Cqg6jIDc.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-D443NAGl.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-C3V9rn-n.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-Bc0o_Xx8.js",
      "_chunk-DD6r9H56.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CQJBhp7s.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/_error": {
    "file": "assets/entries/src_pages_error.5UzFHzBe.js",
    "name": "entries/src/pages/_error",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/admin": {
    "file": "assets/entries/src_pages_admin.DPkZ7Iko.js",
    "name": "entries/src/pages/admin",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/admin",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-D443NAGl.js",
      "_chunk-BEhAjDcS.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-Di6ZIXL6.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-jjLQMOyg.js",
      "_chunk-DD6r9H56.js",
      "_chunk-PSOkAIay.js",
      "_chunk-CI0sPsTU.js",
      "_chunk-C3V9rn-n.js",
      "_chunk-CQJBhp7s.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/artists": {
    "file": "assets/entries/src_pages_artists.DBexb-a5.js",
    "name": "entries/src/pages/artists",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/artists",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-Cqg6jIDc.js",
      "_chunk-N8KGgXDR.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B5qfRCk3.js",
      "_chunk-DGJ0hEHx.js",
      "_chunk-D443NAGl.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-jjLQMOyg.js",
      "_chunk-DD6r9H56.js",
      "_chunk-CQJBhp7s.js",
      "_chunk-Di6ZIXL6.js",
      "_chunk-Bc0o_Xx8.js",
      "_chunk-DkvlA8J_.js",
      "_chunk-CI0sPsTU.js",
      "_chunk-C3V9rn-n.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/characters": {
    "file": "assets/entries/src_pages_characters.x5icdKll.js",
    "name": "entries/src/pages/characters",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/characters",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-Cqg6jIDc.js",
      "_chunk-N8KGgXDR.js",
      "_chunk-PSOkAIay.js",
      "_chunk-B5qfRCk3.js",
      "_chunk-DGJ0hEHx.js",
      "_chunk-D443NAGl.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-jjLQMOyg.js",
      "_chunk-DD6r9H56.js",
      "_chunk-CQJBhp7s.js",
      "_chunk-Di6ZIXL6.js",
      "_chunk-Bc0o_Xx8.js",
      "_chunk-DkvlA8J_.js",
      "_chunk-CI0sPsTU.js",
      "_chunk-C3V9rn-n.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/gallery": {
    "file": "assets/entries/src_pages_gallery.CFXgMN_o.js",
    "name": "entries/src/pages/gallery",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/gallery",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-_MjiKTlx.js",
      "_chunk-B5qfRCk3.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-DkvlA8J_.js",
      "_chunk-BEhAjDcS.js",
      "_chunk-jjLQMOyg.js",
      "_chunk-D443NAGl.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-PSOkAIay.js",
      "_chunk-DGJ0hEHx.js",
      "_chunk-Cqg6jIDc.js",
      "_chunk-CI0sPsTU.js",
      "_chunk-C3V9rn-n.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/index": {
    "file": "assets/entries/src_pages_index.CJ4Zb2U2.js",
    "name": "entries/src/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-PSOkAIay.js"
    ],
    "css": [
      "assets/static/src_renderer_index-54ec5530.BBfZVkUH.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id": {
    "file": "assets/entries/src_pages_posts_-id.CZktACX9.js",
    "name": "entries/src/pages/posts/@id",
    "src": "virtual:vike:pageConfigLazy:client:/src/pages/posts/@id",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DckmddjN.js",
      "_chunk-D443NAGl.js",
      "_chunk-B5J0sYUA.js",
      "_chunk-Bc0o_Xx8.js",
      "_chunk-ZwRzGMrw.js",
      "_chunk-CQJBhp7s.js",
      "_chunk-B5qfRCk3.js",
      "_chunk-PSOkAIay.js",
      "_chunk-BvBW9Nc4.js",
      "_chunk-DGJ0hEHx.js",
      "_chunk-Cqg6jIDc.js"
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
