import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageContextProvider } from '../../renderer/usePageContext';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import PostsProvider from '../../context/PostsProvider';
import ErrorBoundary from '../../context/ErrorBoundary';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Box } from "@mui/material";
import styles from "./PageLayout.styles";
import type { ReactNode } from "react";
import type { PageContext } from 'vike/types'

const queryClient = new QueryClient();

const theme = createTheme({ typography: { fontFamily: '"Noto Sans JP", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif' } });

const LoadingFallback = () => <div>Loading...</div>;



const PageLayout = ({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) => {
    return (
        <StrictMode>
            <PageContextProvider pageContext={pageContext}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <ErrorBoundary>
                            <PostsProvider>
                                <Suspense fallback={<LoadingFallback />}>
                                    <Box sx={styles.layoutContainer}>
                                        <Navbar />
                                        <Box component="main" sx={styles.mainContent}>{children}</Box>
                                        <Footer />
                                    </Box>
                                </Suspense>
                            </PostsProvider>
                        </ErrorBoundary>
                    </ThemeProvider>
                </QueryClientProvider>
            </PageContextProvider>
        </StrictMode >
    );
};

export { PageLayout };