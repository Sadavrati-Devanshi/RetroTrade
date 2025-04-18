// import express from "express";
// import { upload } from "../../helpers/cloudinary.js"; // Multer config
// import { uploadFiles } from "../../controllers/productsController.js"
// const router = express.Router();

// router.post("/upload-image", upload.array("files", 5), uploadFiles);

// export default router;
// import express from "express";
// import { upload } from "../../helpers/cloudinary.js";

// const router = express.Router();

// // Add a simple test route to verify router is working
// router.get("/test", (req, res) => {
//   res.json({ message: "Product routes working!" });
// });

// // Simplify the upload route for debugging
// router.post("/upload-image", upload.array("files", 10), async (req, res) => {
//   try {
//     console.log("Upload endpoint hit");
//     console.log("Files received:", req.files?.length || 0);
    
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         error: "No files uploaded" 
//       });
//     }
    
//     // Log file details for debugging
//     req.files.forEach((file, index) => {
//       console.log(`File ${index+1}: ${file.originalname}, ${file.mimetype}, ${file.size} bytes`);
//     });
    
//     // Simple response for testing
//     return res.status(200).json({ 
//       success: true, 
//       message: "Files received",
//       fileCount: req.files.length,
//       // For testing, just echo back file info
//       urls: req.files.map(f => `http://placeholder.url/${f.originalname}`)
//     });
//   } catch (error) {
//     console.error("Error in upload route:", error);
//     return res.status(500).json({ 
//       success: false,
//       error: error.message
//     });
//   }
// });

// export default router;
//working
// import express from "express";
// import { upload, handleMultipleUploads } from  "../../helpers/cloudinary.js"; 

// const router = express.Router();

// // Add a simple test route to verify router is working
// router.get("/test", (req, res) => {
//   res.json({ message: "Product routes working!" });
// });

// // Fixed upload route that properly uploads to Cloudinary and returns urls
// router.post("/upload-image", upload.array("files", 10), async (req, res) => {
//   try {
//     console.log("Upload endpoint hit");
//     console.log("Files received:", req.files?.length || 0);
    
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         error: "No files uploaded" 
//       });
//     }
    
//     // Log file details for debugging
//     req.files.forEach((file, index) => {
//       console.log(`File ${index+1}: ${file.originalname}, ${file.mimetype}, ${file.size} bytes`);
//     });
    
//     // Actually upload files to Cloudinary using your utility function
//     let uploadResults;
//     try {
//       uploadResults = await handleMultipleUploads(req.files);
//       console.log("Cloudinary upload results:", uploadResults);
//     } catch (uploadError) {
//       console.error("Cloudinary upload error:", uploadError);
//       return res.status(503).json({
//         success: false,
//         error: "Failed to upload images to storage service",
//         message: uploadError.message
//       });
//     }
    
//     // Extract URLs from Cloudinary responses to match what frontend expects
//     const uploadedUrls = uploadResults.map(result => result.secure_url);
    
//     return res.status(200).json({ 
//       success: true, 
//       message: "Files uploaded successfully", 
//       urls: uploadedUrls,  // This is the format the frontend is expecting
//       count: uploadedUrls.length
//     });
//   } catch (error) {
//     console.error("Error in upload route:", error);
//     return res.status(500).json({ 
//       success: false,
//       error: error.message
//     });
//   }
// });

// export default router;
import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import { uploadProductImage, addProduct, editProduct, fetchAllProducts, deleteProduct, deleteProductImage, removeProductImage } from "../../controllers/productsController.js"; // ✅ Import controller
import { authMiddleware } from "../../controllers/authController.js";
const router = express.Router();

// ✅ Test route
router.get("/test", (req, res) => {
  res.json({ message: "Product routes working!" });
});

// ✅ Clean route connected to controller
router.post("/upload-image", upload.array("files", 10), uploadProductImage);
router.post('/add',authMiddleware, addProduct)
router.put('/edit/:id', editProduct)
router.get('/get', fetchAllProducts)
router.delete('/delete/:id', deleteProduct)
router.post('/delete-image', deleteProductImage);
router.post('/remove-image', removeProductImage);
export default router;
