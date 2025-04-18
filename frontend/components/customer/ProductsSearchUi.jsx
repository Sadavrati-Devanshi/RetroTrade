// import React, { useState } from 'react';
// import { Search, Filter, Grid3x3, List, MapPin, Star } from 'lucide-react';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Slider } from '@/components/ui/slider';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// const ProductSearch = () => {
//   const [viewMode, setViewMode] = useState('grid');
  
//   // Mock product data
//   const products = [
//     {
//       id: 1,
//       title: 'Vintage Record Player',
//       category: 'Electronics',
//       price: 120,
//       condition: 'Good',
//       location: 'New York',
//       sellerRating: 4.8,
//       imageUrl: '/api/placeholder/300/200',
//       description: 'Fully functional vintage record player from the 1970s. Minor scratches but works perfectly.'
//     },
//     {
//       id: 2,
//       title: 'Leather Jacket',
//       category: 'Clothing',
//       price: 85,
//       condition: 'Like New',
//       location: 'Los Angeles',
//       sellerRating: 4.5,
//       imageUrl: '/api/placeholder/300/200',
//       description: 'Genuine leather jacket, worn only a few times. Size L, black color.'
//     },
//     {
//       id: 3,
//       title: 'Antique Coffee Table',
//       category: 'Furniture',
//       price: 150,
//       condition: 'Used',
//       location: 'Chicago',
//       sellerRating: 4.2,
//       imageUrl: '/api/placeholder/300/200',
//       description: 'Solid wood coffee table with intricate carvings. Some wear but sturdy construction.'
//     },
//     {
//       id: 4,
//       title: 'Mountain Bike',
//       category: 'Sports',
//       price: 210,
//       condition: 'Good',
//       location: 'Denver',
//       sellerRating: 4.9,
//       imageUrl: '/api/placeholder/300/200',
//       description: 'Trek mountain bike, 21-speed. Recently serviced with new brakes and tires.'
//     },
//     {
//       id: 5,
//       title: 'Classic Novel Collection',
//       category: 'Books',
//       price: 45,
//       condition: 'Good',
//       location: 'Boston',
//       sellerRating: 4.7,
//       imageUrl: '/api/placeholder/300/200',
//       description: 'Collection of 12 classic novels including works by Dickens, Austen, and Hemingway.'
//     },
//     {
//       id: 6,
//       title: 'Vintage Camera',
//       category: 'Electronics',
//       price: 95,
//       condition: 'Used',
//       location: 'Seattle',
//       sellerRating: 4.4,
//       imageUrl: '/api/placeholder/300/200',
//       description: 'Kodak camera from the 1980s. Fully operational with original carrying case.'
//     }
//   ];
  
//   // Condition badges with color mapping
//   const conditionColors = {
//     'New': 'bg-green-100 text-green-800 border-green-200',
//     'Like New': 'bg-emerald-100 text-emerald-800 border-emerald-200',
//     'Good': 'bg-blue-100 text-blue-800 border-blue-200',
//     'Used': 'bg-amber-100 text-amber-800 border-amber-200',
//     'Heavily Used': 'bg-orange-100 text-orange-800 border-orange-200'
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Header with gradient */}
//       <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 border-b">
//         <h1 className="text-3xl font-bold text-amber-900">RetroTrade Marketplace</h1>
//         <p className="text-amber-700">Find pre-loved treasures at great prices</p>
//       </div>
      
//       {/* Search and filter section */}
//       <div className="p-6 bg-white border-b">
//         <div className="flex flex-col md:flex-row gap-4 justify-between">
//           <div className="relative flex-grow max-w-2xl">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input 
//               placeholder="Search for items..." 
//               className="pl-10 border-amber-200 focus:border-amber-400 rounded-none" 
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" className="bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 rounded-none">
//               <Filter className="mr-2 h-4 w-4" /> Filter
//             </Button>
//             <Tabs defaultValue="grid" className="border rounded-none border-amber-200">
//               <TabsList className="bg-amber-50 rounded-none">
//                 <TabsTrigger 
//                   value="grid" 
//                   onClick={() => setViewMode('grid')}
//                   className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900 rounded-none"
//                 >
//                   <Grid3x3 className="h-4 w-4" />
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="list" 
//                   onClick={() => setViewMode('list')}
//                   className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900 rounded-none"
//                 >
//                   <List className="h-4 w-4" />
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>
        
//         {/* Filter options */}
//         <div className="mt-4 p-4 border border-amber-100 bg-amber-50">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="text-sm font-medium text-amber-900 block mb-2">Category</label>
//               <select className="w-full border border-amber-200 p-2 bg-white rounded-none">
//                 <option>All Categories</option>
//                 <option>Electronics</option>
//                 <option>Furniture</option>
//                 <option>Clothing</option>
//                 <option>Books</option>
//                 <option>Sports</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-amber-900 block mb-2">Condition</label>
//               <select className="w-full border border-amber-200 p-2 bg-white rounded-none">
//                 <option>Any Condition</option>
//                 <option>New</option>
//                 <option>Like New</option>
//                 <option>Good</option>
//                 <option>Used</option>
//                 <option>Heavily Used</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-amber-900 block mb-2">Location</label>
//               <Input placeholder="Enter location" className="border-amber-200 rounded-none" />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-amber-900 block mb-2">Price Range: $0 - $500</label>
//               <Slider 
//                 defaultValue={[0, 500]} 
//                 max={500} 
//                 step={10} 
//                 className="my-4" 
//               />
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Product listing section */}
//       <div className="p-6">
//         <div className="mb-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-amber-900">Showing {products.length} Results</h2>
//           <select className="border border-amber-200 p-2 rounded-none bg-white">
//             <option>Sort by: Newest</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//             <option>Most Popular</option>
//           </select>
//         </div>
        
//         {viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map(product => (
//               <Card key={product.id} className="overflow-hidden rounded-none border-amber-200 hover:border-amber-400 transition-all">
//                 <div className="relative">
//                   <img 
//                     src={product.imageUrl} 
//                     alt={product.title} 
//                     className="w-full h-48 object-cover"
//                   />
//                   <Badge className={`absolute top-2 right-2 ${conditionColors[product.condition]}`}>
//                     {product.condition}
//                   </Badge>
//                 </div>
//                 <CardContent className="p-4">
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-medium text-lg text-amber-900 line-clamp-1">{product.title}</h3>
//                     <p className="font-bold text-lg">${product.price}</p>
//                   </div>
//                   <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
//                   <div className="flex items-center mt-2 text-sm text-gray-500">
//                     <MapPin className="h-3 w-3 mr-1" /> {product.location}
//                     <span className="mx-2">•</span>
//                     <span className="flex items-center">
//                       <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" /> 
//                       {product.sellerRating}
//                     </span>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="px-4 py-3 bg-amber-50 flex justify-between">
//                   <Badge variant="outline" className="bg-transparent border-amber-300 text-amber-700">
//                     {product.category}
//                   </Badge>
//                   <Button size="sm" className="bg-amber-600 hover:bg-amber-700 rounded-none">
//                     View Details
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col gap-4">
//             {products.map(product => (
//               <Card key={product.id} className="rounded-none border-amber-200 hover:border-amber-400 transition-all">
//                 <div className="flex flex-col md:flex-row">
//                   <div className="relative w-full md:w-64 h-48">
//                     <img 
//                       src={product.imageUrl} 
//                       alt={product.title} 
//                       className="w-full h-full object-cover"
//                     />
//                     <Badge className={`absolute top-2 right-2 ${conditionColors[product.condition]}`}>
//                       {product.condition}
//                     </Badge>
//                   </div>
//                   <div className="flex-grow p-4">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-medium text-lg text-amber-900">{product.title}</h3>
//                         <Badge variant="outline" className="mt-1 bg-transparent border-amber-300 text-amber-700">
//                           {product.category}
//                         </Badge>
//                       </div>
//                       <p className="font-bold text-xl">${product.price}</p>
//                     </div>
//                     <p className="text-gray-600 mt-2">{product.description}</p>
//                     <div className="flex items-center justify-between mt-4">
//                       <div className="flex items-center text-sm text-gray-500">
//                         <MapPin className="h-3 w-3 mr-1" /> {product.location}
//                         <span className="mx-2">•</span>
//                         <span className="flex items-center">
//                           <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" /> 
//                           {product.sellerRating}
//                         </span>
//                       </div>
//                       <Button className="bg-amber-600 hover:bg-amber-700 rounded-none">
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
        
//         {/* Pagination */}
//         <div className="mt-8 flex justify-center">
//           <div className="flex border border-amber-200 rounded-none">
//             <Button variant="outline" className="rounded-none border-r border-amber-200">
//               Previous
//             </Button>
//             <Button variant="outline" className="rounded-none border-r border-amber-200 bg-amber-100">
//               1
//             </Button>
//             <Button variant="outline" className="rounded-none border-r border-amber-200">
//               2
//             </Button>
//             <Button variant="outline" className="rounded-none border-r border-amber-200">
//               3
//             </Button>
//             <Button variant="outline" className="rounded-none">
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductSearch;


// import React, { useState } from 'react';
// import { 
//   Card, 
//   CardContent, 
//   CardFooter 
// } from '@/components/ui/card';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Slider } from '@/components/ui/slider';
// import { Checkbox } from '@/components/ui/checkbox';
// import img7 from '../../images/img7.jpg'
// import img6 from '../../images/img6.jpg'
// import img9 from '../../images/img9.jpg'
// import img10 from '../../images/img10.jpg'
// import img14 from '../../images/img14.jpg'
// import img16 from '../../images/img16.jpg'
// import { 
//   Search, 
//   ChevronDown, 
//   Tag, 
//   MapPin, 
//   Star, 
//   MessageCircle, 
//   Heart,
//   Filter,
//   SlidersHorizontal,
//   X
// } from 'lucide-react';

// const RetroTradeSearch = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [activeFilters, setActiveFilters] = useState([]);
//   const [viewMode, setViewMode] = useState('grid');

//   // Sample data for demonstration
//   const productItems = [
//     {
//       id: 1,
//       title: 'Vintage Comfy Bed',
//       price: 65,
//       condition: 'Good',
//       location: 'Seattle, WA',
//       rating: 4.5,
//       image: img7,
//     },
//     {
//       id: 2,
//       title: 'Mid-Century Fridge',
//       price: 120,
//       condition: 'Excellent',
//       location: 'Portland, OR',
//       rating: 4.8,
//       image: img6
//     },
//     {
//       id: 3,
//       title: 'Slick Laptop',
//       price: 85,
//       condition: 'Like New',
//       location: 'San Francisco, CA',
//       rating: 4.3,
//       image: img9
//     },
//     {
//       id: 4,
//       title: 'Cowboy Shoes',
//       price: 150,
//       condition: 'Good',
//       location: 'Los Angeles, CA',
//       rating: 4.7,
//       image: img10
//     },
//     {
//       id: 5,
//       title: 'Antique Watch',
//       price: 45,
//       condition: 'Fair',
//       location: 'Chicago, IL',
//       rating: 4.1,
//       image: img14
//     },
//     {
//       id: 6,
//       title: '5* AC',
//       price: 95,
//       condition: 'Good',
//       location: 'New York, NY',
//       rating: 4.9,
//       image: img16
//     }
//   ];

//   const categories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Accessories', 'Collectibles'];
//   const conditions = [ 'Excellent', 'Good', 'Fair'];
  
//   const addFilter = (filter) => {
//     if (!activeFilters.includes(filter)) {
//       setActiveFilters([...activeFilters, filter]);
//     }
//   };

//   const removeFilter = (filter) => {
//     setActiveFilters(activeFilters.filter(f => f !== filter));
//   };

//   return (
//     <div className="w-full bg-white  p-6 min-h-screen">

//       {/* Search Header  bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100*/}
//       <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg border border-white/20 p-6 mb-6 transform hover:translate-y-1 transition-all duration-300">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Input 
//               placeholder="Search for second-hand treasures..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 pr-4 py-3 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
//             />
//             <Search className="absolute left-3 top-3 h-5 w-5 text-amber-400" />
//           </div>
          
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="bg-white/70 border-amber-200 hover:bg-amber-100/70 text-amber-800 flex items-center gap-2 transition-all duration-300">
//                 Categories
//                 <ChevronDown className="h-4 w-4 text-amber-700" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
//               {categories.map((category) => (
//                 <DropdownMenuItem 
//                   key={category} 
//                   className="hover:bg-amber-100/50 cursor-pointer"
//                   onClick={() => addFilter(category)}
//                 >
//                   {category}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
          
//           <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
//             Search
//           </Button>
//         </div>
//       </div>

//       {/* Active Filters */}
//       {activeFilters.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-6">
//           {activeFilters.map(filter => (
//             <div key={filter} className="backdrop-blur-sm bg-white/50 rounded-full px-3 py-1 flex items-center gap-1 border border-amber-100 text-amber-700 text-sm shadow-sm">
//               {filter}
//               <X 
//                 className="h-4 w-4 cursor-pointer hover:text-amber-900 transition-colors" 
//                 onClick={() => removeFilter(filter)}
//               />
//             </div>
//           ))}
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             className="text-amber-700 hover:text-amber-900 hover:bg-white/40 transition-all"
//             onClick={() => setActiveFilters([])}
//           >
//             Clear all
//           </Button>
//         </div>
//       )}

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Filters Sidebar */}
//         <div className="lg:w-1/5">
//           <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg border border-white/20 p-6 sticky top-6 transition-all duration-300">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-medium text-amber-800 flex items-center gap-2">
//                 <Filter className="h-5 w-5" />
//                 Filters
//               </h3>
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-amber-700 hover:text-amber-900 hover:bg-white/40"
//                 onClick={() => setActiveFilters([])}
//               >
//                 Reset
//               </Button>
//             </div>
            
//             {/* Price Range Filter */}
//             {/* <div className="mb-6">
//               <h4 className="text-amber-800 font-medium mb-3">Price Range</h4>
//               <div className="px-2">
//                 <Slider
//                   defaultValue={[0, 1000]}
//                   max={1000}
//                   step={10}
//                   value={priceRange}
//                   onValueChange={setPriceRange}
//                   className="mb-2"
//                 />
//                 <div className="flex justify-between text-amber-700 text-sm">
//                   <span>${priceRange[0]}</span>
//                   <span>${priceRange[1]}</span>
//                 </div>
//               </div>
//             </div> */}
            
//             {/* Condition Filter */}

            
//             <div className="mb-6">
//               <h4 className="text-amber-800 font-medium mb-3">Condition</h4>
//               <div className="space-y-2">
//                 {conditions.map((condition) => (
//                   <div key={condition} className="flex items-center">
//                     <Checkbox 
//                       id={`condition-${condition}`}
//                       className="border-amber-300 text-amber-600 focus:ring-amber-500"
//                       onCheckedChange={() => addFilter(condition)}
//                     />
//                     <label 
//                       htmlFor={`condition-${condition}`}
//                       className="ml-2 text-amber-700 cursor-pointer"
//                     >
//                       {condition}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Location Filter */}
//             <div className="mb-6">
//               <h4 className="text-amber-800 font-medium mb-3">Location</h4>
//               <div className="relative">
//                 <Input 
//                   placeholder="Enter zip code or city" 
//                   className="pl-8 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
//                 />
//                 <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-amber-400" />
//               </div>
//               {/* <div className="mt-2">
//                 <label className="flex items-center gap-2 text-amber-700 text-sm">
//                   <Checkbox 
//                     id="nearby-only"
//                     className="border-amber-300 text-amber-600 focus:ring-amber-500"
//                   />
//                   <span>Within 25 miles only</span>
//                 </label>
//               </div> */}
//             </div>
            
//             {/* Rating Filter */}
//             <div>
//               <h4 className="text-amber-800 font-medium mb-3">Seller Rating</h4>
//               <div className="space-y-2">
//                 {[4, 3, 2].map((rating) => (
//                   <div key={rating} className="flex items-center">
//                     <Checkbox 
//                       id={`rating-${rating}`}
//                       className="border-amber-300 text-amber-600 focus:ring-amber-500"
//                     />
//                     <label 
//                       htmlFor={`rating-${rating}`} 
//                       className="ml-2 text-amber-700 flex items-center cursor-pointer"
//                     >
//                       {rating}+ <Star className="h-3 w-3 ml-1 fill-amber-500 text-amber-500" />
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Product Grid */}
//         <div className="lg:w-3/4">
//           <div className="backdrop-blur-sm bg-white/30 rounded-xl border border-white/20 p-4 mb-3 flex justify-between items-center">
//             <div className="text-amber-800">
//               <span className="font-medium">125</span> items found
//             </div>
//             <div className="flex items-center gap-4">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="text-amber-700 hover:bg-white/40 transition-all flex items-center gap-1">
//                     <SlidersHorizontal className="h-4 w-4" />
//                     Sort by
//                     <ChevronDown className="h-3 w-3" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: Low to High</DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: High to Low</DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Newest First</DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Highest Rated</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
              
//               <div className="flex rounded-md overflow-hidden border border-amber-200">
//                 <Button 
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   className={`h-8 w-8 p-0 rounded-none ${viewMode === 'grid' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//                   onClick={() => setViewMode('grid')}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="3" width="7" height="7" />
//                     <rect x="14" y="3" width="7" height="7" />
//                     <rect x="3" y="14" width="7" height="7" />
//                     <rect x="14" y="14" width="7" height="7" />
//                   </svg>
//                 </Button>
//                 <Button 
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   className={`h-8 w-8 p-0 rounded-none ${viewMode === 'list' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//                   onClick={() => setViewMode('list')}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="3" y1="6" x2="21" y2="6" />
//                     <line x1="3" y1="12" x2="21" y2="12" />
//                     <line x1="3" y1="18" x2="21" y2="18" />
//                   </svg>
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//           <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
//           {productItems.map((item) => (
//   <Card 
//     key={item.id} 
//     className={`backdrop-blur-sm bg-white/30 hover:bg-white/40 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
//   >
//     <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full h-48'} overflow-hidden`}>
//       <img 
//         src={item.image} 
//         alt={item.title} 
//         className="w-full h-full object-cover"
//       />
//       <Button 
//         variant="ghost" 
//         size="icon" 
//         className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-amber-700 shadow-md"
//       >
//         <Heart className="h-4 w-4" />
//       </Button>
//     </div>
    
//     <CardContent className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
//       <div className="flex justify-between items-start mb-2">
//         <h3 className="font-medium text-lg text-amber-800">{item.title}</h3>
//         <div className="font-bold text-amber-700">${item.price}</div>
//       </div>
      
//       <div className="flex items-center gap-2 text-sm text-amber-700 mb-1">
//         <Tag className="h-4 w-4" />
//         <span>Condition: {item.condition}</span>
//       </div>
      
//       <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
//         <MapPin className="h-4 w-4" />
//         <span>{item.location}</span>
//       </div>
      
//       <div className="flex items-center gap-1 mb-4">
//         {[...Array(5)].map((_, i) => (
//           <Star 
//             key={i} 
//             className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
//           />
//         ))}
//         <span className="text-xs text-amber-700 ml-1">{item.rating}</span>
//       </div>
      
//       <div className="flex gap-2">
//         <Button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
//           View Details
//         </Button>
//         <Button variant="outline" className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300">
//           <MessageCircle className="h-4 w-4" />
//         </Button>
//       </div>
//     </CardContent>
//   </Card>
// ))}
//           </div>
          
//           {/* Pagination */}
//           <div className="mt-8 flex justify-center">
//             <div className="backdrop-blur-sm bg-white/30 rounded-xl border border-white/20 p-2 inline-flex shadow-md">
//               <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="15 18 9 12 15 6" />
//                 </svg>
//               </Button>
//               {[1, 2, 3, 4, 5].map((page) => (
//                 <Button 
//                   key={page}
//                   variant={page === 1 ? 'default' : 'ghost'}
//                   className={`h-8 w-8 p-0 ${page === 1 ? 'bg-amber-500' : 'text-amber-800 hover:bg-white/40'}`}
//                 >
//                   {page}
//                 </Button>
//               ))}
//               <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="9 18 15 12 9 6" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RetroTradeSearch;
//working
// import React, { useState, useEffect } from 'react';
// import { 
//   Card, 
//   CardContent, 
//   CardFooter 
// } from '@/components/ui/card';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Slider } from '@/components/ui/slider';
// import { Checkbox } from '@/components/ui/checkbox';
// import { 
//   Search, 
//   ChevronDown, 
//   Tag, 
//   MapPin, 
//   Star, 
  
//   MessageCircle, 
//   Heart,
//   Filter,
//   SlidersHorizontal,
//   X
// } from 'lucide-react';

// const RetroTradeSearch = ({ 
//   productData, 
//   loading, 
//   filters, 
//   onFilterChange,
//   categories, 
//   conditions 
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [activeFilters, setActiveFilters] = useState([]);
//   const [viewMode, setViewMode] = useState('grid');
//   const [locationInput, setLocationInput] = useState('');
//   // if (productList.length > 0) {
//           console.log('✅ Fetched Products:', productData);
//     //     }
//   // Handle search query input
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Handle search button click
//   const handleSearch = () => {
//     onFilterChange('searchQuery', searchQuery);
//   };

//   // Handle location input change
//   const handleLocationChange = (e) => {
//     setLocationInput(e.target.value);
//   };

//   // Apply location filter
//   const handleLocationFilter = () => {
//     onFilterChange('location', locationInput);
//     if (locationInput && !activeFilters.includes(`Location: ${locationInput}`)) {
//       setActiveFilters([...activeFilters, `Location: ${locationInput}`]);
//     }
//   };

//   // Handle price range change
//   const handlePriceRangeChange = (value) => {
//     setPriceRange(value);
//     onFilterChange('priceRange', value);
    
//     // Update active filters for price range
//     const priceRangeFilter = `Price: $${value[0]} - $${value[1]}`;
//     const existingPriceFilter = activeFilters.find(filter => filter.startsWith('Price:'));
    
//     if (existingPriceFilter) {
//       setActiveFilters(activeFilters.map(filter => 
//         filter.startsWith('Price:') ? priceRangeFilter : filter
//       ));
//     } else {
//       setActiveFilters([...activeFilters, priceRangeFilter]);
//     }
//   };

//   // Add filter tag
//   const addFilter = (filterType, filter) => {
//     if (!activeFilters.includes(filter)) {
//       setActiveFilters([...activeFilters, filter]);
//     }
    
//     if (filterType === 'category') {
//       onFilterChange('category', filter);
//     } else if (filterType === 'condition') {
//       onFilterChange('condition', filter);
//     } else if (filterType === 'rating') {
//       onFilterChange('minRating', parseInt(filter.split('+')[0]));
//     }
//   };

//   // Remove filter
//   const removeFilter = (filter) => {
//     setActiveFilters(activeFilters.filter(f => f !== filter));
    
//     // Reset the corresponding filter
//     if (filter.startsWith('Price:')) {
//       setPriceRange([0, 10000]);
//       onFilterChange('priceRange', [0, 10000]);
//     } else if (filter.startsWith('Location:')) {
//       setLocationInput('');
//       onFilterChange('location', '');
//     } else if (categories.includes(filter)) {
//       onFilterChange('category', '');
//     } else if (conditions.includes(filter)) {
//       onFilterChange('condition', '');
//     } else if (filter.includes('+')) {
//       onFilterChange('minRating', 0);
//     }
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setActiveFilters([]);
//     setSearchQuery('');
//     setPriceRange([0, 10000]);
//     setLocationInput('');
    
//     // Reset all filter values
//     onFilterChange('searchQuery', '');
//     onFilterChange('category', '');
//     onFilterChange('condition', '');
//     onFilterChange('location', '');
//     onFilterChange('minRating', 0);
//     onFilterChange('priceRange', [0, 10000]);
//   };

//   // Apply condition filter
//   const handleConditionChange = (condition, isChecked) => {
//     if (isChecked) {
//       addFilter('condition', condition);
//     } else {
//       removeFilter(condition);
//     }
//   };

//   // Apply rating filter
//   const handleRatingChange = (rating, isChecked) => {
//     const ratingFilter = `${rating}+`;
//     if (isChecked) {
//       addFilter('rating', ratingFilter);
//     } else {
//       removeFilter(ratingFilter);
//     }
//   };

//   // Handle Enter key press for search
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // Handle Enter key press for location
//   const handleLocationKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleLocationFilter();
//     }
//   };
//   return (
//     <div className="w-full bg-white p-6 min-h-screen">
  
//       {/* Search Header */}
//       <div className="backdrop-blur-sm bg-amber-50 rounded-xl shadow-lg border border-white/20 p-6 mb-6 transform hover:translate-y-1 transition-all duration-300">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Input 
//               placeholder="Search for second-hand treasures..." 
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onKeyPress={handleKeyPress}
//               className="pl-10 pr-4 py-3 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
//             />
//             <Search className="absolute left-3 top-3 h-5 w-5 text-amber-400" />
//           </div>
          
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="bg-white/70 border-amber-200 hover:bg-amber-100/70 text-amber-800 flex items-center gap-2 transition-all duration-300">
//                 Categories
//                 <ChevronDown className="h-4 w-4 text-amber-700" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
//               {categories.map((category) => (
//                 <DropdownMenuItem 
//                   key={category} 
//                   className="hover:bg-amber-100/50 cursor-pointer"
//                   onClick={() => addFilter('category', category)}
//                 >
//                   {category}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
          
//           <Button 
//             className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
//             onClick={handleSearch}
//           >
//             Search
//           </Button>
//         </div>
//       </div>

//       {/* Active Filters */}
//       {activeFilters.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-6">
//           {activeFilters.map(filter => (
//             <div key={filter} className="backdrop-blur-sm bg-amber-50 rounded-full px-3 py-1 flex items-center gap-1 border border-amber-100 text-amber-700 text-sm shadow-sm">
//               {filter}
//               <X 
//                 className="h-4 w-4 cursor-pointer hover:text-amber-900 transition-colors" 
//                 onClick={() => removeFilter(filter)}
//               />
//             </div>
//           ))}
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             className="text-amber-700 hover:text-amber-900 hover:bg-white/40 transition-all"
//             onClick={clearAllFilters}
//           >
//             Clear all
//           </Button>
//         </div>
//       )}<div className="flex flex-col lg:flex-row gap-6">
//         {/* Filters Sidebar */}
//         <div className="lg:w-1/5">
//           <div className="backdrop-blur-sm bg-amber-50 rounded-xl shadow-lg border border-white/20 p-6 sticky top-6 transition-all duration-300">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-medium text-amber-800 flex items-center gap-2">
//                 <Filter className="h-5 w-5" />
//                 Filters
//               </h3>
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-amber-700 hover:text-amber-900 hover:bg-white/40"
//                 onClick={clearAllFilters}
//               >
//                 Reset
//               </Button>
//             </div>
            
//             {/* Price Range Filter */}
//             <div className="mb-6">
//               <h4 className="text-amber-800 font-medium mb-3">Price Range</h4>
//               <div className="px-2">
//                 <Slider
//                   defaultValue={[0, 10000]}
//                   max={10000}
//                   step={10}
//                   value={priceRange}
//                   onValueChange={handlePriceRangeChange}
//                   className="mb-2"
//                 />
//                 <div className="flex justify-between text-amber-700 text-sm">
//                   <span>${priceRange[0]}</span>
//                   <span>${priceRange[1]}</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Condition Filter */}
//             <div className="mb-6">
//               <h4 className="text-amber-800 font-medium mb-3">Condition</h4>
//               <div className="space-y-2">
//                 {conditions.map((condition) => (
//                   <div key={condition} className="flex items-center">
//                     <Checkbox 
//                       id={`condition-${condition}`}
//                       className="border-amber-300 text-amber-600 focus:ring-amber-500"
//                       checked={activeFilters.includes(condition)}
//                       onCheckedChange={(checked) => handleConditionChange(condition, checked)}
//                     />
//                     <label 
//                       htmlFor={`condition-${condition}`}
//                       className="ml-2 text-amber-700 cursor-pointer"
//                     >
//                       {condition}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Location Filter */}
//             <div className="mb-6">
//               <h4 className="text-amber-800 font-medium mb-3">Location</h4>
//               <div className="relative">
//                 <Input 
//                   placeholder="Enter zip code or city" 
//                   className="pl-8 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
//                   value={locationInput}
//                   onChange={handleLocationChange}
//                   onKeyPress={handleLocationKeyPress}
//                 />
//                 <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-amber-400" />
//               </div>
//             </div>
            
//             {/* Rating Filter */}
//             <div>
//               <h4 className="text-amber-800 font-medium mb-3">Seller Rating</h4>
//               <div className="space-y-2">
//                 {[4, 3, 2].map((rating) => (
//                   <div key={rating} className="flex items-center">
//                     <Checkbox 
//                       id={`rating-${rating}`}
//                       className="border-amber-300 text-amber-600 focus:ring-amber-500"
//                       checked={activeFilters.includes(`${rating}+`)}
//                       onCheckedChange={(checked) => handleRatingChange(rating, checked)}
//                     />
//                     <label 
//                       htmlFor={`rating-${rating}`} 
//                       className="ml-2 text-amber-700 flex items-center cursor-pointer"
//                     >
//                       {rating}+ <Star className="h-3 w-3 ml-1 fill-amber-500 text-amber-500" />
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Product Grid */}
//         <div className="lg:w-3/4">
//           <div className="backdrop-blur-sm bg-amber-50 rounded-xl border border-white/20 p-4 mb-3 flex justify-between items-center">
//             <div className="text-amber-800">
//               <span className="font-medium">{productData.length}</span> items found
//             </div>
//             <div className="flex items-center gap-4">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="text-amber-700 hover:bg-white/40 transition-all flex items-center gap-1">
//                     <SlidersHorizontal className="h-4 w-4" />
//                     Sort by
//                     <ChevronDown className="h-3 w-3" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: Low to High</DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: High to Low</DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Newest First</DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Highest Rated</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
              
//               <div className="flex rounded-md overflow-hidden border  border-amber-200">
//                 <Button 
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   className={`h-8 w-8 p-0 rounded-none ${viewMode === 'grid' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//                   onClick={() => setViewMode('grid')}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="3" width="7" height="7" />
//                     <rect x="14" y="3" width="7" height="7" />
//                     <rect x="3" y="14" width="7" height="7" />
//                     <rect x="14" y="14" width="7" height="7" />
//                   </svg>
//                 </Button>
//                 <Button 
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   className={`h-8 w-8 p-0 rounded-none ${viewMode === 'list' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//                   onClick={() => setViewMode('list')}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="3" y1="6" x2="21" y2="6" />
//                     <line x1="3" y1="12" x2="21" y2="12" />
//                     <line x1="3" y1="18" x2="21" y2="18" />
//                   </svg>
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//           {/* Loading State */}
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//             </div>
//           ) : (
//             <>
//               {/* No Results State */}
//               {productData.length === 0 ? (
//                 <div className="text-center py-16">
//                   <div className="text-amber-800 text-xl font-medium mb-2">No items found</div>
//                   <div className="text-amber-600">Try adjusting your filters or search query</div>
//                   <Button 
//                     className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md"
//                     onClick={clearAllFilters}
//                   >
//                     Clear all filters
//                   </Button>
//                 </div>
//               ) : (
//                 <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
//                   {productData.map((item) => (
//                     <Card 
//                       key={item.id} 
//                       className={`backdrop-blur-sm border border-amber-200 hover:bg-white/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
//                       >
//                       <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full h-48'} overflow-hidden`}>
//                         <img 
//                           src={item.imageUrls[0]} 
//                           alt={item.title} 
//                           className="w-full h-full object-cover"
//                         />
//                         <Button 
//                           variant="ghost" 
//                           size="icon" 
//                           className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-amber-700 shadow-md"
//                         >
//                           <Heart className="h-4 w-4" />
//                         </Button>
//                       </div>
                      
//                       <CardContent className={`p-4 border-t border-amber-200  ${viewMode === 'list' ? 'w-2/3' : ''}`}>
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="font-medium text-lg text-amber-800">{item.title}</h3>
//                           <div className="font-bold text-amber-700">${item.price}</div>
//                         </div>
                        
//                         <div className="flex items-center gap-2 text-sm text-amber-700 mb-1">
//                           <Tag className="h-4 w-4" />
//                           <span>Condition: {item.condition}</span>
//                         </div>
                        
//                         <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
//                           <MapPin className="h-4 w-4" />
//                           <span>{item.location}</span>
//                         </div>
                        
//                         <div className="flex items-center gap-1 mb-4">
//                           {[...Array(5)].map((_, i) => (
//                             <Star 
//                               key={i} 
//                               className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
//                             />
//                           ))}
//                           <span className="text-xs text-amber-700 ml-1">{item.rating}</span>
//                         </div>
                        
//                         <div className="flex gap-2">
//                           <Button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
//                             View Details
//                           </Button>
//                           <Button variant="outline" className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300">
//                             <MessageCircle className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
          
//           {/* Pagination - Only show if there are items */}
//           {!loading && productData.length > 0 && (
//             <div className="mt-8 flex justify-center">
//               <div className="backdrop-blur-sm bg-white/30 rounded-xl border border-white/20 p-2 inline-flex shadow-md">
//                 <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="15 18 9 12 15 6" />
//                   </svg>
//                 </Button>
//                 {[1, 2, 3, 4, 5].map((page) => (
//                   <Button 
//                     key={page}
//                     variant={page === 1 ? 'default' : 'ghost'}
//                     className={`h-8 w-8 p-0 ${page === 1 ? 'bg-amber-500' : 'text-amber-800 hover:bg-white/40'}`}
//                   >
//                     {page}
//                   </Button>
//                 ))}
//                 <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="9 18 15 12 9 6" />
//                   </svg>
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default RetroTradeSearch;
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  ChevronDown, 
  Tag, 
  MapPin, 
  Star, 
  MessageCircle, 
  Heart,
  Filter,
  SlidersHorizontal,
  X
} from 'lucide-react';

const RetroTradeSearch = ({ 
  productData, 
  loading, 
  filters,
  searchQuery,
  priceRange,
  activeFilters,
  viewMode,
  userRole,
  locationInput,
  categories, 
  conditions,
  onFilterChange,
  onSearchChange,
  onSearch,
  onLocationChange,
  onLocationFilter,
  onPriceRangeChange,
  onAddFilter,
  onRemoveFilter,
  onClearAllFilters,
  onConditionChange,
  onRatingChange,
  onKeyPress,
  onLocationKeyPress,
  onViewModeChange,
  onWishlistToggle
}) => {
  console.log('✅ Fetched Products:', productData);
  
  return (
    <div className="w-full bg-white p-6 min-h-screen">
  
      {/* Search Header */}
      <div className="backdrop-blur-sm bg-amber-50 rounded-xl shadow-lg border border-white/20 p-6 mb-6 transform hover:translate-y-1 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input 
              placeholder="Search for second-hand treasures..." 
              value={searchQuery}
              onChange={onSearchChange}
              onKeyPress={onKeyPress}
              className="pl-10 pr-4 py-3 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-amber-400" />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white/70 border-amber-200 hover:bg-amber-100/70 text-amber-800 flex items-center gap-2 transition-all duration-300">
                Categories
                <ChevronDown className="h-4 w-4 text-amber-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category} 
                  className="hover:bg-amber-100/50 cursor-pointer"
                  onClick={() => onAddFilter('category', category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            onClick={onSearch}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((filter, index) => (
            <div key={`filter-${index}-${filter}`} className="backdrop-blur-sm bg-amber-50 rounded-full px-3 py-1 flex items-center gap-1 border border-amber-100 text-amber-700 text-sm shadow-sm">
              {filter}
              <X 
                className="h-4 w-4 cursor-pointer hover:text-amber-900 transition-colors" 
                onClick={() => onRemoveFilter(filter)}
              />
            </div>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-amber-700 hover:text-amber-900 hover:bg-white/40 transition-all"
            onClick={onClearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-1/5">
          <div className="backdrop-blur-sm bg-amber-50 rounded-xl shadow-lg border border-white/20 p-6 sticky top-6 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-amber-800 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-amber-700 hover:text-amber-900 hover:bg-white/40"
                onClick={onClearAllFilters}
              >
                Reset
              </Button>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-amber-800 font-medium mb-3">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 10000]}
                  max={10000}
                  step={10}
                  value={priceRange}
                  onValueChange={onPriceRangeChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-amber-700 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            {/* Condition Filter */}
            <div className="mb-6">
              <h4 className="text-amber-800 font-medium mb-3">Condition</h4>
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <div key={`condition-${condition}`} className="flex items-center">
                    <Checkbox 
                      id={`condition-${condition}`}
                      className="border-amber-300 text-amber-600 focus:ring-amber-500"
                      checked={activeFilters.includes(condition)}
                      onCheckedChange={(checked) => onConditionChange(condition, checked)}
                    />
                    <label 
                      htmlFor={`condition-${condition}`}
                      className="ml-2 text-amber-700 cursor-pointer"
                    >
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Filter */}
            <div className="mb-6">
              <h4 className="text-amber-800 font-medium mb-3">Location</h4>
              <div className="relative">
                <Input 
                  placeholder="Enter zip code or city" 
                  className="pl-8 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
                  value={locationInput}
                  onChange={onLocationChange}
                  onKeyPress={onLocationKeyPress}
                />
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-amber-400" />
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <h4 className="text-amber-800 font-medium mb-3">Seller Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2].map((rating) => (
                  <div key={`rating-${rating}`} className="flex items-center">
                    <Checkbox 
                      id={`rating-${rating}`}
                      className="border-amber-300 text-amber-600 focus:ring-amber-500"
                      checked={activeFilters.includes(`${rating}+`)}
                      onCheckedChange={(checked) => onRatingChange(rating, checked)}
                    />
                    <label 
                      htmlFor={`rating-${rating}`} 
                      className="ml-2 text-amber-700 flex items-center cursor-pointer"
                    >
                      {rating}+ <Star className="h-3 w-3 ml-1 fill-amber-500 text-amber-500" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="backdrop-blur-sm bg-amber-50 rounded-xl border border-white/20 p-4 mb-3 flex justify-between items-center">
            <div className="text-amber-800">
              <span className="font-medium">{productData.length}</span> items found
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-amber-700 hover:bg-white/40 transition-all flex items-center gap-1">
                    <SlidersHorizontal className="h-4 w-4" />
                    Sort by
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
                  <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Newest First</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Highest Rated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex rounded-md overflow-hidden border  border-amber-200">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  className={`h-8 w-8 p-0 rounded-none ${viewMode === 'grid' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
                  onClick={() => onViewModeChange('grid')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  className={`h-8 w-8 p-0 rounded-none ${viewMode === 'list' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
                  onClick={() => onViewModeChange('list')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <>
              {/* No Results State */}
              {productData.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-amber-800 text-xl font-medium mb-2">No items found</div>
                  <div className="text-amber-600">Try adjusting your filters or search query</div>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md"
                    onClick={onClearAllFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {productData.map((item) => (
                    <Card 
                      key={item.id || `product-${item.title}-${Math.random()}`} 
                      className={`backdrop-blur-sm border border-amber-200 hover:bg-white/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
                    >
                      <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full h-48'} overflow-hidden`}>
                        <img 
                          src={item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : '/api/placeholder/400/320'} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      {userRole === "buyer" && (
  <Button 
    variant="ghost" 
    size="icon" 
    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-amber-700 shadow-md"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onWishlistToggle(item.id || item._id);
    }}
  >
    <Heart className="h-4 w-4" />
  </Button>
)}
                      </div>
                      
                      <CardContent className={`p-4 border-t border-amber-200  ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-lg text-amber-800">{item.title}</h3>
                          <div className="font-bold text-amber-700">${item.price}</div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-amber-700 mb-1">
                          <Tag className="h-4 w-4" />
                          <span>Condition: {item.condition}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={`star-${item.id || item.title}-${i}`} 
                              className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
                            />
                          ))}
                          <span className="text-xs text-amber-700 ml-1">{item.rating}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                            View Details
                          </Button>
                          <Button variant="outline" className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
          
          {/* Pagination - Only show if there are items */}
          {!loading && productData.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="backdrop-blur-sm bg-white/30 rounded-xl border border-white/20 p-2 inline-flex shadow-md">
                <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button 
                    key={`page-${page}`}
                    variant={page === 1 ? 'default' : 'ghost'}
                    className={`h-8 w-8 p-0 ${page === 1 ? 'bg-amber-500' : 'text-amber-800 hover:bg-white/40'}`}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetroTradeSearch;

// return (
//   <div className="w-full bg-white p-6 min-h-screen">

//     {/* Search Header */}
//     <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg border border-white/20 p-6 mb-6 transform hover:translate-y-1 transition-all duration-300">
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="relative flex-grow">
//           <Input 
//             placeholder="Search for second-hand treasures..." 
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onKeyPress={handleKeyPress}
//             className="pl-10 pr-4 py-3 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
//           />
//           <Search className="absolute left-3 top-3 h-5 w-5 text-amber-400" />
//         </div>
        
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="bg-white/70 border-amber-200 hover:bg-amber-100/70 text-amber-800 flex items-center gap-2 transition-all duration-300">
//               Categories
//               <ChevronDown className="h-4 w-4 text-amber-700" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
//             {categories.map((category) => (
//               <DropdownMenuItem 
//                 key={category} 
//                 className="hover:bg-amber-100/50 cursor-pointer"
//                 onClick={() => addFilter('category', category)}
//               >
//                 {category}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
        
//         <Button 
//           className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//       </div>
//     </div>

//     {/* Active Filters */}
//     {activeFilters.length > 0 && (
//       <div className="flex flex-wrap gap-2 mb-6">
//         {activeFilters.map(filter => (
//           <div key={filter} className="backdrop-blur-sm bg-white/50 rounded-full px-3 py-1 flex items-center gap-1 border border-amber-100 text-amber-700 text-sm shadow-sm">
//             {filter}
//             <X 
//               className="h-4 w-4 cursor-pointer hover:text-amber-900 transition-colors" 
//               onClick={() => removeFilter(filter)}
//             />
//           </div>
//         ))}
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           className="text-amber-700 hover:text-amber-900 hover:bg-white/40 transition-all"
//           onClick={clearAllFilters}
//         >
//           Clear all
//         </Button>
//       </div>
//     )}<div className="flex flex-col lg:flex-row gap-6">
//       {/* Filters Sidebar */}
//       <div className="lg:w-1/5">
//         <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg border border-white/20 p-6 sticky top-6 transition-all duration-300">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-medium text-amber-800 flex items-center gap-2">
//               <Filter className="h-5 w-5" />
//               Filters
//             </h3>
//             <Button 
//               variant="ghost" 
//               size="sm" 
//               className="text-amber-700 hover:text-amber-900 hover:bg-white/40"
//               onClick={clearAllFilters}
//             >
//               Reset
//             </Button>
//           </div>
          
//           {/* Price Range Filter */}
//           <div className="mb-6">
//             <h4 className="text-amber-800 font-medium mb-3">Price Range</h4>
//             <div className="px-2">
//               <Slider
//                 defaultValue={[0, 1000]}
//                 max={1000}
//                 step={10}
//                 value={priceRange}
//                 onValueChange={handlePriceRangeChange}
//                 className="mb-2"
//               />
//               <div className="flex justify-between text-amber-700 text-sm">
//                 <span>${priceRange[0]}</span>
//                 <span>${priceRange[1]}</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Condition Filter */}
//           <div className="mb-6">
//             <h4 className="text-amber-800 font-medium mb-3">Condition</h4>
//             <div className="space-y-2">
//               {conditions.map((condition) => (
//                 <div key={condition} className="flex items-center">
//                   <Checkbox 
//                     id={`condition-${condition}`}
//                     className="border-amber-300 text-amber-600 focus:ring-amber-500"
//                     checked={activeFilters.includes(condition)}
//                     onCheckedChange={(checked) => handleConditionChange(condition, checked)}
//                   />
//                   <label 
//                     htmlFor={`condition-${condition}`}
//                     className="ml-2 text-amber-700 cursor-pointer"
//                   >
//                     {condition}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Location Filter */}
//           <div className="mb-6">
//             <h4 className="text-amber-800 font-medium mb-3">Location</h4>
//             <div className="relative">
//               <Input 
//                 placeholder="Enter zip code or city" 
//                 className="pl-8 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner transition-all duration-300"
//                 value={locationInput}
//                 onChange={handleLocationChange}
//                 onKeyPress={handleLocationKeyPress}
//               />
//               <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-amber-400" />
//             </div>
//           </div>
          
//           {/* Rating Filter */}
//           <div>
//             <h4 className="text-amber-800 font-medium mb-3">Seller Rating</h4>
//             <div className="space-y-2">
//               {[4, 3, 2].map((rating) => (
//                 <div key={rating} className="flex items-center">
//                   <Checkbox 
//                     id={`rating-${rating}`}
//                     className="border-amber-300 text-amber-600 focus:ring-amber-500"
//                     checked={activeFilters.includes(`${rating}+`)}
//                     onCheckedChange={(checked) => handleRatingChange(rating, checked)}
//                   />
//                   <label 
//                     htmlFor={`rating-${rating}`} 
//                     className="ml-2 text-amber-700 flex items-center cursor-pointer"
//                   >
//                     {rating}+ <Star className="h-3 w-3 ml-1 fill-amber-500 text-amber-500" />
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Product Grid */}
//       <div className="lg:w-3/4">
//         <div className="backdrop-blur-sm bg-white/30 rounded-xl border border-white/20 p-4 mb-3 flex justify-between items-center">
//           <div className="text-amber-800">
//             <span className="font-medium">{productData.length}</span> items found
//           </div>
//           <div className="flex items-center gap-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="text-amber-700 hover:bg-white/40 transition-all flex items-center gap-1">
//                   <SlidersHorizontal className="h-4 w-4" />
//                   Sort by
//                   <ChevronDown className="h-3 w-3" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="backdrop-blur-md bg-white/70 border border-amber-100 shadow-xl animate-in slide-in-from-top-5 duration-300">
//                 <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: Low to High</DropdownMenuItem>
//                 <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Price: High to Low</DropdownMenuItem>
//                 <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Newest First</DropdownMenuItem>
//                 <DropdownMenuItem className="hover:bg-amber-100/50 cursor-pointer">Highest Rated</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
            
//             <div className="flex rounded-md overflow-hidden border border-amber-200">
//               <Button 
//                 variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                 className={`h-8 w-8 p-0 rounded-none ${viewMode === 'grid' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//                 onClick={() => setViewMode('grid')}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="3" y="3" width="7" height="7" />
//                   <rect x="14" y="3" width="7" height="7" />
//                   <rect x="3" y="14" width="7" height="7" />
//                   <rect x="14" y="14" width="7" height="7" />
//                 </svg>
//               </Button>
//               <Button 
//                 variant={viewMode === 'list' ? 'default' : 'ghost'}
//                 className={`h-8 w-8 p-0 rounded-none ${viewMode === 'list' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//                 onClick={() => setViewMode('list')}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="3" y1="6" x2="21" y2="6" />
//                   <line x1="3" y1="12" x2="21" y2="12" />
//                   <line x1="3" y1="18" x2="21" y2="18" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         </div>
        
//         {/* Loading State */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//           </div>
//         ) : (
//           <>
//             {/* No Results State */}
//             {productData.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="text-amber-800 text-xl font-medium mb-2">No items found</div>
//                 <div className="text-amber-600">Try adjusting your filters or search query</div>
//                 <Button 
//                   className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md"
//                   onClick={clearAllFilters}
//                 >
//                   Clear all filters
//                 </Button>
//               </div>
//             ) : (
//               <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
//                 {productData.map((item) => (
//                   <Card 
//                     key={item.id} 
//                     className={`backdrop-blur-sm bg-white/30 hover:bg-white/40 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
//                   >
//                     <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full h-48'} overflow-hidden`}>
//                       <img 
//                         src={item.imageUrls[0]} 
//                         alt={item.title} 
//                         className="w-full h-full object-cover"
//                       />
//                       <Button 
//                         variant="ghost" 
//                         size="icon" 
//                         className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/70 hover:bg-white text-amber-700 shadow-md"
//                       >
//                         <Heart className="h-4 w-4" />
//                       </Button>
//                     </div>
                    
//                     <CardContent className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="font-medium text-lg text-amber-800">{item.title}</h3>
//                         <div className="font-bold text-amber-700">${item.price}</div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-amber-700 mb-1">
//                         <Tag className="h-4 w-4" />
//                         <span>Condition: {item.condition}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
//                         <MapPin className="h-4 w-4" />
//                         <span>{item.location}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-1 mb-4">
//                         {[...Array(5)].map((_, i) => (
//                           <Star 
//                             key={i} 
//                             className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
//                           />
//                         ))}
//                         <span className="text-xs text-amber-700 ml-1">{item.rating}</span>
//                       </div>
                      
//                       <div className="flex gap-2">
//                         <Button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
//                           View Details
//                         </Button>
//                         <Button variant="outline" className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300">
//                           <MessageCircle className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
        
//         {/* Pagination - Only show if there are items */}
//         {!loading && productData.length > 0 && (
//           <div className="mt-8 flex justify-center">
//             <div className="backdrop-blur-sm bg-white/30 rounded-xl border border-white/20 p-2 inline-flex shadow-md">
//               <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="15 18 9 12 15 6" />
//                 </svg>
//               </Button>
//               {[1, 2, 3, 4, 5].map((page) => (
//                 <Button 
//                   key={page}
//                   variant={page === 1 ? 'default' : 'ghost'}
//                   className={`h-8 w-8 p-0 ${page === 1 ? 'bg-amber-500' : 'text-amber-800 hover:bg-white/40'}`}
//                 >
//                   {page}
//                 </Button>
//               ))}
//               <Button variant="ghost" className="text-amber-800 hover:bg-white/40 h-8 w-8 p-0">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="9 18 15 12 9 6" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
