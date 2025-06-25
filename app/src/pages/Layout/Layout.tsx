import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Layout: React.FC = () => (
    <>
        <Navbar />
        <main style={{ padding: "1.5rem" }}>
            <Outlet />
        </main>
    </>
);

export default Layout;