import type { SxProps, Theme } from "@mui/material";

const styles: { [key: string]: SxProps<Theme> } = {
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