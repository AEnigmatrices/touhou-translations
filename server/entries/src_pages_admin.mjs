import { a as artists, b as useAppData, i as import1 } from "../chunks/chunk-Bt3P2hlM.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Box, Stack, Typography, TextField, Button, useTheme, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import "@mui/material/styles";
/*! src/components/DataForms/PostForm/PostForm.utils.ts [vike:pluginModuleBanner] */
const headers$1 = { "Content-Type": "application/json" };
const splitClean = (input) => input.split(",").map((s) => s.trim()).filter(Boolean);
const getApiUrl = (url) => url.endsWith(".json") ? url : `${url}.json`;
const buildImageUrls = (postData) => {
  if (postData.media_metadata) {
    const metadata = postData.media_metadata;
    return Object.entries(metadata).map(([id, media]) => {
      const ext = media.m?.includes("png") ? "png" : "jpg";
      return `https://i.redd.it/${id}.${ext}`;
    }).reverse();
  }
  return postData.url ? [postData.url] : [];
};
const buildPostEntry = ({ date, reddit, urls, src, desc, artistId, characterIds }) => ({
  date,
  reddit: extractBaseRedditUrl(reddit),
  url: splitClean(urls),
  src,
  desc,
  artistId,
  characterIds: splitClean(characterIds)
});
const submitPostEntry = async (data) => {
  const response = await fetch("/api/posts", { method: "POST", headers: headers$1, body: JSON.stringify(buildPostEntry(data)) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Failed to add post");
};
const validateArtistId = (id) => {
  const trimmed = id.trim();
  const exists = artists.some((artist) => artist.id === trimmed);
  return exists || "Artist ID does not exist.";
};
const extractBaseRedditUrl = (url) => {
  if (!url) return "";
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "old.reddit.com") parsedUrl.hostname = "www.reddit.com";
    const { origin, pathname } = parsedUrl;
    const segments = pathname.split("/").filter(Boolean);
    const isValidRedditPostPath = segments.length >= 4 && segments[0] === "r" && segments[2] === "comments";
    return isValidRedditPostPath ? `${origin}/${segments.slice(0, 4).join("/")}` : "";
  } catch {
    return "";
  }
};
const fetchRedditData = async (redditUrl) => {
  if (!redditUrl) return null;
  try {
    const response = await fetch(getApiUrl(redditUrl));
    if (!response.ok) throw new Error("Failed to fetch Reddit data");
    const jsonData = await response.json();
    const postData = jsonData[0]?.data?.children[0]?.data;
    if (!postData) throw new Error("Invalid Reddit data structure");
    const createdDate = postData.created_utc ? postData.created_utc * 1e3 : null;
    const description = postData.selftext ?? "";
    const imageUrls = buildImageUrls(postData);
    return { createdDate, description, imageUrls };
  } catch (error) {
    console.error("Error fetching Reddit data:", error);
    return null;
  }
};
const validateRedditUrl = (value, existingPosts) => {
  const normalizedValue = extractBaseRedditUrl(value.trim());
  const isDuplicate = existingPosts?.some((post) => extractBaseRedditUrl(post.reddit) === normalizedValue);
  if (isDuplicate) return "This Reddit URL already exists.";
  return true;
};
/*! src/components/DataForms/PostForm/PostForm.styles.ts [vike:pluginModuleBanner] */
const styles$2 = {
  containerBox: {
    maxWidth: 900,
    mx: "auto",
    p: 3
  },
  inputBoxSmall: {
    flex: "1 1 220px",
    minWidth: 220
  },
  actionButton: {
    minWidth: 150
  }
};
/*! src/components/DataForms/PostForm/PostForm.tsx [vike:pluginModuleBanner] */
const PostForm = () => {
  const { register, handleSubmit, reset, watch, setValue, getValues, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();
  const [loadingRedditData, setLoadingRedditData] = useState(false);
  const { posts: allPosts } = useAppData();
  const debounceRef = useRef(null);
  const watchedReddit = watch("reddit");
  const debouncedValidateReddit = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const validationResult = validateRedditUrl(value.trim(), allPosts);
      if (validationResult !== true) {
        setError("reddit", { type: "validate", message: validationResult });
      } else {
        clearErrors("reddit");
      }
    }, 500);
  }, [setError, clearErrors, allPosts]);
  const onSubmit = async (data) => {
    try {
      await submitPostEntry(data);
      alert("Post added successfully!");
      reset();
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const handleFetchRedditData = async () => {
    const redditUrl = getValues("reddit");
    if (!redditUrl) {
      alert("Please enter a Reddit URL first.");
      return;
    }
    const validationResult = validateRedditUrl(redditUrl, allPosts);
    if (validationResult !== true) {
      alert(validationResult);
      return;
    }
    setLoadingRedditData(true);
    try {
      const data = await fetchRedditData(extractBaseRedditUrl(redditUrl));
      if (!data) {
        alert("Failed to load Reddit data");
        return;
      }
      if (data.createdDate) setValue("date", data.createdDate, { shouldValidate: true });
      if (data.description) setValue("desc", data.description, { shouldValidate: true });
      if (data.imageUrls?.length) setValue("urls", data.imageUrls.join(", "), { shouldValidate: true });
    } finally {
      setLoadingRedditData(false);
    }
  };
  useEffect(() => {
    if (!watchedReddit) {
      clearErrors("reddit");
      return;
    }
    debouncedValidateReddit(watchedReddit);
  }, [watchedReddit, debouncedValidateReddit, clearErrors]);
  return /* @__PURE__ */ jsx(Box, { sx: styles$2.containerBox, children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, children: /* @__PURE__ */ jsxs(Stack, { spacing: 4, children: [
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "Post Details" }),
      /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, flexWrap: "wrap", children: [
        /* @__PURE__ */ jsx(Box, { sx: styles$2.inputBoxSmall, children: /* @__PURE__ */ jsx(
          TextField,
          {
            label: "UNIX Timestamp",
            type: "number",
            error: !!errors.date,
            helperText: errors.date?.message,
            fullWidth: true,
            ...register("date", { required: "Date is required", valueAsNumber: true }),
            slotProps: { inputLabel: { shrink: !!watch("date") } }
          }
        ) }),
        /* @__PURE__ */ jsx(Box, { sx: styles$2.inputBoxSmall, children: /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Artist ID",
            error: !!errors.artistId,
            helperText: errors.artistId?.message,
            fullWidth: true,
            ...register("artistId", { required: "Artist ID is required", validate: validateArtistId }),
            slotProps: { inputLabel: { shrink: !!watch("artistId") } }
          }
        ) }),
        /* @__PURE__ */ jsx(Box, { sx: styles$2.inputBoxSmall, children: /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Source URL",
            error: !!errors.src,
            helperText: errors.src?.message,
            fullWidth: true,
            ...register("src", { required: "Source URL is required" }),
            slotProps: { inputLabel: { shrink: !!watch("src") } }
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "URLs" }),
      /* @__PURE__ */ jsxs(Stack, { spacing: 2, children: [
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Image URLs (comma separated)",
            error: !!errors.urls,
            helperText: errors.urls?.message,
            fullWidth: true,
            ...register("urls", { required: "Image URLs are required" }),
            slotProps: { inputLabel: { shrink: !!watch("urls") } }
          }
        ),
        /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Character IDs (comma separated)",
            error: !!errors.characterIds,
            helperText: errors.characterIds?.message,
            fullWidth: true,
            ...register("characterIds", { required: "Character IDs are required" }),
            slotProps: { inputLabel: { shrink: !!watch("characterIds") } }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "Description" }),
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Description",
          error: !!errors.desc,
          helperText: errors.desc?.message,
          multiline: true,
          minRows: 6,
          fullWidth: true,
          ...register("desc", { required: "Description is required" }),
          slotProps: { inputLabel: { shrink: !!watch("desc") } }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "Reddit URL" }),
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Reddit URL",
          error: !!errors.reddit,
          helperText: errors.reddit?.message,
          fullWidth: true,
          ...register("reddit", { required: "Reddit URL is required" }),
          slotProps: { inputLabel: { shrink: !!watch("reddit") } }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "center", flexWrap: "wrap", children: [
      /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: handleFetchRedditData, disabled: loadingRedditData, sx: styles$2.actionButton, children: loadingRedditData ? "Loading..." : "Fetch from Reddit" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", disabled: isSubmitting, sx: styles$2.actionButton, children: isSubmitting ? "Submitting..." : "Add Post" })
    ] })
  ] }) }) });
};
/*! src/components/DataForms/ArtistForm/ArtistForm.utils.ts [vike:pluginModuleBanner] */
const PLACEHOLDER_FILENAMES = [
  "demoman.webp",
  "engineer.webp",
  "heavy.webp",
  "medic.webp",
  "pyro.webp",
  "scout.webp",
  "sniper.webp",
  "soldier.webp",
  "spy.webp"
];
const headers = { "Content-Type": "application/json" };
const TWITTER_URL_PATTERN = /^(https?:\/\/)?(www\.)?x\.com\/.+$/i;
const PIXIV_URL_PATTERN = /^https?:\/\/(www\.)?pixiv\.net\/.+$/i;
const validateNewArtistId = async (id) => {
  const trimmed = id.trim();
  const exists = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(artists.some((artist) => artist.id === trimmed));
    }, 200);
  });
  return exists ? "Artist ID already exists." : true;
};
const submitNewArtist = async (artist) => {
  const response = await fetch("/api/artists", { method: "POST", headers, body: JSON.stringify(artist) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Failed to add artist");
};
const getRandomPlaceholder = () => {
  const index = Math.floor(Math.random() * PLACEHOLDER_FILENAMES.length);
  return `/portraits/placeholders/${PLACEHOLDER_FILENAMES[index]}`;
};
/*! src/components/DataForms/ArtistForm/ArtistForm.styles.ts [vike:pluginModuleBanner] */
const styles$1 = {
  containerBox: {
    maxWidth: 600,
    mx: "auto",
    p: 3
  },
  artistIdBox: {
    flex: "1 1 220px",
    minWidth: 220
  },
  nameBox: {
    flex: "1 1 220px",
    minWidth: 220
  },
  twitterBox: {
    flex: "1 1 260px",
    minWidth: 260
  },
  pixivBox: {
    flex: "1 1 260px",
    minWidth: 260
  },
  submitButton: {
    minWidth: 150
  }
};
/*! src/components/DataForms/ArtistForm/ArtistForm.tsx [vike:pluginModuleBanner] */
const ArtistForm = () => {
  const { register, handleSubmit, reset, watch, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();
  const watchedId = watch("id");
  const debounceRef = useRef(null);
  const debouncedValidate = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const errorMsg = await validateNewArtistId(value.trim());
      if (typeof errorMsg === "string" && errorMsg.length > 0) {
        setError("id", { type: "validate", message: errorMsg });
      } else {
        clearErrors("id");
      }
    }, 500);
  }, [setError, clearErrors]);
  const onSubmit = async (data) => {
    const cleaned = {
      id: data.id.trim(),
      name: data.name.trim(),
      ...data.linkTwitter?.trim() && { linkTwitter: data.linkTwitter.trim() },
      ...data.linkPixiv?.trim() && { linkPixiv: data.linkPixiv.trim() },
      portrait: getRandomPlaceholder()
    };
    try {
      await submitNewArtist(cleaned);
      alert("Artist added successfully!");
      reset();
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  useEffect(() => {
    if (!watchedId) {
      clearErrors("id");
      return;
    }
    debouncedValidate(watchedId);
  }, [watchedId, debouncedValidate, clearErrors]);
  return /* @__PURE__ */ jsx(Box, { sx: styles$1.containerBox, children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, children: /* @__PURE__ */ jsxs(Stack, { spacing: 3, children: [
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "Artist Information" }),
      /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, flexWrap: "wrap", children: [
        /* @__PURE__ */ jsx(Box, { sx: styles$1.artistIdBox, children: /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Artist ID",
            error: !!errors.id,
            helperText: errors.id?.message,
            fullWidth: true,
            ...register("id", { required: "ID is required" }),
            slotProps: { inputLabel: { shrink: !!watch("id") } }
          }
        ) }),
        /* @__PURE__ */ jsx(Box, { sx: styles$1.nameBox, children: /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Name",
            error: !!errors.name,
            helperText: errors.name?.message,
            fullWidth: true,
            ...register("name", { required: "Name is required" }),
            slotProps: { inputLabel: { shrink: !!watch("name") } }
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "Links" }),
      /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 2, flexWrap: "wrap", children: [
        /* @__PURE__ */ jsx(Box, { sx: styles$1.twitterBox, children: /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Twitter Link",
            error: !!errors.linkTwitter,
            helperText: errors.linkTwitter?.message,
            fullWidth: true,
            ...register("linkTwitter", { pattern: { value: TWITTER_URL_PATTERN, message: "Invalid Twitter URL" } }),
            slotProps: { inputLabel: { shrink: !!watch("linkTwitter") } }
          }
        ) }),
        /* @__PURE__ */ jsx(Box, { sx: styles$1.pixivBox, children: /* @__PURE__ */ jsx(
          TextField,
          {
            label: "Pixiv Link",
            error: !!errors.linkPixiv,
            helperText: errors.linkPixiv?.message,
            fullWidth: true,
            ...register("linkPixiv", { pattern: { value: PIXIV_URL_PATTERN, message: "Invalid Pixiv URL" } }),
            slotProps: { inputLabel: { shrink: !!watch("linkPixiv") } }
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Stack, { direction: "row", justifyContent: "center", children: /* @__PURE__ */ jsx(Button, { type: "submit", variant: "contained", disabled: isSubmitting, sx: styles$1.submitButton, children: isSubmitting ? "Submitting..." : "Add Artist" }) })
  ] }) }) });
};
/*! src/pages/admin/styles.ts [vike:pluginModuleBanner] */
const styles = {
  adminContainer: {
    m: 4,
    p: 3,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 3
  },
  header: {
    mb: 3,
    color: "primary.main",
    fontWeight: 600
  },
  contentTitle: (theme) => ({
    mb: 2,
    pb: 1,
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    color: "primary.main"
  }),
  paperFullHeight: {
    p: 3,
    height: "100%"
  },
  accordionMargin: {
    mb: 2
  }
};
/*! src/pages/admin/+Page.tsx [vike:pluginModuleBanner] */
const Page = () => {
  const theme = useTheme();
  return /* @__PURE__ */ jsxs(Stack, { sx: styles.adminContainer, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h4", component: "h2", sx: styles.header, children: "Admin Dashboard" }),
    /* @__PURE__ */ jsxs(Paper, { elevation: 3, sx: styles.paperFullHeight, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", component: "h3", sx: styles.contentTitle(theme), children: "Content Submission" }),
      /* @__PURE__ */ jsxs(Accordion, { sx: styles.accordionMargin, children: [
        /* @__PURE__ */ jsx(AccordionSummary, { expandIcon: /* @__PURE__ */ jsx(ExpandMoreIcon, {}), children: /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", children: "Reddit Posts" }) }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx(PostForm, {}) })
      ] }),
      /* @__PURE__ */ jsxs(Accordion, { children: [
        /* @__PURE__ */ jsx(AccordionSummary, { expandIcon: /* @__PURE__ */ jsx(ExpandMoreIcon, {}), children: /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", children: "Artists" }) }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx(ArtistForm, {}) })
      ] })
    ] })
  ] });
};
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:pageConfigLazy:server:/src/pages/admin [vike:pluginModuleBanner] */
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
    definedAtData: { "filePathToShowToUser": "/src/pages/admin/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  }
};
export {
  configValuesSerialized
};
