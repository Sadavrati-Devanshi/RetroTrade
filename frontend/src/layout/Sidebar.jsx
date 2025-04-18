// import React from 'react';
// import { Activity, Users, Package, DollarSign, AlertCircle, Settings, LogOut } from 'lucide-react';

// const Sidebar = ({ activeTab, setActiveTab }) => {
//   return (
//     <div className="w-64 bg-gradient-to-b from-amber-100 to-orange-100 shadow-lg z-10 min-h-[calc(100vh-4rem)]">
//       <nav className="mt-6 px-2">
//         <div 
//           className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeTab === 'overview' ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'} cursor-pointer transition-colors`} 
//           onClick={() => setActiveTab('overview')}
//         >
//           <Activity size={20} className="mr-3" />
//           <span>Overview</span>
//         </div>
//         <div 
//           className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeTab === 'users' ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'} cursor-pointer transition-colors`} 
//           onClick={() => setActiveTab('users')}
//         >
//           <Users size={20} className="mr-3" />
//           <span>Users</span>
//         </div>
//         <div 
//           className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeTab === 'listings' ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'} cursor-pointer transition-colors`} 
//           onClick={() => setActiveTab('listings')}
//         >
//           <Package size={20} className="mr-3" />
//           <span>Listings</span>
//         </div>
//         <div 
//           className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeTab === 'transactions' ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'} cursor-pointer transition-colors`} 
//           onClick={() => setActiveTab('transactions')}
//         >
//           <DollarSign size={20} className="mr-3" />
//           <span>Transactions</span>
//         </div>
//         <div 
//           className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeTab === 'reports' ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'} cursor-pointer transition-colors`} 
//           onClick={() => setActiveTab('reports')}
//         >
//           <AlertCircle size={20} className="mr-3" />
//           <span>Reports</span>
//         </div>
//         <div 
//           className={`flex items-center px-4 py-3 mb-2 rounded-lg ${activeTab === 'settings' ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'} cursor-pointer transition-colors`} 
//           onClick={() => setActiveTab('settings')}
//         >
//           <Settings size={20} className="mr-3" />
//           <span>Settings</span>
//         </div>
//       </nav>
      
//       <div className="absolute bottom-0 left-0 p-4 border-t border-amber-200 w-64">
//         <div className="flex items-center text-amber-800">
//           <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center mr-2">
//             <span className="font-medium">A</span>
//           </div>
//           <div>
//             <p className="text-sm font-medium">Admin User</p>
//             <p className="text-xs opacity-75">admin@retrotrade.com</p>
//           </div>
//           <LogOut size={18} className="ml-auto text-amber-700 cursor-pointer hover:text-amber-900" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { 
//   Activity, Users, Package, DollarSign, AlertCircle, Settings, LogOut,
//   Heart, ShoppingBag, MessageSquare, LayoutDashboard, BarChart3, UserCog, 
//   Store, Tag
// } from "lucide-react";

// // Define menu items by user role
// const getMenuItems = (userRole) => {
//   const commonItems = [
//     { id: 'settings', label: 'Settings', icon: <Settings size={20} className="mr-3" /> },
//   ];
  
//   const buyerItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <Activity size={20} className="mr-3" /> },
//     { id: 'browse', label: 'Browse Items', icon: <Package size={20} className="mr-3" /> },
//     { id: 'favorites', label: 'Favorites', icon: <Heart size={20} className="mr-3" /> },
//     { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} className="mr-3" /> },
//     { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const sellerItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} className="mr-3" /> },
//     { id: 'listings', label: 'My Listings', icon: <Tag size={20} className="mr-3" /> },
//     { id: 'sales', label: 'Sales', icon: <DollarSign size={20} className="mr-3" /> },
//     { id: 'inventory', label: 'Inventory', icon: <Store size={20} className="mr-3" /> },
//     { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const adminItems = [
//     { id: 'overview', label: 'Overview', icon: <Activity size={20} className="mr-3" /> },
//     { id: 'users', label: 'Users', icon: <Users size={20} className="mr-3" /> },
//     { id: 'listings', label: 'Listings', icon: <Package size={20} className="mr-3" /> },
//     { id: 'transactions', label: 'Transactions', icon: <DollarSign size={20} className="mr-3" /> },
//     { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} className="mr-3" /> },
//     { id: 'moderation', label: 'Moderation', icon: <AlertCircle size={20} className="mr-3" /> },
//     { id: 'user-management', label: 'User Management', icon: <UserCog size={20} className="mr-3" /> },
//   ];
  
//   switch (userRole) {
//     case 'admin':
//       return [...adminItems, ...commonItems];
//     case 'seller':
//       return [...sellerItems, ...commonItems];
//     case 'buyer':
//     default:
//       return [...buyerItems, ...commonItems];
//   }
// };

// const Sidebar = ({ collapsed, mobileOpen, setMobileOpen, userRole }) => {
//   const menuItems = getMenuItems(userRole);
  
//   // Determine CSS classes based on state
//   const sidebarClasses = `
//     fixed lg:static
//     h-[calc(100vh-4rem)] 
//     transition-all duration-300 ease-in-out
//     bg-gradient-to-b from-amber-100 to-orange-100 shadow-lg z-40
//     ${collapsed ? 'lg:w-20' : 'lg:w-64'}
//     ${mobileOpen ? 'left-0' : '-left-full lg:left-0'}
//     ${collapsed ? 'lg:items-center' : ''}
//     flex flex-col
//   `;
  
//   // Handle mobile menu close
//   const handleNavLinkClick = () => {
//     if (window.innerWidth < 1024) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Backdrop for mobile */}
//       {mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
      
//       <div className={sidebarClasses}>
//         <nav className={`flex-1 overflow-y-auto px-2 py-6 ${collapsed ? 'lg:px-0' : ''}`}>
//           {menuItems.map((item) => (
//             <NavLink 
//               key={item.id}
//               to={`/${item.id}`}
//               onClick={handleNavLinkClick}
//               className={({ isActive }) => `
//                 flex items-center px-4 py-3 mb-2 rounded-lg
//                 ${collapsed ? 'lg:justify-center lg:px-2' : ''}
//                 ${isActive ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'}
//                 cursor-pointer transition-colors
//               `}
//             >
//               {collapsed ? (
//                 <div className="lg:flex lg:justify-center lg:w-full">
//                   {React.cloneElement(item.icon, { className: "mr-0" })}
//                 </div>
//               ) : (
//                 <>
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>
      
//         {/* User profile section */}
//         <div className={`
//           p-4 border-t border-amber-200 w-full
//           ${collapsed ? 'lg:flex lg:justify-center lg:p-2' : ''}
//         `}>
//           {collapsed ? (
//             <div className="hidden lg:flex lg:justify-center">
//               <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center">
//                 <span className="font-medium">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center text-amber-800">
//               <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center mr-3">
//                 <span className="font-medium">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">
//                   {userRole === "admin" ? "Admin User" : userRole === "seller" ? "Seller Account" : "Buyer Account"}
//                 </p>
//                 <p className="text-xs opacity-75 truncate">
//                   {userRole === "admin" ? "admin@retrotrade.com" : userRole === "seller" ? "seller@retrotrade.com" : 
//                    "buyer@retrotrade.com"}
//                 </p>
//               </div>
//               <LogOut 
//                 size={18} 
//                 className="ml-auto text-amber-700 cursor-pointer hover:text-amber-900" 
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;



// Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { 
//   Activity, Users, Package, DollarSign, AlertCircle, Settings, LogOut,
//   Heart, ShoppingBag, MessageSquare, LayoutDashboard, BarChart3, UserCog, 
//   Store, Tag
// } from "lucide-react";

// // Define menu items by user role
// const getMenuItems = (userRole) => {
//   const commonItems = [
//     { id: 'settings', label: 'Settings', icon: <Settings size={20} className="mr-3" /> },
//   ];
  
//   const buyerItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <Activity size={20} className="mr-3" /> },
//     { id: 'browse', label: 'Browse Items', icon: <Package size={20} className="mr-3" /> },
//     { id: 'favorites', label: 'Favorites', icon: <Heart size={20} className="mr-3" /> },
//     { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} className="mr-3" /> },
//     { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const sellerItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} className="mr-3" /> },
//     { id: 'listings', label: 'My Listings', icon: <Tag size={20} className="mr-3" /> },
//     { id: 'sales', label: 'Sales', icon: <DollarSign size={20} className="mr-3" /> },
//     { id: 'inventory', label: 'Inventory', icon: <Store size={20} className="mr-3" /> },
//     { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const adminItems = [
//     { id: 'overview', label: 'Overview', icon: <Activity size={20} className="mr-3" /> },
//     { id: 'users', label: 'Users', icon: <Users size={20} className="mr-3" /> },
//     { id: 'listings', label: 'Listings', icon: <Package size={20} className="mr-3" /> },
//     { id: 'transactions', label: 'Transactions', icon: <DollarSign size={20} className="mr-3" /> },
//     { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} className="mr-3" /> },
//     { id: 'moderation', label: 'Moderation', icon: <AlertCircle size={20} className="mr-3" /> },
//     { id: 'user-management', label: 'User Management', icon: <UserCog size={20} className="mr-3" /> },
//   ];
  
//   switch (userRole) {
//     case 'admin':
//       return [...adminItems, ...commonItems];
//     case 'seller':
//       return [...sellerItems, ...commonItems];
//     case 'buyer':
//     default:
//       return [...buyerItems, ...commonItems];
//   }
// };

// const Sidebar = ({ collapsed, mobileOpen, setMobileOpen, userRole }) => {
//   const menuItems = getMenuItems(userRole);
  
//   // Determine CSS classes based on state
//   const sidebarClasses = `
//   fixed lg:sticky
//   top-16 left-0 lg:left-0 
//   h-[calc(100vh-4rem)] 
//   transition-all duration-300 ease-in-out
//   bg-gradient-to-b from-amber-100 to-orange-100 shadow-lg z-40
//   ${collapsed ? 'lg:w-20' : 'lg:w-64'}
//   flex flex-col
//   overflow-y-auto
// `;
  
//   // Handle mobile menu close
//   const handleNavLinkClick = () => {
//     if (window.innerWidth < 1024) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Backdrop for mobile */}
//       {mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
      
//       <div className={sidebarClasses}>
//         <nav className={`flex-1 overflow-y-auto px-2 py-6 ${collapsed ? 'lg:px-0' : ''}`}>
//           {menuItems.map((item) => (
//             <NavLink 
//               key={item.id}
//               to={`/${item.id}`}
//               onClick={handleNavLinkClick}
//               className={({ isActive }) => `
//                 flex items-center px-4 py-3 mb-2 rounded-lg
//                 ${collapsed ? 'lg:justify-center lg:px-2' : ''}
//                 ${isActive ? 'bg-amber-200 text-amber-900' : 'text-amber-700 hover:bg-amber-100'}
//                 cursor-pointer transition-colors
//               `}
//             >
//               {collapsed ? (
//                 <div className="lg:flex lg:justify-center lg:w-full">
//                   {React.cloneElement(item.icon, { className: "mr-0" })}
//                 </div>
//               ) : (
//                 <>
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>
      
//         {/* User profile section */}
//         <div className={`
//           p-4 border-t border-amber-200 w-full
//           ${collapsed ? 'lg:flex lg:justify-center lg:p-2' : ''}
//         `}>
//           {collapsed ? (
//             <div className="hidden lg:flex lg:justify-center">
//               <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center">
//                 <span className="font-medium">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center text-amber-800">
//               <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center mr-3">
//                 <span className="font-medium">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">
//                   {userRole === "admin" ? "Admin User" : userRole === "seller" ? "Seller Account" : "Buyer Account"}
//                 </p>
//                 <p className="text-xs opacity-75 truncate">
//                   {userRole === "admin" ? "admin@retrotrade.com" : userRole === "seller" ? "seller@retrotrade.com" : 
//                    "buyer@retrotrade.com"}
//                 </p>
//               </div>
//               <LogOut 
//                 size={18} 
//                 className="ml-auto text-amber-700 cursor-pointer hover:text-amber-900" 
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


// import React from "react";
// import { NavLink } from "react-router-dom";
// import { 
//   Activity, Users, Package, DollarSign, AlertCircle, Settings, LogOut,
//   Heart, ShoppingBag, MessageSquare, LayoutDashboard, BarChart3, UserCog, 
//   Store, Tag
// } from "lucide-react";

// // Define menu items by user role
// const getMenuItems = (userRole) => {
//   const commonItems = [
//     { id: 'settings', label: 'Settings', icon: <Settings size={20} className="mr-3" /> },
//   ];
  
//   const buyerItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <Activity size={20} className="mr-3" /> },
//     { id: 'search', label: 'Search Items', icon: <Package size={20} className="mr-3" /> },
//     { id: 'favorites', label: 'Favorites', icon: <Heart size={20} className="mr-3" /> },
//     { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} className="mr-3" /> },
//     { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const sellerItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} className="mr-3" /> },
//     { id: 'search', label: 'Search Items',path: 'shop/shop/search', icon: <Package size={20} className="mr-3" /> },
//     { id: 'Sell', label: 'Sell my item', icon: <Tag size={20} className="mr-3" /> },
//     { id: 'sales', label: 'Sales', icon: <DollarSign size={20} className="mr-3" /> },
//     { id: 'inventory', label: 'Inventory', icon: <Store size={20} className="mr-3" /> },
//     { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const adminItems = [
//     { id: 'overview', label: 'Overview', icon: <Activity size={20} className="mr-3" /> },
//     { id: 'users', label: 'Users', icon: <Users size={20} className="mr-3" /> },
//     { id: 'listings', label: 'Listings', icon: <Package size={20} className="mr-3" /> },
//     { id: 'transactions', label: 'Transactions', icon: <DollarSign size={20} className="mr-3" /> },
//     { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} className="mr-3" /> },
//   ];
  
//   switch (userRole) {
//     case 'admin':
//       return [...adminItems, ...commonItems];
//     case 'seller':
//       return [...sellerItems, ...commonItems];
//     case 'buyer':
//     default:
//       return [...buyerItems, ...commonItems];
//   }
// };

// const Sidebar = ({ collapsed, mobileOpen, setMobileOpen, userRole }) => {
//   const menuItems = getMenuItems(userRole);
  
//   // Determine CSS classes based on state
//   const sidebarClasses = `
//   fixed top-16 left-0 lg:left-0 
//   h-[calc(100vh-4rem)] 
//   transition-all duration-300 ease-in-out
//   bg-amber-50 shadow-lg z-40
//   ${collapsed ? 'lg:w-20' : 'lg:w-64'}
//   flex flex-col
//   overflow-y-auto 
//   ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} // Mobile fix
//   lg:translate-x-0
// `;

  
//   // For plain white background, use:
//   // bg-white bg-amber-50

//   // Handle mobile menu close
//   const handleNavLinkClick = () => {
//     if (window.innerWidth < 1024) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Backdrop for mobile */}
//       {mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
      
//       <div className={sidebarClasses}>
//         <nav className={`flex-1 overflow-y-auto px-2 py-6 ${collapsed ? 'lg:px-0' : ''}`}>
//           {menuItems.map((item) => (
//             <NavLink 
//   key={item.id}
//   to={`/${item.id}`} 
//   onClick={(e) => {
//     console.log("Navigating to:", `/${item.id}`);
//     handleNavLinkClick();  // Ensure sidebar closes properly on mobile
//   }}
//   className={({ isActive }) => `
//     flex items-center px-4 py-3 mb-2 rounded-lg transition-all 
//     ${collapsed ? 'lg:justify-center lg:px-2' : ''}
//     ${isActive ? 'bg-amber-300 text-amber-900' : 'text-amber-700 hover:bg-amber-100'}
//   `}
// >
//   {collapsed ? (
//     <div className="lg:flex lg:justify-center lg:w-full">
//       {React.cloneElement(item.icon, { className: "mr-0" })}
//     </div>
//   ) : (
//     <>
//       {item.icon}
//       <span className="font-medium ml-3">{item.label}</span>
//     </>
//   )}
// </NavLink>


//             /* <NavLink 
//               key={item.id}
//               to={`/${item.id}`}
//               onClick={handleNavLinkClick}
//               className={({ isActive }) => `
//                 flex items-center px-4 py-3 mb-2 rounded-lg
//                 ${collapsed ? 'lg:justify-center lg:px-2' : ''}
//                 ${isActive ? 'bg-gradient-to-r from-amber-200 to-amber-300 text-amber-900' : 
//                   'text-amber-700 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200'}
//                 cursor-pointer transition-colors
//               `}
//             >
//               {collapsed ? (
//                 <div className="lg:flex lg:justify-center lg:w-full">
//                   {React.cloneElement(item.icon, { 
//                     className: "mr-0", 
//                     style: { 
//                       filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1))" 
//                     } 
//                   })}
//                 </div>
//               ) : (
//                 <>
//                   {React.cloneElement(item.icon, { 
//                     style: { 
//                       filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1))" 
//                     } 
//                   })}
//                   <span className="font-medium">{item.label}</span>
//                 </>
//               )}
//             </NavLink> */
//           ))}
//         </nav>
      
//         {/* User profile section */}
//         <div className={`
//           p-4 border-t border-amber-200 w-full
//           ${collapsed ? 'lg:flex lg:justify-center lg:p-2' : ''}
//         `}>
//           {collapsed ? (
//             <div className="hidden lg:flex lg:justify-center">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center shadow-md">
//                 <span className="font-medium text-white">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center text-amber-800">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center mr-3 shadow-md">
//                 <span className="font-medium text-white">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">
//                   {userRole === "admin" ? "Admin User" : userRole === "seller" ? "Seller Account" : "Buyer Account"}
//                 </p>
//                 <p className="text-xs opacity-75 truncate">
//                   {userRole === "admin" ? "admin@retrotrade.com" : userRole === "seller" ? "seller@retrotrade.com" : 
//                    "buyer@retrotrade.com"}
//                 </p>
//               </div>
//               <LogOut 
//                 size={18} 
//                 className="ml-auto text-amber-700 cursor-pointer hover:text-amber-900 hover:bg-amber-100 p-1 rounded-full transition-colors" 
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




// import React from "react";
// import { NavLink } from "react-router-dom";
// import { 
//   Activity, Users, Package, DollarSign, Settings, LogOut,
//   Heart, ShoppingBag, MessageSquare, LayoutDashboard, BarChart3, UserCog, 
//   Store, Tag
// } from "lucide-react";

// const getMenuItems = (userRole) => {
//   const commonItems = [
//     { path: "/settings", label: "Settings", icon: <Settings size={20} className="mr-3" /> },
//   ];
  
//   const buyerItems = [
//     { path: "/shop/dashboard", label: "Dashboard", icon: <Activity size={20} className="mr-3" /> },
//     { path: "/shop/search", label: "Search Items", icon: <Package size={20} className="mr-3" /> },
//     { path: "/shop/favorites", label: "Favorites", icon: <Heart size={20} className="mr-3" /> },
//     { path: "/shop/orders", label: "My Orders", icon: <ShoppingBag size={20} className="mr-3" /> },
//     { path: "/shop/messages", label: "Messages", icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const sellerItems = [
//     { path: "/sell/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} className="mr-3" /> },
//     { path: "/sell/search", label: "Search Items", icon: <Package size={20} className="mr-3" /> },
//     { path: "/sell/products", label: "My Products", icon: <Store size={20} className="mr-3" /> },
//     { path: "/sell/sales", label: "Sales", icon: <DollarSign size={20} className="mr-3" /> },
//     { path: "/sell/messages", label: "Messages", icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const adminItems = [
//     { path: "/admin/dashboard", label: "Overview", icon: <Activity size={20} className="mr-3" /> },
//     { path: "/admin/users", label: "Users", icon: <Users size={20} className="mr-3" /> },
//     { path: "/admin/listings", label: "Listings", icon: <Package size={20} className="mr-3" /> },
//     { path: "/admin/transactions", label: "Transactions", icon: <DollarSign size={20} className="mr-3" /> },
//     { path: "/admin/reports", label: "Reports", icon: <BarChart3 size={20} className="mr-3" /> },
//   ];
  
//   switch (userRole) {
//     case "admin":
//       return [...adminItems, ...commonItems];
//     case "seller":
//       return [...sellerItems, ...commonItems];
//     case "buyer":
//     default:
//       return [...buyerItems, ...commonItems];
//   }
// };

// const Sidebar = ({ collapsed, mobileOpen, setMobileOpen, userRole }) => {
//   const roleInitial = userRole ? userRole.charAt(0).toUpperCase() : "U"; // Handle undefined safely
//   const menuItems = getMenuItems(userRole);
  
//   const sidebarClasses = `
//     fixed top-16 left-0 lg:left-0 
//     h-[calc(100vh-4rem)] 
//     transition-all duration-300 ease-in-out
//     bg-amber-50 shadow-lg z-40
//     ${collapsed ? "lg:w-20" : "lg:w-64"}
//     flex flex-col
//     overflow-y-auto 
//     ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
//     lg:translate-x-0
//   `;

//   const handleNavLinkClick = () => {
//     if (window.innerWidth < 1024) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <>
//       {mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
      
//       <div className={sidebarClasses}>
//         <nav className={`flex-1 overflow-y-auto px-2 py-6 ${collapsed ? "lg:px-0" : ""}`}>
//           {menuItems.map((item) => (
//             <NavLink 
//               key={item.path}
//               to={item.path} 
//               onClick={handleNavLinkClick}
//               className={({ isActive }) => `
//                 flex items-center px-4 py-3 mb-2 rounded-lg transition-all 
//                 ${collapsed ? "lg:justify-center lg:px-2" : ""}
//                 ${isActive ? "bg-amber-300 text-amber-900" : "text-amber-700 hover:bg-amber-100"}
//               `}
//             >
//               {collapsed ? (
//                 <div className="lg:flex lg:justify-center lg:w-full">
//                   {React.cloneElement(item.icon, { className: "mr-0" })}
//                 </div>
//               ) : (
//                 <>
//                   {item.icon}
//                   <span className="font-medium ml-3">{item.label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>
      
//         {/* User profile section */}
//         <div className={`
//           p-4 border-t border-amber-200 w-full
//           ${collapsed ? "lg:flex lg:justify-center lg:p-2" : ""}
//         `}>
//           {collapsed ? (
//             <div className="hidden lg:flex lg:justify-center">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center shadow-md">
//                 <span className="font-medium text-white">{roleInitial}</span>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center text-amber-800">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center mr-3 shadow-md">
//                 <span className="font-medium text-white">{roleInitial}</span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">
//                   {userRole ? (userRole === "admin" ? "Admin Panel" : userRole === "seller" ? "Seller Dashboard" : "Buyer Account") : "Guest"}
//                 </p>
//                 <p className="text-xs opacity-75 truncate">
//                   {userRole ? `${userRole}@retrotrade.com` : "guest@retrotrade.com"}
//                 </p>
//               </div>
//               <LogOut 
//                 size={18} 
//                 className="ml-auto text-amber-700 cursor-pointer hover:text-amber-900 hover:bg-amber-100 p-1 rounded-full transition-colors" 
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// Sidebar.defaultProps = {
//   userRole: "buyer", // Default to buyer if no role is provided
// };

// export default Sidebar;
import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  Activity, Users, Package, DollarSign, Settings, LogOut,
  Heart, ShoppingBag, MessageSquare, LayoutDashboard, BarChart3, UserCog, 
  Store, Tag
} from "lucide-react";

// const getMenuItems = (userRole) => {
//   const commonItems = [
//     { path: "/settings", label: "Settings", icon: <Settings size={20} className="mr-3" /> },
//   ];
  
//   const buyerItems = [
//     { path: "/shop/dashboard", label: "Dashboard", icon: <Activity size={20} className="mr-3" /> },
//     { path: "/shop/search", label: "Search Items", icon: <Package size={20} className="mr-3" /> },
//     { path: "/shop/favorites", label: "Favorites", icon: <Heart size={20} className="mr-3" /> },
//     { path: "/shop/orders", label: "My Orders", icon: <ShoppingBag size={20} className="mr-3" /> },
//     { path: "/shop/messages", label: "Messages", icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const sellerItems = [
//     { path: "/sell/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} className="mr-3" /> },
//     { path: "/sell/search", label: "Search Items", icon: <Package size={20} className="mr-3" /> },
//     { path: "/sell/products", label: "My Products", icon: <Store size={20} className="mr-3" /> },
//     { path: "/sell/sales", label: "Sales", icon: <DollarSign size={20} className="mr-3" /> },
//     { path: "/sell/messages", label: "Messages", icon: <MessageSquare size={20} className="mr-3" /> },
//   ];
  
//   const adminItems = [
//     { path: "/admin/dashboard", label: "Overview", icon: <Activity size={20} className="mr-3" /> },
//     { path: "/admin/users", label: "Users", icon: <Users size={20} className="mr-3" /> },
//     { path: "/admin/listings", label: "Listings", icon: <Package size={20} className="mr-3" /> },
//     { path: "/admin/transactions", label: "Transactions", icon: <DollarSign size={20} className="mr-3" /> },
//     { path: "/admin/reports", label: "Reports", icon: <BarChart3 size={20} className="mr-3" /> },
//   ];
  
//   switch (userRole) {
//     case "admin":
//       return [...adminItems, ...commonItems];
//     case "seller":
//       return [...sellerItems, ...commonItems];
//     case "buyer":
//     default:
//       return [...buyerItems, ...commonItems];
//   }
// };

const getMenuItems = (userRole) => {
  // const commonItems = [
  //   { path: "/settings", label: "Settings", icon: <Settings size={20} className="mr-3" /> },
  // ];
  
  const buyerItems = [
    { path: "/buy/dashboard", label: "Dashboard", icon: <Activity size={20} className="mr-3" /> },
    { path: "/buy/search", label: "Search Items", icon: <Package size={20} className="mr-3" /> },
    { path: "/buy/favorites", label: "Favorites", icon: <Heart size={20} className="mr-3" /> },
    { path: "/buy/orders", label: "My Orders", icon: <ShoppingBag size={20} className="mr-3" /> },
    // { path: "/buy/messages", label: "Messages", icon: <MessageSquare size={20} className="mr-3" /> },
    // { path: "/settings", label: "Settings", icon: <Settings size={20} className="mr-3" /> },
  
  ];
  
  const sellerItems = [
    { path: "/shop/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} className="mr-3" /> },
    { path: "/shop/search", label: "Search Items", icon: <Package size={20} className="mr-3" /> },
    { path: "/shop/products", label: "My Products", icon: <Store size={20} className="mr-3" /> },
    { path: "/shop/sales", label: "Sales", icon: <DollarSign size={20} className="mr-3" /> },
    // { path: "/shop/messages", label: "Messages", icon: <MessageSquare size={20} className="mr-3" /> },
  ];
  
  const adminItems = [
    { path: "/admin/dashboard", label: "Users", icon: <Activity size={20} className="mr-3" /> },
    // { path: "/admin/users", label: "Users", icon: <Users size={20} className="mr-3" /> },
    { path: "/admin/listings", label: "Listings", icon: <Package size={20} className="mr-3" /> },
    { path: "/admin/transactions", label: "Transactions", icon: <DollarSign size={20} className="mr-3" /> },
    // { path: "/admin/reports", label: "Reports", icon: <BarChart3 size={20} className="mr-3" /> },
  ];
  
  switch (userRole) {
    case "admin":
      return [...adminItems];
    case "seller":
      return [...sellerItems ];
    case "buyer":
    default:
      return [...buyerItems];
  }
};

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen, userRole = "buyer" }) => {
  const roleInitial = userRole ? userRole.charAt(0).toUpperCase() : "U";
  const menuItems = getMenuItems(userRole);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle routing based on role after component mounts
  // Handle routing based on role after component mounts
useEffect(() => {
  const pathname = location.pathname;
  
  // If user is on homepage or incorrect route, redirect to appropriate dashboard
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
  }
  
  // Check if user is accessing a route they shouldn't based on role
  const isAdminRoute = pathname.startsWith("/admin");
  const isSellerRoute = pathname.startsWith("/shop");
  const isBuyerRoute = pathname.startsWith("/buy");
  const isCommonRoute = pathname.startsWith("/settings");
  
  if (
    (userRole === "admin" && !isAdminRoute && !isCommonRoute) ||
    (userRole === "seller" && !isSellerRoute && !isCommonRoute) ||
    (userRole === "buyer" && !isBuyerRoute && !isCommonRoute)
  ) {
    // Only redirect if on an unauthorized route
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
  } console.log("Current user role:", userRole);
  console.log("Current path:", location.pathname);
}, [userRole, navigate, location.pathname]);

  // Handle click on nav item - especially for mobile
  const handleNavClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    // Add your logout logic here
    // For example: logout service call, clear local storage, etc.
    
    // Then navigate to login page
    navigate("/login");
  };

  return (
    <aside 
      className={`
        fixed top-0 left-0 z-40
        transition-all duration-300 ease-in-out
        h-screen
        backdrop-filter backdrop-blur-lg
        bg-amber-50/70 dark:bg-amber-900/30
        shadow-xl
        border-r border-amber-100/50 dark:border-amber-700/30
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* User avatar and role */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "px-6"} py-6 mb-6`}>
        <div className="flex-shrink-0">
          <div className="
            flex items-center justify-center
            w-10 h-10 rounded-full
            bg-gradient-to-br from-amber-400 to-amber-600
            text-white font-bold
            shadow-lg
            transform transition-transform hover:scale-110 hover:rotate-3
            cursor-pointer
            border-2 border-amber-200
          ">
            {roleInitial}
          </div>
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-amber-900 dark:text-amber-100 font-medium">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </p>
            <p className="text-amber-600 dark:text-amber-300 text-xs">
              {userRole === "admin" ? "Administrator" : userRole === "seller" ? "Seller Account" : "Buyer Account"}
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2">
  {menuItems.map((item) => (
    <NavLink 
      key={item.path}
      to={item.path} 
      onClick={handleNavClick}
      end={item.path.endsWith("dashboard")}
    >
      {({ isActive }) => (
        <div className={`
          flex items-center px-4 py-3 mb-3 rounded-lg
          transition-all duration-300
          ${collapsed ? "justify-center" : ""}
          ${isActive 
            ? "bg-amber-300/80 dark:bg-amber-700/70 text-amber-900 dark:text-amber-50 shadow-md transform translate-x-1" 
            : "text-amber-700 dark:text-amber-300 hover:bg-amber-100/60 dark:hover:bg-amber-800/40 hover:shadow-lg hover:translate-x-1 hover:text-amber-900 dark:hover:text-amber-100"}
          backdrop-filter backdrop-blur-sm
          bg-opacity-80
          border border-amber-200/30 dark:border-amber-700/30
          group
        `}>
          <div className={`
            transition-all duration-300
            ${!isActive && "group-hover:scale-125 group-hover:rotate-3"}
          `}>
            {item.icon}
          </div>
          {!collapsed && (
            <span className={`
              ml-3 transition-all duration-300
              ${!isActive && "group-hover:font-semibold group-hover:tracking-wide"}
            `}>
              {item.label}
            </span>
          )}
          {!collapsed && (
            <span className={`
              ml-auto 
              ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"}
              transition-all duration-300
              text-amber-500 dark:text-amber-400
            `}>
              ›
            </span>
          )}
        </div>
      )}
    </NavLink>
  ))}
</nav>

      {/* Logout Button */}
      {/* <div className="px-4 py-3 mb-4">
        <button
          onClick={handleLogout}
          className={`
            flex items-center px-4 py-3 rounded-lg
            transition-all duration-300
            ${collapsed ? "justify-center" : ""}
            text-amber-700 dark:text-amber-300 
            hover:bg-red-100/60 dark:hover:bg-red-900/40 
            hover:text-red-700 dark:hover:text-red-300
            hover:shadow-lg hover:translate-x-1
            backdrop-filter backdrop-blur-sm
            bg-opacity-80
            border border-amber-200/30 dark:border-amber-700/30
            group w-full
          `}
        >
          <div className={`
            transition-all duration-300
            group-hover:scale-125 group-hover:rotate-3
          `}>
            <LogOut size={20} className="mr-3" />
          </div>
          {!collapsed && (
            <span className={`
              ml-3 transition-all duration-300
              group-hover:font-semibold group-hover:tracking-wide
            `}>
              Logout
            </span>
          )}
        </button>
      </div> */}
      {/* <div className="mt-40 p-4 border-t border-amber-200 w-full">
    {collapsed ? (
      <div className="hidden lg:flex lg:justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center shadow-md">
          <span className="font-medium text-white">{roleInitial}</span>
        </div>
      </div>
    ) : (
      <div className="flex items-center text-amber-800 mt-45">
        <div className="w-8 h-8 rounded-full ml-4 bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center mr-3 shadow-md">
          <span className="font-medium text-white">{roleInitial}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {userRole ? (userRole === "admin" ? "Admin Panel" : userRole === "seller" ? "Seller Dashboard" : "Buyer Account") : "Guest"}
          </p>
          <p className="text-xs opacity-75 truncate">
            {userRole ? `${userRole}@retrotrade.com` : "guest@retrotrade.com"}
          </p>
        </div>
        <LogOut 
          size={20} 
          className="mr-6 text-amber-700 cursor-pointer hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors" 
        />
      </div>
    )}
  </div> */}

      {/* Collapse Toggle Button */}
      {/* <div className="px-4 py-4 mt-auto">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            flex items-center justify-center
            w-full p-2 rounded-lg
            bg-amber-100/50 dark:bg-amber-800/30
            hover:bg-amber-200/50 dark:hover:bg-amber-700/40
            text-amber-700 dark:text-amber-300
            transition-all duration-300
            border border-amber-200/30 dark:border-amber-700/30
            hover:shadow-lg hover:scale-105
            group
          "
        >
          {collapsed ? (
            <span className="transform transition-transform group-hover:scale-125 group-hover:translate-x-1">≫</span>
          ) : (
            <span className="transform transition-transform group-hover:scale-125 group-hover:translate-x-1">≪</span>
          )}
        </button>
      </div> */}
    </aside>
  );
};

export default Sidebar;