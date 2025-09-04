import { StrictMode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ErrorBoundary from './layout/ErrorBoundary';
import GlobalStyles from './layout/GlobalStyles';
import { Box } from "@mui/material";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import BottomNav from '../components/BottomNav/BottomNav';
import styles from "./layout/Layout.styles";
import theme from './layout/theme';

import type { JSX, ReactNode } from "react";


const Layout: ({ children }: { children: ReactNode; }) => JSX.Element = ({ children }) => {
    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <CssBaseline />
                <ErrorBoundary>
                    <Box sx={styles.layoutContainer}>
                        <Navbar />
                        <Box component="main" sx={styles.mainContent}>
                            {children}
                        </Box>
                        <Footer />
                        <BottomNav />
                    </Box>
                </ErrorBoundary>
            </ThemeProvider>
        </StrictMode>
    );
};

export default Layout;