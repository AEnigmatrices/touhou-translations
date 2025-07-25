import type { SxProps, Theme } from "@mui/material";

interface LayoutStyles {
    layoutContainer: SxProps<Theme>;
    mainContent: SxProps<Theme>;
}

const styles: LayoutStyles = {
    layoutContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    mainContent: {
        flexGrow: 1,
        py: 3
    }
};

export default styles;