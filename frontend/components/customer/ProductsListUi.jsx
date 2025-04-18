// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { 
//   Search, 
//   MessageCircle, 
//   Heart,
//   Star, 
//   MapPin,
//   Tag,
//   Delete
// } from 'lucide-react';

// const ProductListUi = ({ productData = [], loading = false }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [filteredProducts, setFilteredProducts] = useState(productData);

//   // Update filtered products when productData changes
//   React.useEffect(() => {
//     setFilteredProducts(productData);
//   }, [productData]);

//   // Handle search query input
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
    
//     // Filter products based on search query
//     const filtered = productData.filter(item => 
//       item.title.toLowerCase().includes(query.toLowerCase()) || 
//       (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
//     );
//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className=" bg-white p-6 min-h-screen overflow-x-hidden w-full">
//       {/* Search Header */}
//       <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg border border-white/20 p-6 mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Input 
//               placeholder="Search your products..." 
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="pl-10 pr-4 py-3 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner"
//             />
//             <Search className="absolute left-3 top-3 h-5 w-5 text-amber-400" />
//           </div>
          
//           {/* View Toggle */}
//           <div className="flex rounded-md overflow-hidden border border-amber-200">
//             <Button 
//               variant={viewMode === 'grid' ? 'default' : 'ghost'}
//               className={`h-10 w-10 p-0 rounded-none ${viewMode === 'grid' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//               onClick={() => setViewMode('grid')}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="3" width="7" height="7" />
//                 <rect x="14" y="3" width="7" height="7" />
//                 <rect x="3" y="14" width="7" height="7" />
//                 <rect x="14" y="14" width="7" height="7" />
//               </svg>
//             </Button>
//             <Button 
//               variant={viewMode === 'list' ? 'default' : 'ghost'}
//               className={`h-10 w-10 p-0 rounded-none ${viewMode === 'list' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//               onClick={() => setViewMode('list')}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="3" y1="6" x2="21" y2="6" />
//                 <line x1="3" y1="12" x2="21" y2="12" />
//                 <line x1="3" y1="18" x2="21" y2="18" />
//               </svg>
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       {/* Product List */}
//       <div className="overflow-y-auto" style={{ height: "calc(100vh - 140px)" }}>
//         {/* Loading State */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//           </div>
//         ) : (
//           <>
//             {/* No Results State */}
//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="text-amber-500 text-xl font-medium mb-2">No products found</div>
//                 <div className="text-amber-400">You haven't added any products yet or no products match your search.</div>
//               </div>
//             ) : (
//               <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
//                 {filteredProducts.map((item) => (
//                   <Card 
//                     key={item.id} 
//                     className={`backdrop-blur-sm bg-white/30 hover:bg-white/40 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
//                   >
//                     <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full h-48'} overflow-hidden`}>
//                       <img 
//                         src={item.imageUrls?.[0] || "/api/placeholder/400/300"} 
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
//                         <span>Condition: {item.condition || 'N/A'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
//                         <MapPin className="h-4 w-4" />
//                         <span>{item.location || 'N/A'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-1 mb-4">
//                         {[...Array(5)].map((_, i) => (
//                           <Star 
//                             key={i} 
//                             className={`h-4 w-4 ${i < Math.floor(item.rating || 0) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
//                           />
//                         ))}
//                         <span className="text-xs text-amber-700 ml-1">{item.rating || 0}</span>
//                       </div>
                      
//                       <div className="flex gap-2">
//                         <Button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
//                           Edit Product
//                         </Button>
//                         <Button variant="outline" className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300">
//                           <MessageCircle className="h-4 w-4" />
//                         </Button>
//                         <Button variant="outline"  onClick={()=>{console.log("delete")}} className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300">
//                         <Delete size={32} className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductListUi;

// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { 
//   Search, 
//   MessageCircle, 
//   Heart,
//   Star, 
//   MapPin,
//   Tag,
//   Delete,
//   Save,
//   X
// } from 'lucide-react';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetFooter,
//   SheetClose
// } from '@/components/ui/sheet';

// const ProductListUi = ({ 
//   productData = [], 
//   loading = false, 
//   onUpdateProduct,
//   onDeleteProduct 
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewMode, setViewMode] = useState('grid');
//   const [filteredProducts, setFilteredProducts] = useState(productData);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [editedProduct, setEditedProduct] = useState({});

//   // Update filtered products when productData changes
//   React.useEffect(() => {
//     setFilteredProducts(productData);
//   }, [productData]);

//   // Handle search query input
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
    
//     // Filter products based on search query
//     const filtered = productData.filter(item => 
//       item.title.toLowerCase().includes(query.toLowerCase()) || 
//       (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
//     );
//     setFilteredProducts(filtered);
//   };

//   // Handle opening the edit sheet
//   const handleOpenEditSheet = (product) => {
//     setSelectedProduct(product);
//     setEditedProduct({...product});
//     setIsSheetOpen(true);
//   };

//   // Handle input changes in the edit form
//   const handleEditInputChange = (field, value) => {
//     setEditedProduct(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Handle save changes
//   const handleSaveChanges = () => {
//     if (onUpdateProduct) {
//       onUpdateProduct(editedProduct);
//     }
//     setIsSheetOpen(false);
//   };

//   // Handle delete product
//   const handleDeleteProduct = () => {
//     if (onDeleteProduct && selectedProduct) {
//       onDeleteProduct(selectedProduct._id);
//     }
//     setIsSheetOpen(false);
//   };

//   return (
//     <div className="bg-white p-6 min-h-screen overflow-x-hidden w-full">
//       {/* Search Header */}
//       <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg border border-white/20 p-6 mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-grow">
//             <Input 
//               placeholder="Search your products..." 
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="pl-10 pr-4 py-3 bg-white/70 border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-lg shadow-inner"
//             />
//             <Search className="absolute left-3 top-3 h-5 w-5 text-amber-400" />
//           </div>
          
//           {/* View Toggle */}
//           <div className="flex rounded-md overflow-hidden border border-amber-200">
//             <Button 
//               variant={viewMode === 'grid' ? 'default' : 'ghost'}
//               className={`h-10 w-10 p-0 rounded-none ${viewMode === 'grid' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//               onClick={() => setViewMode('grid')}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="3" width="7" height="7" />
//                 <rect x="14" y="3" width="7" height="7" />
//                 <rect x="3" y="14" width="7" height="7" />
//                 <rect x="14" y="14" width="7" height="7" />
//               </svg>
//             </Button>
//             <Button 
//               variant={viewMode === 'list' ? 'default' : 'ghost'}
//               className={`h-10 w-10 p-0 rounded-none ${viewMode === 'list' ? 'bg-amber-500' : 'bg-white/60 hover:bg-white/80'}`}
//               onClick={() => setViewMode('list')}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="3" y1="6" x2="21" y2="6" />
//                 <line x1="3" y1="12" x2="21" y2="12" />
//                 <line x1="3" y1="18" x2="21" y2="18" />
//               </svg>
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       {/* Product List */}
//       <div className="overflow-y-auto" style={{ height: "calc(100vh - 140px)" }}>
//         {/* Loading State */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//           </div>
//         ) : (
//           <>
//             {/* No Results State */}
//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="text-amber-500 text-xl font-medium mb-2">No products found</div>
//                 <div className="text-amber-400">You haven't added any products yet or no products match your search.</div>
//               </div>
//             ) : (
//               <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
//                 {filteredProducts.map((item) => (
//                   <Card 
//                     key={item._id} 
//                     className={`backdrop-blur-sm bg-white/30 hover:bg-white/40 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
//                   >
//                     <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full h-48'} overflow-hidden`}>
//                       <img 
//                         src={item.imageUrls?.[0] || "/api/placeholder/400/300"} 
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
//                         <span>Condition: {item.condition || 'N/A'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
//                         <MapPin className="h-4 w-4" />
//                         <span>{item.location || 'N/A'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-1 mb-4">
//                         {[...Array(5)].map((_, i) => (
//                           <Star 
//                             key={i} 
//                             className={`h-4 w-4 ${i < Math.floor(item.rating || 0) ? 'fill-amber-500 text-amber-500' : 'fill-gray-200 text-gray-200'}`}
//                           />
//                         ))}
//                         <span className="text-xs text-amber-700 ml-1">{item.rating || 0}</span>
//                       </div>
                      
//                       <div className="flex gap-2">
//                         <Button 
//                           className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
//                           onClick={() => handleOpenEditSheet(item)}
//                         >
//                           Edit Product
//                         </Button>
//                         <Button variant="outline" className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300">
//                           <MessageCircle className="h-4 w-4" />
//                         </Button>
//                         <Button 
//                           variant="outline"  
//                           onClick={() => handleOpenEditSheet(item)} 
//                           className="bg-white/50 border-amber-200 hover:bg-amber-100/50 text-amber-700 transition-all duration-300"
//                         >
//                           <Delete className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
      
//       {/* Edit Product Sheet */}
//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
//           <SheetHeader>
//             <SheetTitle>Edit Product</SheetTitle>
//             <SheetDescription>
//               Make changes to your product details. Click save when you're done.
//             </SheetDescription>
//           </SheetHeader>
          
//           {selectedProduct && (
//             <div className="py-4 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Product Title</Label>
//                   <Input 
//                     id="title" 
//                     value={editedProduct.title || ''} 
//                     onChange={(e) => handleEditInputChange('title', e.target.value)}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="price">Price ($)</Label>
//                   <Input 
//                     id="price" 
//                     type="number" 
//                     value={editedProduct.price || ''} 
//                     onChange={(e) => handleEditInputChange('price', parseFloat(e.target.value))}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="category">Category</Label>
//                   <Input 
//                     id="category" 
//                     value={editedProduct.category || ''} 
//                     onChange={(e) => handleEditInputChange('category', e.target.value)}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="condition">Condition</Label>
//                   <Input 
//                     id="condition" 
//                     value={editedProduct.condition || ''} 
//                     onChange={(e) => handleEditInputChange('condition', e.target.value)}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="location">Location</Label>
//                   <Input 
//                     id="location" 
//                     value={editedProduct.location || ''} 
//                     onChange={(e) => handleEditInputChange('location', e.target.value)}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="originalPrice">Original Price ($)</Label>
//                   <Input 
//                     id="originalPrice" 
//                     type="number" 
//                     value={editedProduct.originalPrice || ''} 
//                     onChange={(e) => handleEditInputChange('originalPrice', parseFloat(e.target.value))}
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea 
//                   id="description" 
//                   value={editedProduct.description || ''} 
//                   onChange={(e) => handleEditInputChange('description', e.target.value)}
//                   rows={4}
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label>Product Image</Label>
//                 <div className="rounded-lg overflow-hidden h-48 w-full">
//                   <img 
//                     src={editedProduct.imageUrls?.[0] || "/api/placeholder/400/300"} 
//                     alt={editedProduct.title} 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <SheetFooter className="flex justify-between mt-4 space-x-4">
//             <Button 
//               variant="destructive" 
//               onClick={handleDeleteProduct}
//               className="flex-1"
//             >
//               <Delete className="h-4 w-4 mr-2" />
//               Delete
//             </Button>
            
//             <div className="flex space-x-2 flex-1">
//               <SheetClose asChild>
//                 <Button 
//                   variant="outline" 
//                   className="flex-1"
//                 >
//                   <X className="h-4 w-4 mr-2" />
//                   Cancel
//                 </Button>
//               </SheetClose>
              
//               <Button 
//                 onClick={handleSaveChanges} 
//                 className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600"
//               >
//                 <Save className="h-4 w-4 mr-2" />
//                 Save
//               </Button>
//             </div>
//           </SheetFooter>
       
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default ProductListUi;
  //working
  // import React, { useState } from 'react';
  // import { Card, CardContent } from '@/components/ui/card';
  // import { Input } from '@/components/ui/input';
  // import { Button } from '@/components/ui/button';
  // import { Label } from '@/components/ui/label';
  // import { Textarea } from '@/components/ui/textarea';
  // import { 
  //   Search, 
  //   MessageCircle, 
  //   Heart,
  //   Star, 
  //   MapPin,
  //   Tag,
  //   Delete,
  //   Save,
  //   X,
  //   Grid,
  //   List
  // } from 'lucide-react';
  // import {
  //   Sheet,
  //   SheetContent,
  //   SheetHeader,
  //   SheetTitle,
  //   SheetDescription,
  //   SheetFooter,
  //   SheetClose
  // } from '@/components/ui/sheet';

  // const ProductListUi = ({ 
  //   productData = [], 
  //   loading = false, 
  //   onUpdateProduct,
  //   onDeleteProduct 
  // }) => {
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [viewMode, setViewMode] = useState('grid');
  //   const [filteredProducts, setFilteredProducts] = useState(productData);
  //   const [selectedProduct, setSelectedProduct] = useState(null);
  //   const [isSheetOpen, setIsSheetOpen] = useState(false);
  //   const [editedProduct, setEditedProduct] = useState({});

  //   // Update filtered products when productData changes
  //   React.useEffect(() => {
  //     setFilteredProducts(productData);
  //   }, [productData]);

  //   // Handle search query input
  //   const handleSearchChange = (e) => {
  //     const query = e.target.value;
  //     setSearchQuery(query);
      
  //     // Filter products based on search query
  //     const filtered = productData.filter(item => 
  //       item.title.toLowerCase().includes(query.toLowerCase()) || 
  //       (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  //     );
  //     setFilteredProducts(filtered);
  //   };

  //   // Handle opening the edit sheet
  //   const handleOpenEditSheet = (product) => {
  //     setSelectedProduct(product);
  //     setEditedProduct({...product});
      
  //     setIsSheetOpen(true);
  //   };

  //   // Handle input changes in the edit form
  //   const handleEditInputChange = (field, value) => {
  //     setEditedProduct(prev => ({
  //       ...prev,
  //       [field]: value
  //     }));
  //   };

  //   // Handle save changes
  //   const handleSaveChanges = () => {
  //     if (onUpdateProduct) {
  //       onUpdateProduct(editedProduct);
  //     }
  //     setIsSheetOpen(false);
  //   };

  //   // Handle delete product
  //   // Replace the existing handleDeleteProduct function in ProductListUi
  // const handleDeleteProduct = () => {
  //   if (onDeleteProduct && selectedProduct) {
  //     // Close the sheet before deleting to avoid rendering issues
  //     setIsSheetOpen(false);
  //     // Use setTimeout to ensure the sheet is closed before deletion starts
  //     setTimeout(() => {
  //       onDeleteProduct(selectedProduct._id);
  //     }, 100);
  //   }
  // };

  //   return (
  //     <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-4 min-h-screen overflow-x-hidden w-full">
  //       {/* Search Header */}
  //       <div className="backdrop-blur-sm rounded-lg shadow-sm border border-amber-100 p-3 mb-4">
  //         <div className="flex flex-col md:flex-row gap-3">
  //           <div className="relative flex-grow">
  //             <Input 
  //               placeholder="Search products..." 
  //               value={searchQuery}
  //               onChange={handleSearchChange}
  //               className="pl-8 pr-3 py-2 text-sm bg-white/80 border-none outline-none focus:outline-none focus:ring-2 focus:ring-amber-300/50 rounded-md shadow-sm transition-all duration-300 focus:border-none"
  //               />
  //             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-400" />
  //           </div>
            
  //           {/* View Toggle */}
  //           <div className="flex rounded-md overflow-hidden border border-amber-200/60 shadow-sm">
  //             <Button 
  //               variant={viewMode === 'grid' ? 'default' : 'ghost'}
  //               className={`h-8 w-8 p-0 rounded-none ${viewMode === 'grid' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' : 'bg-white/70 hover:bg-white/90 text-amber-700'}`}
  //               onClick={() => setViewMode('grid')}
  //             >
  //               <Grid className="h-3.5 w-3.5" />
  //             </Button>
  //             <Button 
  //               variant={viewMode === 'list' ? 'default' : 'ghost'}
  //               className={`h-8 w-8 p-0 rounded-none ${viewMode === 'list' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' : 'bg-white/70 hover:bg-white/90 text-amber-700'}`}
  //               onClick={() => setViewMode('list')}
  //             >
  //               <List className="h-3.5 w-3.5" />
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
        
  //       {/* Product List */}
  //       <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-4 min-h-screen overflow-x-hidden w-full">        {/* Loading State */}
  //         {loading ? (
  //           <div className="flex justify-center items-center h-48">
  //             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
  //           </div>
  //         ) : (
  //           <>
  //             {/* No Results State */}
  //             {filteredProducts.length === 0 ? (
  //               <div className="text-center py-12 bg-white/40 rounded-lg shadow-sm">
  //                 <div className="text-amber-500 text-lg font-medium mb-1">No products found</div>
  //                 <div className="text-amber-400 text-sm">You haven't added any products yet or no products match your search.</div>
  //               </div>
  //             ) : (
  //               <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-3`}>
  //                 {filteredProducts.map((item) => (
  //                   <Card 
  //                     key={item._id} 
  //                     className={`backdrop-blur-sm bg-white/60 hover:bg-white/70 border border-amber-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
  //                   >
  //                     <div className={`relative ${viewMode === 'list' ? 'w-1/4' : 'w-full h-36'} overflow-hidden`}>
  //                       <img 
  //                         src={item.imageUrls?.[0] || "/api/placeholder/400/300"} 
  //                         alt={item.title} 
  //                         className="w-full h-full object-cover"
  //                       />
  //                       <Button 
  //                         variant="ghost" 
  //                         size="icon" 
  //                         className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/70 hover:bg-white text-amber-500 shadow-sm"
  //                       >
  //                         <Heart className="h-3 w-3" />
  //                       </Button>
  //                     </div>
                      
  //                     <CardContent className={`p-3 ${viewMode === 'list' ? 'w-3/4' : ''}`}>
  //                       <div className="flex justify-between items-start mb-1.5">
  //                         <h3 className="font-medium text-sm text-amber-800 truncate">{item.title}</h3>
  //                         <div className="font-bold text-sm text-amber-700">${item.price}</div>
  //                       </div>
                        
  //                       <div className="flex items-center gap-1.5 text-xs text-amber-700 mb-1">
  //                         <Tag className="h-3 w-3" />
  //                         <span className="truncate">Condition: {item.condition || 'N/A'}</span>
  //                       </div>
                        
  //                       <div className="flex items-center gap-1.5 text-xs text-amber-700 mb-1.5">
  //                         <MapPin className="h-3 w-3" />
  //                         <span className="truncate">{item.location || 'N/A'}</span>
  //                       </div>
                        
  //                       <div className="flex items-center gap-0.5 mb-2">
  //                         {[...Array(5)].map((_, i) => (
  //                           <Star 
  //                             key={i} 
  //                             className={`h-3 w-3 ${i < Math.floor(item.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
  //                           />
  //                         ))}
  //                         <span className="text-xs text-amber-700 ml-1">{item.rating || 0}</span>
  //                       </div>
                        
  //                       <div className="flex gap-1.5">
  //                         <Button 
  //                           size="sm"
  //                           className="flex-1 h-7 text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-sm hover:shadow-md transition-all duration-300"
  //                           onClick={() => handleOpenEditSheet(item)}
  //                         >
  //                           Edit
  //                         </Button>
  //                         <Button 
  //                           size="sm"
  //                           variant="outline" 
  //                           className="h-7 w-7 p-0 bg-white/50 border-amber-200/50 hover:bg-amber-100/30 text-amber-700 transition-all duration-300"
  //                         >
  //                           <MessageCircle className="h-3 w-3" />
  //                         </Button>
  //                         <Button 
  //                           size="sm"
  //                           variant="outline"  
  //                           onClick={() => handleOpenEditSheet(item)} 
  //                           className="h-7 w-7 p-0 bg-white/50 border-amber-200/50 hover:bg-amber-100/30 text-amber-700 transition-all duration-300"
  //                         >
  //                           <Delete className="h-3 w-3" />
  //                         </Button>
  //                       </div>
  //                     </CardContent>
  //                   </Card>
  //                 ))}
  //               </div>
  //             )}
  //           </>
  //         )}
  //       </div>
        
  //       {/* Edit Product Sheet */}
  //       <Sheet open={isSheetOpen}  onOpenChange={setIsSheetOpen}>
  //         <SheetContent className="sm:max-w-md overflow-y-auto bg-gradient-to-b from-amber-50 to-amber-100/70 border-l border-amber-200/50">
  //           <SheetHeader className="mb-1">{console.log(editedProduct)}
  //             <SheetTitle className="text-amber-800">Edit Product</SheetTitle>
  //             <SheetDescription className="text-amber-600 text-sm">
  //               Make changes to your product details.
  //             </SheetDescription>
  //           </SheetHeader>
            
  //           {selectedProduct && (
  //             <div className=" space-y-3 pl-2 pr-2">
  //               <div className="grid grid-cols-2 gap-3">
  //                 <div className="space-y-1.5">
  //                   <Label htmlFor="title" className="text-xs text-amber-700">Product Title</Label>
  //                   <Input 
  //   id="title" 
  //   value={editedProduct.title || ''} 
  //   onChange={(e) => handleEditInputChange('title', e.target.value)}
  //   className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
  // />

  //                 </div>
                  
  //                 <div className="space-y-1.5">
  //                   <Label htmlFor="price" className="text-xs text-amber-700">Price ($)</Label>
  //                   <Input 
  //                     id="price" 
  //                     type="number" 
  //                     value={editedProduct.price || ''} 
  //                     onChange={(e) => handleEditInputChange('price', parseFloat(e.target.value))}
  //                     className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
  //                     />
  //                 </div>
                  
  //                 <div className="space-y-1.5">
  //                   <Label htmlFor="category" className="text-xs text-amber-700">Category</Label>
  //                   <Input 
  //                     id="category" 
  //                     value={editedProduct.category || ''} 
  //                     onChange={(e) => handleEditInputChange('category', e.target.value)}
  //                     className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
  //                     />
  //                 </div>
                  
  //                 <div className="space-y-1.5">
  //                   <Label htmlFor="condition" className="text-xs text-amber-700">Condition</Label>
  //                   <Input 
  //                     id="condition" 
  //                     value={editedProduct.condition || ''} 
  //                     onChange={(e) => handleEditInputChange('condition', e.target.value)}
  //                     className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
  //                     />
  //                 </div>
                  
  //                 <div className="space-y-1.5">
  //                   <Label htmlFor="location" className="text-xs text-amber-700">Location</Label>
  //                   <Input 
  //                     id="location" 
  //                     value={editedProduct.location || ''} 
  //                     onChange={(e) => handleEditInputChange('location', e.target.value)}
  //                     className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
  //                     />
  //                 </div>
                  
  //                 <div className="space-y-1.5">
  //                   <Label htmlFor="originalPrice" className="text-xs text-amber-700">Original Price ($)</Label>
  //                   <Input 
  //                     id="originalPrice" 
  //                     type="number" 
  //                     value={editedProduct.originalPrice || ''} 
  //                     onChange={(e) => handleEditInputChange('originalPrice', parseFloat(e.target.value))}
  //                     className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
  //                     />
  //                 </div>
  //               </div>
                
  //               <div className="space-y-1.5">
  //                 <Label htmlFor="description" className="text-xs text-amber-700">Description</Label>
  //                 <Textarea 
  //                   id="description" 
  //                   value={editedProduct.description || ''} 
  //                   onChange={(e) => handleEditInputChange('description', e.target.value)}
  //                   rows={3}
  //                   className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
  //                   />
  //               </div>
                
  //               <div className="space-y-1.5">
  //                 <Label className="text-xs text-amber-700">Product Image</Label>
  //                 {/* <div className="rounded-md overflow-hidden h-20 w-20 bg-white/50 border border-amber-200/30">
  //   <img 
  //     src={editedProduct.imageUrls?.[0] || "/api/placeholder/400/300"}
  //     alt={editedProduct.title} 
  //     className="w-full h-full object-contain"
  //   />
  //   {console.log(editedProduct.imageUrls?.[0], "yess")}
  // </div> */}
  // <div className="pl-2 flex flex-wrap gap-4">
  //   {editedProduct.imageUrls?.map((url, index) => (
  //     <div
  //       key={index}
  //       className="relative rounded-md overflow-hidden h-20 w-28 bg-white/50 border border-amber-200/30"
  //     >
  //       <img
  //         src={url || "/api/placeholder/400/300"}
  //         alt={`Image ${index + 1}`}
  //         className="w-full h-full object-contain"
  //       />
  //       <button
  //         onClick={() => console.log(`Deleting image ${index + 1}`)} // Replace with your onDelete logic
  //         className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition duration-200 shadow-md"
  //       >
  //         <X className="h-2 w-2" />
  //       </button>
  //       {/* {console.log(url, `Image ${index + 1}`)} */}
  //     </div>
  //   ))}
  // </div>

  //               </div>
  //             </div>
  //           )}
            
  //           <SheetFooter className="flex justify-between mt-4 space-x-3">
  //             {/* <Button 
  //               variant="destructive" 
  //               onClick={handleDeleteProduct}
  //               className="flex-1 h-8 text-xs"
  //               size="sm"
  //             >
  //               <Delete className="h-3.5 w-3.5 mr-1.5" />
  //               Delete
  //             </Button> */}
              
  //             <div className="flex space-x-2 flex-1">
  //               <SheetClose asChild>
  //                 <Button 
  //                   variant="outline" 
  //                   className="flex-1 h-8 text-xs bg-white/60 border-amber-200/50"
  //                   size="sm"
  //                 >
  //                   <X className="h-3.5 w-3.5 mr-1.5" />
  //                   Delete
  //                 </Button>
  //               </SheetClose>
                
  //               <Button 
  //                 onClick={handleSaveChanges} 
  //                 className="flex-1 h-8 text-xs bg-gradient-to-r from-amber-400 to-amber-500"
  //                 size="sm"
  //               >
  //                 <Save className="h-3.5 w-3.5 mr-1.5" />
  //                 Save
  //               </Button>
  //             </div>
  //           </SheetFooter>
  //         </SheetContent>
  //       </Sheet>
  //     </div>
  //   );
  // };

  // export default ProductListUi;




  import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Search, 
    MessageCircle, 
    Heart,
    Star, 
    MapPin,
    Tag,
    Delete,
    Save,
    X,
    Grid,
    List,
    Plus,
    Camera
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose
} from '@/components/ui/sheet';

const ProductListUi = ({
    productData,
    loading,
    searchQuery,
    onSearchChange,
    viewMode,
    onViewModeChange,
    filteredProducts,
    isSheetOpen,
    onSheetOpenChange,
    selectedProduct,
    editedProduct,
    handleImageUpload,
    previewImages,
    onEditInputChange,
    onOpenEditSheet,
    onSaveChanges,
    onDeleteProduct,
    handleRemoveImage,
    onDeleteImage // New prop for image deletion
}) => {
    return (
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-4 min-h-screen overflow-x-hidden w-full">
            {/* Search Header */}
            <div className="backdrop-blur-sm rounded-lg shadow-sm border border-amber-100 p-3 mb-4">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Input 
                            placeholder="Search products..." 
                            value={searchQuery}
                            onChange={onSearchChange}
                            className="pl-8 pr-3 py-2 text-sm bg-white/80 border-none outline-none focus:outline-none focus:ring-2 focus:ring-amber-300/50 rounded-md shadow-sm transition-all duration-300 focus:border-none"
                        />
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-amber-400" />
                    </div>
                    
                    {/* View Toggle */}
                    <div className="flex rounded-md overflow-hidden border border-amber-200/60 shadow-sm">
                        <Button 
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            className={`h-8 w-8 p-0 rounded-none ${viewMode === 'grid' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' : 'bg-white/70 hover:bg-white/90 text-amber-700'}`}
                            onClick={() => onViewModeChange('grid')}
                        >
                            <Grid className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            className={`h-8 w-8 p-0 rounded-none ${viewMode === 'list' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' : 'bg-white/70 hover:bg-white/90 text-amber-700'}`}
                            onClick={() => onViewModeChange('list')}
                        >
                            <List className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Product List */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-4 min-h-screen overflow-x-hidden w-full">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12 bg-white/40 rounded-lg shadow-sm">
                                <div className="text-amber-500 text-lg font-medium mb-1">No products found</div>
                                <div className="text-amber-400 text-sm">You haven't added any products yet or no products match your search.</div>
                            </div>
                        ) : (
                            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-3`}>
                                {filteredProducts.map((item) => (
                                    <Card 
                                        key={item._id} 
                                        className={`backdrop-blur-sm bg-white/60 hover:bg-white/70 border border-amber-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
                                    >
                                        <div className={`relative ${viewMode === 'list' ? 'w-1/4' : 'w-full h-36'} overflow-hidden`}>
                                            <img 
                                                src={item.imageUrls?.[0] || "/api/placeholder/400/300"} 
                                                alt={item.title} 
                                                className="w-full h-full object-cover"
                                            />
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/70 hover:bg-white text-amber-500 shadow-sm"
                                            >
                                                <Heart className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        
                                        <CardContent className={`p-3 ${viewMode === 'list' ? 'w-3/4' : ''}`}>
                                            <div className="flex justify-between items-start mb-1.5">
                                                <h3 className="font-medium text-sm text-amber-800 truncate">{item.title}</h3>
                                                <div className="font-bold text-sm text-amber-700">${item.price}</div>
                                            </div>
                                            
                                            <div className="flex items-center gap-1.5 text-xs text-amber-700 mb-1">
                                                <Tag className="h-3 w-3" />
                                                <span className="truncate">Condition: {item.condition || 'N/A'}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-1.5 text-xs text-amber-700 mb-1.5">
                                                <MapPin className="h-3 w-3" />
                                                <span className="truncate">{item.location || 'N/A'}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-0.5 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={`h-3 w-3 ${i < Math.floor(item.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                                    />
                                                ))}
                                                <span className="text-xs text-amber-700 ml-1">{item.rating || 0}</span>
                                            </div>
                                            
                                            <div className="flex gap-1.5">
                                                <Button 
                                                    size="sm"
                                                    className="flex-1 h-7 text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-sm hover:shadow-md transition-all duration-300"
                                                    onClick={() => onOpenEditSheet(item)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    size="sm"
                                                    variant="outline" 
                                                    className="h-7 w-7 p-0 bg-white/50 border-amber-200/50 hover:bg-amber-100/30 text-amber-700 transition-all duration-300"
                                                >
                                                    <MessageCircle className="h-3 w-3" />
                                                </Button>
                                                <Button 
                                                    size="sm"
                                                    variant="outline"  
                                                    onClick={() => onOpenEditSheet(item)} 
                                                    className="h-7 w-7 p-0 bg-white/50 border-amber-200/50 hover:bg-amber-100/30 text-amber-700 transition-all duration-300"
                                                >
                                                    <Delete className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            
            {/* Edit Product Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={onSheetOpenChange}>
                <SheetContent className="sm:max-w-md overflow-y-auto bg-gradient-to-b from-amber-50 to-amber-100/70 border-l border-amber-200/50">
                    <SheetHeader className="mb-1">
                        <SheetTitle className="text-amber-800">Edit Product</SheetTitle>
                        <SheetDescription className="text-amber-600 text-sm">
                            Make changes to your product details.
                        </SheetDescription>
                    </SheetHeader>
                    
                    {selectedProduct && (
                        <div className="space-y-3 pl-2 pr-2">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="title" className="text-xs text-amber-700">Product Title</Label>
                                    <Input 
                                        id="title" 
                                        value={editedProduct.title || ''} 
                                        onChange={(e) => onEditInputChange('title', e.target.value)}
                                        className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
                                    />
                                </div>
                                
                                <div className="space-y-1.5">
                                    <Label htmlFor="price" className="text-xs text-amber-700">Price ($)</Label>
                                    <Input 
                                        id="price" 
                                        type="number" 
                                        value={editedProduct.price || ''} 
                                        onChange={(e) => onEditInputChange('price', parseFloat(e.target.value))}
                                        className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
                                    />
                                </div>
                                
                                <div className="space-y-1.5">
                                    <Label htmlFor="category" className="text-xs text-amber-700">Category</Label>
                                    <Input 
                                        id="category" 
                                        value={editedProduct.category || ''} 
                                        onChange={(e) => onEditInputChange('category', e.target.value)}
                                        className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
                                    />
                                </div>
                                
                                <div className="space-y-1.5">
                                    <Label htmlFor="condition" className="text-xs text-amber-700">Condition</Label>
                                    <Input 
                                        id="condition" 
                                        value={editedProduct.condition || ''} 
                                        onChange={(e) => onEditInputChange('condition', e.target.value)}
                                        className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
                                    />
                                </div>
                                
                                <div className="space-y-1.5">
                                    <Label htmlFor="location" className="text-xs text-amber-700">Location</Label>
                                    <Input 
                                        id="location" 
                                        value={editedProduct.location || ''} 
                                        onChange={(e) => onEditInputChange('location', e.target.value)}
                                        className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
                                    />
                                </div>
                                
                                <div className="space-y-1.5">
                                    <Label htmlFor="originalPrice" className="text-xs text-amber-700">Original Price ($)</Label>
                                    <Input 
                                        id="originalPrice" 
                                        type="number" 
                                        value={editedProduct.originalPrice || ''} 
                                        onChange={(e) => onEditInputChange('originalPrice', parseFloat(e.target.value))}
                                        className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <Label htmlFor="description" className="text-xs text-amber-700">Description</Label>
                                <Textarea 
                                    id="description" 
                                    value={editedProduct.description || ''} 
                                    onChange={(e) => onEditInputChange('description', e.target.value)}
                                    rows={3}
                                    className="h-8 text-sm bg-white/80 border border-amber-200/50 hover:border-amber-300 focus:border-amber-400 focus:ring-1 focus-visible:ring-1 focus:outline-none transition-colors duration-200"
                                />
                                 {previewImages.map((image, index) => (
                    <div key={index} className=" h-20 w-20 relative aspect-square rounded-lg overflow-hidden bg-amber-50">
                      <img src={image} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                                <label className="h-30 w-30 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 border border-dashed border-amber-200 rounded-md cursor-pointer hover:bg-amber-100 transition-colors px-2">
    <Camera className="w-3.5 h-3.5 text-amber-500 mr-2" />
    <span className="text-amber-700 text-xs font-medium">Add Image</span>
    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={handleImageUpload}
                    />
  </label>
</div>
                            
                            <div className="space-y-1.5">
                                <Label className="text-xs text-amber-700">Product Image</Label>
                                <div className="pl-2 flex flex-wrap gap-4">
                                    {editedProduct.imageUrls?.map((url, index) => (
                                        <div
                                            key={index}
                                            className="relative rounded-md overflow-hidden h-20 w-28 bg-white/50 border border-amber-200/30"
                                        >
                                            <img
                                                src={url || "/api/placeholder/400/300"}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                onClick={() => onDeleteImage(index)} // Pass index to handler
                                                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition duration-200 shadow-md"
                                            >
                                                <X className="h-2 w-2" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <SheetFooter className="flex justify-between mt-4 space-x-3">
                        <div className="flex space-x-2 flex-1">
                        
                            <SheetClose asChild>
                                <Button 
                                    variant="outline" 
                                    className="flex-1 h-8 text-xs bg-white/60 border-amber-200/50"
                                    size="sm"
                                >
                                    <X className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                                    Cancel
                                </Button>
                            </SheetClose>
                            
                            <Button 
                                onClick={onSaveChanges} 
                                className="flex-1 h-8 text-xs bg-gradient-to-r  bg-white/60 border-amber-200/50"
                                size="sm"
                            >
                                <Save className="h-3.5 w-3.5 mr-1.5" />
                                Save
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ProductListUi;