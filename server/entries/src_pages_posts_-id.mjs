import { g as fetchPosts, e as extractRedditId, d as useGetCharacter, f as useGetArtist, b as useGetCharacters, u as useGetPosts, i as import1 } from "../chunks/chunk-DOPeLDlf.js";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useCallback, useEffect } from "react";
import { Box, Link, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createPortal } from "react-dom";
import { a as getArtistPortraits, g as getCharacterPortraits, P as ProfileItem } from "../chunks/chunk-Bgyqguoc.js";
import Box$1 from "@mui/material/Box";
import "react-dom/server";
import "vike/server";
import "@emotion/react";
import "@emotion/server/create-instance";
import "@emotion/cache";
import "vike/client/router";
import "@mui/material/useScrollTrigger";
import "@mui/icons-material/Menu";
import "@mui/material/styles";
/*! src/pages/posts/@id/+onBeforePrerenderStart.ts [vike:pluginModuleBanner] */
const _onBeforePrerenderStart = async () => {
  try {
    const posts = await fetchPosts();
    const routes = posts.map((post) => {
      const redditId = extractRedditId(post.reddit);
      if (!redditId) {
        console.warn("Skipping post: could not extract Reddit ID from", post.reddit);
        return null;
      }
      return {
        url: `/posts/${redditId}`,
        pageContext: { post, postId: redditId }
      };
    }).filter(Boolean);
    return routes;
  } catch (error) {
    console.error("Failed to generate prerender routes:", error);
    return [];
  }
};
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _onBeforePrerenderStart
}, Symbol.toStringTag, { value: "Module" }));
/*! src/components/ImageViewer/ImageSection.styles.ts [vike:pluginModuleBanner] */
const styles$2 = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 2
  },
  imageDisplay: {
    maxWidth: 600,
    overflow: "hidden",
    borderRadius: 2,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.03)"
    },
    "&:active": {
      transform: "scale(0.97)"
    },
    "@media (max-width:768px)": {
      maxWidth: "100%",
      flex: "1 1 100%"
    },
    "@media (max-width:480px)": {
      maxWidth: "100%",
      maxHeight: "50vh",
      overflow: "hidden"
    }
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: 2,
    cursor: "zoom-in",
    "@media (max-width:480px)": {
      maxHeight: "100%",
      objectFit: "contain"
    }
  },
  galleryControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    "@media (max-width:480px)": {
      gap: 1
    }
  },
  galleryButton: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    padding: 1,
    color: "#333",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.2)"
    },
    "@media (max-width:480px)": {
      fontSize: "1rem",
      padding: 0.5
    }
  },
  galleryIndex: {
    fontWeight: 600,
    minWidth: 64,
    textAlign: "center"
  }
};
/*! src/components/ImageViewer/ImageSection.tsx [vike:pluginModuleBanner] */
const ImageSection = ({ currentIndex, urls, handleChangeIndex }) => {
  const currentImage = urls[currentIndex];
  const isGallery = urls.length > 1;
  return /* @__PURE__ */ jsxs(Box, { sx: styles$2.root, children: [
    /* @__PURE__ */ jsx(Box, { sx: styles$2.imageDisplay, children: /* @__PURE__ */ jsx(Link, { href: currentImage, target: "_blank", rel: "noopener noreferrer", underline: "none", children: /* @__PURE__ */ jsx(Box, { component: "img", src: currentImage, alt: "Translated Image", sx: { ...styles$2.image }, loading: "lazy", title: "" }) }) }),
    isGallery && /* @__PURE__ */ jsxs(Box, { sx: styles$2.galleryControls, children: [
      /* @__PURE__ */ jsx(IconButton, { onClick: () => handleChangeIndex(-1), "aria-label": "Previous image", sx: styles$2.galleryButton, children: /* @__PURE__ */ jsx(NavigateBeforeIcon, {}) }),
      /* @__PURE__ */ jsx(Typography, { sx: styles$2.galleryIndex, children: `${currentIndex + 1} / ${urls.length}` }),
      /* @__PURE__ */ jsx(IconButton, { onClick: () => handleChangeIndex(1), "aria-label": "Next image", sx: styles$2.galleryButton, children: /* @__PURE__ */ jsx(NavigateNextIcon, {}) })
    ] })
  ] });
};
/*! src/components/ImageViewer/ImageViewer.utils.ts [vike:pluginModuleBanner] */
const dateFormatOptions = { timeZone: "UTC", dateStyle: "long", timeStyle: "short" };
const replaceXWithNitter = (originalUrl) => {
  try {
    const url = new URL(originalUrl);
    return url.hostname === "x.com" ? (url.hostname = "nitter.net", url.toString()) : null;
  } catch {
    return null;
  }
};
/*! src/components/ProfilePopover/ProfilePopover.utils.ts [vike:pluginModuleBanner] */
const calculatePopoverPosition = (e, offset, popoverSize) => {
  const x = e.clientX + offset + popoverSize.width > window.innerWidth ? e.clientX - offset - popoverSize.width : e.clientX + offset;
  const y = e.clientY + offset + popoverSize.height > window.innerHeight ? e.clientY - offset - popoverSize.height : e.clientY + offset;
  return { x, y };
};
const formatArtworkDescription = (count) => {
  if (typeof count !== "number") return void 0;
  return `${count} artwork${count !== 1 ? "s" : ""}`;
};
/*! src/components/ProfilePopover/ProfilePopover.styles.ts [vike:pluginModuleBanner] */
const getPopoverStyles = (visible, position) => ({
  position: "fixed",
  top: position.y,
  left: position.x,
  zIndex: 9999,
  padding: 0.5,
  pointerEvents: "auto",
  maxWidth: 320,
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(10px)",
  transition: "opacity 0.3s ease, transform 0.3s ease"
});
/*! src/components/ProfilePopover/ProfilePopover.tsx [vike:pluginModuleBanner] */
const POPOVER_OFFSET = 10;
const POPOVER_SIZE = { width: 320, height: 200 };
const ProfilePopover = ({ data, type, position }) => {
  if (!data || !position) return null;
  const [visible, setVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const imageUrl = type === "artist" ? getArtistPortraits(data.id) : getCharacterPortraits(data.id);
  const description = formatArtworkDescription(data.artworkCount);
  const handleMouseMove = useCallback((e) => {
    setCurrentPosition(calculatePopoverPosition(e, POPOVER_OFFSET, POPOVER_SIZE));
  }, []);
  useEffect(() => {
    if (data && position) {
      setVisible(false);
      setCurrentPosition(position);
      const timer = setTimeout(() => {
        setVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [data, position]);
  useEffect(() => {
    if (!data) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [data, handleMouseMove]);
  return createPortal(
    /* @__PURE__ */ jsx(Box$1, { sx: getPopoverStyles(visible, currentPosition), children: /* @__PURE__ */ jsx(ProfileItem, { name: data.name, imageUrl, description }) }),
    document.body
  );
};
/*! src/components/ImageViewer/InfoSection.styles.ts [vike:pluginModuleBanner] */
const styles$1 = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    maxWidth: 600,
    color: "#333",
    alignItems: "stretch"
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "0.5rem 1rem",
    "@media (max-width:768px)": {
      gridTemplateColumns: "1fr"
    }
  },
  infoItemLabel: {
    color: "#222",
    fontWeight: 600,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    lineHeight: 1.6
  },
  infoItemValue: {
    display: "flex",
    gap: 3,
    "@media (max-width:480px)": {
      flexWrap: "wrap",
      gap: 1
    }
  },
  infoItemValueComment: {
    textAlign: "left",
    fontSize: "1.05rem",
    lineHeight: 1.6
  },
  infoIcons: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap"
  },
  iconButton: {
    p: 0,
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.15s ease, filter 0.15s ease",
    "& img": {
      width: 24,
      height: 24,
      borderRadius: 1,
      transition: "inherit",
      display: "block"
    },
    "&:hover img": {
      transform: "scale(1.1)",
      filter: "brightness(1.1)"
    },
    "&:active img": {
      transform: "scale(0.95)",
      filter: "brightness(0.9)"
    }
  },
  sourceLink: {
    color: "#0066cc",
    textDecoration: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    maxWidth: "100%",
    textAlign: "left",
    "&:hover": {
      textDecoration: "underline"
    },
    "@media (max-width:480px)": {
      whiteSpace: "normal",
      wordBreak: "break-word"
    }
  },
  characterLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: 500,
    whiteSpace: "nowrap",
    transition: "color 0.2s ease, text-decoration 0.2s ease",
    "&:hover, &:focus": {
      color: "#004999",
      textDecoration: "underline"
    },
    "&:active": {
      color: "#003366"
    }
  },
  charactersWrapper: {
    display: "inline"
  }
};
/*! src/components/ImageViewer/InfoSection.tsx [vike:pluginModuleBanner] */
const twitterIcon = `${"/touhou-translations/"}icons/social/twitter.webp`;
const nitterIcon = `${"/touhou-translations/"}icons/social/nitter.webp`;
const pixivIcon = `${"/touhou-translations/"}icons/social/pixiv.webp`;
const redditIcon = `${"/touhou-translations/"}icons/social/reddit.webp`;
const InfoSection = ({ post, artist, characters }) => {
  const [hoveredCharacterData, setHoveredCharacterData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const nitterUrl = post.src ? replaceXWithNitter(post.src) : null;
  const formattedDate = post.date ? new Date(post.date).toLocaleString("en-US", dateFormatOptions) : "Unknown date";
  useGetCharacter();
  const renderIconLink = (href, ariaLabel, iconSrc, altText) => {
    if (!href) return null;
    return /* @__PURE__ */ jsx(IconButton, { component: "a", href, target: "_blank", rel: "noopener noreferrer", "aria-label": ariaLabel, sx: styles$1.iconButton, size: "small", children: /* @__PURE__ */ jsx("img", { src: iconSrc, alt: altText }) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { sx: styles$1.root, children: [
      /* @__PURE__ */ jsxs(Box, { sx: styles$1.infoGrid, children: [
        artist && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Typography, { component: "div", sx: styles$1.infoItemLabel, children: "Artist:" }),
          /* @__PURE__ */ jsxs(Box, { sx: styles$1.infoItemValue, children: [
            /* @__PURE__ */ jsx(Typography, { children: artist.name }),
            /* @__PURE__ */ jsxs(Box, { sx: styles$1.infoIcons, children: [
              renderIconLink(artist.linkTwitter, "Twitter profile", twitterIcon, "Twitter"),
              renderIconLink(artist.linkTwitter?.replace("x.com", "nitter.net"), "Nitter profile", nitterIcon, "Nitter"),
              renderIconLink(artist.linkPixiv, "Pixiv profile", pixivIcon, "Pixiv")
            ] })
          ] })
        ] }),
        post.src && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Typography, { component: "div", sx: styles$1.infoItemLabel, children: "Source:" }),
          /* @__PURE__ */ jsx(Link, { href: post.src, target: "_blank", rel: "noopener noreferrer", sx: styles$1.sourceLink, title: post.src, children: post.src })
        ] }),
        nitterUrl && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Typography, { component: "div", sx: styles$1.infoItemLabel, children: "Nitter Mirror:" }),
          /* @__PURE__ */ jsx(Link, { href: nitterUrl, target: "_blank", rel: "noopener noreferrer", sx: styles$1.sourceLink, title: nitterUrl, children: nitterUrl })
        ] }),
        characters.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Typography, { component: "div", sx: styles$1.infoItemLabel, children: characters.length === 1 ? "Character:" : "Characters:" }),
          /* @__PURE__ */ jsx(Box, { sx: styles$1.infoItemValue, children: /* @__PURE__ */ jsx(Box, { sx: styles$1.charactersWrapper, children: characters.map((c, idx) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                component: "a",
                href: `/gallery?character=${c.id}`,
                sx: styles$1.characterLink,
                children: c.name
              }
            ),
            idx < characters.length - 1 && ", "
          ] }, c.id)) }) })
        ] }),
        post.date && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Typography, { component: "div", sx: styles$1.infoItemLabel, children: "Translated:" }),
          /* @__PURE__ */ jsx(Typography, { sx: styles$1.infoItemValue, children: formattedDate })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 2, mb: -1 }, children: [
          /* @__PURE__ */ jsx(Box, { sx: { display: "flex", gap: 1, alignItems: "center" }, children: post.reddit && renderIconLink(post.reddit, "Reddit post", redditIcon, "Reddit") }),
          /* @__PURE__ */ jsx(Typography, { sx: { fontWeight: 600, fontSize: "1.25rem" }, children: "TL Commentary:" })
        ] }),
        /* @__PURE__ */ jsx(Box, { sx: styles$1.infoItemValueComment, children: /* @__PURE__ */ jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: post.desc }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ProfilePopover, { data: hoveredCharacterData, type: "character", position: tooltipPosition })
  ] });
};
/*! src/components/ImageViewer/ImageViewer.styles.ts [vike:pluginModuleBanner] */
const styles = {
  root: {
    display: "flex",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    padding: 3,
    backgroundColor: "#fafafa",
    borderRadius: 3,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)"
    },
    "@media (max-width:768px)": {
      flexDirection: "column",
      padding: 2
    }
  }
};
/*! src/components/ImageViewer/ImageViewer.tsx [vike:pluginModuleBanner] */
const ImageViewer = ({ post }) => {
  const getArtist = useGetArtist();
  const getCharacters = useGetCharacters();
  const artist = getArtist(post.artistId);
  const characters = getCharacters(post.characterIds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChangeIndex = (direction) => {
    if (post.url.length <= 1) return;
    setCurrentIndex((prev) => (prev + direction + post.url.length) % post.url.length);
  };
  if (!post.url.length || !post.src) return null;
  return /* @__PURE__ */ jsxs(Box, { sx: styles.root, children: [
    /* @__PURE__ */ jsx(ImageSection, { currentIndex, urls: post.url, handleChangeIndex }),
    /* @__PURE__ */ jsx(InfoSection, { post, artist, characters })
  ] });
};
/*! src/pages/posts/@id/+Page.tsx [vike:pluginModuleBanner] */
const Page = (pageContext) => {
  const { id } = pageContext.routeParams || {};
  if (!id) return /* @__PURE__ */ jsx("p", { style: { color: "red" }, children: "Invalid URL: missing post ID." });
  if (pageContext.post) {
    return /* @__PURE__ */ jsx(ImageViewer, { post: pageContext.post });
  }
  const posts = useGetPosts();
  const targetRedditId = id;
  const post = posts.find((p) => {
    const pid = extractRedditId(p.reddit);
    return pid === targetRedditId;
  });
  if (!post) return /* @__PURE__ */ jsx("p", { style: { color: "red" }, children: "Post not found." });
  return /* @__PURE__ */ jsx(ImageViewer, { post });
};
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:pageConfigLazy:server:/src/pages/posts/@id [vike:pluginModuleBanner] */
const configValuesSerialized = {
  ["isClientRuntimeLoaded"]: {
    type: "computed",
    definedAtData: null,
    valueSerialized: {
      type: "js-serialized",
      value: true
    }
  },
  ["onRenderHtml"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/renderer/+onRenderHtml.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import1
    }
  },
  ["onBeforePrerenderStart"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/posts/@id/+onBeforePrerenderStart.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/posts/@id/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import3
    }
  }
};
export {
  configValuesSerialized
};
