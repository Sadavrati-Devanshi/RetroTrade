// import { handleMultipleUploads } from "../utils/upload.js"; // Utility for Cloudinary upload

// export const uploadFiles = async (req, res) => {
//     try {
//         const b64 = Buffer.from(req.file.buffer).toString('base64');
//         const url = "data:" + req.file.mimetype + ";base64," + b64;
//         const result =await handleMultipleUploads(url);
        

//         return res.status(200).json({ message: "Files uploaded successfully",result });
//     } catch (error) {
//         console.error("Error uploading files:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };
import Product from "../models/Product.js";
import {  deleteFromCloudinary, handleMultipleUploads } from  "../helpers/cloudinary.js"; 


export const uploadProductImage = async (req, res) => {
    try {
      console.log("Upload endpoint hit");
      console.log("Files received:", req.files?.length || 0);
  
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: "No files uploaded" 
        });
      }
  
      // Log file details for debugging
      req.files.forEach((file, index) => {
        console.log(`File ${index + 1}: ${file.originalname}, ${file.mimetype}, ${file.size} bytes`);
      });
  
      // Actually upload files to Cloudinary using your utility function
      let uploadResults;
      try {
        uploadResults = await handleMultipleUploads(req.files);
        console.log("Cloudinary upload results:", uploadResults);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(503).json({
          success: false,
          error: "Failed to upload images to storage service",
          message: uploadError.message
        });
      }
  
      // Extract URLs from Cloudinary responses to match what frontend expects
      const uploadedUrls = uploadResults.map(result => result.secure_url);
  
      return res.status(200).json({ 
        success: true, 
        message: "Files uploaded successfully", 
        urls: uploadedUrls,
        count: uploadedUrls.length
      });
    } catch (error) {
      console.error("Error in upload controller:", error);
      return res.status(500).json({ 
        success: false,
        error: error.message
      });
    }
  };
  

// export const uploadFiles = async (req, res) => {
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: "No files uploaded" 
//             });
//         }

//         // Validate file types before uploading
//         const invalidFiles = req.files.filter(file => !file.mimetype.startsWith('image/'));
//         if (invalidFiles.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Invalid file types detected",
//                 invalidFiles: invalidFiles.map(f => f.originalname)
//             });
//         }

//         // Upload all files to Cloudinary with retries
//         let uploadResults;
//         try {
//             uploadResults = await handleMultipleUploads(req.files);
//         } catch (uploadError) {
//             console.error("Cloudinary upload error:", uploadError);
//             return res.status(503).json({
//                 success: false,
//                 error: "Failed to upload images to storage service",
//                 message: uploadError.message
//             });
//         }

//         // Extract URLs from Cloudinary responses
//         const uploadedUrls = uploadResults.map(result => result.secure_url);

//         return res.status(200).json({ 
//             success: true, 
//             message: "Files uploaded successfully", 
//             urls: uploadedUrls,
//             count: uploadedUrls.length
//         });
//     } catch (error) {
//         console.error("Error in uploadFiles controller:", error);
//         return res.status(500).json({ 
//             success: false, 
//             error: "Internal server error during file upload",
//             message: error.message
//         });
//     }
// };

// export const deleteImage = async (req, res) => {
//     try {
//         const { publicId } = req.body;
        
//         if (!publicId) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: "Public ID is required" 
//             });
//         }

//         // Add validation for publicId format
//         if (typeof publicId !== 'string' || publicId.trim() === '') {
//             return res.status(400).json({
//                 success: false,
//                 error: "Invalid public ID format"
//             });
//         }

//         let result;
//         try {
//             // Delete the image from Cloudinary with timeout
//             result = await Promise.race([
//                 cloudinary.v2.uploader.destroy(publicId),
//                 new Promise((_, reject) => 
//                     setTimeout(() => reject(new Error('Cloudinary operation timed out')), 10000)
//                 )
//             ]);
//         } catch (cloudinaryError) {
//             console.error("Cloudinary deletion error:", cloudinaryError);
//             return res.status(503).json({
//                 success: false,
//                 error: "Failed to delete image from storage service",
//                 message: cloudinaryError.message
//             });
//         }

//         if (result.result === 'ok') {
//             return res.status(200).json({ 
//                 success: true, 
//                 message: "Image deleted successfully" 
//             });
//         } else if (result.result === 'not found') {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Image not found in cloud storage" 
//             });
//         } else {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Failed to delete image", 
//                 details: result 
//             });
//         }
//     } catch (error) {
//         console.error("Error in deleteImage controller:", error);
//         return res.status(500).json({ 
//             success: false, 
//             error: "Internal server error while deleting image",
//             message: error.message
//         });
//     }
// };

// // Helper function to add robust error handling to Cloudinary operations
// export const withCloudinaryErrorHandling = async (operation) => {
//     try {
//         return await operation();
//     } catch (error) {
//         // Extract meaningful information from Cloudinary errors
//         const errorInfo = {
//             message: error.message,
//             code: error.http_code || error.code,
//             type: error.name
//         };
        
//         console.error("Cloudinary operation failed:", errorInfo);
//         throw {
//             ...error,
//             friendlyMessage: "Media operation failed",
//             info: errorInfo
//         };
//     }
// };
//Add
export const addProduct = async (req, res) => {
    try {
        const {title , description, category, price, originalPrice, availabilityDate, condition, location, imageUrls, deliveryOptions, createdBy,status} = req.body;
       
        // if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        //     return res.status(400).json({ success: false, message: "Invalid user ID" });
        // }
       
        // console.log(createdBy)
        const newlyCreatedProduct = new Product({
            title , description, category, price, originalPrice, availabilityDate, condition, location, imageUrls, deliveryOptions, createdBy,  reviews: [],status
        })
    
        await newlyCreatedProduct.save();
        res.status(201).json({
            success : true,
            data : newlyCreatedProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "can not add products in server"
        })
    }
    
}

//Fetch
export const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success : true,
            data : listOfProducts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "can not add products in server"
        })
    }
    
}

//edit
export const editProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {title , description, category, price, originalPrice, availabilityDate, condition, location, imageUrls, deliveryOptions,status} = req.body;
        
        const findProduct = await Product.findById(id)
        if(!findProduct) return res.status(404).json({
            success : false,
            message : 'Product not found',
        });
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.price = price || findProduct.price;
        findProduct.originalPrice = originalPrice || findProduct.originalPrice;
        findProduct.availabilityDate = availabilityDate || findProduct.availabilityDate;
        findProduct.condition = condition || findProduct.condition;
        findProduct.location = location || findProduct.location;
        findProduct.imageUrls = imageUrls || findProduct.imageUrls;
        findProduct.deliveryOptions = deliveryOptions || findProduct.deliveryOptions;
        findProduct.status = status || findProduct.status;

        await findProduct.save();
        res.status(200).json({
            success : true,
            data : findProduct,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "can not add products in server"
        })
    }
    
}
//delete image
export const removeProductImage = async (req, res) => {
    try {
        const { imageUrl, publicId } = req.body;
        
        if (!imageUrl || !publicId) {
            return res.status(400).json({
                success: false,
                message: "Missing imageUrl or publicId"
            });
        }
        
        // Delete from Cloudinary
        const cloudinaryResult = await deleteFromCloudinary(publicId);
        
        // Update the product in your database to remove this image URL
        const updateResult = await Product.updateMany(
            { imageUrls: imageUrl },
            { $pull: { imageUrls: imageUrl } }
        );
        
        if (updateResult.modifiedCount === 0) {
            console.warn('No products were updated with the given image URL');
        }
        
        return res.status(200).json({
            success: true,
            message: "Image removed from Cloudinary and database",
            cloudinaryResult,
            updateResult
        });
    } catch (error) {
        console.error("Error removing product image:", error);
        res.status(500).json({
            success: false,
            message: "Error removing image from server",
            error: error.message
        });
    }
}
// In productsController.js
export const deleteProductImage = async (req, res) => {
    try {
        const { publicId } = req.body;
        
        console.log('Received publicId for deletion:', publicId); // Add logging
        
        if (!publicId) {
            return res.status(400).json({
                success: false,
                message: "No publicId provided"
            });
        }
        
        // Delete from Cloudinary
        const result = await deleteFromCloudinary(publicId);
        
        console.log('Cloudinary deletion result:', result); // Add logging
        
        if (result && (result.result === 'ok' || result.result === 'not found')) {
            return res.status(200).json({
                success: true,
                message: "Image deleted from Cloudinary"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to delete image from Cloudinary",
                cloudinaryResult: result
            });
        }
    } catch (error) {
        console.error("Detailed Cloudinary delete error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting image from server",
            errorDetails: error.message
        });
    }
}


//delete
export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct)
            return  res.status(404).json({
                success : false,
                message : "product not found in server"
            })
        res.status(200).json({
                success : true,
                message : "product Deleted in server"
         })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "can not add products in server"
        })
    }
    
}