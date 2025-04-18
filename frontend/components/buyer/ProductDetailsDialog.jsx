// import React, { useState, useEffect } from 'react';
// import { 
//   AlertDialog, 
//   AlertDialogContent, 
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ChevronLeft, ChevronRight, X, ShoppingBag, Star } from 'lucide-react';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPaymentOrder, verifyPayment } from '../../store/Seller/paymentSlice';
// // import { fetchUserById } from '../redux/slices/userSlice';

// const ProductDetailsDialog = ({ 
//   isOpen, 
//   product, 
//   currentImageIndex, 
//   onClose, 
//   onNextImage, 
//   onPrevImage, 
//   onAddToCart 
// }) => {
//   // const [sdkReady, setSdkReady] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const dispatch = useDispatch();
//   const { isLoading, success, error } = useSelector(state => state.payment);
//   const { currentUser, isFetchingUser } = useSelector(state => state.users);
//   console.log(product.createdBy)
//   // useEffect(() => {
//   //   // Load Razorpay script when component mounts
//   //   const loadRazorpayScript = async () => {
//   //     return new Promise((resolve) => {
//   //       const script = document.createElement('script');
//   //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//   //       script.async = true;
//   //       script.onload = () => {
//   //         setSdkReady(true);
//   //         resolve(true);
//   //       };
//   //       script.onerror = () => {
//   //         setSdkReady(false);
//   //         resolve(false);
//   //         console.log("Failed to load Razorpay script");
//   //       };
//   //       document.body.appendChild(script);
//   //     });
//   //   };

//   //   if (!window.Razorpay) {
//   //     loadRazorpayScript();
//   //   } else {
//   //     setSdkReady(true);
//   //   }
//   // }, []);

//   if (!product) return null;

//   const images = product.imageUrls && product.imageUrls.length > 0 
//     ? product.imageUrls 
//     : [product.image || '/placeholder.svg'];

//   const hasMultipleImages = images.length > 1;

//   // Handle payment integration with Redux slice
//   // const handlePayment = async () => {
//   //   try {
//   //     if (!sdkReady) {
//   //       toast.error('Payment gateway is loading', {
//   //         description: 'Please wait a moment and try again',
//   //       });
//   //       return;
//   //     }

//   //     setIsProcessing(true);

//   //     // Create an order on our server using Redux thunk
//   //     const result = await dispatch(createPaymentOrder({ 
//   //       amount: product.price,
//   //       currency: 'INR',
//   //       receipt: `receipt_${Date.now()}`,
//   //       notes: {
//   //         productId: product.id || product._id,
//   //         productName: product.title || product.name
//   //       }
//   //     })).unwrap();

//   //     if (!result.success) {
//   //       setIsProcessing(false);
//   //       throw new Error(result.error || 'Failed to create order');
//   //     }

//   //     // Configure Razorpay options
//   //     const options = {
//   //       key:"rzp_test_ecwxsKx0BIxlEB",
//   //       amount: result.data.amount * 100, // Convert to smallest currency unit (paise)
//   //       currency: result.data.currency,
//   //       name: "RetroTrade",
//   //       description: `Payment for ${product.title || product.name}`,
//   //       order_id: result.data.order_id,
//   //       handler: async function (response) {
//   //         try {
//   //           // Verify the payment with our backend
//   //           const verifyResult = await dispatch(verifyPayment({
//   //             razorpay_order_id: response.razorpay_order_id,
//   //             razorpay_payment_id: response.razorpay_payment_id,
//   //             razorpay_signature: response.razorpay_signature,
//   //             productId: product.id || product._id
//   //           })).unwrap();

//   //           if (verifyResult.success) {
//   //             toast.success('Payment Successful!', {
//   //               description: `Payment ID: ${response.razorpay_payment_id}`,
//   //             });
              
//   //             // Call the onAddToCart function to handle post-purchase logic
//   //             onAddToCart(product, response.razorpay_payment_id);
//   //             onClose();
//   //           } else {
//   //             throw new Error(verifyResult.error || 'Payment verification failed');
//   //           }
//   //         } catch (error) {
//   //           console.error("Payment verification error:", error);
//   //           toast.error('Payment Verification Failed', {
//   //             description: "There was an issue verifying your payment. Please contact support.",
//   //           });
//   //         } finally {
//   //           setIsProcessing(false);
//   //         }
//   //       },
//   //       prefill: {
//   //         name: "", // User's name
//   //         email: "", // User's email
//   //         contact: "", // User's phone
//   //       },
//   //       notes: {
//   //         productId: product.id || product._id || '0',
//   //         productName: product.title || product.name,
//   //       },
//   //       theme: {
//   //         color: "#F59E0B", // Amber-500 to match your design
//   //       },
//   //       // Enable all payment methods including QR code
//   //       method: {
//   //         netbanking: true,
//   //         card: true,
//   //         wallet: true,
//   //         upi: true, // This enables UPI QR code
//   //         paylater: true
//   //       },
//   //       config: {
//   //         display: {
//   //           // Show QR code payment method
//   //           hide: [],
//   //           blocks: {
//   //             upi: {
//   //               name: "Pay via UPI",
//   //               instruments: [
//   //                 {
//   //                   method: "upi"
//   //                 }
//   //               ]
//   //             },
//   //             other: {
//   //               name: "Other Payment Methods",
//   //               instruments: [
//   //                 {
//   //                   method: "card"
//   //                 },
//   //                 {
//   //                   method: "netbanking"  
//   //                 },
//   //                 {
//   //                   method: "wallet"
//   //                 }
//   //               ]
//   //             }
//   //           },
//   //           sequence: ["block.upi", "block.other"],
//   //           preferences: {
//   //             show_default_blocks: true
//   //           }
//   //         }
//   //       },
//   //       modal: {
//   //         ondismiss: function() {
//   //           setIsProcessing(false);
//   //           toast('Payment cancelled', {
//   //             description: "You can try again when you're ready",
//   //           });
//   //         },
//   //         // Fix service worker error by configuring modal more explicitly
//   //         confirm_close: true,
//   //         escape: true,
//   //         animation: true,
//   //         handleBackButton: true,
//   //         backdropclose: false
//   //       }
//   //     };
      
//   //     const razorpay = new window.Razorpay(options);
//   //     razorpay.on('payment.failed', function(response) {
//   //       toast.error('Payment Failed', {
//   //         description: response.error.description || "Your payment was unsuccessful. Please try again.",
//   //       });
//   //       setIsProcessing(false);
//   //     });
      
//   //     razorpay.open();
      
//   //   } catch (error) {
//   //     console.error("Error during payment process:", error);
//   //     toast.error('Payment Error', {
//   //       description: error.message || "There was a problem processing your payment. Please try again.",
//   //     });
//   //     setIsProcessing(false);
//   //   }
//   // };

//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>
//       <AlertDialogContent 
//         className="!w-[70vw] !h-[90vh] !max-w-none !min-w-[70vw] !min-h-[90vh] bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-0 rounded-lg shadow-xl flex flex-col"
//       >
//         <AlertDialogHeader className="p-0">
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             className="absolute right-3 top-3 z-10 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md"
//             onClick={onClose}
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </AlertDialogHeader>

//         <div className="grid md:grid-cols-2 h-full">
//           {/* Image Section with Slider - Fixed container height */}
//           <div className="relative bg-white border-r border-amber-100 h-full overflow-hidden">
//             <div className="relative h-full flex items-center justify-center p-4">
//               {/* Modified image container with max dimensions and object-fit */}
//               <div className="w-full h-full flex items-center justify-center">
//                 <img 
//                   src={images[currentImageIndex]} 
//                   alt={product.title || product.name} 
//                   className="max-h-full max-w-full object-contain"
//                   style={{ maxHeight: "calc(100% - 40px)" }} // Leave space for thumbnails
//                 />
//               </div>
              
//               {/* Condition badge */}
//               <Badge className="absolute top-4 left-4 bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium">
//                 {product.condition}
//               </Badge>
              
//               {/* Image navigation */}
//               {hasMultipleImages && (
//                 <>
//                   <Button 
//                     variant="ghost" 
//                     size="icon"
//                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md h-10 w-10"
//                     onClick={onPrevImage}
//                   >
//                     <ChevronLeft className="h-6 w-6" />
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     size="icon"
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md h-10 w-10"
//                     onClick={onNextImage}
//                   >
//                     <ChevronRight className="h-6 w-6" />
//                   </Button>
                  
//                   {/* Image counter */}
//                   <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
//                     {currentImageIndex + 1} / {images.length}
//                   </div>
//                 </>
//               )}
//             </div>
            
//             {/* Thumbnail navigation - compact horizontal strip */}
//             {hasMultipleImages && (
//               <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 p-2 bg-white/80 backdrop-blur-sm">
//                 {images.slice(0, 5).map((img, index) => (
//                   <button 
//                     key={index} 
//                     className={`w-12 h-12 rounded transition-all ${
//                       index === currentImageIndex 
//                         ? 'ring-2 ring-amber-500 opacity-100' 
//                         : 'opacity-70 hover:opacity-100'
//                     }`}
//                     onClick={() => onNextImage(index)}
//                   >
//                     <div className="w-12 h-12 overflow-hidden rounded">
//                       <img 
//                         src={img} 
//                         alt={`Thumbnail ${index + 1}`} 
//                         className="w-full h-full object-cover rounded"
//                       />
//                     </div>
//                   </button>
//                 ))}
//                 {images.length > 5 && (
//                   <button className="w-12 h-12 rounded bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-medium">
//                     +{images.length - 5}
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
          
//           {/* Details Section */}
//           <div className="flex flex-col h-full max-h-[90vh]">
//             <div className="p-5 flex-grow overflow-y-auto no-scrollbar">
//               <AlertDialogTitle className="text-2xl font-bold text-amber-800 mb-3 line-clamp-2">
//                 {product.title || product.name}
//               </AlertDialogTitle>
              
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-2xl font-bold text-amber-600">₹{product.price}</span>
//                 <div className="flex items-center text-sm bg-amber-50 px-3 py-1 rounded-full">
//                   <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
//                   <span className="font-medium">{product.sellerRating || '4.5'}</span>
//                 </div>
//               </div>
              
//               {/* Product details - compact */}
//               <div className="space-y-4">
//                 <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                   <h4 className="text-sm font-medium text-amber-700 uppercase tracking-wide mb-1">Description</h4>
//                   <p className="text-amber-600 text-sm line-clamp-3">{product.description || "This vintage item has been carefully curated for its unique character and charm. Each piece tells a story and brings a touch of history to your collection."}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   {product.category && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Category</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.category}</p>
//                     </div>
//                   )}
                  
//                   {product.condition && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Condition</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.condition}</p>
//                     </div>
//                   )}
                  
//                   {product.brand && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Brand</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.brand}</p>
//                     </div>
//                   )}
                  
//                   {product.location && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Location</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.location}</p>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Seller info - more compact */}
//                 <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-3 rounded-lg border border-amber-200">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-semibold mr-3 shadow-inner border border-amber-300">
//                       {product.seller?.name?.charAt(0) || 'S'}
//                     </div>
//                     <div>
//                       <p className="font-medium text-amber-800">{product.seller?.name || 'Vintage Seller'}</p>
//                       <div className="flex items-center text-xs text-amber-600">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
//                         <span>{product.sellerRating || '4.5'}</span>
//                         <span className="mx-1">•</span>
//                         <span>{product.seller?.transactions || '120'} sales</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <AlertDialogFooter className="flex p-4 border-t border-amber-200 bg-white/50 backdrop-blur-sm">
//               <Button
//                 className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white h-12 font-medium text-base shadow-md"
//                 // onClick={handlePayment}
//                 // disabled={isProcessing || !sdkReady}
//               >
//                 <ShoppingBag className="h-5 w-5 mr-2" />
//                 {isProcessing ? "Processing..." : `Buy Now - ₹${product.price}`}
//               </Button>
//             </AlertDialogFooter>
//           </div>
//         </div>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default ProductDetailsDialog;
// import React, { useState, useEffect } from 'react';
// import { 
//   AlertDialog, 
//   AlertDialogContent, 
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ChevronLeft, ChevronRight, X, ShoppingBag, Star } from 'lucide-react';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPaymentOrder, verifyPayment } from '../../store/Seller/paymentSlice';
// import { fetchUserById } from '../../store/userSlice';

// const ProductDetailsDialog = ({ 
//   isOpen, 
//   product, 
//   currentImageIndex, 
//   onClose, 
//   onNextImage, 
//   onPrevImage, 
//   onAddToCart 
// }) => {
//   const [sdkReady, setSdkReady] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const dispatch = useDispatch();
//   const { isLoading, success, error } = useSelector(state => state.payment);
//   const { currentUser, isFetchingUser } = useSelector(state => state.users);
//  const { user, isAuthenticated} = useSelector((state) => state.auth);
//  console.log(user, isAuthenticated, "smain user")
//   // Fetch seller details when component mounts or product changes
//   useEffect(() => {
//     if (product?.createdBy && isOpen) {
//       dispatch(fetchUserById(product.createdBy));
//     }
//   }, [product, dispatch, isOpen]);

//   // Load Razorpay script when component mounts
//   useEffect(() => {
//     isOpen = false;
//     const loadRazorpayScript = async () => {
//       console.log("Starting to load Razorpay script");
//       return new Promise((resolve) => {
//         // Check if the script is already loaded
//         if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
//           console.log("Razorpay script already loaded");
//           setSdkReady(true);
//           resolve(true);
//           return;
//         }
        
//         console.log("Loading Razorpay script dynamically");
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         script.onload = () => {
//           console.log("Razorpay script loaded successfully");
//           setSdkReady(true);
//           resolve(true);
//         };
//         script.onerror = () => {
//           console.error("Failed to load Razorpay script");
//           setSdkReady(false);
//           resolve(false);
//         };
//         document.body.appendChild(script);
//       });
//     };
  
//     loadRazorpayScript();
//   }, []);

//   if (!product) return null;

//   const images = product.imageUrls && product.imageUrls.length > 0 
//     ? product.imageUrls 
//     : [product.image || '/placeholder.svg'];

//   const hasMultipleImages = images.length > 1;

//   // Handle seller information display
//   const sellerName = currentUser?.fullName || product.seller?.name || 'Vintage Seller';
//   const sellerInitial = sellerName.charAt(0) || 'S';
//   const sellerRating = product.sellerRating || currentUser?.rating || '4.5';
//   const sellerTransactions = currentUser?.transactions || product.seller?.transactions || '120';
//   const sellerUpiId = currentUser?.upiId || '';

//   // Handle payment integration with Redux slice
//  // In ProductDetailsDialog.jsx - Fix the handlePayment function

// const handlePayment = async () => {
//   try {
//     if (!sdkReady) {
//       toast.error('Payment gateway is loading', {
//         description: 'Please wait a moment and try again',
//       });
//       return;
//     }

//     setIsProcessing(true);

//     // Create an order on our server using Redux thunk
//     const orderResult = await dispatch(createPaymentOrder({ 
//       amount: product.price,
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         productId: product.id || product._id,
//         productName: product.title || product.name,
//         sellerId: product.createdBy,
//         sellerName: sellerName,
//         sellerUpiId: sellerUpiId || 'not_provided'
//       }
//     })).unwrap();

//     if (!orderResult || !orderResult.success) {
//       setIsProcessing(false);
//       throw new Error(orderResult?.error || 'Failed to create order');
//     }

//     console.log("Order created successfully, now opening Razorpay");
    
//     // Configure Razorpay options
//     const options = {
//       key: "rzp_test_ecwxsKx0BIxlEB",
//       amount: orderResult.data.amount * 100,
//       currency: orderResult.data.currency,
//       name: "RetroTrade",
//       description: `Payment for ${product.title || product.name}`,
//       order_id: orderResult.data.order_id,
//       handler: async function (response) {
//         console.log("Payment completed, verifying payment");
//         try {
//           // Verify the payment with our backend
//           const verifyResult = await dispatch(verifyPayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             productId: product.id || product._id,
//             sellerId: product.createdBy,
//             sellerUpiId: sellerUpiId
//           })).unwrap();

//           if (verifyResult.success) {
//             toast.success('Payment Successful!', {
//               description: `Payment ID: ${response.razorpay_payment_id}`,
//             });
            
//             // Call the onAddToCart function to handle post-purchase logic
//             onAddToCart(product, response.razorpay_payment_id);
//             onClose();
//           } else {
//             throw new Error(verifyResult.error || 'Payment verification failed');
//           }
//         } catch (error) {
//           console.error("Payment verification error:", error);
//           toast.error('Payment Verification Failed', {
//             description: "There was an issue verifying your payment. Please contact support.",
//           });
//         } finally {
//           setIsProcessing(false);
//         }
//       },
//       prefill: {
//         name: "", 
//         email: "",
//         contact: "",
//       },
//       notes: {
//         productId: product.id || product._id,
//         productName: product.title || product.name,
//         sellerId: product.createdBy,
//         sellerName: sellerName,
//         sellerUpiId: sellerUpiId || 'not_provided'
//       },
//       theme: {
//         color: "#F59E0B",
//       }
//     };
    
//     // Create a new Razorpay instance each time
//     const razorpay = new window.Razorpay(options);
    
//     // Set up event handlers
//     razorpay.on('payment.failed', function(response) {
//       console.log("Payment failed:", response.error);
//       toast.error('Payment Failed', {
//         description: response.error.description || "Your payment was unsuccessful. Please try again.",
//       });
//       setIsProcessing(false);
//     });
    
//     // Open Razorpay only after everything is set up
//     console.log("Opening Razorpay checkout");
//     razorpay.open();
    
//   } catch (error) {
//     console.error("Error during payment process:", error);
//     toast.error('Payment Error', {
//       description: error.message || "There was a problem processing your payment. Please try again.",
//     });
//     setIsProcessing(false);
//   }
// };

//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>
//       <AlertDialogContent 
//         className="!w-[70vw] !h-[90vh] !max-w-none !min-w-[70vw] !min-h-[90vh] bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-0 rounded-lg shadow-xl flex flex-col"
//       >
//         <AlertDialogHeader className="p-0">
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             className="absolute right-3 top-3 z-10 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md"
//             onClick={onClose}
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </AlertDialogHeader>

//         <div className="grid md:grid-cols-2 h-full">
//           {/* Image Section with Slider - Fixed container height */}
//           <div className="relative bg-white border-r border-amber-100 h-full overflow-hidden">
//             <div className="relative h-full flex items-center justify-center p-4">
//               {/* Modified image container with max dimensions and object-fit */}
//               <div className="w-full h-full flex items-center justify-center">
//                 <img 
//                   src={images[currentImageIndex]} 
//                   alt={product.title || product.name} 
//                   className="max-h-full max-w-full object-contain"
//                   style={{ maxHeight: "calc(100% - 40px)" }} // Leave space for thumbnails
//                 />
//               </div>
              
//               {/* Condition badge */}
//               <Badge className="absolute top-4 left-4 bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium">
//                 {product.condition}
//               </Badge>
              
//               {/* Image navigation */}
//               {hasMultipleImages && (
//                 <>
//                   <Button 
//                     variant="ghost" 
//                     size="icon"
//                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md h-10 w-10"
//                     onClick={onPrevImage}
//                   >
//                     <ChevronLeft className="h-6 w-6" />
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     size="icon"
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md h-10 w-10"
//                     onClick={onNextImage}
//                   >
//                     <ChevronRight className="h-6 w-6" />
//                   </Button>
                  
//                   {/* Image counter */}
//                   <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
//                     {currentImageIndex + 1} / {images.length}
//                   </div>
//                 </>
//               )}
//             </div>
            
//             {/* Thumbnail navigation - compact horizontal strip */}
//             {hasMultipleImages && (
//               <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 p-2 bg-white/80 backdrop-blur-sm">
//                 {images.slice(0, 5).map((img, index) => (
//                   <button 
//                     key={index} 
//                     className={`w-12 h-12 rounded transition-all ${
//                       index === currentImageIndex 
//                         ? 'ring-2 ring-amber-500 opacity-100' 
//                         : 'opacity-70 hover:opacity-100'
//                     }`}
//                     onClick={() => onNextImage(index)}
//                   >
//                     <div className="w-12 h-12 overflow-hidden rounded">
//                       <img 
//                         src={img} 
//                         alt={`Thumbnail ${index + 1}`} 
//                         className="w-full h-full object-cover rounded"
//                       />
//                     </div>
//                   </button>
//                 ))}
//                 {images.length > 5 && (
//                   <button className="w-12 h-12 rounded bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-medium">
//                     +{images.length - 5}
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
          
//           {/* Details Section */}
//           <div className="flex flex-col h-full max-h-[90vh]">
//             <div className="p-5 flex-grow overflow-y-auto no-scrollbar">
//               <AlertDialogTitle className="text-2xl font-bold text-amber-800 mb-3 line-clamp-2">
//                 {product.title || product.name}
//               </AlertDialogTitle>
              
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-2xl font-bold text-amber-600">₹{product.price}</span>
//                 <div className="flex items-center text-sm bg-amber-50 px-3 py-1 rounded-full">
//                   <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
//                   <span className="font-medium">{sellerRating}</span>
//                 </div>
//               </div>
              
//               {/* Product details - compact */}
//               <div className="space-y-4">
//                 <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                   <h4 className="text-sm font-medium text-amber-700 uppercase tracking-wide mb-1">Description</h4>
//                   <p className="text-amber-600 text-sm line-clamp-3">{product.description || "This vintage item has been carefully curated for its unique character and charm. Each piece tells a story and brings a touch of history to your collection."}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   {product.category && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Category</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.category}</p>
//                     </div>
//                   )}
                  
//                   {product.condition && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Condition</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.condition}</p>
//                     </div>
//                   )}
                  
//                   {product.brand && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Brand</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.brand}</p>
//                     </div>
//                   )}
                  
//                   {product.location && (
//                     <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
//                       <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Location</h4>
//                       <p className="text-amber-600 text-sm font-medium">{product.location}</p>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Seller info - more compact */}
//                 <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-3 rounded-lg border border-amber-200">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-semibold mr-3 shadow-inner border border-amber-300">
//                       {sellerInitial}
//                     </div>
//                     <div>
//                       <p className="font-medium text-amber-800">
//                         {isFetchingUser ? "Loading seller..." : sellerName}
//                       </p>
//                       <div className="flex items-center text-xs text-amber-600">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
//                         <span>{sellerRating}</span>
//                         <span className="mx-1">•</span>
//                         <span>{sellerTransactions} sales</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <AlertDialogFooter className="flex p-4 border-t border-amber-200 bg-white/50 backdrop-blur-sm">
//               <Button
//                 className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white h-12 font-medium text-base shadow-md"
//                 onClick={handlePayment}
//                 disabled={isProcessing || !sdkReady}
//               >
//                 <ShoppingBag className="h-5 w-5 mr-2" />
//                 {isProcessing ? "Processing..." : `Buy Now - ₹${product.price}`}
//               </Button>
//             </AlertDialogFooter>
//           </div>
//         </div>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default ProductDetailsDialog;

import React, { useState, useEffect } from 'react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, ShoppingBag, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentOrder, verifyPayment } from '../../store/Seller/paymentSlice';
import { fetchUserById } from '../../store/userSlice';

const ProductDetailsDialog = ({ 
  isOpen, 
  product, 
  currentImageIndex, 
  onClose, 
  onNextImage, 
  onPrevImage, 
  onAddToCart 
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector(state => state.payment);
  const { currentUser, isFetchingUser } = useSelector(state => state.users);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  console.log(user, isAuthenticated, "main user");
  

  // Fetch seller details when component mounts or product changes
  useEffect(() => {
    if (product?.createdBy && isOpen) {
      dispatch(fetchUserById(product.createdBy))
      .unwrap()
      .then((res) => {
        console.log("Fetched user:", res);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
      
    }
  }, [product, dispatch, isOpen]);

  // Load Razorpay script when component mounts
  useEffect(() => {
    const loadRazorpayScript = async () => {
      console.log("Starting to load Razorpay script");
      return new Promise((resolve) => {
        // Check if the script is already loaded
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
          console.log("Razorpay script already loaded");
          setSdkReady(true);
          resolve(true);
          return;
        }
        
        console.log("Loading Razorpay script dynamically");
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          console.log("Razorpay script loaded successfully");
          setSdkReady(true);
          resolve(true);
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          setSdkReady(false);
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
  
    loadRazorpayScript();
  }, []);

  if (!product) return null;

  const images = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls 
    : [product.image || '/placeholder.svg'];

  const hasMultipleImages = images.length > 1;

  // Handle seller information display
  const sellerName = currentUser?.fullName || product.seller?.name || 'Vintage Seller';
  const sellerInitial = sellerName.charAt(0) || 'S';
  const sellerRating = product.sellerRating || currentUser?.rating || '4.5';
  const sellerTransactions = currentUser?.contact || product.seller?.contact || '120';
  const sellerUpiId = currentUser?.upiId || '';

  // Handle payment integration with Redux slice
  const handlePayment = async () => {
    try {
      if (!sdkReady) {
        toast.error('Payment gateway is loading', {
          description: 'Please wait a moment and try again',
        });
        return;
      }
  
      // Make sure user is authenticated
      if (!user || !isAuthenticated) {
        toast.error('You must be logged in to make a purchase', {
          description: 'Please sign in to continue',
        });
        return;
      }
  
      setIsProcessing(true);
  
      // Create an order on our server using Redux thunk
      const orderResult = await dispatch(createPaymentOrder({ 
        amount: product.price,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          productId: product.id || product._id,
          productName: product.title || product.name,
          sellerId: product.createdBy,
          sellerName: sellerName,
          sellerUpiId: sellerUpiId || 'not_provided',
          // Include these required fields in the notes object
          // They will be used by the backend to create the Order document
          buyerId: user.id || user._id
        }
      })).unwrap();
  
      if (!orderResult || !orderResult.success) {
        setIsProcessing(false);
        throw new Error(orderResult?.error || 'Failed to create order');
      }
  
      console.log("Order created successfully, now opening Razorpay");
      
      // Configure Razorpay options
      const options = {
        key: "rzp_test_ecwxsKx0BIxlEB",
        amount: orderResult.data.amount * 100,
        currency: orderResult.data.currency,
        name: "RetroTrade",
        description: `Payment for ${product.title || product.name}`,
        order_id: orderResult.data.order_id,
        handler: async function (response) {
          console.log("Payment completed, verifying payment");
          try {
            // Verify the payment with our backend
            const verifyResult = await dispatch(verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId: product.id || product._id,
              sellerId: product.createdBy,
              buyerId: user.id || user._id, // Include buyer ID when verifying
              sellerUpiId: sellerUpiId
            })).unwrap();
  
            if (verifyResult.success) {
              toast.success('Payment Successful!', {
                description: `Payment ID: ${response.razorpay_payment_id}`,
              });
              
              // Call the onAddToCart function to handle post-purchase logic
              onAddToCart(product, response.razorpay_payment_id);
              onClose();
            } else {
              throw new Error(verifyResult.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error('Payment Verification Failed', {
              description: "There was an issue verifying your payment. Please contact support.",
            });
          } finally {
            setIsProcessing(false);
          }
        },
        config: {
  display: {
    blocks: {
      upi: {
        name: "Pay using UPI",
        instruments: [
          {
            method: "upi",
            flow: "qr", // Explicitly request QR code flow
            apps: ["google_pay", "phonepe", "paytm", "upi_apps"]
          }
        ]
      }
    },
    sequence: ["block.upi"],
    preferences: {
      show_default_blocks: true
    }
  }
},
        prefill: {
          name: user?.fullName || "", 
          email: user?.email || "",
          contact: user?.phone || "",
        },
        notes: {
          productId: product.id || product._id,
          productName: product.title || product.name,
          sellerId: product.createdBy,
          sellerName: sellerName,
          buyerId: user.id || user._id, // Include buyer ID
          sellerUpiId: sellerUpiId || 'not_provided'
        },
        theme: {
          color: "#F59E0B",
        }
      };
      
      // Create a new Razorpay instance each time
      const razorpay = new window.Razorpay(options);
      
      // Set up event handlers
      razorpay.on('payment.failed', function(response) {
        console.log("Payment failed:", response.error);
        toast.error('Payment Failed', {
          description: response.error.description || "Your payment was unsuccessful. Please try again.",
        });
        setIsProcessing(false);
      });
      onClose(); 
      // Open Razorpay only after everything is set up
      console.log("Opening Razorpay checkout");
      razorpay.open();
      
    } catch (error) {
      console.error("Error during payment process:", error);
      toast.error('Payment Error', {
        description: error.message || "There was a problem processing your payment. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent 
        className="!w-[70vw] !h-[90vh] !max-w-none !min-w-[70vw] !min-h-[90vh] bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-0 rounded-lg shadow-xl flex flex-col"
      >
        <AlertDialogHeader className="p-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-3 top-3 z-10 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </AlertDialogHeader>

        <div className="grid md:grid-cols-2 h-full">
          {/* Image Section with Slider - Fixed container height */}
          <div className="relative bg-white border-r border-amber-100 h-full overflow-hidden">
            <div className="relative h-full flex items-center justify-center p-4">
              {/* Modified image container with max dimensions and object-fit */}
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={images[currentImageIndex]} 
                  alt={product.title || product.name} 
                  className="max-h-full max-w-full object-contain"
                  style={{ maxHeight: "calc(100% - 40px)" }} // Leave space for thumbnails
                />
              </div>
              
              {/* Condition badge */}
              <Badge className="absolute top-4 left-4 bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium">
                {product.condition}
              </Badge>
              
              {/* Image navigation */}
              {hasMultipleImages && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md h-10 w-10"
                    onClick={onPrevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-amber-700 rounded-full shadow-md h-10 w-10"
                    onClick={onNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail navigation - compact horizontal strip */}
            {hasMultipleImages && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 p-2 bg-white/80 backdrop-blur-sm">
                {images.slice(0, 5).map((img, index) => (
                  <button 
                    key={index} 
                    className={`w-12 h-12 rounded transition-all ${
                      index === currentImageIndex 
                        ? 'ring-2 ring-amber-500 opacity-100' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => onNextImage(index)}
                  >
                    <div className="w-12 h-12 overflow-hidden rounded">
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </button>
                ))}
                {images.length > 5 && (
                  <button className="w-12 h-12 rounded bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-medium">
                    +{images.length - 5}
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Details Section */}
          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="p-5 flex-grow overflow-y-auto no-scrollbar">
              <AlertDialogTitle className="text-2xl font-bold text-amber-800 mb-3 line-clamp-2">
                {product.title || product.name}
              </AlertDialogTitle>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-amber-600">₹{product.price}</span>
                <div className="flex items-center text-sm bg-amber-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{sellerRating}</span>
                </div>
              </div>
              
              {/* Product details - compact */}
              <div className="space-y-4">
                <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                  <h4 className="text-sm font-medium text-amber-700 uppercase tracking-wide mb-1">Description</h4>
                  <p className="text-amber-600 text-sm line-clamp-3">{product.description || "This vintage item has been carefully curated for its unique character and charm. Each piece tells a story and brings a touch of history to your collection."}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {product.category && (
                    <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                      <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Category</h4>
                      <p className="text-amber-600 text-sm font-medium">{product.category}</p>
                    </div>
                  )}
                  
                  {product.condition && (
                    <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                      <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Condition</h4>
                      <p className="text-amber-600 text-sm font-medium">{product.condition}</p>
                    </div>
                  )}
                  
                  {product.brand && (
                    <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                      <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Brand</h4>
                      <p className="text-amber-600 text-sm font-medium">{product.brand}</p>
                    </div>
                  )}
                  
                  {product.location && (
                    <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                      <h4 className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Location</h4>
                      <p className="text-amber-600 text-sm font-medium">{product.location}</p>
                    </div>
                  )}
                </div>
                
                {/* Seller info with UPI ID - more compact */}
                <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-semibold mr-3 shadow-inner border border-amber-300">
                      {sellerInitial}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-amber-800">
                        {isFetchingUser ? "Loading seller..." : sellerName}
                      </p>
                      <div className="flex items-center text-xs text-amber-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{sellerRating}</span>
                        <span className="mx-1">•</span>
                        <span>{sellerTransactions} Phone</span>
                      </div>
                    </div>
                    
                    {/* Display UPI badge if available */}
                    {sellerUpiId && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        UPI Enabled
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* User account information - only show if logged in */}
                {isAuthenticated && user && (
                  <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                    <h4 className="text-sm font-medium text-amber-700 uppercase tracking-wide mb-1">Your Account</h4>
                    <p className="text-amber-600 text-sm">
                      Buying as: <span className="font-medium">{user.email || user.name || 'User'}</span>
                      {user.contact && (
                        <span className="block text-xs text-amber-500 mt-1">
                          Your contact number will be used for checkout: {user.contact}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <AlertDialogFooter className="flex p-4 border-t border-amber-200 bg-white/50 backdrop-blur-sm">
              <Button
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white h-12 font-medium text-base shadow-md"
                onClick={handlePayment}
                disabled={isProcessing || !sdkReady}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {isProcessing ? "Processing..." : `Buy Now - ₹${product.price}`}
              </Button>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductDetailsDialog;