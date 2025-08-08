import { StrictMode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import { PageContextProvider } from '../usePageContext';
import { Box } from "@mui/material";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from "./PageLayout.styles";
import theme from './theme';

import type { ReactNode } from "react";
import type { PageContext } from 'vike/types';


const PageLayout = ({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) => {

    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary>
                    <PageContextProvider pageContext={pageContext}>
                        <Box sx={styles.layoutContainer}>
                            <Navbar />
                            <Box component="main" sx={styles.mainContent}>
                                {children}
                            </Box>
                            <Footer />
                            <BottomNav />
                        </Box>
                    </PageContextProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </StrictMode>
    );
};

export { PageLayout };