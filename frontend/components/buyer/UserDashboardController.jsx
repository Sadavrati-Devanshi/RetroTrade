// // UserDashboardController.jsx
// import { useState, useEffect, useMemo, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllProducts } from '@/store/Seller/productSlice';
// import UserDashboardUi from './UserDashboardUi';
// import { addToWishlist } from '@/store/buyer/wishlistSlice';

// const UserDashboardController = () => {
//   // State management
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [fadeIn, setFadeIn] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [slideDirection, setSlideDirection] = useState('right');
//   const [slideTransition, setSlideTransition] = useState(false);
  
//   const productsPerPage = 4;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Get products from Redux store
//   const allProducts = useSelector(state => state.sellerProducts?.productList || []);
  
//   // Fallback products in case API fails
//   const fallbackProducts = [
//     { id: 1, title: "Vintage Camera", price: 120, condition: "Good", sellerRating: 4.8, category: "Electronics", image: "/api/placeholder/300/300" },
//     { id: 2, title: "Mid-Century Desk", price: 230, condition: "Like New", sellerRating: 4.9, category: "Furniture", image: "/api/placeholder/300/300" },
//     { id: 3, title: "Retro Gaming Console", price: 85, condition: "Fair", sellerRating: 4.5, category: "Electronics", image: "/api/placeholder/300/300" },
//     { id: 4, title: "Designer Jacket", price: 75, condition: "Good", sellerRating: 4.7, category: "Clothing", image: "/api/placeholder/300/300" },
//     { id: 5, title: "Vintage Anthology", price: 45, condition: "Good", sellerRating: 4.3, category: "Books", image: "/api/placeholder/300/300" },
//     { id: 6, title: "Decorative Vase", price: 65, condition: "Like New", sellerRating: 4.6, category: "Home", image: "/api/placeholder/300/300" },
//     { id: 7, title: "Tennis Racket", price: 55, condition: "Good", sellerRating: 4.4, category: "Sports", image: "/api/placeholder/300/300" },
//     { id: 8, title: "Record Player", price: 150, condition: "Good", sellerRating: 4.9, category: "Electronics", image: "/api/placeholder/300/300" }
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah J.",
//       comment: "RetroTrade helped me declutter my home and make some extra cash. The platform is super intuitive!",
//       avatar: "/api/placeholder/40/40",
//       role: "Seller"
//     },
//     {
//       id: 2,
//       name: "Michael T.",
//       comment: "I found a rare vintage camera at half the retail price. The secure payment system gave me peace of mind.",
//       avatar: "/api/placeholder/40/40",
//       role: "Buyer"
//     },
//     {
//       id: 3,
//       name: "Emma L.",
//       comment: "As someone who cares about sustainability, I love that RetroTrade promotes reuse and reduces waste.",
//       avatar: "/api/placeholder/40/40",
//       role: "Regular User"
//     }
//   ];

//   const benefits = [
//     { title: "Sustainable Shopping", description: "Reduce waste and your carbon footprint", icon: "🌱" },
//     { title: "Save Money", description: "Find quality items at a fraction of retail prices", icon: "💰" },
//     { title: "Secure Transactions", description: "Our escrow system protects both buyers and sellers", icon: "🔒" },
//     { title: "Community Trust", description: "Verified reviews and ratings for peace of mind", icon: "👥" }
//   ];

//   const categories = [
//     { name: "electronics", icon: "📱" },
//     { name: "furniture", icon: "🪑" },
//     { name: "clothing", icon: "👕" },
//     { name: "books", icon: "📚" },
//     { name: "home", icon: "🏠" },
//     { name: "sports", icon: "🏈" }
//   ];

//   // Initial setup and data fetching
//   useEffect(() => {
//     setFadeIn(true);
    
//     // Fetch products from API
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         await dispatch(fetchAllProducts());
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [dispatch]);

//   // Set products after they are fetched from Redux store
//   useEffect(() => {
//     if (allProducts.length > 0) {
//       setProducts(allProducts);
//       setFilteredProducts(allProducts);
//     } else {
//       setProducts(fallbackProducts);
//       setFilteredProducts(fallbackProducts);
//     }
//   }, [allProducts]);

//   // Update filtered products when search query changes
//   useEffect(() => {
//     let results = [...products];
  
//     // Apply search filter
//     if (searchQuery) {
//       results = results.filter(product =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
  
//     setFilteredProducts(results);
//     setIsFiltered(searchQuery !== '');
  
//     // Reset to first page when filters change
//     setCurrentPage(0);
//   }, [searchQuery, products]);
//   const handleWishlistToggle = useCallback((productId) => {
//       try {
//         dispatch(addToWishlist(productId));
//         console.log("Toggling wishlist item:", productId);
//       } catch (error) {
//         console.error("Error toggling wishlist item:", error);
//       }
//     }, [dispatch]);
  
//   // Reset all filters
//   const resetFilters = () => {
//     setSearchQuery('');
//     setIsFiltered(false);
//     setCurrentPage(0);
//   };

//   // Calculate total pages for the slider
//   const displayProducts = filteredProducts.length > 0 ? filteredProducts : fallbackProducts;
//   const totalItems = Math.min(displayProducts.length, 12); // max 12 items as requested
//   const totalPages = Math.ceil(totalItems / productsPerPage);

//   // Get current items for the page
//   const getCurrentItems = () => {
//     const startIndex = currentPage * productsPerPage;
//     const endIndex = Math.min(startIndex + productsPerPage, totalItems);
//     return displayProducts.slice(startIndex, endIndex);
//   };

//   // Pagination functions with smooth transitions
//   const nextPage = () => {
//     setSlideDirection('right');
//     setSlideTransition(true);
    
//     setTimeout(() => {
//       setCurrentPage((prev) => (prev + 1) % totalPages);
//       setSlideTransition(false);
//     }, 300);
//   };

//   const prevPage = () => {
//     setSlideDirection('left');
//     setSlideTransition(true);
    
//     setTimeout(() => {
//       setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
//       setSlideTransition(false);
//     }, 300);
//   };

//   // Group products by category for the Shop By Category section
//   const productCategories = useMemo(() => {
//     const categoriesMap = displayProducts.reduce((acc, product) => {
//       const category = product.category;
//       if (!acc[category]) {
//         acc[category] = [];
//       }
//       acc[category].push(product);
//       return acc;
//     }, {});
    
//     return Object.entries(categoriesMap);
//   }, [displayProducts]);

//   // Check if any products match the applied filters
//   const noProductsFound = isFiltered && filteredProducts.length === 0;

//   // Toggles menu for mobile view
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     // State
//     <UserDashboardUi
//     // UI State
//     isMenuOpen={isMenuOpen}
//     searchQuery={searchQuery}
//     fadeIn={fadeIn}
//     currentPage={currentPage}
//     isLoading={isLoading}
//     isFiltered={isFiltered}
//     slideDirection={slideDirection}
//     slideTransition={slideTransition}
//     noProductsFound={noProductsFound}
//     onWishlistToggle={handleWishlistToggle}
//     // Data
//     displayProducts={displayProducts}
//     getCurrentItems={getCurrentItems}
//     productCategories={productCategories}
//     categories={categories}
//     benefits={benefits}
//     testimonials={testimonials}
//     totalPages={totalPages}
  
//     // Actions
//     setIsMenuOpen={setIsMenuOpen}
//     toggleMenu={toggleMenu}
//     handleSearchChange={handleSearchChange}
//     resetFilters={resetFilters}
//     nextPage={nextPage}
//     prevPage={prevPage}
//     navigate={navigate}
//   />
  
//   );
// };

// export default UserDashboardController;

// UserDashboardController.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '@/store/Seller/productSlice';
import UserDashboardUi from './UserDashboardUi';
import { addToWishlist } from '@/store/buyer/wishlistSlice';

const UserDashboardController = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [slideTransition, setSlideTransition] = useState(false);
  
  const productsPerPage = 4;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get products from Redux store
  const allProducts = useSelector(state => state.sellerProducts?.productList || []);
  
  // Fallback products in case API fails
  const fallbackProducts = [
    { id: 1, title: "Vintage Camera", price: 120, condition: "Good", sellerRating: 4.8, category: "Electronics", image: "/api/placeholder/300/300" },
    { id: 2, title: "Mid-Century Desk", price: 230, condition: "Like New", sellerRating: 4.9, category: "Furniture", image: "/api/placeholder/300/300" },
    { id: 3, title: "Retro Gaming Console", price: 85, condition: "Fair", sellerRating: 4.5, category: "Electronics", image: "/api/placeholder/300/300" },
    { id: 4, title: "Designer Jacket", price: 75, condition: "Good", sellerRating: 4.7, category: "Clothing", image: "/api/placeholder/300/300" },
    { id: 5, title: "Vintage Anthology", price: 45, condition: "Good", sellerRating: 4.3, category: "Books", image: "/api/placeholder/300/300" },
    { id: 6, title: "Decorative Vase", price: 65, condition: "Like New", sellerRating: 4.6, category: "Home", image: "/api/placeholder/300/300" },
    { id: 7, title: "Tennis Racket", price: 55, condition: "Good", sellerRating: 4.4, category: "Sports", image: "/api/placeholder/300/300" },
    { id: 8, title: "Record Player", price: 150, condition: "Good", sellerRating: 4.9, category: "Electronics", image: "/api/placeholder/300/300" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      comment: "RetroTrade helped me declutter my home and make some extra cash. The platform is super intuitive!",
      avatar: "/api/placeholder/40/40",
      role: "Seller"
    },
    {
      id: 2,
      name: "Michael T.",
      comment: "I found a rare vintage camera at half the retail price. The secure payment system gave me peace of mind.",
      avatar: "/api/placeholder/40/40",
      role: "Buyer"
    },
    {
      id: 3,
      name: "Emma L.",
      comment: "As someone who cares about sustainability, I love that RetroTrade promotes reuse and reduces waste.",
      avatar: "/api/placeholder/40/40",
      role: "Regular User"
    }
  ];

  const benefits = [
    { title: "Sustainable Shopping", description: "Reduce waste and your carbon footprint", icon: "🌱" },
    { title: "Save Money", description: "Find quality items at a fraction of retail prices", icon: "💰" },
    { title: "Secure Transactions", description: "Our escrow system protects both buyers and sellers", icon: "🔒" },
    { title: "Community Trust", description: "Verified reviews and ratings for peace of mind", icon: "👥" }
  ];

  const categories = [
    { name: "electronics", icon: "📱" },
    { name: "furniture", icon: "🪑" },
    { name: "clothing", icon: "👕" },
    { name: "books", icon: "📚" },
    { name: "home", icon: "🏠" },
    { name: "sports", icon: "🏈" }
  ];

  // Initial setup and data fetching
  useEffect(() => {
    setFadeIn(true);
    
    // Fetch products from API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchAllProducts());
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch]);

  // Set products after they are fetched from Redux store
  useEffect(() => {
    if (allProducts.length > 0) {
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } else {
      setProducts(fallbackProducts);
      setFilteredProducts(fallbackProducts);
    }
  }, [allProducts]);

  // Update filtered products when search query changes
  useEffect(() => {
    let results = [...products];
  
    // Apply search filter
    if (searchQuery) {
      results = results.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setFilteredProducts(results);
    setIsFiltered(searchQuery !== '');
  
    // Reset to first page when filters change
    setCurrentPage(0);
  }, [searchQuery, products]);
  
  const handleWishlistToggle = useCallback((productId) => {
    try {
      dispatch(addToWishlist(productId));
      console.log("Toggling wishlist item:", productId);
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
    }
  }, [dispatch]);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setIsFiltered(false);
    setCurrentPage(0);
  };

  // Filter out "bought" products from display products
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : fallbackProducts;
  const availableProducts = displayProducts.filter(product => product.status !== "bought");
  const totalItems = Math.min(availableProducts.length, 12); // max 12 items as requested
  const totalPages = Math.ceil(totalItems / productsPerPage);

  // Get current items for the page - filter out "bought" products
  const getCurrentItems = () => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalItems);
    return availableProducts.slice(startIndex, endIndex);
  };

  // Pagination functions with smooth transitions
  const nextPage = () => {
    setSlideDirection('right');
    setSlideTransition(true);
    
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setSlideTransition(false);
    }, 300);
  };

  const prevPage = () => {
    setSlideDirection('left');
    setSlideTransition(true);
    
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      setSlideTransition(false);
    }, 300);
  };

  // Group products by category for the Shop By Category section - exclude "bought" products
  const productCategories = useMemo(() => {
    const categoriesMap = availableProducts.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
    
    return Object.entries(categoriesMap);
  }, [availableProducts]);

  // Check if any products match the applied filters
  const noProductsFound = isFiltered && availableProducts.length === 0;

  // Toggles menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    // State
    <UserDashboardUi
      // UI State
      isMenuOpen={isMenuOpen}
      searchQuery={searchQuery}
      fadeIn={fadeIn}
      currentPage={currentPage}
      isLoading={isLoading}
      isFiltered={isFiltered}
      slideDirection={slideDirection}
      slideTransition={slideTransition}
      noProductsFound={noProductsFound}
      onWishlistToggle={handleWishlistToggle}
      // Data
      displayProducts={availableProducts}
      getCurrentItems={getCurrentItems}
      productCategories={productCategories}
      categories={categories}
      benefits={benefits}
      testimonials={testimonials}
      totalPages={totalPages}
    
      // Actions
      setIsMenuOpen={setIsMenuOpen}
      toggleMenu={toggleMenu}
      handleSearchChange={handleSearchChange}
      resetFilters={resetFilters}
      nextPage={nextPage}
      prevPage={prevPage}
      navigate={navigate}
    />
  );
};

export default UserDashboardController;