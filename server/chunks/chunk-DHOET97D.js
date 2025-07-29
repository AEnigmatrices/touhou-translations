import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { navigate } from "vike/client/router";
import { Paper, Box, Typography, Avatar } from "@mui/material";
/*! src/utils/galleryUtils.ts [vike:pluginModuleBanner] */
const getCharacterPortraits = (id) => {
  return `${"/touhou-translations/"}portraits/characters/${id}.webp`;
};
const getArtistPortraits = (id) => {
  return `${"/touhou-translations/"}portraits/artists/${id}.webp`;
};
const placeholderFilenames = [
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
const getRandomPlaceholder = () => {
  const index = Math.floor(Math.random() * placeholderFilenames.length);
  return `${"/touhou-translations/"}portraits/placeholders/${placeholderFilenames[index]}`;
};
/*! src/components/ProfileItem/ProfileItem.styles.ts [vike:pluginModuleBanner] */
const styles = {
  paper: {
    p: 2,
    borderRadius: 2,
    transition: "all 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      bgcolor: "#f9f9f9",
      boxShadow: 3,
      transform: "translateY(-2px)"
    }
  },
  linkBox: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    width: "100%"
  },
  textContainer: {
    flexGrow: 1
  },
  avatar: {
    width: 80,
    height: 80,
    flexShrink: 0
  },
  placeholder: {
    width: 80,
    height: 80,
    bgcolor: "#f0f0f0",
    borderRadius: 2,
    flexShrink: 0
  }
};
/*! src/components/ProfileItem/ProfileItem.tsx [vike:pluginModuleBanner] */
const ProfileItem = ({ name, imageUrl, description, link }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl ?? getRandomPlaceholder());
  const handleClick = () => {
    if (link) navigate(link);
  };
  const handleKeyDown = (event) => {
    if ((event.key === "Enter" || event.key === " ") && link) {
      event.preventDefault();
      navigate(link);
    }
  };
  const handleImageError = () => {
    setImgSrc(getRandomPlaceholder());
  };
  const ImageContent = imageUrl ? /* @__PURE__ */ jsx(Avatar, { src: imgSrc, alt: name, sx: styles.avatar, variant: "rounded", onError: handleImageError, slotProps: { img: { loading: "lazy" } } }) : /* @__PURE__ */ jsx(Box, { sx: styles.placeholder, "aria-hidden": true });
  const Content = /* @__PURE__ */ jsxs(Box, { sx: styles.content, children: [
    ImageContent,
    /* @__PURE__ */ jsxs(Box, { sx: styles.textContainer, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", fontWeight: 600, children: name }),
      description && /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: description })
    ] })
  ] });
  return /* @__PURE__ */ jsx(Paper, { component: "li", elevation: 1, role: "listitem", "aria-label": `Profile: ${name}`, tabIndex: link ? void 0 : 0, sx: styles.paper, children: link ? /* @__PURE__ */ jsx(Box, { onClick: handleClick, onKeyDown: handleKeyDown, sx: { ...styles.linkBox, cursor: "pointer" }, role: "button", tabIndex: 0, children: Content }) : /* @__PURE__ */ jsx(Box, { sx: styles.linkBox, children: Content }) });
};
export {
  ProfileItem as P,
  getArtistPortraits as a,
  getRandomPlaceholder as b,
  getCharacterPortraits as g
};
