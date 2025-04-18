// import React from 'react';
// import RetroTradeSearch from './ProductsSearchUi';

// const testData = [
//   {
//     id: 1,
//     title: 'Bed',
//     description: 'Final submit then go to bed',
//     category: 'furniture',
//     price: '97',
//     originalPrice: '150',
//     availabilityDate: '',
//     condition: 'Excellent',
//     location: 'Gandhinagar',
//     imageUrls: [
//       'https://res.cloudinary.com/dolobeygd/image/upload/v1742129105/product_images/ixp6jwkmbhcbxsjcwafw.jpg',
//       'https://res.cloudinary.com/dolobeygd/image/upload/v1742129842/product_images/vwn5z1bcolo9btjqheic.jpg'
//     ],
//     deliveryOptions: 'shipping',
//     createdBy: '67d3ef37ccab136ad64395b0',
//     rating: 4.5
//   }
// ];

// const ParentComponent = () => {
//   return <RetroTradeSearch productData={testData} />;
// };
//working
// export default ParentComponent;
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import RetroTradeSearch from './ProductsSearchUi';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllProducts } from '../../store/Seller/productSlice';

// const ProductSearchController = () => {
//   const dispatch = useDispatch();

//   // Access Redux state
//   const productList = useSelector(state => state.sellerProducts?.productList || []);
//   const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);

//   // Initial filter state
//   const initialFilters = {
//     searchQuery: '',
//     category: '',
//     condition: '',
//     location: '',
//     minRating: 0,
//     priceRange: [0, 10000]
//   };

//   const [filters, setFilters] = useState(initialFilters);
//   const [dataFetched, setDataFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchAllProducts());
//         setDataFetched(true);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setDataFetched(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     if (dataFetched && productList.length) {
//       console.log('✅ Fetched Products:', productList);
//     }
//   }, [productList, dataFetched]);

//   // Apply filters using useMemo
//   const filteredProducts = useMemo(() => {
//     if (!dataFetched) return [];

//     // Create a copy of the product list to avoid mutation
//     let result = [...productList];

//     // Search query filter
//     if (filters.searchQuery) {
//       const query = filters.searchQuery.toLowerCase();
//       result = result.filter(product => 
//         product?.title?.toLowerCase().includes(query) || 
//         product?.description?.toLowerCase().includes(query)
//       );
//     }

//     // Category filter - Make case insensitive
//     if (filters.category) {
//       result = result.filter(product => 
//         product?.category?.toLowerCase() === filters.category.toLowerCase()
//       );
//     }

//     // Condition filter - Make case insensitive
//     if (filters.condition) {
//       result = result.filter(product => 
//         product?.condition?.toLowerCase() === filters.condition.toLowerCase()
//       );
//     }

//     // Location filter
//     if (filters.location) {
//       const locationQuery = filters.location.toLowerCase();
//       result = result.filter(product => 
//         product?.location?.toLowerCase().includes(locationQuery)
//       );
//     }

//     // Rating filter
//     if (filters.minRating > 0) {
//       result = result.filter(product => product?.rating >= filters.minRating);
//     }

//     // Price range filter - Added null checks
//     if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
//       result = result.filter(product => {
//         const price = parseFloat(product?.price || 0);
//         return price >= filters.priceRange[0] && price <= filters.priceRange[1];
//       });
//     }

//     console.log('Filtered products:', result); // Debug log
//     return result;
//   }, [productList, filters, dataFetched]);

//   // Handle filter change with useCallback
//   const handleFilterChange = useCallback((filterType, value) => {
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [filterType]: value
//     }));
//   }, []);

//   // Add reset filters function
//   const resetFilters = useCallback(() => {
//     console.log('Resetting all filters');
//     setFilters(initialFilters);
//   }, []);

//   // Constant props to avoid re-renders
//   const categories = useMemo(() => [
//     'electronics', 'Furniture', 'Clothing', 'Books', 'Accessories', 'Collectibles', 'Appliances'
//   ], []);

//   const conditions = useMemo(() => [
//     'Excellent', 'Good', 'Fair'
//   ], []);

//   if (!dataFetched) {
//     return <div>Loading products...</div>;
//   }

//   return (
//     <RetroTradeSearch 
//       productData={filteredProducts}
//       loading={isLoading}
//       filters={filters}
//       onFilterChange={handleFilterChange}
//       onResetFilters={resetFilters} // Add reset filters prop
//       categories={categories}
//       conditions={conditions}
//     />
//   );
// };

// export default ProductSearchController;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RetroTradeSearch from './ProductsSearchUi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../store/Seller/productSlice';
import { addToWishlist } from '@/store/buyer/wishlistSlice';

const ProductSearchController = () => {
  const dispatch = useDispatch();

  // Access Redux state
  const productList = useSelector(state => state.sellerProducts?.productList || []);
  const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);
  const { user } = useSelector((state) => state.auth);
  // Initial filter state
  const initialFilters = {
    searchQuery: '',
    category: '',
    condition: '',
    location: '',
    minRating: 0,
    priceRange: [0, 10000]
  };

  // Define categories and conditions at the top
  const categories = [
    'electronics', 'Furniture', 'Clothing', 'Books', 'Accessories', 'Collectibles', 'Appliances'
  ];

  const conditions = [
    'Excellent', 'Good', 'Fair'
  ];

  // State moved from UI to controller
  const [filters, setFilters] = useState(initialFilters);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [locationInput, setLocationInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllProducts());
        setDataFetched(true);
      } catch (error) {
        console.error('Error fetching products:', error);
        setDataFetched(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (dataFetched && productList.length) {
      console.log('✅ Fetched Products:', productList);
    }
  }, [productList, dataFetched]);

  // Handle filter change with useCallback
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  }, []);


  const handleWishlistToggle = useCallback((productId) => {
    try {
      dispatch(addToWishlist(productId));
      console.log("Toggling wishlist item:", productId);
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
    }
  }, [dispatch]);

  // Handle search query input
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handle search button click
  const handleSearch = useCallback(() => {
    handleFilterChange('searchQuery', searchQuery);
  }, [searchQuery, handleFilterChange]);

  // Handle location input change
  const handleLocationChange = useCallback((e) => {
    setLocationInput(e.target.value);
  }, []);

  // Add filter tag
  const addFilter = useCallback((filterType, filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
    
    if (filterType === 'category') {
      handleFilterChange('category', filter);
    } else if (filterType === 'condition') {
      handleFilterChange('condition', filter);
    } else if (filterType === 'rating') {
      handleFilterChange('minRating', parseInt(filter.split('+')[0]));
    }
  }, [activeFilters, handleFilterChange]);

  // Remove filter
  const removeFilter = useCallback((filter) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
    
    // Reset the corresponding filter
    if (filter.startsWith('Price:')) {
      setPriceRange([0, 10000]);
      handleFilterChange('priceRange', [0, 10000]);
    } else if (filter.startsWith('Location:')) {
      setLocationInput('');
      handleFilterChange('location', '');
    } else if (categories.includes(filter)) {
      handleFilterChange('category', '');
    } else if (conditions.includes(filter)) {
      handleFilterChange('condition', '');
    } else if (filter.includes('+')) {
      handleFilterChange('minRating', 0);
    }
  }, [activeFilters, categories, conditions, handleFilterChange]);

  // Apply location filter
  const handleLocationFilter = useCallback(() => {
    handleFilterChange('location', locationInput);
    if (locationInput && !activeFilters.includes(`Location: ${locationInput}`)) {
      setActiveFilters([...activeFilters, `Location: ${locationInput}`]);
    }
  }, [locationInput, activeFilters, handleFilterChange]);

  // Handle price range change
  const handlePriceRangeChange = useCallback((value) => {
    setPriceRange(value);
    handleFilterChange('priceRange', value);
    
    // Update active filters for price range
    const priceRangeFilter = `Price: $${value[0]} - $${value[1]}`;
    const existingPriceFilter = activeFilters.find(filter => filter.startsWith('Price:'));
    
    if (existingPriceFilter) {
      setActiveFilters(activeFilters.map(filter => 
        filter.startsWith('Price:') ? priceRangeFilter : filter
      ));
    } else {
      setActiveFilters([...activeFilters, priceRangeFilter]);
    }
  }, [activeFilters, handleFilterChange]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery('');
    setPriceRange([0, 10000]);
    setLocationInput('');
    
    // Reset all filter values
    handleFilterChange('searchQuery', '');
    handleFilterChange('category', '');
    handleFilterChange('condition', '');
    handleFilterChange('location', '');
    handleFilterChange('minRating', 0);
    handleFilterChange('priceRange', [0, 10000]);
  }, [handleFilterChange]);

  // Apply condition filter
  const handleConditionChange = useCallback((condition, isChecked) => {
    if (isChecked) {
      addFilter('condition', condition);
    } else {
      removeFilter(condition);
    }
  }, [addFilter, removeFilter]);

  // Apply rating filter
  const handleRatingChange = useCallback((rating, isChecked) => {
    const ratingFilter = `${rating}+`;
    if (isChecked) {
      addFilter('rating', ratingFilter);
    } else {
      removeFilter(ratingFilter);
    }
  }, [addFilter, removeFilter]);

  // Handle Enter key press for search
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Handle Enter key press for location
  const handleLocationKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleLocationFilter();
    }
  }, [handleLocationFilter]);

  // Handle view mode change
  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  // Apply filters using useMemo
  const filteredProducts = useMemo(() => {
    if (!dataFetched) return [];

    // Create a copy of the product list to avoid mutation
    let result = [...productList];

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product?.title?.toLowerCase().includes(query) || 
        product?.description?.toLowerCase().includes(query)
      );
    }

    // Category filter - Make case insensitive
    if (filters.category) {
      result = result.filter(product => 
        product?.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Condition filter - Make case insensitive
    if (filters.condition) {
      result = result.filter(product => 
        product?.condition?.toLowerCase() === filters.condition.toLowerCase()
      );
    }

    // Location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      result = result.filter(product => 
        product?.location?.toLowerCase().includes(locationQuery)
      );
    }

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter(product => product?.rating >= filters.minRating);
    }

    // Price range filter - Added null checks
    if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
      result = result.filter(product => {
        const price = parseFloat(product?.price || 0);
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
    }

    console.log('Filtered products:', result); // Debug log
    return result;
  }, [productList, filters, dataFetched]);

  if (!dataFetched) {
    return <div>Loading products...</div>;
  }

  return (
    <RetroTradeSearch 
      productData={filteredProducts}
      loading={isLoading}
      filters={filters}
      searchQuery={searchQuery}
      priceRange={priceRange}
      activeFilters={activeFilters}
      viewMode={viewMode}
      locationInput={locationInput}
      categories={categories}
      conditions={conditions}
      userRole={user?.role}
      onFilterChange={handleFilterChange}
      onSearchChange={handleSearchChange}
      onWishlistToggle={handleWishlistToggle}
      onSearch={handleSearch}
      onLocationChange={handleLocationChange}
      onLocationFilter={handleLocationFilter}
      onPriceRangeChange={handlePriceRangeChange}
      onAddFilter={addFilter}
      onRemoveFilter={removeFilter}
      onClearAllFilters={clearAllFilters}
      onConditionChange={handleConditionChange}
      onRatingChange={handleRatingChange}
      onKeyPress={handleKeyPress}
      onLocationKeyPress={handleLocationKeyPress}
      onViewModeChange={handleViewModeChange}
    />
  );
};

export default ProductSearchController;

//Experiment
// const productList = useSelector(state => state.sellerProducts?.productList || []);
// const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import RetroTradeSearch from './ProductsSearchUi';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllProducts } from '../../store/Seller/productSlice';

// const ProductSearchController = () => {
//   const dispatch = useDispatch();

//   // Access Redux state
//   const productList = useSelector(state => state.sellerProducts?.productList || []);
// const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);

//   const [filters, setFilters] = useState({
//     searchQuery: '',
//     category: '',
//     condition: '',
//     location: '',
//     minRating: 0,
//     priceRange: [0, 1000]
//   });

//   // ✅ State to track local loading until data is fetched
//   const [dataFetched, setDataFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchAllProducts());
//         setDataFetched(true); // Set to true after data is fetched
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setDataFetched(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   // ✅ Log fetched products only after data is fetched
//   useEffect(() => {
//     if (dataFetched && productList.length) {
//       console.log('✅ Fetched Products:', productList);
//     }
//   }, [productList, dataFetched]);

//   // ✅ Apply filters using useMemo
//   const filteredProducts = useMemo(() => {
//     if (!dataFetched) return [];

//     let result = [...productList];

//     // Search query filter
//     if (filters.searchQuery) {
//       const query = filters.searchQuery.toLowerCase();
//       result = result.filter(product => 
//         product?.title?.toLowerCase().includes(query) || 
//         product?.description?.toLowerCase().includes(query)
//       );
//     }

//     // Category filter
//     if (filters.category) {
//       result = result.filter(product => product?.category === filters.category);
//     }

//     // Condition filter
//     if (filters.condition) {
//       result = result.filter(product => product?.condition === filters.condition);
//     }

//     // Location filter
//     if (filters.location) {
//       const locationQuery = filters.location.toLowerCase();
//       result = result.filter(product => product?.location?.toLowerCase().includes(locationQuery));
//     }

//     // Rating filter
//     if (filters.minRating > 0) {
//       result = result.filter(product => product?.rating >= filters.minRating);
//     }

//     // Price range filter
//     result = result.filter(product => {
//       const price = parseFloat(product?.price || 0);
//       return price >= filters.priceRange[0] && price <= filters.priceRange[1];
//     });

//     return result;
//   }, [productList, filters, dataFetched]);

//   // ✅ Handle filter change with useCallback
//   const handleFilterChange = useCallback((filterType, value) => {
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [filterType]: value
//     }));
//   }, []);

//   // ✅ Constant props to avoid re-renders
//   const categories = useMemo(() => [
//     'Electronics', 'Furniture', 'Clothing', 'Books', 'Accessories', 'Collectibles', 'Appliances'
//   ], []);

//   const conditions = useMemo(() => [
//     'Excellent', 'Good', 'Fair'
//   ], []);

//   if (!dataFetched) {
//     return <div>Loading products...</div>; // ✅ Render loading state until data is fetched
//   }

//   return (
//     <RetroTradeSearch 
//       productData={filteredProducts}
//       loading={isLoading}
//       filters={filters}
//       onFilterChange={handleFilterChange}
//       categories={categories}
//       conditions={conditions}
//     />
//   );
// };

// export default ProductSearchController;
