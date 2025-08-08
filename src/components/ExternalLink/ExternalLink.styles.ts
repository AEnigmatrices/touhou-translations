import type { SxProps, Theme } from "@mui/material";

interface Styles {
    link: SxProps<Theme>;
}

const styles: Styles = {
    link: {
        color: "inherit",
        textDecoration: "underline",
        fontWeight: 500,
        transition: "color 0.2s ease-in-out",
        "&:hover": {
            color: (theme: Theme) => theme.palette.primary.main,
            textDecoration: "none",
        },
        "&:focus-visible": {
            outline: (theme: Theme) => `2px solid ${theme.palette.primary.main}`,
            outlineOffset: "2px",
        },
    },
};

export default styles;