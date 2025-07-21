import type { SxProps, Theme } from "@mui/material";

export const paperSx: SxProps<Theme> = {
    p: 2,
    borderRadius: 2,
    transition: "all 0.2s ease",
    cursor: "pointer",
    '&:hover': {
        bgcolor: "#f9f9f9",
        boxShadow: 3,
        transform: "translateY(-2px)"
    }
};

export const linkBoxSx: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    width: "100%"
};

export const contentSx: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 2,
    width: "100%"
};

export const textContainerSx: SxProps<Theme> = {
    flexGrow: 1
};

export const avatarSx: SxProps<Theme> = {
    width: 80,
    height: 80,
    flexShrink: 0
};

export const placeholderSx: SxProps<Theme> = {
    width: 80,
    height: 80,
    bgcolor: "#f0f0f0",
    borderRadius: 2,
    flexShrink: 0
};