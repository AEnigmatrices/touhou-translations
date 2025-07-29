import { StrictMode, Suspense, lazy } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import PostsProvider from '../../context/PostsProvider';
import ErrorBoundary from '../../context/ErrorBoundary';
import { PageContextProvider } from '../../renderer/usePageContext';
import Loading from '../Loading/Loading';
import { Box } from "@mui/material";
import styles from "./PageLayout.styles";
import theme from './theme';
import type { ReactNode } from "react";
import type { PageContext } from 'vike/types';

const Navbar = lazy(() => import('../Navbar/Navbar'));
const Footer = lazy(() => import('../Footer/Footer'));

const PageLayout = ({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) => {

    const enhancedPageContext = { ...pageContext, appData: pageContext.data };

    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary>
                    <PostsProvider>
                        <PageContextProvider pageContext={enhancedPageContext}>
                            <Box sx={styles.layoutContainer}>
                                <Suspense fallback={<Loading />}>
                                    <Navbar pageContext={pageContext} />
                                </Suspense>
                                <Suspense fallback={<Loading />}>
                                    <Box component="main" sx={styles.mainContent}>
                                        {children}
                                    </Box>
                                </Suspense>
                                <Suspense fallback={<Loading />}>
                                    <Footer />
                                </Suspense>
                            </Box>
                        </PageContextProvider>
                    </PostsProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </StrictMode>
    );
};

export { PageLayout };