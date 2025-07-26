import { u as useGetPosts, e as extractRedditId, d as useGetCharacter, f as useGetArtist, i as import1 } from "../chunks/chunk-B0ZWQo0U.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { P as ProfileItem, g as getCharacterPortraits, a as getArtistPortraits } from "../chunks/chunk-Bgyqguoc.js";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box$1 from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import "react-dom/server";
import "vike/server";
import "@emotion/react";
import "@emotion/server/create-instance";
import "@emotion/cache";
import "vike/client/router";
import "@mui/material/useScrollTrigger";
import "@mui/icons-material/Menu";
/*! src/utils/filterPosts.ts [vike:pluginModuleBanner] */
const filterPosts = (posts, characterQueries, artistQueries, mode = "and") => {
  if (characterQueries.length === 0 && artistQueries.length === 0) return posts;
  const lowerCaseCharacterQueries = characterQueries.map((q) => q.toLowerCase());
  const lowerCaseArtistQueries = artistQueries.map((q) => q.toLowerCase());
  return posts.filter((post) => {
    const postCharacterIds = post.characterIds?.map((id) => id.toLowerCase()) ?? [];
    const postArtistId = post.artistId?.toLowerCase() ?? "";
    const characterMatch = mode === "and" ? lowerCaseCharacterQueries.every((q) => postCharacterIds.includes(q)) : lowerCaseCharacterQueries.some((q) => postCharacterIds.includes(q));
    const artistMatch = mode === "and" ? lowerCaseArtistQueries.every((q) => postArtistId === q) : lowerCaseArtistQueries.some((q) => postArtistId === q);
    if (characterQueries.length > 0 && artistQueries.length > 0) {
      return mode === "and" ? characterMatch && artistMatch : characterMatch || artistMatch;
    } else if (characterQueries.length > 0) {
      return characterMatch;
    } else {
      return artistMatch;
    }
  });
};
/*! src/components/Gallery/Gallery.utils.ts [vike:pluginModuleBanner] */
const mergeSx = (...sxObjects) => Object.assign({}, ...sxObjects.filter(Boolean));
/*! src/components/Gallery/GalleryImage.styles.ts [vike:pluginModuleBanner] */
const styles$1 = {
  wrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: 1
  },
  placeholder: {
    position: "absolute",
    inset: 0,
    borderRadius: 1,
    background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite"
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
    transition: "opacity 0.3s ease, filter 0.3s ease"
  },
  loading: {
    opacity: 0.5,
    filter: "blur(5px)"
  },
  loaded: {
    opacity: 1,
    filter: "blur(0)"
  }
};
/*! src/components/Gallery/GalleryImage.tsx [vike:pluginModuleBanner] */
const GalleryImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const sxImage = mergeSx(styles$1.image, loaded ? styles$1.loaded : styles$1.loading);
  return /* @__PURE__ */ jsxs(Box, { sx: styles$1.wrapper, children: [
    !loaded && /* @__PURE__ */ jsx(Box, { sx: styles$1.placeholder, "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(Box, { component: "img", src, alt, loading: "lazy", onLoad: () => setLoaded(true), sx: sxImage })
  ] });
};
/*! src/components/Gallery/Gallery.styles.ts [vike:pluginModuleBanner] */
const styles = {
  grid: {
    columnCount: 3,
    columnGap: "1.25rem",
    width: "100%",
    "@media (max-width:1024px)": {
      columnCount: 2
    },
    "@media (max-width:768px)": {
      columnCount: 1
    }
  },
  item: {
    breakInside: "avoid",
    marginBottom: "1.25rem",
    borderRadius: 1,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    display: "block",
    willChange: "transform, box-shadow",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
    },
    "&:focus-visible": {
      outline: "2px solid #005fcc",
      outlineOffset: "2px"
    }
  }
};
/*! src/components/Gallery/Gallery.tsx [vike:pluginModuleBanner] */
const BASE_URL = "/touhou-translations/";
const Gallery = ({ posts }) => {
  const allPosts = useGetPosts();
  const displayedPosts = posts || allPosts;
  if (!displayedPosts.length) return /* @__PURE__ */ jsx("p", { children: "No posts available." });
  return /* @__PURE__ */ jsx(Box, { component: "section", sx: styles.grid, "aria-label": "Gallery grid", children: displayedPosts.map((post) => {
    if (!post.url || post.url.length === 0) return null;
    const imageUrl = post.url[0];
    const redditId = extractRedditId(post.reddit);
    if (!redditId) return null;
    return /* @__PURE__ */ jsx(Box, { component: "div", sx: styles.item, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `${BASE_URL}posts/${redditId}`,
        "aria-label": "View post details",
        tabIndex: 0,
        style: { display: "block", width: "100%", height: "100%" },
        children: /* @__PURE__ */ jsx(
          GalleryImage,
          {
            src: imageUrl,
            alt: `Gallery post from ${new Date(post.date).toLocaleDateString()}`
          }
        )
      }
    ) }, post.date);
  }) });
};
/*! src/components/GalleryHeader/GalleryHeaderCharacter.tsx [vike:pluginModuleBanner] */
const GalleryHeaderCharacter = ({ character }) => {
  const description = `${character.artworkCount} artwork${character.artworkCount !== 1 ? "s" : ""}`;
  return /* @__PURE__ */ jsx("a", { href: "/touhou-translations/characters", className: "gallery-page__header-link", "aria-label": "Back to characters list", children: /* @__PURE__ */ jsx(
    ProfileItem,
    {
      name: character.name,
      imageUrl: getCharacterPortraits(character.id),
      description
    }
  ) });
};
/*! src/components/GalleryHeader/GalleryHeaderArtist.tsx [vike:pluginModuleBanner] */
const GalleryHeaderArtist = ({ artist }) => {
  const description = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? "s" : ""}`;
  return /* @__PURE__ */ jsx("div", { className: "gallery-page__header", children: /* @__PURE__ */ jsx("a", { href: "/touhou-translations/artists", className: "gallery-page__header-link", "aria-label": "Back to artists list", children: /* @__PURE__ */ jsx(
    ProfileItem,
    {
      name: artist.name,
      imageUrl: getArtistPortraits(artist.id),
      description
    }
  ) }) });
};
/*! src/pages/gallery/styles.ts [vike:pluginModuleBanner] */
const switchSlotProps = {
  input: { "aria-label": "Toggle gallery only" }
};
const containerStyles = (theme) => ({
  pt: theme.spacing(4),
  pb: theme.spacing(4),
  px: { xs: theme.spacing(1), sm: theme.spacing(2) },
  margin: "0 auto"
});
const headerWrapperStyles = (theme) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  pb: theme.spacing(2),
  mb: { xs: theme.spacing(2), sm: theme.spacing(4) },
  px: { xs: theme.spacing(1), sm: 0 },
  gap: theme.spacing(2)
});
const galleryHeaderBoxStyles = (theme) => ({
  maxWidth: theme.spacing(37.5),
  width: "100%",
  flexShrink: 0
});
const switchLabelStyles = (theme) => ({
  ml: theme.spacing(2),
  fontWeight: 500,
  color: theme.palette.text.secondary,
  userSelect: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: theme.transitions.create("color", { duration: theme.transitions.duration.short }),
  "&:hover": { color: theme.palette.text.primary }
});
const loaderBoxStyles = (theme) => ({
  display: "flex",
  justifyContent: "center",
  py: theme.spacing(2)
});
/*! src/pages/gallery/+Page.tsx [vike:pluginModuleBanner] */
const PAGE_CHUNK_SIZE = 12;
const Page = ({ urlParsed }) => {
  const posts = useGetPosts();
  const getCharacter = useGetCharacter();
  const getArtist = useGetArtist();
  const theme = useTheme();
  const searchParams = new URLSearchParams(urlParsed.searchOriginal || "");
  const characterQueries = searchParams.getAll("character");
  const artistQueries = searchParams.getAll("artist");
  const mode = searchParams.get("mode") === "or" ? "or" : "and";
  const galleryOnlyParam = searchParams.get("galleryOnly") === "true";
  const [galleryOnly, setGalleryOnly] = useState(galleryOnlyParam);
  const [visibleCount, setVisibleCount] = useState(PAGE_CHUNK_SIZE);
  const loaderRef = useRef(null);
  const isLoadingRef = useRef(false);
  const observerRef = useRef(null);
  const characterId = characterQueries[0] ?? null;
  const character = characterId ? getCharacter(characterId) : null;
  const artistId = artistQueries[0] ?? null;
  const artist = artistId ? getArtist(artistId) : null;
  const filteredPosts = useMemo(() => {
    const baseFiltered = filterPosts(posts, characterQueries, artistQueries, mode);
    return galleryOnly ? baseFiltered.filter((post) => post.url.length > 1) : baseFiltered;
  }, [posts, characterQueries, artistQueries, mode, galleryOnly]);
  const filterKey = useMemo(() => {
    const chars = characterQueries.slice().sort().join(",");
    const artists = artistQueries.slice().sort().join(",");
    return `${chars}|${artists}|${mode}|${galleryOnly}|${filteredPosts.length}`;
  }, [characterQueries, artistQueries, mode, galleryOnly, filteredPosts.length]);
  const shuffledPosts = useMemo(() => filteredPosts.slice().sort(() => Math.random() - 0.5), [filterKey]);
  const visiblePosts = useMemo(() => shuffledPosts.slice(0, visibleCount), [shuffledPosts, visibleCount]);
  const toggleGalleryOnly = () => {
    const newGalleryOnly = !galleryOnly;
    setGalleryOnly(newGalleryOnly);
    const newParams = new URLSearchParams(urlParsed.searchOriginal || "");
    if (newGalleryOnly) {
      newParams.set("galleryOnly", "true");
    } else {
      newParams.delete("galleryOnly");
    }
    window.history.replaceState(null, "", `${urlParsed.pathname}?${newParams.toString()}`);
  };
  useEffect(() => {
    if (!loaderRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current && visiblePosts.length < shuffledPosts.length) {
          isLoadingRef.current = true;
          setVisibleCount((prev) => prev + PAGE_CHUNK_SIZE);
        }
      },
      { rootMargin: "200px" }
    );
    const currentObserver = observerRef.current;
    currentObserver.observe(loaderRef.current);
    return () => currentObserver.disconnect();
  }, [visiblePosts.length, shuffledPosts.length]);
  useEffect(() => {
    isLoadingRef.current = false;
  }, [visiblePosts.length]);
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "lg", sx: containerStyles(theme), children: [
    /* @__PURE__ */ jsxs(Stack, { direction: "row", sx: headerWrapperStyles(theme), children: [
      character && /* @__PURE__ */ jsx(Box$1, { sx: galleryHeaderBoxStyles(theme), children: /* @__PURE__ */ jsx(GalleryHeaderCharacter, { character }) }),
      artist && /* @__PURE__ */ jsx(Box$1, { sx: galleryHeaderBoxStyles(theme), children: /* @__PURE__ */ jsx(GalleryHeaderArtist, { artist }) }),
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(Switch, { checked: galleryOnly, onChange: toggleGalleryOnly, color: "primary", slotProps: switchSlotProps }),
          label: /* @__PURE__ */ jsx(Typography, { variant: "body1", children: "Gallery Only" }),
          sx: switchLabelStyles(theme)
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Gallery, { posts: visiblePosts }),
    visiblePosts.length < shuffledPosts.length && /* @__PURE__ */ jsx(Box$1, { ref: loaderRef, sx: loaderBoxStyles(theme), "aria-busy": "true", children: /* @__PURE__ */ jsx(CircularProgress, {}) })
  ] });
};
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:pageConfigLazy:server:/src/pages/gallery [vike:pluginModuleBanner] */
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
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/src/pages/gallery/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  }
};
export {
  configValuesSerialized
};
