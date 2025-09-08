import type { CSSProperties } from "react";
import type { SxProps } from "@mui/material";

interface ProfileItemStyles {
    paper: SxProps;
    linkBox: SxProps;
    content: SxProps;
    textContainer: SxProps;
    avatar: (isMdUp: boolean) => CSSProperties;
    placeholder: (isMdUp: boolean) => SxProps;
}

const styles: ProfileItemStyles = {
    paper: {
        p: 2,
        borderRadius: { xs: 0, md: 2 },
        transition: "all 0.2s ease",
        cursor: "pointer",
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
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
    avatar: (isMdUp: boolean) => ({
        width: isMdUp ? 80 : 120,
        height: isMdUp ? 80 : 120,
        borderRadius: 20,
        flexShrink: 0
    }),
    placeholder: (isMdUp: boolean) => ({
        width: isMdUp ? 80 : 120,
        height: isMdUp ? 80 : 120,
        bgcolor: "#f0f0f0",
        borderRadius: 2,
        flexShrink: 0
    })
};

export default styles;