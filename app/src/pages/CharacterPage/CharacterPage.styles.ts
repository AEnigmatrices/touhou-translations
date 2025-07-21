import type { SxProps, Theme } from "@mui/material";

export const containerStyles: SxProps<Theme> = {
    py: 4
};

export const boxStyles: SxProps<Theme> = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    mb: 5,
    px: 2
};

export const typographyStyles: SxProps<Theme> = {
    flexBasis: "100%",
    textAlign: "center",
    color: "text.primary",
    fontWeight: 600,
    mb: 2,
    letterSpacing: "0.05em"
};

export const textFieldStyles: SxProps<Theme> = {
    maxWidth: 300,
    flexGrow: 1,
    minWidth: 220
};

export const textFieldSlotProps = {
    htmlInput: { "aria-label": "Search Characters" }
};