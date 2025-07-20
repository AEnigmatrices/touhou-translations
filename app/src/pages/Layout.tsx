import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Box, Container } from "@mui/material";

const Layout: React.FC = () => (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, py: 3 }} >
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </Box>
    </Box>
);

export default Layout;
