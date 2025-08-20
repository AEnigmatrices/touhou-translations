import { createTheme, alpha } from '@mui/material/styles';

const colors = {
    primary: {
        main: '#2563eb',
        light: '#3b82f6',
        dark: '#1d4ed8',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#7c3aed',
        light: '#8b5cf6',
        dark: '#6d28d9',
        contrastText: '#ffffff',
    },
    background: {
        default: '#f8fafc',
        paper: '#ffffff',
    },
    text: {
        primary: '#0f172a',
        secondary: '#64748b',
        disabled: '#94a3b8',
    },
    success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
    },
    error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
    },
    warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
    },
    info: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
    },
};

const theme = createTheme({
    palette: colors,

    typography: {
        fontFamily: '"Noto Sans JP", "Noto Sans", "Roboto", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.35,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 500,
            fontSize: '1.125rem',
            lineHeight: 1.45,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 400,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontWeight: 400,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.75,
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.4,
            fontWeight: 400,
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
        },
    },

    spacing: 8,

    shape: {
        borderRadius: 8,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    padding: '8px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    '&:hover': {
                        backgroundColor: colors.primary.dark,
                    },
                },
                outlined: {
                    borderColor: alpha(colors.text.primary, 0.23),
                    '&:hover': {
                        borderColor: colors.text.primary,
                        backgroundColor: alpha(colors.text.primary, 0.04),
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                outlined: {
                    borderColor: alpha(colors.text.primary, 0.12),
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '& fieldset': {
                            borderColor: alpha(colors.text.primary, 0.23),
                        },
                        '&:hover fieldset': {
                            borderColor: alpha(colors.text.primary, 0.4),
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.primary.main,
                        },
                    },
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.paper,
                    color: colors.text.primary,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                },
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    '&.Mui-selected': {
                        backgroundColor: alpha(colors.primary.main, 0.1),
                        '&:hover': {
                            backgroundColor: alpha(colors.primary.main, 0.15),
                        },
                    },
                },
            },
        },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default theme;