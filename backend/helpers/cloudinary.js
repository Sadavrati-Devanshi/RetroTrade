// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// const storage = new multer.memoryStorage();

// async function handleImageUpload(file) {    
// const result = await cloudinary.uploader.upload(file, {
//     resource_type : "auto",
// });
// return result; 
//  }

//  const upload = multer({storage});
 
//  module.exports = {upload, handleImageUpload};
import cloudinary from 'cloudinary';
import multer from 'multer';
import dotenv from "dotenv";

cloudinary.v2.config({
    cloud_name: 'doegvfuah',
    api_key: '194414441154397',
    api_secret: '3f4_FUWVe9ShoMMqwNyRuWSA5Jk'
});

// Configure multer with file size limits and validation
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 10 // Maximum 10 files
    },
    fileFilter: (req, file, cb) => {
        // Only accept images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
        }
    }
});

export const uploadProfileImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No image file uploaded"
        });
      }
  
      console.log("Profile image upload request received:", req.file.originalname);
      
      // Upload file to Cloudinary
      const uploadResult = await uploadSingleFile(req.file.buffer, req.file.mimetype);
      
      // Return success with Cloudinary URL
      return res.status(200).json({
        success: true,
        message: "Profile image uploaded successfully",
        url: uploadResult.secure_url
      });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to upload profile image"
      });
    }
  };
// Function to upload a single file with retry logic
const uploadSingleFile = async (fileBuffer, mimetype, retries = 3) => {
    let attempt = 0;
    let lastError = null;
    
    while (attempt < retries) {
        try {
            return await new Promise((resolve, reject) => {
                const uploadOptions = {
                    resource_type: "auto",
                    folder: "product_images",
                    timeout: 60000 // 60s timeout for large uploads
                };
                
                const uploadStream = cloudinary.v2.uploader.upload_stream(
                    uploadOptions,
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                
                uploadStream.end(fileBuffer);
            });
        } catch (error) {
            lastError = error;
            console.warn(`Upload attempt ${attempt + 1}/${retries} failed:`, error.message);
            attempt++;
            
            // Wait before retrying (exponential backoff)
            if (attempt < retries) {
                await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
            }
        }
    }
    
    // If we get here, all retries failed
    throw new Error(`File upload failed after ${retries} attempts. Last error: ${lastError.message}`);
};

const deleteFromCloudinary = async (id) => {
    try {
        console.log('Attempting to delete from Cloudinary with ID:', id);
        const result = await cloudinary.v2.uploader.destroy(id, {
            type: 'upload',  // Explicitly specify upload type
            resource_type: 'image'  // Explicitly specify resource type
        });
        
        console.log('Cloudinary deletion result:', result);
        return result;
    } catch (error) {
        console.error('Detailed Cloudinary deletion error:', error);
        throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
};
// Function to handle multiple file uploads with parallelism control
const handleMultipleUploads = async (files, maxConcurrent = 3) => {
    // Process files in batches to avoid overwhelming the server
    const results = [];
    
    // Create chunks of files to process concurrently
    const chunks = [];
    for (let i = 0; i < files.length; i += maxConcurrent) {
        chunks.push(files.slice(i, i + maxConcurrent));
    }
    
    // Process each chunk
    for (const chunk of chunks) {
        const chunkPromises = chunk.map(file => 
            uploadSingleFile(file.buffer, file.mimetype)
                .catch(error => {
                    // Include file info in error
                    throw new Error(`Failed to upload ${file.originalname}: ${error.message}`);
                })
        );
        
        // Wait for current chunk to complete
        const chunkResults = await Promise.all(chunkPromises);
        results.push(...chunkResults);
    }
    
    return results;
};

export { upload, handleMultipleUploads, uploadSingleFile ,deleteFromCloudinary};