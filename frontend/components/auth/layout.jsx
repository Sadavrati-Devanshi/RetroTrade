import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function AuthLayout() {
  const location = useLocation();

  // Check if current route is login or register
  const isAuthPage =
    location.pathname === '/auth/login' || location.pathname === '/auth/register';

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      {/* Render Navbar only if NOT on login or register */}
      {!isAuthPage && (
        <nav className="absolute top-0 left-0 w-full h-16 bg-gold text-black flex items-center px-6 shadow-md z-50">
          <h1 className="text-xl font-bold">Retro Trade</h1>
        </nav>
      )}

      {/* Render Child Routes */}
      <div className="flex flex-1 items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
