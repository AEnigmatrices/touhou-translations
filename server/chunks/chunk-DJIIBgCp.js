import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { navigate } from "vike/client/router";
import { b as useGetPosts } from "./chunk-DuogPw2d.js";
import { useTheme, useMediaQuery, AppBar, Toolbar, Typography, IconButton, Drawer, Box, List, ListItemButton, ListItemText, Tabs, Tab } from "@mui/material";
import { e as extractRedditId } from "./chunk-D1bws8Ae.js";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import "react-dom/server";
import "vike/server";
import "@emotion/react";
import "@emotion/server/create-instance";
import "@emotion/cache";
import "@mui/material/styles";
/*! src/components/Navbar/Navbar.utils.ts [vike:pluginModuleBanner] */
const BASE_PATH = "/touhou-translations/".replace(/\/$/, "");
const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return React.cloneElement(children, { elevation: trigger ? 4 : 0 });
};
const navLinks = [
  { label: "Home", to: `${BASE_PATH}/` },
  { label: "Characters", to: `${BASE_PATH}/characters/` },
  { label: "Artists", to: `${BASE_PATH}/artists/` },
  { label: "Gallery", to: `${BASE_PATH}/gallery/` },
  ...[]
];
const getRandomPostPath = (posts) => {
  if (!posts || posts.length === 0) return `${BASE_PATH}/`;
  const randomPost = posts[Math.floor(Math.random() * posts.length)];
  const redditId = extractRedditId(randomPost.reddit);
  return redditId ? `${BASE_PATH}/posts/${redditId}/` : `${BASE_PATH}/`;
};
/*! src/components/Navbar/Navbar.styles.ts [vike:pluginModuleBanner] */
const appBarSx = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  zIndex: 1100,
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)"
};
const toolbarSx = {
  maxWidth: 1200,
  margin: "0 auto",
  width: "100%",
  justifyContent: "flex-start",
  paddingY: 1.5
};
const titleSx = (theme) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer"
});
const drawerBoxSx = {
  width: 250
};
const tabContainerSx = {
  minHeight: 48
};
const tabSx = (active) => ({
  textTransform: "none",
  marginRight: 3,
  borderRadius: 1,
  transition: "background-color 0.3s ease, color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#000"
  },
  "&:active": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  "&:last-of-type": {
    marginRight: 0
  },
  minHeight: 48,
  fontWeight: 600,
  color: active ? "#1976d2" : "#333"
});
/*! src/components/Navbar/Navbar.tsx [vike:pluginModuleBanner] */
const Navbar = ({ pageContext }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const posts = useGetPosts();
  const tabPaths = navLinks.map((link) => link.to);
  const currentTab = tabPaths.includes(pageContext.urlOriginal) ? pageContext.urlOriginal : false;
  const handleLogoClick = () => navigate(getRandomPostPath(posts));
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const isCurrent = (to) => pageContext.urlOriginal === to;
  const handleDrawerKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Shift") return;
    setDrawerOpen(false);
  };
  const handleNavigation = (to) => {
    setDrawerOpen(false);
    navigate(to);
  };
  return /* @__PURE__ */ jsx(ElevationScroll, { children: /* @__PURE__ */ jsx(AppBar, { position: "sticky", sx: appBarSx, children: /* @__PURE__ */ jsxs(Toolbar, { sx: toolbarSx, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h6", component: "div", onClick: handleLogoClick, sx: titleSx(theme), tabIndex: 0, role: "link", "aria-label": "Random post", children: "Touhou Translations" }),
    isMobile ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(IconButton, { edge: "end", color: "inherit", "aria-label": "open navigation menu", onClick: toggleDrawer(true), size: "large", children: /* @__PURE__ */ jsx(MenuIcon, {}) }),
      /* @__PURE__ */ jsx(Drawer, { anchor: "right", open: drawerOpen, onClose: toggleDrawer(false), children: /* @__PURE__ */ jsx(Box, { sx: drawerBoxSx, role: "presentation", onKeyDown: handleDrawerKeyDown, children: /* @__PURE__ */ jsx(List, { children: navLinks.map(({ label, to }) => /* @__PURE__ */ jsx(ListItemButton, { onClick: () => handleNavigation(to), children: /* @__PURE__ */ jsx(ListItemText, { primary: label }) }, to)) }) }) })
    ] }) : /* @__PURE__ */ jsx(Tabs, { value: currentTab, textColor: "primary", indicatorColor: "primary", "aria-label": "navigation tabs", sx: tabContainerSx, children: navLinks.map(({ label, to }) => /* @__PURE__ */ jsx(Tab, { value: to, label, onClick: () => handleNavigation(to), sx: tabSx(isCurrent(to)) }, to)) })
  ] }) }) });
};
export {
  Navbar as default
};
