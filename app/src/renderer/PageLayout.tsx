import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Box } from "@mui/material";
import styles from "./PageLayout.styles";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={styles.layoutContainer}>
            <Navbar />
            <Box component="main" sx={styles.mainContent}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export { PageLayout };