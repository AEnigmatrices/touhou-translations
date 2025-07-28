import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { Link, Box, Container, Stack, Typography } from "@mui/material";
/*! src/components/ExternalLink/ExternalLink.styles.ts [vike:pluginModuleBanner] */
const styles$1 = {
  link: {
    color: "inherit",
    textDecoration: "underline",
    fontWeight: 500,
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: (theme) => theme.palette.primary.main,
      textDecoration: "none"
    },
    "&:focus-visible": {
      outline: (theme) => `2px solid ${theme.palette.primary.main}`,
      outlineOffset: "2px"
    }
  }
};
/*! src/components/ExternalLink/ExternalLink.tsx [vike:pluginModuleBanner] */
const ExternalLink = ({ href, children, label }) => /* @__PURE__ */ jsx(
  Link,
  {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    sx: styles$1.link,
    "aria-label": `${label} (opens in new tab)`,
    children
  }
);
/*! src/components/Footer/Footer.styles.ts [vike:pluginModuleBanner] */
const styles = {
  footer: {
    py: { xs: 2, sm: 3 },
    px: 2,
    mt: "auto",
    backgroundColor: (theme) => theme.palette.grey[100],
    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
    textAlign: "center"
  },
  copyright: {
    mt: 2,
    fontSize: "0.75rem",
    color: "text.secondary",
    backgroundColor: (theme) => theme.palette.grey[100],
    py: 1,
    borderRadius: 1
  }
};
/*! src/components/Footer/Footer.tsx [vike:pluginModuleBanner] */
const Footer = () => {
  return /* @__PURE__ */ jsx(Box, { component: "footer", role: "contentinfo", "aria-label": "Site footer", sx: styles.footer, children: /* @__PURE__ */ jsxs(Container, { maxWidth: "md", children: [
    /* @__PURE__ */ jsxs(Stack, { spacing: 1.5, children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "text.secondary", children: [
        "This site adheres to the",
        " ",
        /* @__PURE__ */ jsx(ExternalLink, { href: "https://touhou-project.news/guidelines_en/", label: "Touhou Project fan content guidelines", children: "Touhou Project fan content guidelines" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs(Typography, { component: "address", variant: "body2", color: "text.secondary", sx: { fontStyle: "normal" }, children: [
        "Touhou Project character portraits by",
        " ",
        /* @__PURE__ */ jsx(ExternalLink, { href: "https://www.pixiv.net/en/users/4920496", label: "dairi's Pixiv profile", children: "dairi" }),
        " ",
        "(",
        /* @__PURE__ */ jsx(ExternalLink, { href: "https://www.nicovideo.jp/user/3494232", label: "haruka's NicoNico profile", children: "haruka" }),
        "), used accordingly to the specified permissions."
      ] }),
      /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: "All fan comics, illustrations, and translated content remain the intellectual property of their original creators." }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "text.secondary", children: [
        "Site repository on",
        " ",
        /* @__PURE__ */ jsx(ExternalLink, { href: "https://github.com/AEnigmatrices/touhou-translations", label: "GitHub repository", children: "GitHub" }),
        /* @__PURE__ */ jsx(Box, { component: "span", mx: 1, children: "|" }),
        "Licensed under",
        " ",
        /* @__PURE__ */ jsx(ExternalLink, { href: "https://github.com/AEnigmatrices/touhou-translations/blob/main/LICENSE", label: "MIT License", children: "MIT" }),
        /* @__PURE__ */ jsx(Box, { component: "span", mx: 1, children: "|" }),
        "Removal requests:",
        " ",
        /* @__PURE__ */ jsx(ExternalLink, { href: "https://github.com/AEnigmatrices/touhou-translations/issues", label: "Open an issue", children: "Open an issue" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Typography, { component: "p", sx: styles.copyright, children: "© AEnigmatrices, 2025. All rights reserved." })
  ] }) });
};
export {
  Footer as default
};
