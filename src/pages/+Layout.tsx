import { StrictMode } from 'react';
import ErrorBoundary from './layout/ErrorBoundary';
import GlobalStyles from './layout/GlobalStyles';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import BottomNav from '../components/BottomNav/BottomNav';
import styles from "./layout/styles.module.css";
import type { JSX, ReactNode } from "react";


const Layout: ({ children }: { children: ReactNode; }) => JSX.Element = ({ children }) => {
    return (
        <StrictMode>
            <GlobalStyles />
            <ErrorBoundary>
                <div className={styles.layoutContainer}>
                    <Navbar />
                    <main className={styles.mainContent}>
                        {children}
                    </main>
                    <Footer />
                    <BottomNav />
                </div>
            </ErrorBoundary>
        </StrictMode>
    );
};

export default Layout;
