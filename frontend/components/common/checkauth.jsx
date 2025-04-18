// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function Checkauth({ isAuthenticated, user, children }) {
//   const location = useLocation();
//   const isAuthPage = location.pathname.includes("/auth");
//   const isAdminPage = location.pathname.includes("/admin");
//   const isShopPage = location.pathname.includes("/shop");

//   // Redirect unauthenticated users trying to access protected pages
//   if (!isAuthenticated && (isAdminPage || isShopPage)) {
//     return <Navigate to="/login" />;
//   }

//   // Redirect authenticated users away from login/register pages 
//   if (isAuthenticated && isAuthPage) {
//     return user?.role === "admin" ? (
//       <Navigate to="/admin/dashboard" />
//     ) : (
//       <Navigate to="/shop/home" />
//     );
//   }

//   // Restrict access based on user roles
//   if (isAuthenticated) {
//     if (user?.role === "admin" && isShopPage) {
//       return <Navigate to="/admin/dashboard" />;
//     }
//     if (user?.role !== "admin" && isAdminPage) {
//       return <Navigate to="/shop/home" />;
//     }
//   }

//   return <>{children}</>;
// }

// // export default Checkauth;
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function Checkauth({ isAuthenticated, user, children }) {
//   const location = useLocation();
//   const pathname = location.pathname.endsWith("/") 
//     ? location.pathname.slice(0, -1) // Remove trailing slash
//     : location.pathname;
    
//   const isAuthLoginPage = pathname === "/auth/login";
//   const isAuthRegisterPage = pathname === "/auth/register";
//   const isAuthPage = pathname.startsWith("/auth");
//   const isAdminPage = pathname.startsWith("/admin");
//   const isShopPage = pathname.startsWith("/shop");
  
// // function Checkauth({ isAuthenticated, user, children }) {
// //   const location = useLocation();
// //   const isLoginPage = location.pathname === "/auth/login";
// //   const isRegisterPage = location.pathname === "/auth/register";
// //   const isAuthPage = isLoginPage || isRegisterPage;
// //       const isAdminPage = location.pathname.includes("/admin");
// //   const isShopPage = location.pathname.includes("/shop");
//   console.log("Auth state:", { isAuthenticated, user, pathname: location.pathname });
//   console.log("Path check:", { 
//     original: location.pathname, 
//     normalized: pathname,
//     isAuthPage,
//     isAuthLoginPage,
//     isAuthenticated
//   });
  
//   // Redirect unauthenticated users trying to access protected pages
//   if (!isAuthenticated && (isAdminPage || isShopPage)) {
//     return <Navigate to="/auth/login" />;
//   }

//   // Redirect authenticated users ONLY when accessing `/auth` (NOT `/auth/login`)
//   if (isAuthenticated && isAuthPage) {
//     return user?.role === "admin" ? (
//       <Navigate to="/admin/dashboard" />
//     ) : (
//       <Navigate to="/shop/home" />
//     );
//   }

//   // Restrict access based on user roles
//   if (isAuthenticated) {
//     if (user?.role === "admin" && isShopPage) {
//       return <Navigate to="/admin/dashboard" />;
//     }
//     if (user?.role !== "admin" && isAdminPage) {
//       return <Navigate to="/shop/home" />;
//     }
//   }

//   return <>{children}</>;
// }

// export default Checkauth;


// import React, { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function Checkauth({ isAuthenticated, user, children }) {
//   const location = useLocation();
//   const [redirectPath, setRedirectPath] = useState(null);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/shop")) {
//         setRedirectPath("/auth/login");
//       }
//     } else {
//       if (location.pathname.startsWith("/auth")) {
//         setRedirectPath(user?.role === "admin" ? "/admin/dashboard" : "/shop/home");
//       } else if (user?.role === "admin" && location.pathname.startsWith("/shop")) {
//         setRedirectPath("/admin/dashboard");
//       } else if (user?.role !== "admin" && location.pathname.startsWith("/admin")) {
//         setRedirectPath("/shop/home");
//       } else {
//         setRedirectPath(null);
//       }
//     }
//   }, [isAuthenticated, user, location.pathname]);

//   console.log("Auth state:", { isAuthenticated, user, pathname: location.pathname });
//   console.log("Redirect Path:", redirectPath);

//   // ✅ Only trigger navigation AFTER state has stabilized
//   if (redirectPath) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <>{children}</>;
// }

// export default Checkauth;



// import React, { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function Checkauth({ isAuthenticated, user, children }) {
//   const location = useLocation();
//   const [redirectPath, setRedirectPath] = useState(null);
//   const [isAuthChecked, setIsAuthChecked] = useState(false);

//   useEffect(() => {
//     let timer;

//     // ✅ Only process redirection once authentication state is stable
//     if (isAuthenticated !== null) {
//       setIsAuthChecked(true);
//     }

//     if (isAuthChecked) {
//       if (!isAuthenticated) {
//         if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/shop")) {
//           timer = setTimeout(() => setRedirectPath("/auth/login"), 10);
//         }
//       } else {
//         if (location.pathname.startsWith("/auth")) {
//           timer = setTimeout(() => 
//             setRedirectPath(user?.role === "admin" ? "/admin/dashboard" : "/shop/home"), 10
//           );
//         } else if (user?.role === "admin" && location.pathname.startsWith("/shop")) {
//           timer = setTimeout(() => setRedirectPath("/admin/dashboard"), 10);
//         } else if (user?.role !== "admin" && location.pathname.startsWith("/admin")) {
//           timer = setTimeout(() => setRedirectPath("/unauth-page"), 10);
//         } else {
//           setRedirectPath(null); // ✅ Keep it stable if no redirection required
//         }
//       }
//     }

//     return () => clearTimeout(timer); // ✅ Cleanup debounce
//   }, [isAuthenticated, user, location.pathname, isAuthChecked]);

//   console.log("Auth state:", { isAuthenticated, user, pathname: location.pathname });
//   console.log("Redirect Path:", redirectPath);

//   // ✅ Trigger navigation AFTER state has stabilized
//   if (redirectPath) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <>{children}</>;
// }

// export default Checkauth;


// import React, { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function Checkauth({ isAuthenticated, user, children }) {
//   const location = useLocation();
//   const [redirectPath, setRedirectPath] = useState(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   useEffect(() => {
//     let timer;

//     if (isAuthenticated === null) {
//       setAuthChecked(false);
//       return;
//     }

//     setAuthChecked(true);

//     if (!isAuthenticated) {
//       if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/shop")) {
//         setRedirectPath("/auth/login");
//       }
//     } else {
//       if (location.pathname.startsWith("/auth")) {
//         setRedirectPath(user?.role === "admin" ? "/admin/dashboard" : "/shop/home");
//       } else if (user?.role === "admin" && location.pathname.startsWith("/shop")) {
//         setRedirectPath("/admin/dashboard");
//       } else if (user?.role !== "admin" && location.pathname.startsWith("/admin")) {
//         setRedirectPath("/unauth-page");
//       } else {
//         setRedirectPath(null);
//       }
//     }

//     return () => clearTimeout(timer);
//   }, [isAuthenticated, user, location.pathname]);

//   console.log("Auth state:", { isAuthenticated, user, pathname: location.pathname });
//   console.log("Redirect Path:", redirectPath);

//   // 🛑 Prevent rendering until authentication is confirmed
//   if (!authChecked) {
//     return null;
//   }

//   // 🔄 Ensure smooth navigation without flickering
//   if (redirectPath && location.pathname !== redirectPath) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <>{children}</>;
// }

// export default Checkauth;



// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function Checkauth({ isAuthenticated, user, children }) {
//   const location = useLocation();
  
//   console.log("Auth state:", { isAuthenticated, user, pathname: location.pathname });
  
//   // Not authenticated - redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
//   }
  
//   // Non-admin trying to access admin routes
//   if (location.pathname.startsWith("/admin") && user?.role !== "admin") {
//     return <Navigate to="/unauth-page" replace />;
//   }
  
//   // Admin trying to access user routes (optional, depending on your requirements)
//   if (location.pathname.startsWith("/shop") && user?.role === "admin") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   if (location.pathname.startsWith("/buy") && user?.role === "seller") {
//     return <Navigate to="/shop/dashboard" replace />;
//   }
  
//   // Passed all auth checks, render the protected route
//   return children;
// }

// export default Checkauth;
import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

function Checkauth({ isAuthenticated, user, children }) {
  const location = useLocation();
  
  const authState = useMemo(() => ({ isAuthenticated, user, pathname: location.pathname }), [
    isAuthenticated, user, location.pathname
  ]);

  console.log("Auth state:", authState);

  if (!authState.isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: authState.pathname }} replace />;
  }

  if (authState.pathname.startsWith("/admin") && authState.user?.role !== "admin") {
    return <Navigate to="/unauth-page" replace />;
  }

  if (authState.pathname.startsWith("/shop") && authState.user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (authState.pathname.startsWith("/buy") && authState.user?.role === "seller") {
    return <Navigate to="/shop/dashboard" replace />;
  }

  return children;
}

export default React.memo(Checkauth);
