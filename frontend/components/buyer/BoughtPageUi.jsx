// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUserPayments } from '../../store/Seller/paymentSlice'; // Make sure this path is correct

// const PaidProductsDisplay = () => {
//   const dispatch = useDispatch(); // Add this
//   const productList = useSelector(state => state.sellerProducts?.productList || []);
//   const { userPayments, isLoading } = useSelector(state => state.payment);
//   // Selector to get all orders data
// const { allOrdersData } = useSelector(state => state.payment);
// s
// // Console log to print all orders data
// console.log("All Orders Data:", allOrdersData);
//   const [paidProducts, setPaidProducts] = useState([]);
  
//   useEffect(() => {
//     // Fetch all user payments when component mounts
//     dispatch(getUserPayments());
//   }, [dispatch]);

//   console.log("user payment =>", userPayments);
//   console.log("list =>", productList);

//   useEffect(() => {
//     if (userPayments && productList.length > 0) {
//       // Filter only paid orders
//       const paidOrders = userPayments.filter(payment => payment.status === 'paid');
      
//       // Map paid orders to matching products
//       const paidProductItems = paidOrders.map(order => {
//         const matchedProduct = productList.find(product => 
//           product._id === order.product || product._id === order.productId
//         );
        
//         if (matchedProduct) {
//           return {
//             ...matchedProduct,
//             orderId: order._id,
//             buyerId: order.buyer || order.buyerId,
//             paymentId: order.razorpayPaymentId
//           };
//         }
//         return null;
//       }).filter(Boolean); // Remove null values
      
//       setPaidProducts(paidProductItems);
//     }
//   }, [userPayments, productList]);


//   // const onWishlistToggle = (productId) => {
//   //   // Implement wishlist toggle functionality
//   //   console.log("Toggle wishlist for:", productId);
//   // };

//   const onViewDetails = (product) => {
//     // Implement view details functionality
//     console.log("View details for:", product.title);
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Sold Products</h2>
      
//       {paidProducts.length === 0 ? (
//         <div className="bg-blue-50 text-blue-700 p-4 rounded">
//           <p>You don't have any sold products yet.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {paidProducts.map(product => (
//             <ProductCard 
//               key={product._id} 
//               product={product} 
//               onViewDetails={onViewDetails} 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const ProductCard = ({ product, onViewDetails }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
    
//     {/* Condition badge - top left */}
//     <div className="absolute top-2 left-2 z-10">
//       <span className="bg-blue-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
//         {product.condition}
//       </span>
//     </div>
    
//     {/* Product image */}
//     <div className="w-full h-40 overflow-hidden">
//       <img
//         src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '/placeholder.svg'}
//         alt={product.title}
//         className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
//       />
//     </div>
    
//     {/* Product details */}
//     <div className="p-4">
//       <h3 className="font-semibold text-lg mb-1 truncate">{product.title}</h3>
      
//       <div className="flex justify-between items-center mb-3">
//         <span className="font-bold text-lg">${product.price}</span>
//         <div className="flex items-center text-sm text-yellow-500">
//           <span>★</span>
//           <span className="ml-1 text-gray-600">{product.sellerRating || '4.5'}</span>
//         </div>
//       </div>
      
//       {/* Sale information */}
//       <div className="text-xs text-gray-500 mb-3">
//         <p>Order ID: {product.orderId}</p>
//         <p>Payment ID: {product.paymentId}</p>
//       </div>
      
//       {/* <button
//         className="w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-700 transition-colors"
//         onClick={() => onViewDetails(product)}
//       >
//         View Details
//       </button> */}
//     </div>
//   </div>
// );

// export default PaidProductsDisplay;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPayments } from '../../store/Seller/paymentSlice';
import { Eye, Package, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BoughtPageUi = (user) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.sellerProducts?.productList || []);
  const { userPayments, isLoading } = useSelector(state => state.payment);
  const { allOrdersData } = useSelector(state => state.payment);
  const [paidProducts, setPaidProducts] = useState([]);
  console.log("bought", user.user.role)
  useEffect(() => {
    dispatch(getUserPayments());
  }, [dispatch]);

  useEffect(() => {
    if (userPayments && productList.length > 0) {
      const paidOrders = userPayments.filter(payment => payment.status === 'paid');
      
      const paidProductItems = paidOrders.map(order => {
        const matchedProduct = productList.find(product => 
          product._id === order.product || product._id === order.productId
        );
        
        if (matchedProduct) {
          return {
            ...matchedProduct,
            orderId: order._id,
            buyerId: order.buyer || order.buyerId,
            paymentId: order.razorpayPaymentId
          };
        }
        return null;
      }).filter(Boolean);
      
      setPaidProducts(paidProductItems);
    }
  }, [userPayments, productList]);

  const onViewDetails = (product) => {
    console.log("View details for:", product.title);
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <ShoppingBag className="text-amber-500" size={24} />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
        {user.user.role === "seller" ? "Products Sold" : "Products Bought"}
      </h2>
    </div>
    
    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-amber-100">
      <span className="text-amber-700 font-semibold">{user.user.role === "seller" ? "Total Sales: " : "Total Purchases: "}</span>
      <span className="text-amber-900">{paidProducts.length}</span>
    </div>
  </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-amber-200 h-12 w-12 mb-4"></div>
            <div className="text-amber-600">Loading your sales data...</div>
          </div>
        </div>
      ) : paidProducts.length === 0 ? (
        <div className="bg-gradient-to-r from-blue-50 to-amber-50 text-amber-700 p-6 rounded-lg shadow-md border border-amber-100 flex flex-col items-center">
          <Package size={48} className="text-amber-400 mb-2" />
          <p className="text-lg font-medium text-center">You haven't sold any products yet</p>
          <p className="text-amber-600 text-center mt-2">Once you make a sale, it will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paidProducts.map((product, index) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onViewDetails={onViewDetails}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, onViewDetails, index }) => {
  // Animation variants for staggered card appearance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0px 10px 20px rgba(245, 158, 11, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="rounded-xl overflow-hidden"
    >
      <Card className="h-full border-0 overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300">
        <div className="relative">
          {/* Product image with gradient overlay */}
          <div className="relative w-full h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-800/30 to-transparent z-10" />
            <img
              src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '/placeholder.svg'}
              alt={product.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Condition badge */}
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="outline" className="bg-white/80 text-amber-800 border-amber-200 backdrop-blur-sm">
              {product.condition} ✨
            </Badge>
          </div>
          
          {/* Price badge */}
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-amber-500 text-white text-sm px-2 py-1">
              ${product.price}
            </Badge>
          </div>
        </div>
        
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg mb-2 text-amber-900 truncate">{product.title}</h3>
          
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="text-amber-500">★</span>
              <span className="ml-1 text-amber-700 text-sm">{product.sellerRating || '4.5'}</span>
            </div>
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Sold 🎉
            </span>
          </div>
          
          <div className="space-y-1 mt-3 pt-3 border-t border-amber-100">
            <div className="flex justify-between text-xs">
              <span className="text-amber-600">Order ID:</span>
              <span className="text-amber-800 font-medium">{product.orderId.substring(0, 8)}...</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-amber-600">Payment ID:</span>
              <span className="text-amber-800 font-medium">{product.paymentId?.substring(0, 8)}...</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={() => onViewDetails(product)}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all duration-300"
            variant="default"
          >
            <Eye size={16} className="mr-2" />
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BoughtPageUi;