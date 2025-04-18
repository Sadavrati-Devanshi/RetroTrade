import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ userRole }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showSidebar = userRole === 'admin' || userRole === 'seller';

  // Role-based route guard
  useEffect(() => {
    const pathname = location.pathname;

    const isAdminRoute = pathname.startsWith("/admin");
    const isSellerRoute = pathname.startsWith("/shop");
    const isBuyerRoute = pathname.startsWith("/buy");
    const isCommonRoute = pathname.startsWith("/settings");

    // Redirect to respective dashboard from root or /home
    if (pathname === "/" || pathname === "/home") {
      switch (userRole) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "seller":
          navigate("/shop/dashboard");
          break;
        case "buyer":
        default:
          navigate("/buy/dashboard");
          break;
      }
      return;
    }

    // Unauthorized access redirection
    if (userRole === "buyer" && !isBuyerRoute && !isCommonRoute) {
      navigate("/buy/dashboard");
    } else if (userRole === "seller" && !isSellerRoute && !isCommonRoute) {
      navigate("/shop/dashboard");
    } else if (userRole === "admin" && !isAdminRoute && !isCommonRoute) {
      navigate("/admin/dashboard");
    }

    console.log("User Role:", userRole);
    console.log("Current Path:", pathname);
  }, [userRole, location.pathname, navigate]);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        sidebarCollapsed={sidebarCollapsed}
        toggleMobileMenu={toggleMobileMenu}
        userRole={userRole}
      />

      <div className="flex pt-16">
        {showSidebar && (
          <Sidebar 
            collapsed={sidebarCollapsed}
            mobileOpen={mobileMenuOpen}
            setMobileOpen={setMobileMenuOpen}
            userRole={userRole}
          />
        )}
        <div
          className="flex-grow p-0 bg-white transition-all duration-300"
          style={{ marginLeft: showSidebar ? (sidebarCollapsed ? "5rem" : "16rem") : "0" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
