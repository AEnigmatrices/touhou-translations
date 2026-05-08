import type { CSSProperties } from "react";
import type { SxProps } from "@mui/material";

interface ProfileItemStyles {
    paper: SxProps;
    linkBox: SxProps;
    content: SxProps;
    textContainer: SxProps;
    imageFrame: SxProps;
    imageFill: SxProps;
    avatar: CSSProperties;
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
        flex: 1
    },
    imageFrame: {
        position: "relative",
        flex: { xs: "0 0 120px", sm: "0 0 144px", md: "0 0 168px" },
        width: { xs: 120, sm: 144, md: 168 },
        aspectRatio: "1 / 1",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#ffffff"
    },
    imageFill: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    avatar: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
    },
};

export default styles;