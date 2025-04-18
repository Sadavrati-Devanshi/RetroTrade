//   import React, { useState, useEffect } from 'react';
//   import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, User, ArrowRight, ChevronLeft, RefreshCw, SearchX } from 'lucide-react';
//   import { Button } from "@/components/ui/button";
//   import { Card, CardContent } from "@/components/ui/card";
//   import { Input } from "@/components/ui/input";
//   import { Badge } from "@/components/ui/badge";
//   import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//   import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//   import { Skeleton } from "@/components/ui/skeleton";
//   import img2 from '../../images/bg.jpg';
//   import { Link, useNavigate } from 'react-router-dom';
//   import { useDispatch, useSelector } from 'react-redux';
//   import { fetchAllProducts } from '@/store/Seller/productSlice';
  
//   const UserDashboard = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [fadeIn, setFadeIn] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const productsPerPage = 4;
//     const [activeCategory, setActiveCategory] = useState(null);
//     const [isFiltered, setIsFiltered] = useState(false);
//     const [slideDirection, setSlideDirection] = useState('right');
//     const [slideTransition, setSlideTransition] = useState(false);
    
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     // Get products from Redux store
//     const allProducts = useSelector(state => state.sellerProducts?.productList || []);
    
//     useEffect(() => {
//       setFadeIn(true);
      
//       // Fetch products from API
//       const fetchData = async () => {
//         setIsLoading(true);
//         try {
//           await dispatch(fetchAllProducts());
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
      
//       fetchData();
//     }, [dispatch]);
  
//     // Set products after they are fetched from Redux store
//     useEffect(() => {
//       if (allProducts.length > 0) {
//         setProducts(allProducts);
//         setFilteredProducts(allProducts);
//       } else {
//         setProducts(fallbackProducts);
//         setFilteredProducts(fallbackProducts);
//       }
//     }, [allProducts]);
  
//     // Fallback products in case API fails
//     const fallbackProducts = [
//       { id: 1, title: "Vintage Camera", price: 120, condition: "Good", sellerRating: 4.8, category: "Electronics", image: "/api/placeholder/300/300" },
//       { id: 2, title: "Mid-Century Desk", price: 230, condition: "Like New", sellerRating: 4.9, category: "Furniture", image: "/api/placeholder/300/300" },
//       { id: 3, title: "Retro Gaming Console", price: 85, condition: "Fair", sellerRating: 4.5, category: "Electronics", image: "/api/placeholder/300/300" },
//       { id: 4, title: "Designer Jacket", price: 75, condition: "Good", sellerRating: 4.7, category: "Clothing", image: "/api/placeholder/300/300" },
//       { id: 5, title: "Vintage Anthology", price: 45, condition: "Good", sellerRating: 4.3, category: "Books", image: "/api/placeholder/300/300" },
//       { id: 6, title: "Decorative Vase", price: 65, condition: "Like New", sellerRating: 4.6, category: "Home", image: "/api/placeholder/300/300" },
//       { id: 7, title: "Tennis Racket", price: 55, condition: "Good", sellerRating: 4.4, category: "Sports", image: "/api/placeholder/300/300" },
//       { id: 8, title: "Record Player", price: 150, condition: "Good", sellerRating: 4.9, category: "Electronics", image: "/api/placeholder/300/300" }
//     ];
  
//     // Update filtered products when search query or active category changes
//     useEffect(() => {
//       let results = [...products];
  
//       // Apply search filter
//       if (searchQuery) {
//         results = results.filter(product =>
//           product.title.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       }
  
//       // Apply category filter
//       if (activeCategory) {
//         results = results.filter(product => product.category === activeCategory);
//       }
  
//       setFilteredProducts(results);
//       setIsFiltered(searchQuery !== '' || activeCategory !== null);
  
//       // Reset to first page when filters change
//       setCurrentPage(0);
//     }, [searchQuery, activeCategory, products]);
  
//     const categories = [
//       { name: "electronics", icon: "📱" },
//       { name: "furniture", icon: "🪑" },
//       { name: "clothing", icon: "👕" },
//       { name: "books", icon: "📚" },
//       { name: "home", icon: "🏠" },
//       { name: "sports", icon: "🏈" }
//     ];
  
//     // Handle category selection
//     const handleCategorySelect = (categoryName) => {
//       setActiveCategory(prev => (prev === categoryName ? null : categoryName));
//     };
  
//     // Reset all filters
//     const resetFilters = () => {
//       setSearchQuery('');
//       setActiveCategory(null);
//       setIsFiltered(false);
//       setCurrentPage(0);
//     };
  
//     // Calculate total pages for the slider
//     const displayProducts = filteredProducts.length > 0 ? filteredProducts : fallbackProducts;
//     const totalItems = Math.min(displayProducts.length, 12); // max 12 items as requested
//     const totalPages = Math.ceil(totalItems / productsPerPage);
  
//     // Get current items for the page
//     const getCurrentItems = () => {
//       const startIndex = currentPage * productsPerPage;
//       const endIndex = Math.min(startIndex + productsPerPage, totalItems);
//       return displayProducts.slice(startIndex, endIndex);
//     };
  
//     // Pagination functions with smooth transitions
//     const nextPage = () => {
//       setSlideDirection('right');
//       setSlideTransition(true);
      
//       setTimeout(() => {
//         setCurrentPage((prev) => (prev + 1) % totalPages);
//         setSlideTransition(false);
//       }, 300);
//     };
  
//     const prevPage = () => {
//       setSlideDirection('left');
//       setSlideTransition(true);
      
//       setTimeout(() => {
//         setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
//         setSlideTransition(false);
//       }, 300);
//     };
  
    // const testimonials = [
    //   {
    //     id: 1,
    //     name: "Sarah J.",
    //     comment: "RetroTrade helped me declutter my home and make some extra cash. The platform is super intuitive!",
    //     avatar: "/api/placeholder/40/40",
    //     role: "Seller"
    //   },
    //   {
    //     id: 2,
    //     name: "Michael T.",
    //     comment: "I found a rare vintage camera at half the retail price. The secure payment system gave me peace of mind.",
    //     avatar: "/api/placeholder/40/40",
    //     role: "Buyer"
    //   },
    //   {
    //     id: 3,
    //     name: "Emma L.",
    //     comment: "As someone who cares about sustainability, I love that RetroTrade promotes reuse and reduces waste.",
    //     avatar: "/api/placeholder/40/40",
    //     role: "Regular User"
    //   }
    // ];
  
    // const benefits = [
    //   { title: "Sustainable Shopping", description: "Reduce waste and your carbon footprint", icon: "🌱" },
    //   { title: "Save Money", description: "Find quality items at a fraction of retail prices", icon: "💰" },
    //   { title: "Secure Transactions", description: "Our escrow system protects both buyers and sellers", icon: "🔒" },
    //   { title: "Community Trust", description: "Verified reviews and ratings for peace of mind", icon: "👥" }
    // ];
  
//     const ProductSkeleton = () => (
//       <Card className="bg-white border-amber-100 shadow-md overflow-hidden">
//         <Skeleton className="w-full h-48" />
//         <CardContent className="p-4">
//           <Skeleton className="h-6 w-3/4 mb-2" />
//           <div className="flex justify-between items-center mb-2">
//             <Skeleton className="h-6 w-1/4" />
//             <Skeleton className="h-4 w-1/6" />
//           </div>
//           <Skeleton className="h-9 w-full mt-2" />
//         </CardContent>
//       </Card>
//     );
  
//     // Check if any products match the applied filters
//     const noProductsFound = isFiltered && filteredProducts.length === 0;
  
//     return (
//       <div className="min-h-screen bg-white text-amber-950">
//   {/* Mobile Menu */}
//   {isMenuOpen && (
//     <div className="fixed inset-0 bg-amber-50 z-20 pt-12 px-4 lg:hidden">
//       <div className="flex flex-col space-y-4 mt-6">
//         <a href="#" className="text-xl py-1 border-b border-amber-100 text-amber-800">Home</a>
//         <Link to="/auth/register" className="text-xl py-1 border-b border-amber-100 text-amber-800">Shop</Link>
//         <Link to="/auth/register" className="text-xl py-1 border-b border-amber-100 text-amber-800">Sell</Link>
//         <Link to="/about" className="text-xl py-1 border-b border-amber-100 text-amber-800">About</Link>
//         <a href="#" className="text-xl py-1 border-b border-amber-100 text-amber-800">Contact</a>
//         <Button className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white">Log In / Sign Up</Button>
//       </div>
//     </div>
//   )}
  
//   {/* Search Section */}
//   <section className="py-8 px-4 md:px-12 bg-amber-100 bg-opacity-60">
//     <div className="max-w-4xl mx-auto">
//       <div className="relative">
//       <Input 
//               type="text" 
//               placeholder="Search for vintage items..." 
//               className="w-full pl-10 pr-4 py-2 rounded-lg border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white"
            
//         value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
//         {/* <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-5 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
//           Search
//         </Button> */}
//       </div>
//       <div className="flex flex-wrap gap-2 mt-3 justify-center">
//         {categories.map((category, index) => (
//           <Badge 
//             key={index} 
//             variant={activeCategory === category.name ? "default" : "outline"} 
//             className={`px-3 py-1 text-sm rounded-full cursor-pointer shadow-sm transition-all duration-300 
//               ${activeCategory === category.name 
//                 ? "bg-amber-500 text-white hover:bg-amber-600" 
//                 : "bg-white hover:bg-amber-50 border-amber-200 text-amber-700"}`}
//             onClick={() => handleCategorySelect(category.name)}
//           >
//             {category.icon} {category.name}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   </section>
  
//   {/* Featured Products - Updated with slider */}
//   <section className="py-10 px-4 md:px-12 max-w-screen-xl mx-auto">
//     <div className="flex justify-between items-center mb-6">
//       <h2 className="text-2xl font-bold text-amber-800">Featured Items</h2>
      
//       {/* Reset filters button or pagination controls */}
//       {isFiltered ? (
//         <Button 
//           variant="outline" 
//           className="flex items-center gap-2 rounded-full text-amber-600 hover:text-amber-800 hover:bg-amber-50 border-amber-300 transition-all duration-300"
//           onClick={resetFilters}
//         >
//           <RefreshCw size={16} className="mr-1" /> Reset Filters
//         </Button>
//       ) : (
//         <></>
//       )}
//     </div>
    
//     {noProductsFound ? (
//       <div className="text-center py-12">
//         <div className="mb-3 text-amber-400">
//           <SearchX size={48} className="mx-auto" />
//         </div>
//         <h3 className="text-xl font-medium text-amber-800 mb-2">No matching products found</h3>
//         <p className="text-amber-600 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
//         <Button
//           variant="outline"
//           className="text-amber-600 border-amber-300"
//           onClick={resetFilters}
//         >
//           <RefreshCw size={16} className="mr-2" /> Reset Filters
//         </Button>
//       </div>
//     ) : (
//       <div className="relative">
//         {/* Left arrow - positioned in middle of left side */}
//         <Button 
//           variant="outline" 
//           size="icon"
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full text-amber-600 hover:text-amber-800 shadow-md"
//           onClick={prevPage}
//           disabled={totalPages <= 1}
//         >
//           <ChevronLeft size={24} />
//         </Button>
        
//         {/* Right arrow - positioned in middle of right side */}
//         <Button 
//           variant="outline" 
//           size="icon"
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full text-amber-600 hover:text-amber-800 shadow-md"
//           onClick={nextPage}
//           disabled={totalPages <= 1}
//         >
//           <ChevronRight size={24} />
//         </Button>
        
//         {/* Product grid with smooth transitions */}
//         <div 
//           className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ease-in-out transform
//             ${slideTransition ? (slideDirection === 'right' ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0') : 'translate-x-0 opacity-100'}`}
//         >
//           {isLoading ? (
//             // Show skeletons while loading
//             Array(4).fill(0).map((_, index) => (
//               <ProductSkeleton key={index} />
//             ))
//           ) : (
//             // Show actual products
//             getCurrentItems().map((item, index) => (
//               <Card key={item.id || index} className="bg-white border-amber-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group">
//                 <div className="relative">
//                   <img 
//                     src={item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : item.image || '/api/placeholder/400/320'} 
//                     alt={item.title} 
//                     className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" 
//                   />
//                   <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-700 px-2 py-1">{item.condition}</Badge>
//                 </div>
//                 <CardContent className="p-3">
//                   <h3 className="font-semibold text-lg mb-1 text-amber-800 truncate overflow-hidden text-ellipsis">{item.title}</h3>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xl font-bold text-amber-600">${item.price}</span>
//                     <div className="flex items-center text-sm text-amber-500">
//                       <span className="text-yellow-500 mr-1">★</span>
//                       {item.sellerRating}
//                     </div>
//                   </div>
//                   <Button className="w-full mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     )}
    
//     {/* Login to view more button - when we have 12+ products */}
//     {displayProducts.length > 12 && (
//       <div className="mt-6 text-center">
//         <Button 
//           className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 px-6 rounded-lg text-lg"
//           onClick={() => navigate("/auth/login")}
//         >
//           Login to View All Products
//         </Button>
//       </div>
//     )}
//   </section>

//   {/* Hero Section */}
//   <section className="pt-10 pb-10 px-4 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
//     <div className="grid md:grid-cols-2 gap-6 items-center">
//       <div className={`transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
//         <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 text-transparent bg-clip-text mb-4">
//           Give Items a Second Life
//         </h1>
//         <p className="text-lg text-amber-700 mb-6">
//           Buy and sell pre-loved items on our secure marketplace. 
//           Save money, reduce waste, and join our sustainable community.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-6 rounded-lg text-lg">
//             Start Shopping
//           </Button>
//           <Button variant="outline" className="border-amber-400 text-amber-600 hover:bg-amber-50 py-4 px-6 rounded-lg text-lg">
//             Sell an Item
//           </Button>
//         </div>
//       </div>
//       <div className={`relative transition-all duration-1000 delay-300 transform ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//         <div className="relative z-0 rounded-xl overflow-hidden shadow-lg">
//           <img src={img2} alt="RetroTrade Marketplace" className="w-full h-auto rounded-xl" />
//           <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-transparent opacity-30"></div>
//         </div>
//         <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg shadow-lg z-10">
//           <div className="text-lg font-bold text-white">30K+</div>
//           <div className="text-xs text-white">Active Users</div>
//         </div>
//         <div className="absolute -top-4 -left-4 bg-gradient-to-br from-amber-600 to-amber-500 p-3 rounded-lg shadow-lg z-10">
//           <div className="text-lg font-bold text-white">50K+</div>
//           <div className="text-xs text-white">Items Listed</div>
//         </div>
//       </div>
//     </div>
//   </section>
  
//  {/* Categories Section */}
//  <section className="py-10 px-4 md:px-12 bg-gradient-to-r from-amber-100 via-white to-amber-50">
//     <div className="max-w-screen-xl mx-auto">
//       <h2 className="text-2xl font-bold text-center text-amber-800 mb-8">Explore Categories</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//         {categories.map((category, index) => (
//           <div 
//             key={index} 
//             className="bg-white rounded-xl p-4 flex flex-col items-center text-center border border-amber-100 hover:border-amber-300 transition-all duration-300 cursor-pointer hover:bg-amber-50 group shadow-sm"
//           >
//             <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
//             <h3 className="font-medium text-amber-700">{category.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>

  // {/* How It Works */}
  // <section className="py-10 px-4 md:px-12 bg-gradient-to-r from-amber-50 to-white">
  //   <div className="max-w-screen-xl mx-auto">
  //     <h2 className="text-2xl font-bold text-center text-amber-800 mb-8">How RetroTrade Works</h2>
  //     <div className="grid md:grid-cols-3 gap-6">
  //       <div className="flex flex-col items-center text-center bg-white rounded-lg p-4 border border-amber-100 shadow-md">
  //         <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold">1</div>
  //         <h3 className="text-lg font-semibold mb-2 text-amber-800">Create a Listing</h3>
  //         <p className="text-amber-600">Snap photos, write a description, and set your price for your pre-loved items.</p>
  //       </div>
        
  //       <div className="flex flex-col items-center text-center bg-white rounded-lg p-4 border border-amber-100 shadow-md relative">
  //         <div className="absolute -left-4 top-1/2 hidden md:block">
  //           <ArrowRight size={20} className="text-amber-400" />
  //         </div>
  //         <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold">2</div>
  //         <h3 className="text-lg font-semibold mb-2 text-amber-800">Connect & Negotiate</h3>
  //         <p className="text-amber-600">Chat with buyers, answer questions, and finalize the price and delivery details.</p>
  //       </div>
        
  //       <div className="flex flex-col items-center text-center bg-white rounded-lg p-4 border border-amber-100 shadow-md relative">
  //         <div className="absolute -left-4 top-1/2 hidden md:block">
  //           <ArrowRight size={20} className="text-amber-400" />
  //         </div>
  //         <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold">3</div>
  //         <h3 className="text-lg font-semibold mb-2 text-amber-800">Secure Transaction</h3>
  //         <p className="text-amber-600">Use our secure payment system with escrow protection for peace of mind.</p>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  
  // {/* Benefits Section */}
  // <section className="py-10 px-4 md:px-12 max-w-screen-xl mx-auto">
  //   <h2 className="text-2xl font-bold text-center text-amber-800 mb-8">Why Choose RetroTrade?</h2>
  //   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
  //     {benefits.map((benefit, index) => (
  //       <div 
  //         key={index} 
  //         className="p-4 rounded-lg border border-amber-100 bg-white hover:bg-amber-50 transition-all duration-300 shadow-md"
  //       >
  //         <div className="text-3xl mb-3">{benefit.icon}</div>
  //         <h3 className="text-lg font-semibold mb-2 text-amber-800">{benefit.title}</h3>
  //         <p className="text-amber-600">{benefit.description}</p>
  //       </div>
  //     ))}
  //   </div>
  // </section>
  
 
  
  // {/* Testimonials */}
  // <section className="py-10 px-4 md:px-12 max-w-screen-xl mx-auto">
  //   <h2 className="text-2xl font-bold text-center text-amber-800 mb-8">What Our Users Say</h2>
  //   <div className="grid md:grid-cols-3 gap-4">
  //     {testimonials.map((testimonial, index) => (
  //       <div 
  //         key={index} 
  //         className="bg-white p-4 rounded-lg border border-amber-100 shadow-md"
  //       >
  //         <div className="mb-3 text-amber-600">
  //           <span className="text-yellow-500 text-lg">★★★★★</span>
  //         </div>
  //         <p className="text-amber-600 mb-3">"{testimonial.comment}"</p>
  //         <div className="flex items-center">
  //           <Avatar className="mr-2">
  //             <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
  //             <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
  //           </Avatar>
  //           <div>
  //             <p className="font-medium text-amber-800">{testimonial.name}</p>
  //             <p className="text-sm text-amber-500">{testimonial.role}</p>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // </section>
  
//   {/* Footer */}
  // <footer className="bg-white py-8 px-4 md:px-12 border-t border-amber-100">
  //   <div className="max-w-screen-xl mx-auto">
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  //       <div>
  //         <h3 className="text-lg font-bold mb-3 text-amber-800">RetroTrade</h3>
  //         <p className="text-amber-600 mb-3">Buy and sell pre-loved items in a secure, sustainable marketplace.</p>
  //         <div className="flex space-x-3">
  //           <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-700">
  //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
  //               <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
  //             </svg>
  //           </Button>
  //           <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-700">
  //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
  //               <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
  //             </svg>
  //           </Button>
  //           <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-700">
  //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
  //               <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
  //             </svg>
  //           </Button>
  //         </div>
  //       </div>
        
  //       <div>
  //         <h3 className="text-base font-semibold mb-3 text-amber-800">Quick Links</h3>
  //         <ul className="space-y-1 text-amber-600">
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Home</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Shop</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Sell</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Categories</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">How It Works</a></li>
  //         </ul>
  //       </div>
        
  //       <div>
  //         <h3 className="text-base font-semibold mb-3 text-amber-800">Help & Support</h3>
  //         <ul className="space-y-1 text-amber-600">
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">FAQs</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping Policy</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Return Policy</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
  //           <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
  //         </ul>
  //       </div>
        
  //       <div>
  //         <h3 className="text-base font-semibold mb-3 text-amber-800">Stay Updated</h3>
  //         <p className="text-amber-600 mb-3">Subscribe to receive updates on new items and promotions.</p>
  //         <div className="flex">
  //           <Input 
  //             type="email" 
  //             placeholder="Your email" 
  //             className="rounded-l-lg focus:ring-amber-400 border-amber-200"
  //           />
  //           <Button className="rounded-r-lg bg-amber-500 hover:bg-amber-600 text-white">
  //             Subscribe
  //           </Button>
  //         </div>
  //         <p className="text-xs text-amber-400 mt-1">We respect your privacy and won't share your information.</p>
  //       </div>
  //     </div>
      
  //     <div className="pt-6 mt-6 border-t border-amber-100 text-center text-amber-500 text-sm">
  //       <p>&copy; {new Date().getFullYear()} RetroTrade. All rights reserved.</p>
  //     </div>
  //   </div>
  // </footer>
// </div>
//     );
//   };
  
//   export default UserDashboard;
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, User, ArrowRight, ChevronLeft, RefreshCw, SearchX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import img2 from '../../images/bg.jpg';
import ProductDetailsDialogController from './ProductDetailsDialogController';

const UserDashboardUi = (props) => {
  const {
    isMenuOpen,
    searchQuery,
    fadeIn,
    currentPage,
    isLoading,
    isFiltered,
    slideDirection,
    slideTransition,
    noProductsFound,
    displayProducts,
    getCurrentItems,
    productCategories,
    categories,
    benefits,
    testimonials,
    totalPages,
    setIsMenuOpen,
    toggleMenu,
    handleSearchChange,
    resetFilters,
    nextPage,
    prevPage,
    navigate,
    onWishlistToggle
  } = props;
  

  const { 
    onViewDetails, 
    ProductDetailsDialogComponent 
  } = ProductDetailsDialogController();


  const ProductSkeleton = () => (
    <Card className="bg-white border-amber-100 shadow-md overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <Skeleton className="h-9 w-full mt-2" />
      </CardContent>
    </Card>
  );

  const ProductCard = ({ product }) => (
  <Card className="bg-white border-amber-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group">
      <div className="relative">
        {/* Wishlist button - stays at top right */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-amber-700 shadow-md z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onWishlistToggle(product.id || product._id || "");
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
        
        {/* Condition badge - moved to top left */}
        <Badge className="absolute top-2 left-2 bg-amber-100 text-amber-700 px-2 py-1 z-10">
          {product.condition}
        </Badge>
        
        <img 
          src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : product.image || '/placeholder.svg'} 
          alt={product.title} 
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-lg mb-1 text-amber-800 truncate overflow-hidden text-ellipsis">
          {product.title}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold text-amber-600">${product.price}</span>
          <div className="flex items-center text-sm text-amber-500">
            <span className="text-yellow-500 mr-1">★</span>
            {product.sellerRating || '4.5'}
          </div>
        </div>
        <Button 
        className="w-full mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
        onClick={() => onViewDetails(product)}
      >
        View Details
      </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white text-amber-950">
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-amber-50 z-20 pt-12 px-4 lg:hidden">
          <div className="flex flex-col space-y-4 mt-6">
            <a href="#" className="text-xl py-1 border-b border-amber-100 text-amber-800">Home</a>
            <Link to="/auth/register" className="text-xl py-1 border-b border-amber-100 text-amber-800">Shop</Link>
            <Link to="/auth/register" className="text-xl py-1 border-b border-amber-100 text-amber-800">Sell</Link>
            <Link to="/about" className="text-xl py-1 border-b border-amber-100 text-amber-800">About</Link>
            <a href="#" className="text-xl py-1 border-b border-amber-100 text-amber-800">Contact</a>
            <Button className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white">Log In / Sign Up</Button>
          </div>
        </div>
      )}
      
      {/* Search Section */}
      <section className="py-8 px-4 md:px-12 bg-amber-100 bg-opacity-60">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search for vintage items..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
          </div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="px-3 py-1 text-sm rounded-full cursor-pointer shadow-sm transition-all duration-300 bg-white hover:bg-amber-50 border-amber-200 text-amber-700"
              >
                {category.icon} {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products - Updated with slider */}
      <section className="py-10 px-4 md:px-12 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-800">Featured Items</h2>
          
          {/* Reset filters button or pagination controls */}
          {isFiltered ? (
            <Button 
              variant="outline" 
              className="flex items-center gap-2 rounded-full text-amber-600 hover:text-amber-800 hover:bg-amber-50 border-amber-300 transition-all duration-300"
              onClick={resetFilters}
            >
              <RefreshCw size={16} className="mr-1" /> Reset Filters
            </Button>
          ) : (
            <></>
          )}
        </div>
        
        {noProductsFound ? (
          <div className="text-center py-12">
            <div className="mb-3 text-amber-400">
              <SearchX size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-amber-800 mb-2">No matching products found</h3>
            <p className="text-amber-600 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <Button
              variant="outline"
              className="text-amber-600 border-amber-300"
              onClick={resetFilters}
            >
              <RefreshCw size={16} className="mr-2" /> Reset Filters
            </Button>
          </div>
        ) : (
          <div className="relative">
            {/* Left arrow - positioned in middle of left side */}
            <Button 
              variant="outline" 
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full text-amber-600 hover:text-amber-800 shadow-md"
              onClick={prevPage}
              disabled={totalPages <= 1}
            >
              <ChevronLeft size={24} />
            </Button>
            
            {/* Right arrow - positioned in middle of right side */}
            <Button 
              variant="outline" 
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full text-amber-600 hover:text-amber-800 shadow-md"
              onClick={nextPage}
              disabled={totalPages <= 1}
            >
              <ChevronRight size={24} />
            </Button>
            
            {/* Product grid with smooth transitions */}
            <div 
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ease-in-out transform
                ${slideTransition ? (slideDirection === 'right' ? 'translate-x-4 opacity-0' : '-translate-x-4 opacity-0') : 'translate-x-0 opacity-100'}`}
            >
              {isLoading ? (
                // Show skeletons while loading
                Array(4).fill(0).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              ) : (
                // Show actual products
                getCurrentItems().map((item, index) => (
                  <ProductCard key={item.id || item._id || index} product={item} />
                ))
              )}
            </div>
          </div>
        )}
        
        {/* Login to view more button - when we have 12+ products */}
        {displayProducts.length > 12 && (
          <div className="mt-6 text-center">
            <Button 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 px-6 rounded-lg text-lg"
              onClick={() => navigate("/auth/login")}
            >
              Login to View All Products
            </Button>
          </div>
        )}
      </section>

      {/* Shop By Category Section */}
      <section className="container mx-auto px-4 md:px-12 py-12">
        <div className="text-center mb-10 animate-blur-in">
          <h2 className="text-3xl font-bold text-amber-900 mb-2">Shop By Category</h2>
          <p className="text-amber-600 max-w-xl mx-auto">Discover our curated collection across various categories</p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="bg-amber-50/60 border border-amber-200/30 p-1 rounded-lg">
              <TabsTrigger 
                value="all" 
                className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-white rounded-md"
              >
                All Products
              </TabsTrigger>
              {productCategories.map(([category]) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-white rounded-md"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* All Products Tab */}
          <TabsContent value="all" className="space-y-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              </div>
            ) : (
              productCategories.map(([category, products]) => (
                <div key={category} className="animate-slide-up">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-amber-800 flex items-center">
                      <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-amber-400 to-amber-500 rounded-full mr-2"></span>
                      {category}
                    </h3>
                    <Button 
                      variant="ghost" 
                      className="text-amber-600 hover:text-amber-800"
                      onClick={() => document.querySelector(`[value="${category}"]`).click()}
                    >
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product) => (
                      <ProductCard key={product._id || product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          {/* Category Tabs */}
          {productCategories.map(([category, products]) => (
            <TabsContent key={category} value={category} className="animate-slide-up">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array(4).fill(0).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id || product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Hero Section */}
      <section className="pt-10 pb-10 px-4 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className={`transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 text-transparent bg-clip-text mb-4">
              Give Items a Second Life
            </h1>
            <p className="text-lg text-amber-700 mb-6">
              Buy and sell pre-loved items on our secure marketplace. 
              Save money, reduce waste, and join our sustainable community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-6 rounded-lg text-lg">
                Start Shopping
              </Button>
              <Button variant="outline" className="border-amber-400 text-amber-600 hover:bg-amber-50 py-4 px-6 rounded-lg text-lg">
                Sell an Item
              </Button>
            </div>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 transform ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative z-0 rounded-xl overflow-hidden shadow-lg">
              <img src={img2} alt="RetroTrade Marketplace" className="w-full h-auto rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-transparent opacity-30"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg shadow-lg z-10">
              <div className="text-lg font-bold text-white">30K+</div>
              <div className="text-xs text-white">Active Users</div>
            </div>
            <div className="absolute -top-4 -left-4 bg-gradient-to-br from-amber-600 to-amber-500 p-3 rounded-lg shadow-lg z-10">
              <div className="text-lg font-bold text-white">50K+</div>
              <div className="text-xs text-white">Items Listed</div>
            </div>
          </div>
        </div>
      </section>
        
      {/* How It Works */}
      <section className="py-10 px-4 md:px-12 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-amber-800 mb-8">How RetroTrade Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center bg-white rounded-lg p-4 border border-amber-100 shadow-md">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2 text-amber-800">Create a Listing</h3>
              <p className="text-amber-600">Snap photos, write a description, and set your price for your pre-loved items.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white rounded-lg p-4 border border-amber-100 shadow-md relative">
              <div className="absolute -left-4 top-1/2 hidden md:block">
                <ArrowRight size={20} className="text-amber-400" />
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2 text-amber-800">Connect & Negotiate</h3>
              <p className="text-amber-600">Chat with buyers, answer questions, and finalize the price and delivery details.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white rounded-lg p-4 border border-amber-100 shadow-md relative">
              <div className="absolute -left-4 top-1/2 hidden md:block">
                <ArrowRight size={20} className="text-amber-400" />
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2 text-amber-800">Secure Transaction</h3>
              <p className="text-amber-600">Use our secure payment system with escrow protection for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-10 px-4 md:px-12 max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-amber-800 mb-8">Why Choose RetroTrade?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg border border-amber-100 bg-white hover:bg-amber-50 transition-all duration-300 shadow-md"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-amber-800">{benefit.title}</h3>
              <p className="text-amber-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
 
  
  {/* Testimonials */}
  <section className="py-10 px-4 md:px-12 max-w-screen-xl mx-auto">
    <h2 className="text-2xl font-bold text-center text-amber-800 mb-8">What Our Users Say</h2>
    <div className="grid md:grid-cols-3 gap-4">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg border border-amber-100 shadow-md"
        >
          <div className="mb-3 text-amber-600">
            <span className="text-yellow-500 text-lg">★★★★★</span>
          </div>
          <p className="text-amber-600 mb-3">"{testimonial.comment}"</p>
          <div className="flex items-center">
            <Avatar className="mr-2">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-amber-800">{testimonial.name}</p>
              <p className="text-sm text-amber-500">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  <footer className=" py-8 px-4 md:px-12 border-t border-amber-100 bg-amber-50">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-amber-800">RetroTrade</h3>
          <p className="text-amber-600 mb-3">Buy and sell pre-loved items in a secure, sustainable marketplace.</p>
          {/* <div className="flex space-x-3">
            <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </Button>
          </div> */}
        </div>
        
        <div>
          <h3 className="text-base font-semibold mb-3 text-amber-800">Quick Links</h3>
          <ul className="space-y-1 text-amber-600">
            <li><a href="#" className="hover:text-amber-500 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Sell</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Categories</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">How It Works</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-base font-semibold mb-3 text-amber-800">Help & Support</h3>
          <ul className="space-y-1 text-amber-600">
            <li><a href="#" className="hover:text-amber-500 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-base font-semibold mb-3 text-amber-800">Stay Updated</h3>
          <p className="text-amber-600 mb-3">Subscribe to receive updates on new items and promotions.</p>
          <div className="flex">
            <Input 
              type="email" 
              placeholder="Your email" 
              className="rounded-l-lg focus:ring-amber-400 border-amber-200"
            />
            <Button className="rounded-r-lg bg-amber-500 hover:bg-amber-600 text-white">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-amber-400 mt-1">We respect your privacy and won't share your information.</p>
        </div>
      </div>
      
      <div className="pt-6 mt-6 border-t border-amber-100 text-center text-amber-500 text-sm">
        <p>&copy; {new Date().getFullYear()} RetroTrade. All rights reserved.</p>
      </div>
    </div>
  </footer>
  {ProductDetailsDialogComponent}
    </div>
  );
};

export default UserDashboardUi;