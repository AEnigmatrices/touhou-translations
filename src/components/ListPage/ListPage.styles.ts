import type { SxProps, Theme } from "@mui/material";

interface ListPageStyles {
    container: SxProps<Theme>;
    box: SxProps<Theme>;
    typography: SxProps<Theme>;
    textField: SxProps<Theme>;
    textFieldSlotProps: { htmlInput: { "aria-label": string; }; };
    listGrid: SxProps<Theme>;
}

const styles: ListPageStyles = {
    container: {
        px: { xs: 0 },
        py: 4
    },
    box: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
        mb: 5,
        px: 2
    },
    typography: {
        flexBasis: "100%",
        textAlign: "center",
        color: "text.primary",
        fontWeight: 600,
        mb: 2,
        letterSpacing: "0.05em"
    },
    textField: {
        maxWidth: 300,
        flexGrow: 1,
        minWidth: 220
    },
    textFieldSlotProps: {
        htmlInput: { "aria-label": "Search Characters" }
    },
    listGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        listStyle: "none",
        padding: 0,
        margin: 0,
        '@media (max-width:1024px)': {
            gridTemplateColumns: "repeat(3, 1fr)"
        },
        '@media (max-width:768px)': {
            gridTemplateColumns: "repeat(2, 1fr)"
        },
        '@media (max-width:480px)': {
            gridTemplateColumns: "1fr"
        }
    }
};

export default styles;