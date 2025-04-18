// // import React, { useState, useEffect } from 'react';
// // import ProductSellUi from './ProductSellUi';

// // // This is the controller component that handles all logic
// // const ProductSellController = ({ existingItem = null }) => {
// //   // State for form fields
// //   const [images, setImages] = useState([]);
// //   const [previewImages, setPreviewImages] = useState([]);
// //   const [formData, setFormData] = useState({
// //     id: existingItem?.id || null,
// //     title: existingItem?.title || '',
// //     description: existingItem?.description || '',
// //     price: existingItem?.price || '',
// //     condition: existingItem?.condition || '',
// //     category: existingItem?.category || '',
// //     location: existingItem?.location || '',
// //     originalPrice: existingItem?.originalPrice || '',
// //     deliveryOptions: existingItem?.deliveryOptions || [],
// //     availabilityDate: existingItem?.availabilityDate || new Date().toISOString().split('T')[0],
// //   });
  
// //   // Initialize with existing item image if available
// //   useEffect(() => {
// //     if (existingItem?.image) {
// //       setPreviewImages([existingItem.image]);
// //     }
// //   }, [existingItem]);

// //   // Handle text input changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   // Handle select dropdown changes
// //   const handleSelectChange = (name, value) => {
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   // Handle checkbox changes
// //   const handleCheckboxChange = (name, value, checked) => {
// //     if (name === 'deliveryOptions') {
// //       // Handle array of delivery options
// //       const options = [...formData.deliveryOptions];
// //       if (checked) {
// //         options.push(value);
// //       } else {
// //         const index = options.indexOf(value);
// //         if (index > -1) {
// //           options.splice(index, 1);
// //         }
// //       }
// //       setFormData({ ...formData, [name]: options });
// //     } else {
// //       // Handle boolean fields
// //       setFormData({ ...formData, [name]: checked });
// //     }
// //   };

// //   // Handle image upload
// //   const handleImageUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     setImages([...images, ...files]);
    
// //     // Create preview URLs for uploaded images
// //     const newPreviewImages = files.map(file => URL.createObjectURL(file));
// //     setPreviewImages([...previewImages, ...newPreviewImages]);

    
// //   };

// //   // Handle image removal
// //   const handleRemoveImage = (index) => {
// //     const newPreviewImages = [...previewImages];
// //     newPreviewImages.splice(index, 1);
// //     setPreviewImages(newPreviewImages);
    
// //     const newImages = [...images];
// //     newImages.splice(index, 1);
// //     setImages(newImages);
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
    
// //     // Create a FormData object to handle file uploads
// //     const productData = new FormData();
    
// //     // Append form data
// //     Object.keys(formData).forEach(key => {
// //       if (key === 'deliveryOptions') {
// //         productData.append(key, JSON.stringify(formData[key]));
// //       } else {
// //         productData.append(key, formData[key]);
// //       }
// //     });
    
// //     // Append images
// //     images.forEach((image, index) => {
// //       productData.append(`image${index}`, image);
// //     });
    
// //     // Log the form data to console (for testing purposes)
// //     console.log("Product Listing Form Submission:");
// //     console.log("Form Data:", formData);
// //     console.log("Images:", images.map(img => img.name));
    
// //     // Here you would typically make an API call
// //     // For example:
// //     // api.createProduct(productData).then(response => {
// //     //   // Handle success
// //     // }).catch(error => {
// //     //   // Handle error
// //     // });
    
// //     // For now, we'll just log the last submitted product
// //     const lastSubmittedProduct = {
// //       ...formData,
// //       images: images.map(img => img.name),
// //       submittedAt: new Date().toISOString()
// //     };
    
// //     console.log("Last Submitted Product:", lastSubmittedProduct);
    
// //     // You could also store this in localStorage for persistence
// //     localStorage.setItem('lastSubmittedProduct', JSON.stringify(lastSubmittedProduct));
    
// //     // Show a success message to the user
// //     alert('Product listing submitted successfully!');
// //   };

// //   // Pass all the handlers to the UI component
// //   return (
// //     <ProductSellUi
// //       formData={formData}
// //       previewImages={previewImages}
// //       handleChange={handleChange}
// //       handleSelectChange={handleSelectChange}
// //       handleCheckboxChange={handleCheckboxChange}
// //       handleImageUpload={handleImageUpload}
// //       handleRemoveImage={handleRemoveImage}
// //       handleSubmit={handleSubmit}
// //     />
// //   );
// // };

// // export default ProductSellController;

// import React, { useState, useEffect } from "react";
// import ProductSellUi from "./ProductSellUi";

// const ProductSellController = ({ existingItem = null }) => {
//   // State for form fields
//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Store backend image URLs
//   const [formData, setFormData] = useState({
//     id: existingItem?.id || null,
//     title: existingItem?.title || "",
//     description: existingItem?.description || "",
//     price: existingItem?.price || "",
//     condition: existingItem?.condition || "",
//     category: existingItem?.category || "",
//     location: existingItem?.location || "",
//     originalPrice: existingItem?.originalPrice || "",
//     deliveryOptions: existingItem?.deliveryOptions || [],
//     availabilityDate: existingItem?.availabilityDate || new Date().toISOString().split("T")[0],
//   });

//   // Initialize with existing item images if available
//   useEffect(() => {
//     if (existingItem?.image) {
//       setPreviewImages([existingItem.image]);
//       setUploadedImageUrls([existingItem.image]); // Store existing image URLs
//     }
//   }, [existingItem]);

//   // Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle select dropdown changes
//   const handleSelectChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (name, value, checked) => {
//     if (name === "deliveryOptions") {
//       // Handle array of delivery options
//       const options = [...formData.deliveryOptions];
//       if (checked) {
//         options.push(value);
//       } else {
//         const index = options.indexOf(value);
//         if (index > -1) {
//           options.splice(index, 1);
//         }
//       }
//       setFormData({ ...formData, [name]: options });
//     } else {
//       setFormData({ ...formData, [name]: checked });
//     }
//   };

//   // Handle image selection and upload
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     setImages([...images, ...files]);

//     // Create local previews
//     const newPreviewImages = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages([...previewImages, ...newPreviewImages]);

//     // Prepare FormData for backend upload
//     const formData = new FormData();
//     files.forEach((file) => formData.append("images", file));

//     try {
//       const response = await fetch("YOUR_BACKEND_IMAGE_UPLOAD_ENDPOINT", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Image upload failed");

//       const result = await response.json();
//       console.log("Uploaded Images:", result);

//       // Assuming backend returns an array of URLs
//       setUploadedImageUrls([...uploadedImageUrls, ...result.imageUrls]);
//     } catch (error) {
//       console.error("Error uploading images:", error);
//     }
//   };

//   // Handle image removal
//   const handleRemoveImage = (index) => {
//     const newPreviewImages = [...previewImages];
//     newPreviewImages.splice(index, 1);
//     setPreviewImages(newPreviewImages);

//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);

//     const newUploadedUrls = [...uploadedImageUrls];
//     newUploadedUrls.splice(index, 1);
//     setUploadedImageUrls(newUploadedUrls);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const productData = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "deliveryOptions") {
//         productData.append(key, JSON.stringify(formData[key]));
//       } else {
//         productData.append(key, formData[key]);
//       }
//     });

//     // Append uploaded image URLs
//     uploadedImageUrls.forEach((url, index) => {
//       productData.append(`image${index}`, url);
//     });

//     try {
//       const response = await fetch("YOUR_BACKEND_PRODUCT_UPLOAD_ENDPOINT", {
//         method: "POST",
//         body: productData,
//       });

//       if (!response.ok) throw new Error("Product upload failed");

//       const result = await response.json();
//       console.log("Product uploaded successfully:", result);
//       alert("Product listing submitted successfully!");
//     } catch (error) {
//       console.error("Error uploading product:", error);
//     }
//   };

//   return (
//     <ProductSellUi
//       formData={formData}
//       previewImages={previewImages}
//       handleChange={handleChange}
//       handleSelectChange={handleSelectChange}
//       handleCheckboxChange={handleCheckboxChange}
//       handleImageUpload={handleImageUpload}
//       handleRemoveImage={handleRemoveImage}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

// export default ProductSellController;
// import React, { useState, useEffect } from 'react';
// import ProductSellUi from './ProductSellUi';

// const ProductSellController = ({ existingItem = null }) => {
//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [formData, setFormData] = useState({
//     id: existingItem?.id || null,
//     title: existingItem?.title || '',
//     description: existingItem?.description || '',
//     price: existingItem?.price || '',
//     condition: existingItem?.condition || '',
//     category: existingItem?.category || '',
//     location: existingItem?.location || '',
//     originalPrice: existingItem?.originalPrice || '',
//     deliveryOptions: existingItem?.deliveryOptions || [],
//     availabilityDate: existingItem?.availabilityDate || new Date().toISOString().split('T')[0],
//     imageUrls: existingItem?.imageUrls || [], // Store uploaded image URLs
//   });

//   // Track images that have been uploaded to Cloudinary
//   const [uploadedImages, setUploadedImages] = useState([]);

//   useEffect(() => {
//     if (existingItem?.imageUrls) {
//       setPreviewImages(existingItem.imageUrls);
//       setUploadedImages(existingItem.imageUrls.map(url => ({ url, isExisting: true })));
//     }
//   }, [existingItem]);

//   // Handle text input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle select dropdown changes
//   const handleSelectChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle image selection (before upload)
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (validFiles.length !== files.length) {
//       alert('Some files were skipped because they are not valid images.');
//     }
    
//     setImages([...images, ...validFiles]);
    
//     const newPreviewImages = validFiles.map(file => ({
//       file,
//       preview: URL.createObjectURL(file)
//     }));
    
//     setPreviewImages([...previewImages, ...newPreviewImages.map(img => img.preview)]);
//   };

//   // Upload images to server
//   const uploadImages = async (imagesToUpload) => {
//     if (imagesToUpload.length === 0) return [];
    
//     setIsUploading(true);
    
//     try {
//       const formDataObj = new FormData();
//       imagesToUpload.forEach(image => {
//         formDataObj.append('files', image);
//       });
      
//       // Log what we're sending
//       console.log(`Uploading ${imagesToUpload.length} images...`);
      
//       // For debugging, print all server API routes
//       console.log("Sending request to: http://localhost:5000/api/seller/products/upload-image");
      
//       const response = await fetch('http://localhost:5000/api/seller/products/upload-image', {
//         method: 'POST',
//         body: formDataObj,
//       });
      
//       if (!response.ok) {
//         console.error(`Server responded with status: ${response.status}`);
//         const errorText = await response.text();
//         console.error(`Error response: ${errorText}`);
//         throw new Error(`Server error: ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log("Upload successful. Result:", result);
      
//       if (result.urls && Array.isArray(result.urls)) {
//         return result.urls;
//       } else {
//         console.error("Unexpected response format:", result);
//         return [];
//       }
//     } catch (error) {
//       console.error('Upload error details:', error);
//       throw error;
//     } finally {
//       setIsUploading(false);
//     }
//   };
  

//   // Handle image removal before submission
//   const handleRemoveImage = (index) => {
//     const newPreviewImages = [...previewImages];
//     newPreviewImages.splice(index, 1);
//     setPreviewImages(newPreviewImages);
    
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);
    
//     // If this was an already uploaded image, track it for potential deletion
//     const uploadedImage = uploadedImages[index];
//     if (uploadedImage) {
//       // Remove from uploaded images
//       const newUploadedImages = [...uploadedImages];
//       newUploadedImages.splice(index, 1);
//       setUploadedImages(newUploadedImages);
      
//       // If not an existing image, delete from Cloudinary
//       if (!uploadedImage.isExisting) {
//         deleteImageFromCloudinary(uploadedImage.url);
//       }
//     }
//   };

//   // Delete image from Cloudinary
//   const deleteImageFromCloudinary = async (imageUrl) => {
//     try {
//       // Extract public_id from the URL
//       const urlParts = imageUrl.split('/');
//       const filenameWithExtension = urlParts[urlParts.length - 1];
//       const publicId = `product_images/${filenameWithExtension.split('.')[0]}`;
      
//       // Send request to backend to delete the image
//       await fetch('/api/seller/products/delete-image', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ publicId }),
//       });
//     } catch (error) {
//       console.error('Error deleting image from Cloudinary:', error);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       console.log("Form submitted. Processing images...");
//       console.log(`Images to upload: ${images.length}`);
      
//       // Upload images and get URLs
//       const uploadedUrls = await uploadImages(images);
//       console.log("Received image URLs:", uploadedUrls);
      
//       // Update form data with new URLs
//       const updatedFormData = {
//         ...formData,
//         imageUrls: [...formData.imageUrls, ...uploadedUrls]
//       };
      
//       // Just display the results in console
//       console.log("Final form data with image URLs:", updatedFormData);
      
//       // Clear images after successful upload if needed
//       setImages([]);
//       setPreviewImages([]);
      
//       // Update form data with URLs
//       setFormData(updatedFormData);
      
//       alert("Images uploaded successfully!");
//     } catch (error) {
//       console.error("Error during upload process:", error);
//       alert("Upload failed. Check console for details.");
//     }
//   };

//   return (
//     <ProductSellUi
//       formData={formData}
//       previewImages={previewImages}
//       handleChange={handleChange}
//       handleSelectChange={handleSelectChange}
//       handleImageUpload={handleImageUpload}
//       handleRemoveImage={handleRemoveImage}
//       handleSubmit={handleSubmit}
//       isUploading={isUploading}
//       uploadProgress={uploadProgress}
//     />
//   );
// };

// export default ProductSellController;

import React, { useState, useEffect } from 'react';
import ProductSellUi from './ProductSellUi';
import { useDispatch, useSelector } from 'react-redux';
import { addnewProduct } from '@/store/Seller/productSlice';
const ProductSellController = ({ existingItem = null }) => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    // id: existingItem?.id || null,
    title: existingItem?.title || '',
    description: existingItem?.description || '',
    price: existingItem?.price || '',
    condition: existingItem?.condition || '',
    category: existingItem?.category || '',
    location: existingItem?.location || '',
    originalPrice: existingItem?.originalPrice || '',
    deliveryOptions: existingItem?.deliveryOptions || [],
    availabilityDate: existingItem?.availabilityDate || new Date().toISOString().split('T')[0],
    imageUrls: existingItem?.imageUrls || [], // Store uploaded image URLs
  });

  // Track images that have been uploaded to Cloudinary
  const [uploadedImages, setUploadedImages] = useState([]);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user?.id);
console.log(userId)
  useEffect(() => {
    if (existingItem?.imageUrls) {
      setPreviewImages(existingItem.imageUrls);
      setUploadedImages(existingItem.imageUrls.map(url => ({ url, isExisting: true })));
    }
  }, [existingItem]);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  // Handle select dropdown changes
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle image selection (before upload)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      alert('Some files were skipped because they are not valid images.');
    }
    
    setImages([...images, ...validFiles]);
    
    const newPreviewImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setPreviewImages([...previewImages, ...newPreviewImages.map(img => img.preview)]);
  };

  // Upload images to server - FIXED to handle the correct response format
  // const uploadImages = async (imagesToUpload) => {
  //   if (imagesToUpload.length === 0) return [];
    
  //   setIsUploading(true);
    
  //   try {
  //     const formDataObj = new FormData();
  //     imagesToUpload.forEach(image => {
  //       formDataObj.append('files', image);
  //     });
      
  //     // Log what we're sending
  //     console.log(`Uploading ${imagesToUpload.length} images...`);
      
  //     // For debugging, print all server API routes
  //     console.log("Sending request to: http://localhost:5000/api/seller/products/upload-image");
      
  //     const response = await fetch('http://localhost:5000/api/seller/products/upload-image', {
  //       method: 'POST',
  //       body: formDataObj,
  //       // Add credentials if your API requires authentication
  //       credentials: 'include',
  //     });
      
  //     if (!response.ok) {
  //       console.error(`Server responded with status: ${response.status}`);
  //       const errorText = await response.text();
  //       console.error(`Error response: ${errorText}`);
  //       throw new Error(`Server error: ${response.status}`);
  //     }
      
  //     const result = await response.json();
  //     console.log("Upload successful. Result:", result);
      
  //     // THIS IS THE FIX - check for both formats of response
  //     // The updated API returns 'urls' from the fixed upload route 
  //     // AND might return 'images' array with url property from the controller
  //     if (result.urls && Array.isArray(result.urls)) {
  //       return result.urls; // From the simple test route
  //     } else if (result.images && Array.isArray(result.images)) {
  //       // Extract urls from the images array returned by your controller
  //       return result.images.map(img => img.url);
  //     } else {
  //       console.error("Unexpected response format:", result);
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error('Upload error details:', error);
  //     throw error;
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };
  // In ProductSellController.jsx, update the uploadImages function:

const uploadImages = async (imagesToUpload) => {
  if (imagesToUpload.length === 0) return [];
  
  setIsUploading(true);
  
  try {
    const formDataObj = new FormData();
    imagesToUpload.forEach(image => {
      formDataObj.append('files', image);
    });
    
    console.log(`Uploading ${imagesToUpload.length} images...`);
    
    // Make sure this URL matches your backend server address
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
    
    // Check for the urls property in the response
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
  
  // Handle image removal before submission
  const handleRemoveImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
    
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    // If this was an already uploaded image, track it for potential deletion
    const uploadedImage = uploadedImages[index];
    if (uploadedImage) {
      // Remove from uploaded images
      const newUploadedImages = [...uploadedImages];
      newUploadedImages.splice(index, 1);
      setUploadedImages(newUploadedImages);
      
      // If not an existing image, delete from Cloudinary
      if (!uploadedImage.isExisting) {
        deleteImageFromCloudinary(uploadedImage.url);
      }
    }
  };

  // Delete image from Cloudinary
  const deleteImageFromCloudinary = async (imageUrl) => {
    try {
      // Extract public_id from the URL
      const urlParts = imageUrl.split('/');
      const filenameWithExtension = urlParts[urlParts.length - 1];
      const publicId = `product_images/${filenameWithExtension.split('.')[0]}`;
      
      // Send request to backend to delete the image
      await fetch('/api/seller/products/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
        credentials: 'include', // Add this if your API requires authentication
      });
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     console.log("Form submitted. Processing images...");
  //     console.log(`Images to upload: ${images.length}`);
      
  //     // Upload images and get URLs
  //     const uploadedUrls = await uploadImages(images);
  //     console.log("Received image URLs:", uploadedUrls);
      
  //     // Update form data with new URLs
  //     const updatedFormData = {
  //       ...formData,
  //       imageUrls: [...formData.imageUrls, ...uploadedUrls]
  //     };
      
  //     // Save product data to backend
  //     console.log("Final form data with image URLs:", updatedFormData);
      
  //    //
  //   //  const result = await dispatch(addnewProduct(updatedFormData)).unwrap();
  //   //  console.log("Product saved successfully:", result);
 

  //    //
  //     setImages([]);
      
  //     // Keep existing preview images but clear the newly added ones
  //     setPreviewImages([...updatedFormData.imageUrls]);
      
  //     // Update form data with URLs
  //     setFormData(updatedFormData);
      
  //     alert("Images uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error during upload process:", error);
  //     alert("Upload failed. Check console for details.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Form submitted. Processing images...");
      console.log(`Images to upload: ${images.length}`);
  
      // ✅ Wait until images are uploaded completely
      const uploadedUrls = await uploadImages(images);
      if (!uploadedUrls || uploadedUrls.length === 0) {
        throw new Error("Image upload failed. No images returned.");
      }
  
      console.log("Received image URLs:", uploadedUrls);
  
      // ✅ Create final product object
      const updatedFormData = {
        ...formData,
        imageUrls: [...formData.imageUrls, ...uploadedUrls],
        createdBy: userId,
      };
  
      console.log("Final form data with image URLs:", updatedFormData);
  
      // ✅ Dispatch only after upload completes
      const result = await dispatch(addnewProduct(updatedFormData)).unwrap();
      console.log("Product saved successfully:", result);
  
      // ✅ Reset state on success
      // setImages([]);
      // setPreviewImages([...updatedFormData.imageUrls]);
      // setFormData(updatedFormData);
      setImages([]);
      setPreviewImages([]);
      setFormData({
        title: "",
        description: "",
        originalPrice: "",
        price: "",
        location: "",
        condition: "",
        category: "",
        deliveryOptions: "",
        imageUrls: []
      });
  
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error during product creation:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };
  

  return (
    <ProductSellUi
      formData={formData}
      previewImages={previewImages}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      handleRadioChange={handleRadioChange}
      handleImageUpload={handleImageUpload}
      handleRemoveImage={handleRemoveImage}
      handleSubmit={handleSubmit}
      isUploading={isUploading}
      uploadProgress={uploadProgress}
    />
  );
};

export default ProductSellController;