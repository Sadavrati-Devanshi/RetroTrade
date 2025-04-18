import React from 'react'

function NotFound() {
  return (
    <div>
      Oops. Page Does Not Found
    </div>
  )
}

export default NotFound


// import React, { useState, useEffect } from 'react';
// import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, User, ArrowRight } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const RetroTradePage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [fadeIn, setFadeIn] = useState(false);

//   useEffect(() => {
//     setFadeIn(true);
//   }, []);

//   const categories = [
//     { name: "Electronics", icon: "📱" },
//     { name: "Furniture", icon: "🪑" },
//     { name: "Clothing", icon: "👕" },
//     { name: "Books", icon: "📚" },
//     { name: "Home", icon: "🏠" },
//     { name: "Sports", icon: "🏈" }
//   ];

//   const featuredItems = [
//     { 
//       id: 1, 
//       title: "Vintage Camera", 
//       price: 120, 
//       condition: "Good", 
//       sellerRating: 4.8,
//       image: "/api/placeholder/300/300"
//     },
//     { 
//       id: 2, 
//       title: "Mid-Century Desk", 
//       price: 230, 
//       condition: "Like New", 
//       sellerRating: 4.9,
//       image: "/api/placeholder/300/300"
//     },
//     { 
//       id: 3, 
//       title: "Retro Gaming Console", 
//       price: 85, 
//       condition: "Fair", 
//       sellerRating: 4.5,
//       image: "/api/placeholder/300/300"
//     },
//     { 
//       id: 4, 
//       title: "Designer Jacket", 
//       price: 75, 
//       condition: "Good", 
//       sellerRating: 4.7,
//       image: "/api/placeholder/300/300"
//     }
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah J.",
//       comment: "RetroTrade helped me declutter my home and make some extra cash. The platform is super intuitive!",
//       avatar: "/api/placeholder/40/40",
//       role: "Seller"
//     },
//     {
//       id: 2,
//       name: "Michael T.",
//       comment: "I found a rare vintage camera at half the retail price. The secure payment system gave me peace of mind.",
//       avatar: "/api/placeholder/40/40",
//       role: "Buyer"
//     },
//     {
//       id: 3,
//       name: "Emma L.",
//       comment: "As someone who cares about sustainability, I love that RetroTrade promotes reuse and reduces waste.",
//       avatar: "/api/placeholder/40/40",
//       role: "Regular User"
//     }
//   ];

//   const benefits = [
//     { title: "Sustainable Shopping", description: "Reduce waste and your carbon footprint", icon: "🌱" },
//     { title: "Save Money", description: "Find quality items at a fraction of retail prices", icon: "💰" },
//     { title: "Secure Transactions", description: "Our escrow system protects both buyers and sellers", icon: "🔒" },
//     { title: "Community Trust", description: "Verified reviews and ratings for peace of mind", icon: "👥" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 text-blue-950">
//       {/* Navigation */}
//       <nav className="flex justify-between items-center py-4 px-6 lg:px-16 border-b border-blue-200 bg-white shadow-sm fixed w-full z-10">
//         <div className="flex items-center">
//           <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">RetroTrade</span>
//         </div>
        
//         <div className="hidden lg:flex items-center space-x-8">
//           <a href="#" className="text-blue-800 hover:text-blue-500 transition-colors">Home</a>
//           <a href="#" className="text-blue-800 hover:text-blue-500 transition-colors">Shop</a>
//           <a href="#" className="text-blue-800 hover:text-blue-500 transition-colors">Sell</a>
//           <a href="#" className="text-blue-800 hover:text-blue-500 transition-colors">About</a>
//           <a href="#" className="text-blue-800 hover:text-blue-500 transition-colors">Contact</a>
//         </div>
        
//         <div className="hidden lg:flex items-center space-x-4">
//           <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-500">
//             <Search size={20} />
//           </Button>
//           <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-500">
//             <Heart size={20} />
//           </Button>
//           <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-500">
//             <ShoppingBag size={20} />
//           </Button>
//           <Button variant="outline" className="border-blue-400 text-blue-600 hover:bg-blue-50">
//             <User size={18} className="mr-2" /> Log In
//           </Button>
//         </div>
        
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           className="lg:hidden text-blue-600"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </Button>
//       </nav>
      
//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 bg-white z-20 pt-16 px-6 lg:hidden">
//           <div className="flex flex-col space-y-6 mt-8">
//             <a href="#" className="text-xl py-2 border-b border-blue-100 text-blue-800">Home</a>
//             <a href="#" className="text-xl py-2 border-b border-blue-100 text-blue-800">Shop</a>
//             <a href="#" className="text-xl py-2 border-b border-blue-100 text-blue-800">Sell</a>
//             <a href="#" className="text-xl py-2 border-b border-blue-100 text-blue-800">About</a>
//             <a href="#" className="text-xl py-2 border-b border-blue-100 text-blue-800">Contact</a>
//             <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">Log In / Sign Up</Button>
//           </div>
//         </div>
//       )}
      
//       {/* Hero Section */}
//       <section className="pt-32 pb-16 px-6 md:px-16 lg:px-24 max-w-screen-xl mx-auto">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div className={`transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-transparent bg-clip-text mb-6">
//               Give Items a Second Life
//             </h1>
//             <p className="text-lg text-blue-700 mb-8">
//               Buy and sell pre-loved items on our secure marketplace. 
//               Save money, reduce waste, and join our sustainable community.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 px-8 rounded-lg text-lg">
//                 Start Shopping
//               </Button>
//               <Button variant="outline" className="border-blue-400 text-blue-600 hover:bg-blue-50 py-6 px-8 rounded-lg text-lg">
//                 Sell an Item
//               </Button>
//             </div>
//           </div>
//           <div className={`relative transition-all duration-1000 delay-300 transform ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="relative z-0 rounded-xl overflow-hidden shadow-lg">
//               <img src="/api/placeholder/600/400" alt="RetroTrade Marketplace" className="w-full h-auto rounded-xl" />
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-30"></div>
//             </div>
//             <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-lg shadow-lg z-10">
//               <div className="text-xl font-bold text-white">30K+</div>
//               <div className="text-sm text-white">Active Users</div>
//             </div>
//             <div className="absolute -top-6 -left-6 bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-lg shadow-lg z-10">
//               <div className="text-xl font-bold text-white">50K+</div>
//               <div className="text-sm text-white">Items Listed</div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Search Section */}
//       <section className="py-12 px-6 md:px-16 bg-blue-100 bg-opacity-60">
//         <div className="max-w-4xl mx-auto">
//           <div className="relative">
//             <Input 
//               type="text" 
//               placeholder="Search for vintage cameras, furniture, clothing..."
//               className="w-full py-6 pl-12 pr-4 rounded-full bg-white text-blue-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
//             <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
//               Search
//             </Button>
//           </div>
//           <div className="flex flex-wrap gap-3 mt-4 justify-center">
//             {categories.map((category, index) => (
//               <Badge key={index} variant="outline" className="bg-white hover:bg-blue-50 border-blue-200 px-4 py-2 text-sm rounded-full cursor-pointer text-blue-700 shadow-sm">
//                 {category.icon} {category.name}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Featured Products */}
//       <section className="py-16 px-6 md:px-16 max-w-screen-xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-blue-800">Featured Items</h2>
//           <Button variant="ghost" className="text-blue-600 hover:text-blue-800 flex items-center">
//             View all <ChevronRight size={16} className="ml-1" />
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {featuredItems.map((item, index) => (
//             <Card key={index} className="bg-white border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group">
//               <div className="relative">
//                 <img src={item.image} alt={item.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
//                 <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-700 px-2 py-1">{item.condition}</Badge>
//                 <Button variant="ghost" size="icon" className="absolute top-2 left-2 text-blue-600 hover:text-pink-500 bg-white bg-opacity-80 rounded-full p-1.5 shadow-sm">
//                   <Heart size={16} />
//                 </Button>
//               </div>
//               <CardContent className="p-4">
//                 <h3 className="font-semibold text-lg mb-1 text-blue-800">{item.title}</h3>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-xl font-bold text-blue-600">${item.price}</span>
//                   <div className="flex items-center text-sm text-blue-500">
//                     <span className="text-yellow-500 mr-1">★</span>
//                     {item.sellerRating}
//                   </div>
//                 </div>
//                 <Button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
//                   View Details
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>
      
//       {/* How It Works */}
//       <section className="py-16 px-6 md:px-16 bg-gradient-to-r from-blue-50 to-white">
//         <div className="max-w-screen-xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">How RetroTrade Works</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 border border-blue-100 shadow-md">
//               <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">1</div>
//               <h3 className="text-xl font-semibold mb-3 text-blue-800">Create a Listing</h3>
//               <p className="text-blue-600">Snap photos, write a description, and set your price for your pre-loved items.</p>
//             </div>
            
//             <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 border border-blue-100 shadow-md relative">
//               <div className="absolute -left-4 top-1/2 hidden md:block">
//                 <ArrowRight size={24} className="text-blue-400" />
//               </div>
//               <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">2</div>
//               <h3 className="text-xl font-semibold mb-3 text-blue-800">Connect & Negotiate</h3>
//               <p className="text-blue-600">Chat with buyers, answer questions, and finalize the price and delivery details.</p>
//             </div>
            
//             <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 border border-blue-100 shadow-md relative">
//               <div className="absolute -left-4 top-1/2 hidden md:block">
//                 <ArrowRight size={24} className="text-blue-400" />
//               </div>
//               <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">3</div>
//               <h3 className="text-xl font-semibold mb-3 text-blue-800">Secure Transaction</h3>
//               <p className="text-blue-600">Use our secure payment system with escrow protection for peace of mind.</p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Benefits Section */}
//       <section className="py-16 px-6 md:px-16 max-w-screen-xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Why Choose RetroTrade?</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {benefits.map((benefit, index) => (
//             <div 
//               key={index} 
//               className="p-6 rounded-lg border border-blue-100 bg-white hover:bg-blue-50 transition-all duration-300 shadow-md"
//             >
//               <div className="text-4xl mb-4">{benefit.icon}</div>
//               <h3 className="text-xl font-semibold mb-2 text-blue-800">{benefit.title}</h3>
//               <p className="text-blue-600">{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>
      
//       {/* Categories Section */}
//       <section className="py-16 px-6 md:px-16 bg-gradient-to-r from-blue-100 via-white to-blue-50">
//         <div className="max-w-screen-xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Explore Categories</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {categories.map((category, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-xl p-6 flex flex-col items-center text-center border border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:bg-blue-50 group shadow-sm"
//               >
//                 <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
//                 <h3 className="font-medium text-blue-700">{category.name}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* Testimonials */}
//       <section className="py-16 px-6 md:px-16 max-w-screen-xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">What Our Users Say</h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <div 
//               key={index} 
//               className="bg-white p-6 rounded-lg border border-blue-100 shadow-md"
//             >
//               <div className="mb-4 text-blue-600">
//                 <span className="text-yellow-500 text-lg">★★★★★</span>
//               </div>
//               <p className="text-blue-600 mb-4">"{testimonial.comment}"</p>
//               <div className="flex items-center">
//                 <Avatar className="mr-3">
//                   <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
//                   <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium text-blue-800">{testimonial.name}</p>
//                   <p className="text-sm text-blue-500">{testimonial.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
      
//       {/* CTA Section */}
//       <section className="py-16 px-6 md:px-16 bg-gradient-to-r from-blue-500 to-cyan-500">
//         <div className="max-w-screen-lg mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Sustainable Marketplace?</h2>
//           <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
//             Join thousands of users who are buying, selling, and making a positive impact on the environment.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button className="bg-white hover:bg-blue-50 text-blue-600 py-6 px-8 rounded-lg text-lg">
//               Sign Up Now
//             </Button>
//             <Button variant="outline" className="border-white text-white hover:bg-blue-400 hover:bg-opacity-20 py-6 px-8 rounded-lg text-lg">
//               Learn More
//             </Button>
//           </div>
//         </div>
//       </section>
      
//       {/* Footer */}
//       <footer className="bg-white py-12 px-6 md:px-16 border-t border-blue-100">
//         <div className="max-w-screen-xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4 text-blue-800">RetroTrade</h3>
//               <p className="text-blue-600 mb-4">Buy and sell pre-loved items in a secure, sustainable marketplace.</p>
//               <div className="flex space-x-4">
//                 <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
//                   </svg>
//                 </Button>
//                 <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
//                   </svg>
//                 </Button>
//                 <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
//                   </svg>
//                 </Button>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-blue-800">Quick Links</h3>
//               <ul className="space-y-2 text-blue-600">
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Shop</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Sell</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Categories</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">How It Works</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-blue-800">Help & Support</h3>
//               <ul className="space-y-2 text-blue-600">
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">FAQs</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Shipping Policy</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Return Policy</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
//               </ul>
//             </div>
            
//             <div>
//             <h3 className="text-lg font-semibold mb-4 text-blue-800">Stay Updated</h3>
//               <p className="text-blue-600 mb-4">Subscribe to our newsletter for deals and tips.</p>
//               <div className="flex">
//                 <Input 
//                   type="email" 
//                   placeholder="Enter your email" 
//                   className="rounded-l-lg border-blue-200 focus:border-blue-400 bg-white"
//                 />
//                 <Button className="rounded-l-none bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
//                   Subscribe
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//           <div className="pt-8 mt-8 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-blue-600 text-sm mb-4 md:mb-0">
//               © 2025 RetroTrade. All rights reserved.
//             </p>
//             <div className="flex space-x-4 text-sm text-blue-600">
//               <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
//               <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
//               <a href="#" className="hover:text-blue-500 transition-colors">Sitemap</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default RetroTradePage;