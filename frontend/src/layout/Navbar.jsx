// // Navbar.jsx
// import React from "react";
// import { Menu, X, Bell, ShoppingCart, Search, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const Navbar = ({ toggleSidebar, sidebarCollapsed, toggleMobileMenu, userRole }) => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 shadow-md z-50 px-4 lg:px-6">
//       <div className="flex items-center justify-between h-full">
//         {/* Left section: Menu toggle + Logo */}
//         <div className="flex items-center">
//           {/* Menu toggle for mobile */}
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             onClick={toggleMobileMenu}
//             className="lg:hidden mr-2 text-amber-800 hover:text-amber-950 hover:bg-amber-100"
//           >
//             <Menu size={24} />
//           </Button>
          
//           {/* Menu toggle for desktop */}
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             onClick={toggleSidebar}
//             className="hidden lg:flex mr-2 text-amber-800 hover:text-amber-950 hover:bg-amber-100"
//           >
//             {sidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
//           </Button>
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <span className="text-xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
//               Retro Trade
//             </span>
//           </Link>
//         </div>
        
//         {/* Center section: Search (hidden on small screens) */}
//         <div className="hidden md:flex flex-1 max-w-md mx-6">
//           <div className="relative w-full">
//             <Input 
//               type="text" 
//               placeholder="Search for vintage items..." 
//               className="w-full pl-10 pr-4 py-2 rounded-lg border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
//           </div>
//         </div>
        
//         {/* Right section: Actions */}
//         <div className="flex items-center space-x-1 md:space-x-3">
//           {/* Search toggle for mobile */}
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             className="md:hidden text-amber-800 hover:text-amber-950 hover:bg-amber-100"
//           >
//             <Search size={20} />
//           </Button>
          
//           {/* Notifications */}
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             className="text-amber-800 hover:text-amber-950 hover:bg-amber-100 relative"
//           >
//             <Bell size={20} />
//             <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
//           </Button>
          
//           {/* Cart - show for buyers */}
//           {(userRole === "buyer" || userRole === "admin") && (
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="text-amber-800 hover:text-amber-950 hover:bg-amber-100 relative"
//             >
//               <ShoppingCart size={20} />
//               <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">
//                 2
//               </span>
//             </Button>
//           )}
          
//           {/* User Menu */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="text-amber-800 hover:text-amber-950 hover:bg-amber-100 flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center mr-2">
//                   <span className="font-medium">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
//                 </div>
//                 <span className="hidden md:inline mr-1">
//                   {userRole === "admin" ? "Admin" : userRole === "seller" ? "Seller" : "User"}
//                 </span>
//                 <ChevronDown size={16} />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
//               <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
//               <DropdownMenuItem className="cursor-pointer text-red-500">Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// Navbar.jsx
import React from "react";
import { Menu, X, Bell, ShoppingCart, Search, ChevronDown, Heart, ListCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";

const Navbar = ({ toggleSidebar, sidebarCollapsed, toggleMobileMenu, userRole }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function handleLogout() {
    
    dispatch(logoutUser());
  }
  function gotoProfile(){
    const path =
    userRole === "buyer"
      ? "/buy/edituser"
      : userRole === "seller"
      ? "/shop/edituser"
      : userRole === "admin"
      ? "/admin/edituser"
      : "/";

  navigate(path);
  console.log(path)
  console.log(userRole, )
  }
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-amber-50 text-amber-900 shadow-md z-50 px-4 lg:px-6 border-b border-amber-100">
      {/* For 1% shade of beige, use: bg-amber-50 */}
      {/* For plain white background, use: bg-white */}
      
      <div className="flex items-center justify-between h-full">
        {/* Left section: Menu toggle + Logo */}
        <div className="flex items-center">
          {/* Menu toggle for mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="lg:hidden mr-2 text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200"
          >
            <Menu size={24} />
          </Button>
          
          {/* Menu toggle for desktop
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="hidden lg:flex mr-2 text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200"
          >
            {sidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
          </Button> */}
          {userRole !== "buyer" && (
  <Button 
    variant="ghost" 
    size="icon" 
    onClick={toggleSidebar}
    className="hidden lg:flex mr-2 text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200"
  >
    {sidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
  </Button>
)}

          
          {/* Logo */}
          {userRole === "buyer" ? ( 
  <Link to="/buy/dashboard" className="flex items-center">
    <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
      Retro Trade
    </span>
  </Link>
) : (
  <Link to="/" className="flex items-center">
    <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
      Retro Trade
    </span>
  </Link>
)}
        </div>
        
        {/* Center section: Search (hidden on small screens) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          {/* <div className="relative w-full">
            <Input 
              type="text" 
              placeholder="Search for vintage items..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
          </div> */}
        </div>
        
        {/* Right section: Actions */}
        <div className="flex items-center space-x-1 md:space-x-3">
          {/* Search toggle for mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200"
          >
            <Search size={20} />
          </Button>
          
          {/* Notifications */}
          {/* <Button 
            variant="ghost" 
            size="icon" 
            className="text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200 relative"
          >
            <Bell size={20} className="mr-4"/>
            <span className="absolute top-1 mr-2 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button> */}
          
          {/* Cart - show for buyers */}
          {/* {(userRole === "buyer" || userRole === "admin") && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200 relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs flex items-center justify-center shadow-sm">
                2
              </span>
            </Button>
          )} */}
          {/* <Heart   size={20} 
  className="mr-4 cursor-pointer hover:text-red-500 transition-colors" 
  onClick={() => {
    // Your logic here
    console.log("Heart clicked!");
  }} 
/>  */}

{userRole === "buyer" && (
  <>
        <Heart 
          size={20}
          className="mr-4 cursor-pointer hover:text-red-500 transition-colors"
            // Your logic here
            onClick={() => navigate("/buy/wishlist")}
        
        />
        <ListCheck 
          size={20}
          className="mr-4 cursor-pointer hover:text-red-500 transition-colors"
            // Your logic here
            onClick={() => navigate("/buy/bought")}
        
        />

        </>
      )}

      

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-200 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center mr-2 shadow-sm">
                  <span className="font-medium text-white">{userRole === "admin" ? "A" : userRole === "seller" ? "S" : "B"}</span>
                </div>
                <span className="hidden md:inline mr-1">
                  {userRole === "admin" ? "Admin" : userRole === "seller" ? "Seller" : "User"}
                </span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-amber-500">
              <DropdownMenuItem className="cursor-pointer hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-500" onClick={gotoProfile}>Profile</DropdownMenuItem>
              {/* <DropdownMenuItem className="cursor-pointer hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100">Settings</DropdownMenuItem> */}
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-500" onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;