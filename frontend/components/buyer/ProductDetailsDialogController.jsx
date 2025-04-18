// import React, { useState } from 'react';
// import ProductDetailsDialog from './ProductDetailsDialog';

// const ProductDetailsDialogController = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//     setCurrentImageIndex(0);
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     // Reset after closing animation completes
//     setTimeout(() => {
//       setSelectedProduct(null);
//       setCurrentImageIndex(0);
//     }, 300);
//   };

//   const nextImage = () => {
//     if (selectedProduct?.imageUrls && selectedProduct.imageUrls.length > 0) {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === selectedProduct.imageUrls.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (selectedProduct?.imageUrls && selectedProduct.imageUrls.length > 0) {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === 0 ? selectedProduct.imageUrls.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const handleAddToCart = (product) => {
//     // Add to cart logic here
//     console.log("Adding to cart:", product);
//     handleClose();
//     // You could call a parent function like onAddToCart(product) if needed
//   };

//   // This function can be passed down to your product card components
//   const onViewDetails = (product) => {
//     handleViewDetails(product);
//   };

//   return {
//     isOpen,
//     selectedProduct,
//     currentImageIndex,
//     handleViewDetails,
//     handleClose,
//     nextImage,
//     prevImage,
//     handleAddToCart,
//     onViewDetails,
//     ProductDetailsDialogComponent: selectedProduct ? (
//       <ProductDetailsDialog 
//         isOpen={isOpen}
//         product={selectedProduct}
//         currentImageIndex={currentImageIndex}
//         onClose={handleClose}
//         onNextImage={nextImage}
//         onPrevImage={prevImage}
//         onAddToCart={handleAddToCart}
//       />
//     ) : null
//   };
// };

// export default ProductDetailsDialogController;

import React, { useState } from 'react';
import { toast } from 'sonner';
import ProductDetailsDialog from './ProductDetailsDialog';

const ProductDetailsDialogController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset after closing animation completes
    setTimeout(() => {
      setSelectedProduct(null);
      setCurrentImageIndex(0);
    }, 300);
  };

  const nextImage = (index) => {
    if (selectedProduct?.imageUrls && selectedProduct.imageUrls.length > 0) {
      // If an index is provided, use it directly (for thumbnail clicks)
      if (index !== undefined) {
        setCurrentImageIndex(index);
      } else {
        // Otherwise increment the current index (for arrow clicks)
        setCurrentImageIndex((prevIndex) => 
          prevIndex === selectedProduct.imageUrls.length - 1 ? 0 : prevIndex + 1
        );
      }
    }
  };

  const prevImage = () => {
    if (selectedProduct?.imageUrls && selectedProduct.imageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProduct.imageUrls.length - 1 : prevIndex - 1
      );
    }
  };

  const handleAddToCart = (product, paymentId = null) => {
    // If a payment ID is provided, this was a successful purchase
    if (paymentId) {
      // Here you would typically record the transaction in your database
      // This is handled by the payment verification process in the backend
      toast.success(`Purchase successful for ${product.title || product.name}`, {
        description: `Payment ID: ${paymentId}`,
        style: {
          backgroundColor: "#22c55e", // green
          color: "#ffffff",
        },
      });
    } else {
      // Regular add to cart without payment
      toast.success(`${product.title || product.name} added to cart`, {
        style: {
          backgroundColor: "#22c55e", // green
          color: "#ffffff",
        },
      });
    }
    
    handleClose();
    // You could call a parent function like onAddToCart(product) if needed
  };

  // This function can be passed down to your product card components
  const onViewDetails = (product) => {
    handleViewDetails(product);
  };

  return {
    isOpen,
    selectedProduct,
    currentImageIndex,
    handleViewDetails,
    handleClose,
    nextImage,
    prevImage,
    handleAddToCart,
    onViewDetails,
    ProductDetailsDialogComponent: selectedProduct ? (
      <ProductDetailsDialog 
        isOpen={isOpen}
        product={selectedProduct}
        currentImageIndex={currentImageIndex}
        onClose={handleClose}
        onNextImage={nextImage}
        onPrevImage={prevImage}
        onAddToCart={handleAddToCart}
      />
    ) : null
  };
};

export default ProductDetailsDialogController;