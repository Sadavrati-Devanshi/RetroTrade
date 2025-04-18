import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllProducts, 
  deleteProduct, 
} from "../../../store/Seller/productSlice";
import { Loader2, Package, Search, Filter, RefreshCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import ProductStatsCharts from "./StatCard";
// import { formatDistance } from "date-fns";

const ProductsPage = () => {
  const dispatch = useDispatch();
  // Updated selector to match your working implementation
  const productList = useSelector(state => state.sellerProducts?.productList || []);
  const isLoading = useSelector(state => state.sellerProducts?.isLoading || false);
  const error = useSelector(state => state.sellerProducts?.error || null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  // Deletion state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Get all products data safely
  const products = productList || [];
// console.log(productList,"kuch aayega")
  // Get all unique categories
  const categories = [...new Set(products.map(product => product.category))];
  
  // Get all unique locations
  const locations = [...new Set(products.map(product => product.location))];
  
  // Get all unique conditions
  const conditions = [...new Set(products.map(product => product.condition))];
  
  // Calculate stats for charts
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const categoryBreakdown = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {});
  
  const conditionBreakdown = products.reduce((acc, product) => {
    const condition = product.condition;
    if (!acc[condition]) {
      acc[condition] = 0;
    }
    acc[condition]++;
    return acc;
  }, {});
  
  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesCondition = conditionFilter === "all" || product.condition === conditionFilter;
    const matchesLocation = locationFilter === "all" || product.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesCondition && matchesLocation;
  });
  
  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Handle product deletion
  const handleDeleteClick = (product) => {
console.log(product,"kuch aayega")
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedProduct?._id) {
      dispatch(deleteProduct(selectedProduct._id));
      setDeleteDialogOpen(false);
    }
  };
  
  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setConditionFilter("all");
    setLocationFilter("all");
    setCurrentPage(1);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Get image thumbnail
  const getProductThumbnail = (product) => {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    return null;
  };

  return (
    <div className="p-6 mx-auto max-w-7xl bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Product Management</h1>
      
      {/* Product Stats Charts */}
      <ProductStatsCharts 
        totalProducts={totalProducts}
        totalValue={totalValue}
        categoryBreakdown={categoryBreakdown}
        conditionBreakdown={conditionBreakdown}
      />
      
      {/* Filters */}
      <Card className="p-4 mb-6 bg-orange-50 border-amber-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-500" />
            <Input
              placeholder="Search products by title or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-32 border-amber-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger className="w-32 border-amber-200">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-32 border-amber-200">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="border-amber-300 hover:bg-amber-100"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Products Table */}
      <Card className="bg-white border-amber-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
            <span className="ml-2 text-amber-700">Loading products...</span>
          </div>
        ) : error ? (
          <div className="p-4 text-red-600">
            Error loading products: {error}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-amber-50">
                  <TableRow>
                    <TableHead className="font-bold text-amber-900">Product</TableHead>
                    <TableHead className="font-bold text-amber-900">Price</TableHead>
                    <TableHead className="font-bold text-amber-900">Category</TableHead>
                    <TableHead className="font-bold text-amber-900">Condition</TableHead>
                    <TableHead className="font-bold text-amber-900">Location</TableHead>
                    <TableHead className="font-bold text-amber-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <TableRow key={product._id} className="hover:bg-amber-50">
                        <TableCell className="py-3">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mr-3">
                              {getProductThumbnail(product) ? (
                                <img
                                  src={getProductThumbnail(product)}
                                  alt={`${product.title} thumbnail`}
                                  className="h-12 w-12 rounded object-cover"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded bg-amber-100 flex items-center justify-center">
                                  <Package className="h-6 w-6 text-amber-500" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-amber-900">{product.title}</p>
                              <p className="text-xs text-amber-600 line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-amber-900">{formatCurrency(product.price)}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-xs text-red-500 line-through">{formatCurrency(product.originalPrice)}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.condition === 'Excellent' ? 'default' : 'outline'} className={
                            product.condition === 'Excellent'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          }>
                            {product.condition}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-amber-700">
                          {product.location}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/products/${product._id}`, '_blank')}
                              className="border-amber-300 hover:bg-amber-100 text-amber-700"
                            >
                              View
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(product)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-amber-600">
                        No products found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center p-4 border-t border-amber-100">
                <div className="text-sm text-amber-700">
                  Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-amber-200 hover:bg-amber-100"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    // Logic to show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx;
                    } else {
                      pageNum = currentPage - 2 + idx;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(pageNum)}
                        className={currentPage === pageNum 
                          ? "bg-amber-500 hover:bg-amber-600 text-white" 
                          : "border-amber-200 hover:bg-amber-100"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-amber-200 hover:bg-amber-100"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-amber-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-amber-900">Delete Product</AlertDialogTitle>
            <AlertDialogDescription className="text-amber-700">
              Are you sure you want to delete "{selectedProduct?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-amber-200 hover:bg-amber-50">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductsPage;