import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import styles from "./Layout.styles";

const Layout: React.FC = () => (
    <Box sx={styles.layoutContainer}>
        <Navbar />
        <Box component="main" sx={styles.mainContent}><Outlet /></Box>
        <Footer />
    </Box>
);

export default Layout;