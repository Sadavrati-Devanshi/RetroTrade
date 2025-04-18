// import React, { useEffect } from "react";
// import { lazy } from "react";
// import { memo } from "react";
// const LoginPage = lazy(() => import("./components/customer/login/LoginController"));
// const RegisterPage = lazy(() => import("./components/customer/register/RegisterController"));
// const DashboardContent = lazy(() => import("./components/admin/Dashboard"));
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
// import AdminView from "./layout/AdminLayout";
// import Checkauth from "./components/common/checkauth";
// const MemoizedCheckauth = memo(Checkauth);
// import AdminProducts from "./components/admin/AdminProducts";
// import EditUser from "./components/admin/EditUSer";
// import NotFound from "./components/Notfound/NotFound";
// import ShoppingView from "./layout/UserLayout";
// import HomePage from "./components/common/HomePage";
// import ProductsList from "./components/customer/ProductsList";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAuth } from "./store/authSlice";

// const App = () => {

//   const{  user,isAuthenticated, isLoading} = useSelector((state) => state.auth)
//   const dispatch = useDispatch();
//   const AuthLayout = ({ children }) => {
//     return <div className="auth-container">{children}</div>;
//   };
  
//   useEffect(()=> {
//     dispatch(checkAuth());
//       },[dispatch]);
//       console.log("Redux auth state:", { user, isAuthenticated, isLoading });
    
//   const PersistedAuthLayout = memo(ShoppingView);
 
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }
  
//   return (
//     <Routes>
//   {/* Authentication Routes */}
//   <Route
//     path="/auth/*"
//     element={
//       <MemoizedCheckauth isAuthenticated={isAuthenticated} user={user}>
//     <AuthLayout />
//   </MemoizedCheckauth>
//     }
//   >
//     <Route path="login" element={<LoginPage />} />
//     <Route path="register" element={<RegisterPage />} />
//   </Route>

//   {/* Admin Routes - Only accessible by authenticated admins */}
//   <Route
//     path="/admin/*"
//     element={
//       <Checkauth isAuthenticated={isAuthenticated} user={user}>
//         <AdminView />
//       </Checkauth>
//     }
//   >
//     <Route path="dashboard" element={<DashboardContent />} />
//     <Route path="edituser" element={<EditUser />} />
//   </Route>

//   {/* User Routes - Only accessible by authenticated users */}
//   <Route
//     path="/shop/*"
//     element={
//       <MemoizedCheckauth isAuthenticated={isAuthenticated} user={user}>
//     {/* <ShoppingView/>
//      */}  <PersistedAuthLayout />
//   </MemoizedCheckauth>
//     }
//   >
//     <Route path="products" element={<ProductsList />} />
//     <Route path="edituser" element={<EditUser />} />
//   </Route>

//   {/* Default Redirects */}
//   {/* <Route path="/" element={<Navigate replace to="/auth/login" />} /> */}
//   <Route path="/unauth-page" element={<NotFound />} />
//   <Route path="*" element={<HomePage />} />
// </Routes>

//   );
// };

// export default App;
// //<Routes>
//   {/* Normalize trailing slashes */}
//   // <Route 
//   //   path="*/" 
//     // element={<Navigate to={location.pathname.slice(0, -1)} replace />} 
//   // />
  
//   {/* Your existing routes... */}
// // </Routes>


import React, { useEffect, Suspense } from "react";
import { lazy } from "react";
import { memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";

// Lazy-loaded components
const LoginPage = lazy(() => import("./components/customer/login/LoginController"));
const RegisterPage = lazy(() => import("./components/customer/register/RegisterController"));
const DashboardContent = lazy(() => import("./components/admin/Dashboard"));
LoginPage.preload = () => import("./components/customer/login/LoginController");
RegisterPage.preload = () => import("./components/customer/register/RegisterController");
// Regular imports
import AuthLayoutComponent from "./components/auth/layout"; // Renamed to avoid conflict
import AdminView from "./layout/AdminLayout";
import Checkauth from "./components/common/checkauth";
import AdminProducts from "./components/admin/AdminProducts";
import EditUser from "./components/admin/EditUSer";
import NotFound from "./components/Notfound/NotFound";
import ShoppingView from "./layout/UserLayout";
import HomePage from "./components/common/HomePage";
import ProductsListController from "./components/customer/ProductListController";
import Layout from "./layout/UserLayout";
import ProductSearch from "./components/customer/ProductSearchController";
import { Skeleton } from "./components/ui/skeleton";
import ProductSell from "./components/customer/ProductSellUi";
import ProductSellController from "./components/customer/ProductSellController";
import ProductSearchController from "./components/customer/ProductSearchController";
import { fetchAllProducts } from "./store/Seller/productSlice";
import WishlistPage from "./components/customer/WishlistPage";
import UserDashboard from "./components/buyer/UserDashboardUi";
import UserDashboardController from "./components/buyer/UserDashboardController";
import ProductsPage from "./components/admin/PrdouctsList/ProductsPage";
import BoughtPageUi from "./components/buyer/BoughtPageUi";
import TransactionList from "./components/admin/PrdouctsList/TransactionList"
const MemoizedCheckauth = memo(Checkauth);

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkAuth()); 
  
    if (isAuthenticated) {  // Only fetch products if logged in
      dispatch(fetchAllProducts());
    }
  }, [dispatch, isAuthenticated]); 
  
  console.log("Redux auth state:", { user, isAuthenticated, isLoading });
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
<Skeleton className="w-[100px] h-[20px] rounded-full" />
</div>
    );
  }
  
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">
<Skeleton className="w-[100px] h-[20px] rounded-full" />
</div>}>
      <Routes>
        {/* Public routes (no auth required) */}
        <Route path="/auth/*" element={!isAuthenticated ? <AuthLayoutComponent /> : 
          <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop/products"} replace />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <MemoizedCheckauth isAuthenticated={isAuthenticated} user={user}>
              <Layout userRole={user?.role}/>
            </MemoizedCheckauth>
          }
        >
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="edituser" element={<EditUser />} />
          <Route path="listings" element={<ProductsPage />} />
          <Route path="transactions" element={<TransactionList/>} />
        </Route>

        {/* User routes */}
        <Route
          path="/shop/*"
          element={
            <MemoizedCheckauth isAuthenticated={isAuthenticated} user={user}>
              <Layout userRole={user?.role}/>
            </MemoizedCheckauth>
          }
        >
    
        <Route path="dashboard" element={<ProductSellController />} />

          <Route path="products" element={<ProductsListController />} />
          <Route path="edituser" element={<EditUser />} />
          <Route path="sales" element={<BoughtPageUi  user={user}/>} />
          <Route path="search" element={<ProductSearchController />} />
        </Route>

        <Route
          path="/buy/*"
          element={
            <MemoizedCheckauth isAuthenticated={isAuthenticated} user={user}>
              <Layout userRole={user?.role}/>
            </MemoizedCheckauth>
          }
        >
    
        <Route path="dashboard" element={<UserDashboardController />} />

          <Route path="products" element={<ProductsListController />} />
          <Route path="edituser" element={<EditUser />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="bought" element={<BoughtPageUi user={user}/>} />
          <Route path="search" element={<ProductSearchController />} />
        </Route>

        {/* Default routes */}
        <Route path="/unauth-page" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;