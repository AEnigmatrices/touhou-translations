import { b as useAppData, e as extractRedditId, i as import1 } from "../chunks/chunk-Bt5RNKE5.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { P as ProfileItem } from "../chunks/chunk-CYdkaobM.js";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box$1 from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CircularProgress$1 from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import "react-dom/server";
import "vike/server";
import "@emotion/react";
import "@emotion/server/create-instance";
import "@emotion/cache";
import "vike/client/router";
import "@mui/material/useScrollTrigger";
import "@mui/icons-material/Menu";
import "@mui/icons-material/GitHub";
import "@mui/icons-material/Twitter";
import "@mui/icons-material/Language";
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
/*! src/pages/gallery/useFilteredPosts.ts [vike:pluginModuleBanner] */
const useFilteredPosts = ({ posts, characterQueries, artistQueries, mode, galleryOnly }) => {
  const filteredPosts = useMemo(() => {
    const baseFiltered = filterPosts(posts, characterQueries, artistQueries, mode);
    return galleryOnly ? baseFiltered.filter((post) => post.url.length > 1) : baseFiltered;
  }, [posts, characterQueries, artistQueries, mode, galleryOnly]);
  const filterKey = useMemo(() => {
    const chars = characterQueries.slice().sort().join(",");
    const artists = artistQueries.slice().sort().join(",");
    return `${chars}|${artists}|${mode}|${galleryOnly}|${filteredPosts.length}`;
  }, [characterQueries, artistQueries, mode, galleryOnly, filteredPosts.length]);
  const shuffledPosts = useMemo(
    () => filteredPosts.slice().sort(() => Math.random() - 0.5),
    [filterKey]
  );
  return { filteredPosts, shuffledPosts };
};
/*! src/pages/gallery/useQueryParams.ts [vike:pluginModuleBanner] */
const useQueryParams = (urlParsed) => {
  const searchParams = new URLSearchParams(urlParsed.searchOriginal || "");
  const characterQueries = searchParams.getAll("character");
  const artistQueries = searchParams.getAll("artist");
  const mode = searchParams.get("mode") === "or" ? "or" : "and";
  const galleryOnlyParam = searchParams.get("galleryOnly") === "true";
  const [galleryOnly, setGalleryOnly] = useState(galleryOnlyParam);
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
  return { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly };
};
/*! src/components/Gallery/Gallery.utils.ts [vike:pluginModuleBanner] */
const mergeSx = (...sxObjects) => Object.assign({}, ...sxObjects.filter(Boolean));
/*! src/components/Gallery/GalleryImage.styles.ts [vike:pluginModuleBanner] */
const styles$2 = {
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
const GalleryImage = ({ src, alt, onLoad }) => {
  const [loaded, setLoaded] = useState(false);
  const sxImage = mergeSx(styles$2.image, loaded ? styles$2.loaded : styles$2.loading);
  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };
  return /* @__PURE__ */ jsxs(Box, { sx: styles$2.wrapper, children: [
    !loaded && /* @__PURE__ */ jsx(Box, { sx: styles$2.placeholder, "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(Box, { component: "img", src, alt, loading: "lazy", onLoad: handleLoad, sx: sxImage })
  ] });
};
/*! src/components/Gallery/Gallery.styles.ts [vike:pluginModuleBanner] */
const styles$1 = {
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
  },
  loadingOverlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    paddingTop: "1rem"
  }
};
/*! src/components/Gallery/Gallery.tsx [vike:pluginModuleBanner] */
const BASE_URL = "/touhou-translations/";
const Gallery = ({ posts }) => {
  const { posts: allPosts } = useAppData();
  const displayedPosts = posts || allPosts;
  const [loadedCount, setLoadedCount] = useState(0);
  const [batchId, setBatchId] = useState(0);
  const totalImages = useMemo(
    () => displayedPosts.filter((post) => post.url?.length && extractRedditId(post.reddit)).length,
    [displayedPosts]
  );
  useEffect(() => {
    setLoadedCount(0);
    setBatchId((id) => id + 1);
  }, [posts]);
  const handleImageLoad = (currentBatchId) => {
    if (currentBatchId === batchId) {
      setLoadedCount((prev) => prev + 1);
    }
  };
  if (!displayedPosts.length) return /* @__PURE__ */ jsx("p", { children: "No posts available." });
  const allLoaded = loadedCount === totalImages;
  return /* @__PURE__ */ jsxs(Box, { sx: { position: "relative", minHeight: "200px", display: "flex", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsx(Masonry, { columns: { xs: 2, md: 4 }, spacing: 2, sx: { visibility: allLoaded ? "visible" : "hidden" }, children: displayedPosts.map((post) => {
      if (!post.url?.length) return null;
      const imageUrl = post.url[0];
      const redditId = extractRedditId(post.reddit);
      if (!redditId) return null;
      return /* @__PURE__ */ jsx(Box, { sx: styles$1.item, children: /* @__PURE__ */ jsx(
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
              alt: `Gallery post from ${new Date(post.date).toLocaleDateString()}`,
              onLoad: () => handleImageLoad(batchId)
            }
          )
        }
      ) }, post.date);
    }) }),
    !allLoaded && /* @__PURE__ */ jsx(Box, { sx: styles$1.loadingOverlay, children: /* @__PURE__ */ jsx(CircularProgress, {}) })
  ] });
};
/*! src/components/GalleryHeader/GalleryHeaderCharacter.tsx [vike:pluginModuleBanner] */
const GalleryHeaderCharacter = ({ character }) => {
  const description = `${character.artworkCount} artwork${character.artworkCount !== 1 ? "s" : ""}`;
  const imageUrl = `${"/touhou-translations/"}${character.portrait}`;
  return /* @__PURE__ */ jsx("a", { href: "/touhou-translations/characters", "aria-label": "Back to characters list", children: /* @__PURE__ */ jsx(
    ProfileItem,
    {
      name: character.name,
      imageUrl,
      description
    }
  ) });
};
/*! src/components/GalleryHeader/GalleryHeaderArtist.tsx [vike:pluginModuleBanner] */
const GalleryHeaderArtist = ({ artist }) => {
  const description = `${artist.artworkCount} artwork${artist.artworkCount !== 1 ? "s" : ""}`;
  const imageUrl = `${"/touhou-translations/"}${artist.portrait}`;
  return /* @__PURE__ */ jsx("a", { href: "/touhou-translations/artists", "aria-label": "Back to artists list", children: /* @__PURE__ */ jsx(
    ProfileItem,
    {
      name: artist.name,
      imageUrl,
      description
    }
  ) });
};
/*! src/pages/gallery/styles.ts [vike:pluginModuleBanner] */
const styles = {
  switchSlotProps: {
    input: { "aria-label": "Toggle gallery only" }
  },
  containerStyles: (theme) => ({
    pt: theme.spacing(4),
    pb: theme.spacing(4),
    px: { xs: theme.spacing(1), sm: theme.spacing(2) },
    margin: "0 auto"
  }),
  headerWrapperStyles: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    pb: theme.spacing(2),
    mb: { xs: theme.spacing(2), sm: theme.spacing(4) },
    px: { xs: theme.spacing(1), sm: 0 },
    gap: theme.spacing(2)
  }),
  galleryHeaderBoxStyles: (theme) => ({
    maxWidth: theme.spacing(37.5),
    width: "100%",
    flexShrink: 0,
    listStyle: "none",
    padding: 0,
    margin: 0
  }),
  switchLabelStyles: (theme) => ({
    ml: theme.spacing(2),
    fontWeight: 500,
    color: theme.palette.text.secondary,
    userSelect: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: theme.transitions.create("color", { duration: theme.transitions.duration.short }),
    "&:hover": { color: theme.palette.text.primary }
  }),
  loaderBoxStyles: (theme) => ({
    display: "flex",
    justifyContent: "center",
    py: theme.spacing(2)
  }),
  paginationWrapperStyles: (theme) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: theme.spacing(4), sm: theme.spacing(4) },
    mt: { xs: theme.spacing(3), sm: theme.spacing(4) },
    px: theme.spacing(1),
    width: "100%",
    overflowX: "auto"
  }),
  paginationButtonStyles: (theme) => ({
    minWidth: { xs: 80, sm: 110 },
    fontSize: { xs: "0.9rem", sm: "1.05rem" },
    padding: {
      xs: theme.spacing(1, 2),
      sm: theme.spacing(1.5, 3)
    },
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: "none",
    fontWeight: 700,
    whiteSpace: "nowrap",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transition: theme.transitions.create(["background-color", "box-shadow"], {
      duration: theme.transitions.duration.short
    }),
    "&:hover:not(:disabled)": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    },
    "&:disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.text.disabled,
      pointerEvents: "none",
      opacity: 0.6,
      boxShadow: "none"
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2
    }
  }),
  paginationPageInfoStyles: (theme) => ({
    fontWeight: 600,
    fontSize: { xs: "0.95rem", sm: "1.1rem" },
    color: theme.palette.text.primary,
    userSelect: "none",
    minWidth: { xs: 80, sm: 100 },
    textAlign: "center",
    whiteSpace: "nowrap"
  })
};
/*! src/pages/gallery/+Page.tsx [vike:pluginModuleBanner] */
const POSTS_PER_PAGE = 18;
const Page = ({ urlParsed }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, artists, characters, loading, error } = useAppData();
  const { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly } = useQueryParams(urlParsed);
  const { shuffledPosts } = useFilteredPosts({ posts, characterQueries, artistQueries, mode, galleryOnly });
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const visiblePosts = shuffledPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(shuffledPosts.length / POSTS_PER_PAGE);
  const characterId = characterQueries[0] ?? null;
  const character = characterId ? characters.find((c) => c.id === characterId) ?? null : null;
  const artistId = artistQueries[0] ?? null;
  const artist = artistId ? artists.find((a) => a.id === artistId) ?? null : null;
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };
  if (loading) return /* @__PURE__ */ jsx(Box$1, { sx: styles.loaderBoxStyles(theme), children: /* @__PURE__ */ jsx(CircularProgress$1, {}) });
  if (error) return /* @__PURE__ */ jsx(Box$1, { sx: styles.loaderBoxStyles(theme), children: /* @__PURE__ */ jsx(Typography, { color: "error", children: error.message }) });
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "lg", sx: styles.containerStyles(theme), children: [
    /* @__PURE__ */ jsxs(Stack, { direction: "row", sx: styles.headerWrapperStyles(theme), children: [
      character && /* @__PURE__ */ jsx(Box$1, { sx: styles.galleryHeaderBoxStyles(theme), children: /* @__PURE__ */ jsx(GalleryHeaderCharacter, { character }) }),
      artist && /* @__PURE__ */ jsx(Box$1, { sx: styles.galleryHeaderBoxStyles(theme), children: /* @__PURE__ */ jsx(GalleryHeaderArtist, { artist }) }),
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(Switch, { checked: galleryOnly, onChange: toggleGalleryOnly, color: "primary", slotProps: styles.switchSlotProps }),
          label: /* @__PURE__ */ jsx(Typography, { variant: "body1", children: "Gallery Only" }),
          sx: styles.switchLabelStyles(theme)
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Gallery, { posts: visiblePosts }),
    shuffledPosts.length > POSTS_PER_PAGE && /* @__PURE__ */ jsxs(Stack, { direction: "row", sx: styles.paginationWrapperStyles(theme), children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "contained",
          onClick: handlePrevPage,
          disabled: currentPage === 1,
          sx: styles.paginationButtonStyles(theme),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxs(Typography, { variant: "body1", sx: styles.paginationPageInfoStyles(theme), children: [
        "Page ",
        currentPage,
        " of ",
        totalPages
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "contained",
          onClick: handleNextPage,
          disabled: currentPage === totalPages,
          sx: styles.paginationButtonStyles(theme),
          children: "Next"
        }
      )
    ] })
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
