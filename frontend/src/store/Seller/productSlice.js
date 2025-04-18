import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    const initialState = {
    isLoading : false,
    productList : [],
    };

    export const addnewProduct = createAsyncThunk('/products/addnewproduct', 
    async (formData) =>{
    const result = await axios.post('http://localhost:5000/api/seller/products/add', formData,
        {
            headers: {
                "Content-Type" : "application/json",
            },
        }
    );
    return result?.data;
    }
    );

    export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', 
        async () =>{
        const result = await axios.get('http://localhost:5000/api/seller/products/get',
            
        );
        return result?.data;
    }
        );

    // export const editProduct = createAsyncThunk('/products/addnewproduct', 
    //         async (id, updateData) =>{
    //         const result = await axios.put(`http://localhost:5000/api/seller/products/edit/${id}`, updateData,
    //             {
    //                 headers: {
    //                     "Content-Type" : "application/json",
    //                 },
    //             }
    //         );
    //         return result?.data;
    //     }
    //         );   
    export const editProduct = createAsyncThunk(
        '/products/editProduct', 
        async ({ id, updateData }, { rejectWithValue }) => {
          try {
            const result = await axios.put(`http://localhost:5000/api/seller/products/edit/${id}`, updateData, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            return result?.data;
          } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
          }
        }
      );
    export const deleteProduct = createAsyncThunk('/products/deleteProduct', 
                async (id) =>{
                const result = await axios.delete(`http://localhost:5000/api/seller/products/delete/${id}`,
                );
                return result?.data;
            }
                );
                // Image deletion thunk (similar to your product deletion one)
              
                export const deleteImage = createAsyncThunk(
                    '/products/deleteImage', 
                    async (imageUrl, { rejectWithValue }) => {
                        try {
                            const urlParts = imageUrl.split('/');
                            const fileNameWithExtension = urlParts[urlParts.length - 1];
                            const fileName = fileNameWithExtension.split('.')[0];
                            const publicId = `product_images/${fileName}`;
                            
                            // Make sure to call your backend endpoint to update the product in your database
                            const response = await fetch('http://localhost:5000/api/seller/products/remove-image', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ 
                                    imageUrl: imageUrl,
                                    publicId: publicId 
                                })
                            });
                            
                            const data = await response.json();
                            
                            if (!response.ok) {
                                throw new Error(data.message || 'Server error');
                            }
                            
                            return { success: true, imageUrl };
                        } catch (err) {
                            console.error('Delete image error:', err);
                            return rejectWithValue(err.message || 'Failed to process image deletion');
                        }
                    }
                );
                
                // export const deleteImage = createAsyncThunk('/products/deleteImage', 
                //     async (imageUrl, { rejectWithValue }) => {
                //         try {
                //             console.log('Image URL received in thunk:', imageUrl);
                            
                //             // More robust publicId extraction
                //             const urlParts = imageUrl.split('/');
                //             const fileNameWithExtension = urlParts[urlParts.length - 1];
                //             const fileName = fileNameWithExtension.split('.')[0];
                //             const publicId = `product_images/${fileName}`;
                            
                //             console.log('Extracted publicId:', publicId);
                            
                //             const response = await fetch('http://localhost:5000/api/seller/products/delete-image', {
                //                 method: 'POST',
                //                 headers: {
                //                     'Content-Type': 'application/json',
                //                 },
                //                 body: JSON.stringify({ publicId })
                //             });
                            
                //             const data = await response.json();
                            
                //             if (!response.ok) {
                //                 console.error('Server response:', data);
                //                 throw new Error(data.message || 'Server error');
                //             }
                            
                //             return { success: true, imageUrl };
                //         } catch (err) {
                //             console.error('Delete image error details:', err);
                //             return rejectWithValue(err.message || 'Failed to process image deletion');
                //         }
                //     }
                // );


const sellerProductsSlice = createSlice({
    name : 'sellerProducts',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllProducts.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            console.log(action.payload);
                state.isLoading = false;
                state.productList = action.payload?.data;
              })
        .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
              })   
        // Add these cases to your productSlice.js
.addCase(deleteProduct.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(deleteProduct.fulfilled, (state, action) => {
    state.isLoading = false;
    // You might want to update state here based on the deleted product
    // For example, remove the deleted product from the list
    state.productList = state.productList.filter(product => product._id !== action.payload.id);

    state.productList = state.productList.filter(product => product._id !== action.payload);
})
  .addCase(deleteProduct.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
  })   
  .addCase(deleteImage.pending, (state) => {
    state.isLoading = true;
})
.addCase(deleteImage.fulfilled, (state, action) => {
    state.isLoading = false;
    const deletedImageUrl = action.payload.imageUrl;
    state.productList = state.productList.map(product => {
        if (product.imageUrls?.includes(deletedImageUrl)) {
            return {
                ...product,
                imageUrls: product.imageUrls.filter(url => url !== deletedImageUrl)
            };
        }
        return product;
    });
})
.addCase(deleteImage.rejected, (state) => {
    state.isLoading = false;
})
 // New cases for editProduct
 .addCase(editProduct.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(editProduct.fulfilled, (state, action) => {
    state.isLoading = false;
    // Find and update the specific product in the productList
    const index = state.productList.findIndex(
      product => product._id === action.payload.data._id
    );
    if (index !== -1) {
      state.productList[index] = action.payload.data;
    }
  })
  .addCase(editProduct.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  })
    },
});

export default sellerProductsSlice.reducer;