import React, { useState } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full h-16 bg-gold text-black flex items-center px-6 shadow-md z-50">
    <h1 className="text-xl font-bold">Retro Trade</h1>
  </nav>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 pt-16"> {/* Added pt-16 to push content below navbar */}
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 p-4">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
