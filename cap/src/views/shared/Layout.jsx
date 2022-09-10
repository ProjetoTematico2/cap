import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const Layout = () => {
    return (
        <>
            <div className="main-window">
                <Navbar />
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;