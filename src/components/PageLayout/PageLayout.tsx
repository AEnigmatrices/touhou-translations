import { StrictMode } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import PostsProvider from '../../context/PostsProvider';
import ErrorBoundary from '../../context/ErrorBoundary';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Box } from "@mui/material";
import styles from "./PageLayout.styles";
import type { ReactNode } from "react";
import type { PageContext } from 'vike/types'

const theme = createTheme({ typography: { fontFamily: '"Noto Sans JP", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif' } });



const PageLayout = ({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) => {
    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary>
                    <PostsProvider>
                        <Box sx={styles.layoutContainer}>
                            <Navbar pageContext={pageContext} />
                            <Box component="main" sx={styles.mainContent}>{children}</Box>
                            <Footer />
                        </Box>
                    </PostsProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </StrictMode >
    );
};

export { PageLayout };