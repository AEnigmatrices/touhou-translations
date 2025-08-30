import type { CSSProperties } from "react";
import type { SxProps } from "@mui/material";

interface ProfileItemStyles {
    paper: SxProps;
    linkBox: SxProps;
    content: SxProps;
    textContainer: SxProps;
    avatar: CSSProperties;
    placeholder: SxProps;
}

const styles: ProfileItemStyles = {
    paper: {
        p: 2,
        borderRadius: 2,
        transition: "all 0.2s ease",
        cursor: "pointer",
        '&:hover': {
            bgcolor: "#f9f9f9",
            boxShadow: 3,
            transform: "translateY(-2px)"
        }
    },
    linkBox: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer"
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

export default styles;