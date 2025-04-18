import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, addToWishlist } from '../../store/buyer/wishlistSlice';
import { fetchAllProducts } from '../../store/Seller/productSlice'; // Add this import
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const dispatch = useDispatch();
  
  // Get current user and wishlist state
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { wishlistItems, isLoading: wishlistLoading } = useSelector((state) => state.wishlist);
  const { productList, isLoading: productsLoading } = useSelector((state) => state.sellerProducts);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch both wishlist and all products
      dispatch(fetchWishlist());
      dispatch(fetchAllProducts());
    }
  }, [dispatch, isAuthenticated, user]);

  // Create a set of product IDs from wishlist
  const wishlistProductIds = new Set(
    wishlistItems?.map(item => item.product?._id || item.product) || []
  );

  // Filter products to only show those in the wishlist
  const wishlistedProducts = productList.filter(product => 
    wishlistProductIds.has(product._id)
  );

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId) => {
    dispatch(addToWishlist(productId)); // This toggles the wishlist status
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Please login to view your wishlist</h2>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Login
        </Link>
      </div>
    );
  }

  if (wishlistLoading || productsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
      </div>
    );
  }

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
        <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
    <div className="container mx-auto px-4 py-12">
      {/* Header with decorative elements */}
      <div className="relative flex justify-center mb-12">
        <h1 className="text-4xl font-serif text-amber-800 text-center relative">
          My Wishlist
          <div className="absolute -top-6 -left-10 text-2xl rotate-12">✨</div>
          <div className="absolute -bottom-3 -right-8 text-2xl -rotate-12">✨</div>
        </h1>
        <div className="absolute -top-2 right-1/4 text-3xl opacity-20">♡</div>
        <div className="absolute bottom-0 left-1/3 text-3xl opacity-20">♡</div>
      </div>
  
      {/* Decorative divider */}
      <div className="flex items-center justify-center mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-1/2"></div>
        <div className="mx-4 text-amber-400 text-2xl">♥</div>
        <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-1/2"></div>
      </div>
  
      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistedProducts.map(product => (
          <div key={product._id} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white border border-amber-100">
            {/* Cartoon sticker in corner */}
            <div className="absolute -top-3 -left-3 z-10 text-2xl transform rotate-12">🎁</div>
            
            <div className="relative overflow-hidden">
              <img 
                src={product.imageUrls?.[0] || '/placeholder-image.jpg'} 
                alt={product.title} 
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Wishlist icon button with animation */}
              <button 
                onClick={() => handleRemoveFromWishlist(product._id)} 
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-amber-50 transition-transform duration-300 hover:scale-110"
                aria-label="Remove from wishlist"
              >
                <span className="text-red-500 text-xl">♥</span>
              </button>
              
              {/* Ribbon corner */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-amber-200 rotate-45 transform"></div>
            </div>
            
            <div className="p-5 bg-gradient-to-b from-white to-amber-50">
              <h3 className="text-lg font-medium mb-2 text-amber-900">{product.title}</h3>
              <p className="text-amber-700 text-sm mb-4 opacity-80">{product.description?.substring(0, 80)}...</p>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-amber-800">${product.price?.toFixed(2)}</span>
                <a 
                  href={`/product/${product._id}`}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-sm hover:shadow"
                >
                  View Details
                </a>
              </div>
            </div>
            
            {/* Cute corner decoration */}
            <div className="absolute bottom-1 left-1 text-amber-200 opacity-40 text-lg">◠</div>
          </div>
        ))}
      </div>
      
      {/* Empty state with cute illustration */}
      {wishlistedProducts.length === 0 && (
  <div className="flex flex-col items-center justify-center py-20 px-4 max-w-md mx-auto">
    <div className="relative mb-6">
      {/* Boy with bucket illustration using emoji composition */}
      <div className="relative flex flex-col items-center">
        <div className="text-7xl mb-2">👦</div>
        <div className="text-5xl absolute bottom-0 right-0 transform translate-x-6">🪣</div>
        <div className="text-2xl absolute top-8 left-0 transform -translate-x-6">❓</div>
        <div className="text-2xl absolute top-6 right-0 transform translate-x-10">❓</div>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 p-8 rounded-2xl shadow-lg border border-amber-200 w-full">
      <h3 className="text-2xl text-amber-800 font-serif text-center mb-3">
        Your Wishlist is Empty
      </h3>
      
      <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-300 to-transparent my-4"></div>
      
      <p className="text-amber-700 text-center mb-8">
        Looks like your bucket list needs some treasures! Start adding items you love to create your perfect collection.
      </p>
      
      <div className="flex justify-center">
        <a 
          href="/shop" 
          className="group relative px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden"
        >
          <span className="relative z-10 font-medium tracking-wide flex items-center">
            <span className="mr-2">Continue Shopping</span>
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
        </a>
      </div>
      
      <div className="flex justify-center mt-6">
        <div className="text-amber-400 text-lg">✨</div>
        <div className="mx-1 text-amber-300 text-lg">✨</div>
        <div className="text-amber-400 text-lg">✨</div>
      </div>
    </div>
    
    <div className="mt-6 text-amber-400 opacity-60 text-center italic text-sm">
      Fill your wishlist with dreams, we'll help make them reality!
    </div>
  </div>
)}
    </div>
  </div>
  );
};

export default WishlistPage;