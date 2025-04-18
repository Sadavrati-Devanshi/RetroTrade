// import React, { useState, useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllProducts } from '../../store/Seller/productSlice';
// import ProductListUi from './ProductsListUi';

// const ProductListController = () => {
//   const dispatch = useDispatch();

//   // Access Redux state for products
//   const productList = useSelector(state => state.sellerProducts?.productList || []);
//   const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);
  
//   // Access user authentication data
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   // Track data fetching state
//   const [dataFetched, setDataFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchAllProducts());
//         setDataFetched(true);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setDataFetched(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   // Filter products to only show those created by the current user
//   const userProducts = useMemo(() => {
//     if (!dataFetched || !user) return [];

//     // Filter for products created by current user
//     const filteredByUser = productList.filter(product => 
//       product?.createdBy === user.id
//     );

//     return filteredByUser;
//   }, [productList, user, dataFetched]);

//   // Log user products after they've been filtered
//   useEffect(() => {
//     if (dataFetched && userProducts.length) {
//       console.log('✅ User Products:', userProducts);
//     }
//   }, [userProducts, dataFetched]);

//   if (!isAuthenticated) {
//     return <div>Please log in to view your products</div>;
//   }

//   if (!dataFetched || isLoading) {
//     return <div>Loading your products...</div>;
//   }

//   return (
//     <ProductListUi 
//       productData={userProducts}
//       loading={isLoading}
//     />
//   );
// };

// export default ProductListController;
// import React, { useState, useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ProductListUi from './ProductsListUi';
// import { fetchAllProducts, deleteProduct } from '../../store/Seller/productSlice';
// import { toast } from 'sonner';

// const ProductListController = () => {
//   const dispatch = useDispatch();
  
//   // Access Redux state
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const productList = useSelector(state => state.sellerProducts?.productList || []);
//   const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);
  
//   // Local state to track data fetching
//   const [dataFetched, setDataFetched] = useState(false);
//   const [deletingProduct, setDeletingProduct] = useState(false);

//   // Fetch products on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//           await dispatch(fetchAllProducts());
//           setDataFetched(true);
//         } catch (err) {
//           console.error('Error fetching products:', err);
//           toast({
//             title: "Error",
//             description: "Failed to load products. Please try again.",
//           });
//           // Don't return the toast call
//         }
//       };

//     fetchData();
//   }, [dispatch]);

//   // Filter products to only show those created by the current user
//   const userProducts = useMemo(() => {
//     if (!dataFetched || !user) return [];

//     // Filter for products created by current user
//     return productList.filter(product => 
//       product?.createdBy === user.id
//     );
//   }, [productList, user, dataFetched]);

//   // Handle product deletion
//   const handleDeleteProduct = async (productId) => {
//     try {
//       setDeletingProduct(true);
//       const result = await dispatch(deleteProduct(productId)).unwrap();
      
//       // Make sure to not return the toast call
//       toast({
//         title: "Success",
//         description: "Product deleted successfully",
//       });
      
//       // Fetch products again to update the list
//       await dispatch(fetchAllProducts());
//     } catch (err) {
//       console.error('Error deleting product:', err);
//       toast({
//         title: "Error",
//         description: "Failed to delete product. Please try again.",
//       });
//     } finally {
//       setDeletingProduct(false);
//     }
//   };
  

//   // Show auth check
//   if (!isAuthenticated) {
//     return <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         <div className="text-xl font-medium mb-2">Please log in to view your products</div>
//       </div>
//     </div>;
//   }

//   // Show loading state
//   if ((isLoading && !dataFetched) || deletingProduct) {
//     return <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//     </div>;
//   }

//   return (
//     <ProductListUi 
//       productData={userProducts}
//       loading={isLoading} 
//       onDeleteProduct={handleDeleteProduct}
//     />
//   );
// };

// export default ProductListController;
// import React, { useState, useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ProductListUi from './ProductsListUi';
// import { fetchAllProducts, deleteProduct, deleteImage, editProduct } from '../../store/Seller/productSlice';
// import { toast } from 'sonner';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';

// const ProductListController = () => {
//     const dispatch = useDispatch();
    
//     // Redux state
//     const { user, isAuthenticated } = useSelector((state) => state.auth);
//     const productList = useSelector(state => state.sellerProducts?.productList || []);
//     const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);
    
//     // Local state
//     const [dataFetched, setDataFetched] = useState(false);
//     const [deletingProduct, setDeletingProduct] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [viewMode, setViewMode] = useState('grid');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [isSheetOpen, setIsSheetOpen] = useState(false);
//     const [editedProduct, setEditedProduct] = useState({});
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [imageIndexToDelete, setImageIndexToDelete] = useState(null);
//       const [images, setImages] = useState([]);
//         const [previewImages, setPreviewImages] = useState([]);
      
    
//     // Fetch products on mount
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await dispatch(fetchAllProducts());
//                 setDataFetched(true);
//             } catch (err) {
//                 console.error('Error fetching products:', err);
//                 toast(
//                    "Failed to load products. Please try again.",
//                 );
//             }
//         };
//         fetchData();
//     }, [dispatch]);

//     // Filter products for the current user
//     const userProducts = useMemo(() => {
//         if (!dataFetched || !user) return [];
//         return productList.filter(product => product?.createdBy === user.id);
//     }, [productList, user, dataFetched]);

//     // Update filtered products when userProducts or searchQuery changes
//     useEffect(() => {
//         const filtered = userProducts.filter(item => 
//             item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//             (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
//         );
//         setFilteredProducts(filtered);
//     }, [userProducts, searchQuery]);

//     // Event handlers
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleViewModeChange = (mode) => {
//         setViewMode(mode);
//     };

//     const handleOpenEditSheet = (product) => {
//         setSelectedProduct(product);
//         setEditedProduct({ ...product });
//         setIsSheetOpen(true);
//     };

//     const handleEditInputChange = (field, value) => {
//         setEditedProduct(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const handleImageUpload = (e) => {
//         const files = Array.from(e.target.files);
//         const validFiles = files.filter(file => file.type.startsWith('image/'));
        
//         if (validFiles.length !== files.length) {
//           alert('Some files were skipped because they are not valid images.');
//         }
        
//         setImages([...images, ...validFiles]);
//         console.log(images)
//         const newPreviewImages = validFiles.map(file => ({
//           file,
//           preview: URL.createObjectURL(file)
//         }));
        
//         setPreviewImages([...previewImages, ...newPreviewImages.map(img => img.preview)]);
//       };
//       const handleRemoveImage = (index) => {
//         const newPreviewImages = [...previewImages];
//         newPreviewImages.splice(index, 1);
//         setPreviewImages(newPreviewImages);
        
//         const newImages = [...images];
//         newImages.splice(index, 1);
//         setImages(newImages);
//       }
    
//     const handleSaveChanges = async () => {
//         try {
//             // Ensure _id is a string
//             const productId = typeof editedProduct._id === 'object' 
//                 ? editedProduct._id.$oid || editedProduct._id.toString() 
//                 : editedProduct._id;
    
//             // Prepare the data for update
//             const { _id, createdAt, updatedAt, __v, reviews, createdBy, ...updateData } = editedProduct;
    
//             // Log the data being sent for update
//             console.log('Product Data to be Updated:', JSON.stringify({ 
//                 id: productId, 
//                 updateData 
//             }, null, 2));
    
//             // Dispatch the edit product thunk
//             const response = await dispatch(editProduct({ 
//                 id: productId, 
//                 updateData 
//             })).unwrap();
    
//             // Log the response from the API
//             console.log('Edit Product API Response:', JSON.stringify(response, null, 2));
    
//             // Show success toast
//             toast.success("Product updated successfully");
    
//             // Close the sheet
//             setIsSheetOpen(false);
    
//             // Refetch products to ensure latest data
//             await dispatch(fetchAllProducts());
//         } catch (error) {
//             console.error('Error updating product:', error);
            
//             // Show error toast
//             toast.error("Failed to update product. Please try again.");
//         }
//     };
    

//     const handleDeleteProduct = async (productId) => {
//         try {
//             setDeletingProduct(true);
//             await dispatch(deleteProduct(productId)).unwrap();
//             toast(
//                  "Product deleted successfully"
//             );
//             await dispatch(fetchAllProducts());
//         } catch (err) {
//             console.error('Error deleting product:', err);
//             toast(
//               "Failed to delete product. Please try again."
//             );
//         } finally {
//             setDeletingProduct(false);
//             setIsSheetOpen(false);
//         }
//     };

//     const handleDeleteImage = (index) => {
//         setImageIndexToDelete(index);
//         setIsDialogOpen(true);
//     };

//     const confirmDeleteImage = async () => {
//         if (imageIndexToDelete !== null && editedProduct.imageUrls?.[imageIndexToDelete]) {
//             try {
//                 const imageUrl = editedProduct.imageUrls[imageIndexToDelete];
//                 await dispatch(deleteImage(imageUrl)).unwrap();
//                 toast(
//                     "Image deletion logged (check console)"
//                 );
//                 setEditedProduct(prev => {
//                     const updatedImageUrls = prev.imageUrls.filter((_, i) => i !== imageIndexToDelete);
                    
//                     // Log the updated image URLs
//                     console.log('Updated Image URLs after deletion:', updatedImageUrls);
                    
//                     return {
//                         ...prev,
//                         imageUrls: updatedImageUrls
//                     };
//                 });
//             } catch (err) {
//                 console.error('Error in deleteImage thunk:', err);
//                 toast(
//                    "Failed to process image deletion."// Fixed to use string
//                 );
//             } finally {
//                 setIsDialogOpen(false);
//                 setImageIndexToDelete(null);
//             }
//         }
//     };

//     // Authentication check
//     if (!isAuthenticated) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="text-center">
//                     <div className="text-xl font-medium mb-2">Please log in to view your products</div>
//                 </div>
//             </div>
//         );
//     }

//     // Loading state
//     if ((isLoading && !dataFetched) || deletingProduct) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <ProductListUi 
//                 productData={userProducts}
//                 loading={isLoading}
//                 searchQuery={searchQuery}
//                 onSearchChange={handleSearchChange}
//                 viewMode={viewMode}
//                 onViewModeChange={handleViewModeChange}
//                 filteredProducts={filteredProducts}
//                 isSheetOpen={isSheetOpen}
//                 onSheetOpenChange={setIsSheetOpen}
//                 selectedProduct={selectedProduct}
//                 editedProduct={editedProduct}
//                 onEditInputChange={handleEditInputChange}
//                 onOpenEditSheet={handleOpenEditSheet}
//                 onSaveChanges={handleSaveChanges}
//                 onDeleteProduct={handleDeleteProduct}
//                 onDeleteImage={handleDeleteImage}
//                 handleImageUpload ={handleImageUpload}
//                 previewImages = {previewImages}
//                 handleRemoveImage ={handleRemoveImage}
//             />

//             {/* Confirmation Dialog */}
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogContent className="sm:max-w-[425px]">
//                     <DialogHeader>
//                         <DialogTitle className="text-amber-800">Confirm Deletion</DialogTitle>
//                         <DialogDescription className="text-amber-600">
//                             Are you sure you want to delete this image? This action cannot be undone.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <DialogFooter>
//                         <Button 
//                             variant="outline" 
//                             onClick={() => setIsDialogOpen(false)}
//                             className="text-amber-700 border-amber-200 hover:bg-amber-100"
//                         >
//                             Cancel
//                         </Button>
//                         <Button 
//                             onClick={confirmDeleteImage}
//                             className="bg-red-500 hover:bg-red-600 text-white"
//                         >
//                             Delete
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };

// export default ProductListController;

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductListUi from './ProductsListUi';
import { fetchAllProducts, deleteProduct, deleteImage, editProduct } from '../../store/Seller/productSlice';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ProductListController = () => {
    const dispatch = useDispatch();
    
    // Redux state
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const productList = useSelector(state => state.sellerProducts?.productList || []);
    const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);
    
    // Local state
    const [dataFetched, setDataFetched] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageIndexToDelete, setImageIndexToDelete] = useState(null);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    
    // Fetch products on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchAllProducts());
                setDataFetched(true);
            } catch (err) {
                console.error('Error fetching products:', err);
                toast(
                   "Failed to load products. Please try again.",
                );
            }
        };
        fetchData();
    }, [dispatch]);

    // Filter products for the current user
    const userProducts = useMemo(() => {
        if (!dataFetched || !user) return [];
        return productList.filter(product => product?.createdBy === user.id);
    }, [productList, user, dataFetched]);

    // Update filtered products when userProducts or searchQuery changes
    useEffect(() => {
        const filtered = userProducts.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredProducts(filtered);
    }, [userProducts, searchQuery]);

    // Upload images to Cloudinary
    const uploadImages = async (imagesToUpload) => {
        if (imagesToUpload.length === 0) return [];
        
        setIsUploading(true);
        
        try {
            const formDataObj = new FormData();
            imagesToUpload.forEach(image => {
                formDataObj.append('files', image);
            });
            
            console.log(`Uploading ${imagesToUpload.length} new images...`);
            
            const response = await fetch('http://localhost:5000/api/seller/products/upload-image', {
                method: 'POST',
                body: formDataObj,
                credentials: 'include',
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Server error (${response.status}): ${errorText}`);
                throw new Error(`Server error: ${response.status}`);
            }
            
            const result = await response.json();
            console.log("Upload response:", result);
            
            if (result.urls && Array.isArray(result.urls)) {
                return result.urls;
            } else {
                console.error("Unexpected response format:", result);
                return [];
            }
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    // Event handlers
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    const handleOpenEditSheet = (product) => {
        setSelectedProduct(product);
        setEditedProduct({ ...product });
        setIsSheetOpen(true);
        setImages([]);
        setPreviewImages([]);
    };

    const handleEditInputChange = (field, value) => {
        setEditedProduct(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (validFiles.length !== files.length) {
            toast.warning('Some files were skipped because they are not valid images.');
        }
        
        setImages([...images, ...validFiles]);
        console.log("Current images:", images);
        
        const newPreviewImages = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        
        setPreviewImages([...previewImages, ...newPreviewImages.map(img => img.preview)]);
    };
    
    const handleRemoveImage = (index) => {
        const newPreviewImages = [...previewImages];
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);
        
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };
    
    const handleSaveChanges = async () => {
        try {
            // First upload any new images to Cloudinary
            console.log("Processing new images for upload...");
            console.log(`New images to upload: ${images.length}`);
            
            // Wait for new images to be uploaded
            const uploadedUrls = await uploadImages(images);
            console.log("Received new image URLs:", uploadedUrls);
            
            // Ensure _id is a string
            const productId = typeof editedProduct._id === 'object' 
                ? editedProduct._id.$oid || editedProduct._id.toString() 
                : editedProduct._id;

            // Merge existing image URLs with newly uploaded ones
            const combinedImageUrls = [...(editedProduct.imageUrls || []), ...uploadedUrls];
            console.log("Combined image URLs:", combinedImageUrls);

            // Prepare the data for update
            const { _id, createdAt, updatedAt, __v, reviews, createdBy, ...updateDataBase } = editedProduct;
            
            // Include the combined image URLs in the update data
            const updateData = {
                ...updateDataBase,
                imageUrls: combinedImageUrls
            };

            // Log the data being sent for update
            console.log('Product Data to be Updated:', JSON.stringify({ 
                id: productId, 
                updateData 
            }, null, 2));

            // Dispatch the edit product thunk
            const response = await dispatch(editProduct({ 
                id: productId, 
                updateData 
            })).unwrap();

            // Log the response from the API
            console.log('Edit Product API Response:', JSON.stringify(response, null, 2));

            // Reset image states
            setImages([]);
            setPreviewImages([]);

            // Show success toast
            toast.success("Product updated successfully");

            // Close the sheet
            setIsSheetOpen(false);

            // Refetch products to ensure latest data
            await dispatch(fetchAllProducts());
        } catch (error) {
            console.error('Error updating product:', error);
            
            // Show error toast
            toast.error(`Failed to update product: ${error.message}`);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            setDeletingProduct(true);
            await dispatch(deleteProduct(productId)).unwrap();
            toast.success("Product deleted successfully");
            await dispatch(fetchAllProducts());
        } catch (err) {
            console.error('Error deleting product:', err);
            toast.error("Failed to delete product. Please try again.");
        } finally {
            setDeletingProduct(false);
            setIsSheetOpen(false);
        }
    };

    const handleDeleteImage = (index) => {
        setImageIndexToDelete(index);
        setIsDialogOpen(true);
    };

    const confirmDeleteImage = async () => {
        if (imageIndexToDelete !== null && editedProduct.imageUrls?.[imageIndexToDelete]) {
            try {
                const imageUrl = editedProduct.imageUrls[imageIndexToDelete];
                await dispatch(deleteImage(imageUrl)).unwrap();
                toast.info("Image removed from product");
                
                setEditedProduct(prev => {
                    const updatedImageUrls = prev.imageUrls.filter((_, i) => i !== imageIndexToDelete);
                    
                    // Log the updated image URLs
                    console.log('Updated Image URLs after deletion:', updatedImageUrls);
                    
                    return {
                        ...prev,
                        imageUrls: updatedImageUrls
                    };
                });
            } catch (err) {
                console.error('Error deleting image:', err);
                toast.error("Failed to delete image.");
            } finally {
                setIsDialogOpen(false);
                setImageIndexToDelete(null);
            }
        }
    };

    // Authentication check
    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="text-xl font-medium mb-2">Please log in to view your products</div>
                </div>
            </div>
        );
    }

    // Loading state
    if ((isLoading && !dataFetched) || deletingProduct || isUploading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <>
            <ProductListUi 
                productData={userProducts}
                loading={isLoading}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                filteredProducts={filteredProducts}
                isSheetOpen={isSheetOpen}
                onSheetOpenChange={setIsSheetOpen}
                selectedProduct={selectedProduct}
                editedProduct={editedProduct}
                onEditInputChange={handleEditInputChange}
                onOpenEditSheet={handleOpenEditSheet}
                onSaveChanges={handleSaveChanges}
                onDeleteProduct={handleDeleteProduct}
                onDeleteImage={handleDeleteImage}
                handleImageUpload={handleImageUpload}
                previewImages={previewImages}
                handleRemoveImage={handleRemoveImage}
                isUploading={isUploading}
            />

            {/* Confirmation Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-amber-800">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-amber-600">
                            Are you sure you want to delete this image? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)}
                            className="text-amber-700 border-amber-200 hover:bg-amber-100"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={confirmDeleteImage}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductListController;