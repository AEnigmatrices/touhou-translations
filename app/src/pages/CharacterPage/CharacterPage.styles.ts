import type { SxProps, Theme } from "@mui/material";

interface CharacterPageStyles {
    container: SxProps<Theme>;
    box: SxProps<Theme>;
    typography: SxProps<Theme>;
    textField: SxProps<Theme>;
    textFieldSlotProps: { htmlInput: { "aria-label": string; }; };
}

const styles: CharacterPageStyles = {
    container: {
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
    }
};

export default styles;