import type { SxProps, Theme } from "@mui/material";

interface ProfileItemStyles {
    paper: SxProps<Theme>;
    linkBox: SxProps<Theme>;
    content: SxProps<Theme>;
    textContainer: SxProps<Theme>;
    avatar: SxProps<Theme>;
    placeholder: SxProps<Theme>;
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

export default styles;