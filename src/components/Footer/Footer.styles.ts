import type { SxProps, Theme } from "@mui/material";

interface FooterStyles {
    footer: SxProps<Theme>;
    sectionTitle: SxProps<Theme>;
    bodyText: SxProps<Theme>;
    divider: SxProps<Theme>;
    iconButton: SxProps<Theme>;
    bottomBar: SxProps<Theme>;
    link: SxProps<Theme>;
}

const styles: FooterStyles = {
    footer: {
        mt: "auto",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        backgroundColor: (theme) => theme.palette.grey[50],
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: (theme) => `0 -2px 6px ${theme.palette.grey[200]}`,
    },
    sectionTitle: {
        fontWeight: 600,
        mb: 1.5,
    },
    bodyText: {
        color: "text.secondary",
        lineHeight: 1.6,
    },
    divider: {
        my: 4,
        borderColor: "divider",
    },
    iconButton: {
        color: "text.secondary",
        "&:hover": {
            color: "primary.main",
        },
    },
    bottomBar: {
        textAlign: { xs: "center", sm: "left" },
        paddingBottom: { xs: "56px", sm: 0 },
    },
    link: {
        color: "inherit",
        textDecoration: "underline",
        fontWeight: 500,
        transition: "color 0.2s ease-in-out",
        "&:hover": {
            color: (theme: Theme) => theme.palette.primary.main,
            textDecoration: "none"
        },
        "&:focus-visible": {
            outline: (theme: Theme) => `2px solid ${theme.palette.primary.main}`,
            outlineOffset: "2px"
        },
    }
};

export default styles;