import type { SxProps, Theme } from "@mui/material";

interface FooterStyles {
    footer: SxProps<Theme>;
    copyright: SxProps<Theme>;
}

const styles: FooterStyles = {
    footer: {
        py: { xs: 2, sm: 3 },
        px: 2,
        mt: "auto",
        backgroundColor: (theme: Theme) => theme.palette.grey[100],
        borderTop: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        textAlign: "center"
    },
    copyright: {
        mt: 2,
        fontSize: "0.75rem",
        color: "text.secondary",
        backgroundColor: (theme: Theme) => theme.palette.grey[100],
        py: 1,
        borderRadius: 1
    }
};

export default styles;