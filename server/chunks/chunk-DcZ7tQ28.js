import { jsxs, jsx } from "react/jsx-runtime";
import { renderToStream } from "react-streaming/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import React, { Component, useContext, lazy, StrictMode, Suspense } from "react";
import { Box, CircularProgress, ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme, alpha } from "@mui/material/styles";
/*! src/utils/createEmotionCache.ts [vike:pluginModuleBanner] */
function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
/*! src/renderer/PageLayout/ErrorBoundary.tsx [vike:pluginModuleBanner] */
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { children: [
        "Error occurred: ",
        this.state.error?.message
      ] });
    }
    return this.props.children;
  }
}
/*! src/renderer/usePageContext.tsx [vike:pluginModuleBanner] */
const Context = React.createContext(void 0);
const PageContextProvider = ({ pageContext, children }) => /* @__PURE__ */ jsx(Context.Provider, { value: pageContext, children });
const usePageContext = () => useContext(Context);
/*! src/components/Loading/Loading.tsx [vike:pluginModuleBanner] */
const Loading = () => /* @__PURE__ */ jsx(
  Box,
  {
    sx: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minHeight: 200
    },
    children: /* @__PURE__ */ jsx(CircularProgress, {})
  }
);
/*! src/renderer/PageLayout/PageLayout.styles.ts [vike:pluginModuleBanner] */
const styles = {
  layoutContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  mainContent: {
    flexGrow: 1,
    py: 3
  }
};
/*! src/renderer/PageLayout/theme.ts [vike:pluginModuleBanner] */
const colors = {
  primary: {
    main: "#2563eb",
    light: "#3b82f6",
    dark: "#1d4ed8",
    contrastText: "#ffffff"
  },
  secondary: {
    main: "#7c3aed",
    light: "#8b5cf6",
    dark: "#6d28d9",
    contrastText: "#ffffff"
  },
  background: {
    default: "#f8fafc",
    paper: "#ffffff"
  },
  text: {
    primary: "#0f172a",
    secondary: "#64748b",
    disabled: "#94a3b8"
  },
  success: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669"
  },
  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626"
  },
  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706"
  },
  info: {
    main: "#3b82f6",
    light: "#60a5fa",
    dark: "#2563eb"
  }
};
const theme = createTheme({
  palette: colors,
  typography: {
    fontFamily: '"Noto Sans JP", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em"
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.25,
      letterSpacing: "-0.015em"
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.3
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.35
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: 1.45
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      fontWeight: 400
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      fontWeight: 400
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none"
          }
        },
        contained: {
          "&:hover": {
            backgroundColor: colors.primary.dark
          }
        },
        outlined: {
          borderColor: alpha(colors.text.primary, 0.23),
          "&:hover": {
            borderColor: colors.text.primary,
            backgroundColor: alpha(colors.text.primary, 0.04)
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        },
        outlined: {
          borderColor: alpha(colors.text.primary, 0.12)
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: alpha(colors.text.primary, 0.23)
            },
            "&:hover fieldset": {
              borderColor: alpha(colors.text.primary, 0.4)
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary.main
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          color: colors.text.primary,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          "&.Mui-selected": {
            backgroundColor: alpha(colors.primary.main, 0.1),
            "&:hover": {
              backgroundColor: alpha(colors.primary.main, 0.15)
            }
          }
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
});
/*! src/renderer/PageLayout/PageLayout.tsx [vike:pluginModuleBanner] */
const Navbar = lazy(() => import("./chunk-BeBr9fKI.js"));
const Footer = lazy(() => import("./chunk-D0CglXR6.js"));
const PageLayout = ({ pageContext, children }) => {
  const enhancedPageContext = { ...pageContext, appData: pageContext.data };
  return /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsxs(ThemeProvider, { theme, children: [
    /* @__PURE__ */ jsx(CssBaseline, {}),
    /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(PageContextProvider, { pageContext: enhancedPageContext, children: /* @__PURE__ */ jsxs(Box, { sx: styles.layoutContainer, children: [
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Navbar, {}) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Box, { component: "main", sx: styles.mainContent, children }) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Footer, {}) })
    ] }) }) })
  ] }) });
};
/*! src/renderer/+onRenderHtml.tsx [vike:pluginModuleBanner] */
const onRenderHtml = async (pageContext) => {
  const { Page } = pageContext;
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const app = /* @__PURE__ */ jsx(CacheProvider, { value: cache, children: /* @__PURE__ */ jsx(PageLayout, { pageContext, children: /* @__PURE__ */ jsx(Page, { ...pageContext }) }) });
  const html = require("react-dom/server").renderToString(app);
  const emotionChunks = extractCriticalToChunks(html);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);
  const userAgent = pageContext.headers?.["user-agent"];
  const stream = await renderToStream(app, { userAgent });
  const documentHtml = escapeInject`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="An archive of fan-translated Touhou Project comics and illustrations." />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            <meta
                http-equiv="Content-Security-Policy"
                content="
                    default-src 'self';
                    script-src 'self' 'unsafe-inline';
                    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                    font-src 'self' https://fonts.gstatic.com;
                    img-src 'self' https://i.redd.it data:;
                    connect-src 'self' https://www.reddit.com;
                    object-src 'none';
                    base-uri 'self';"
                    frame-ancestors 'none';
            />
            <meta name="referrer" content="strict-origin" />
            <link rel="icon" type="image/png" href="/touhou-translations/icons/favicon.png" />
            <link rel="manifest" href="/touhou-translations/manifest.json" />

            <link rel="preload" as="fetch" href="/artists/index.pageContext.json" crossorigin="anonymous">
            <link rel="preload" as="fetch" href="/characters/index.pageContext.json" crossorigin="anonymous">
            <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;500;700&display=swap" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

            <title>Touhou Translations</title>
            ${dangerouslySkipEscape(emotionStyleTags)}
        </head>
        <body>
            <div id="root">${stream}</div>
        </body>
        </html>
    `;
  return { documentHtml };
};
const import1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onRenderHtml
}, Symbol.toStringTag, { value: "Module" }));
export {
  import1 as i,
  usePageContext as u
};
