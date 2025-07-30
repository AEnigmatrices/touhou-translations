import { StrictMode, Suspense, lazy } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import { PageContextProvider } from '../usePageContext';
import Loading from '../../components/Loading/Loading';
import { Box } from "@mui/material";
import styles from "./PageLayout.styles";
import theme from './theme';
import type { ReactNode } from "react";
import type { PageContext } from 'vike/types';

const Navbar = lazy(() => import('../../components/Navbar/Navbar'));
const Footer = lazy(() => import('../../components/Footer/Footer'));

const PageLayout = ({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) => {

    const enhancedPageContext = { ...pageContext, appData: pageContext.data };

    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary>
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
                </ErrorBoundary>
            </ThemeProvider>
        </StrictMode>
    );
};

export { PageLayout };