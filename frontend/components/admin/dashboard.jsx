//  const { users, isLoading, error } = useSelector((state) => state.users);
//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("✅ isLoading:", isLoading);
//     console.log("✅ users:", users);
//     console.log("✅ error:", error);
//   }, [users, isLoading, error]);
  import React, { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { 
    fetchAllUsers
  } from "../../store/userSlice";
  import { Loader2, UserCircle, Search, Filter, RefreshCcw } from "lucide-react";
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
  import UserStatsCharts from "./UserStatsCharts.jsx";
  import { formatDistance } from "date-fns";
  
  const UsersPage = () => {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector((state) => state.users);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    
    // Filter and search state
    const [searchTerm, setSearchTerm] = useState("");
    const [userTypeFilter, setUserTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    
    // Deletion state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    useEffect(() => {
      dispatch(fetchAllUsers());
      console.log("Cancelled")
    }, [dispatch]);
  
    // Calculate stats for charts
    const totalUsers = users.length;
    const sellerCount = users.filter(user => user.role === "seller").length;
    const buyerCount = users.filter(user => user.role === "buyer").length;
    const activeUsers = users.filter(user => user.status).length;
    
    // Filter and search users
    const filteredUsers = users.filter(user => {
      const matchesSearch = searchTerm === "" || 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUserType = userTypeFilter === "all" || user.role === userTypeFilter;
      const matchesStatus = statusFilter === "all" || 
        (statusFilter === "active" && user.status) || 
        (statusFilter === "inactive" && !user.status);
      
      return matchesSearch && matchesUserType && matchesStatus;
    });
    
    // Get current users for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    
    // Handle user deletion
    const handleDeleteClick = (user) => {
      
      setSelectedUser(user);
      setDeleteDialogOpen(true);
    };
    
    const confirmDelete = () => {
      if (selectedUser?._id) {
        
        dispatch(deleteUser(selectedUser._id));
        setDeleteDialogOpen(false);
      }
    };
    
    // Handle user status toggle
    const handleStatusToggle = (userId, currentStatus) => {
      dispatch(updateUserStatus({ userId, status: !currentStatus }));
    };
    
    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Reset filters
    const resetFilters = () => {
      setSearchTerm("");
      setUserTypeFilter("all");
      setStatusFilter("all");
      setCurrentPage(1);
    };
  
    return (
      <div className="p-6 mx-auto max-w-7xl bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
        <h1 className="text-3xl font-bold text-amber-800 mb-6">User Management</h1>
        
        {/* User Stats Charts */}
        <UserStatsCharts 
          totalUsers={totalUsers}
          sellerCount={sellerCount}
          buyerCount={buyerCount}
          activeUsers={activeUsers}
        />
        
        {/* Filters */}
        <Card className="p-4 mb-6 bg-orange-50 border-amber-200">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-500" />
              <Input
                placeholder="Search users by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger className="w-32 border-amber-200">
                  <SelectValue placeholder="User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buyer">Buyers</SelectItem>
                  <SelectItem value="seller">Sellers</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 border-amber-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
        
        {/* Users Table */}
        <Card className="bg-white border-amber-200 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
              <span className="ml-2 text-amber-700">Loading users...</span>
            </div>
          ) : error ? (
            <div className="p-4 text-red-600">
              Error loading users: {error}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-amber-50">
                    <TableRow>
                      <TableHead className="font-bold text-amber-900">User</TableHead>
                      <TableHead className="font-bold text-amber-900">Role</TableHead>
                      <TableHead className="font-bold text-amber-900">Status</TableHead>
                      <TableHead className="font-bold text-amber-900">Registered</TableHead>
                      <TableHead className="font-bold text-amber-900">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <TableRow key={user._id} className="hover:bg-amber-50">
                          <TableCell className="py-3">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 mr-3">
                                {user.avatar ? (
                                  <img
                                    src={user.avatar}
                                    alt={`${user.name}'s avatar`}
                                    className="h-9 w-9 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center">
                                    <UserCircle className="h-7 w-7 text-amber-500" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-amber-900">{user.name}</p>
                                <p className="text-xs text-amber-600">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'seller' ? 'secondary' : 'outline'} className={
                              user.role === 'seller'
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            }>
                              {user.role === 'seller' ? 'seller' : 'buyer'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status ? 'default' : 'destructive'} className={
                              user.status
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }>
                              {user.status ? 'active' : 'inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-amber-700">
                            {user.createdAt ? (
                              formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })
                            ) : (
                              'Unknown'
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusToggle(user._id, user.status)}
                                className="border-amber-300 hover:bg-amber-100 text-amber-700"
                              >
                                {user.status ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteClick(user)}
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
                        <TableCell colSpan={5} className="text-center py-8 text-amber-600">
                          No users found matching your filters.
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
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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
              <AlertDialogTitle className="text-amber-900">Delete User</AlertDialogTitle>
              <AlertDialogDescription className="text-amber-700">
                Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
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
  
  export default UsersPage;