import { StrictMode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import { PageContextProvider } from '../usePageContext';
import { Box } from "@mui/material";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from "./PageLayout.styles";
import theme from './theme';

import type { ReactNode } from "react";
import type { PageContext } from 'vike/types';

import '@fontsource/noto-sans/300.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';

import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/600.css';
import '@fontsource/noto-sans-jp/700.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/600.css';
import '@fontsource/roboto/700.css';


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
                        </Box>
                    </PageContextProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </StrictMode>
    );
};

export { PageLayout };