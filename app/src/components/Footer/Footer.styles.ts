import type { SxProps, Theme } from "@mui/material";

const styles = {
    footer: {
        py: { xs: 2, sm: 3 },
        px: 2,
        mt: "auto",
        backgroundColor: (theme: Theme) => theme.palette.grey[100],
        borderTop: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        textAlign: "center"
    } as SxProps<Theme>,

    copyright: {
        mt: 2,
        fontSize: "0.75rem",
        color: "text.secondary",
        backgroundColor: (theme: Theme) => theme.palette.grey[100],
        py: 1,
        borderRadius: 1
    } as SxProps<Theme>
};

export default styles;
