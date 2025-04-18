// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUserPayments, getAllPayments } from '../../../store/Seller/paymentSlice';

// const TransactionList = () => {
//   const dispatch = useDispatch();
//   const { allPayments, isLoading, error } = useSelector(state => state.payment);
//   const userPayments = useSelector(state => state.payment.userPayments || []);
//   useEffect(() => {
//     console.log("TransactionList component mounted");
    
//     // Try wrapping in try/catch to see if any errors occur
//     try {
//       console.log("Dispatching getAllPayments");
//       dispatch(getAllPayments());
//       console.log("Dispatched getAllPayments");
      
//       console.log("Dispatching getUserPayments");
//       dispatch(getUserPayments());
//       console.log("Dispatched getUserPayments");
//     } catch (err) {
//       console.error("Dispatch error:", err);
//     }
//   }, [dispatch]);

//   console.log("All payments data:", allPayments);
//   console.log("User payments data:", userPayments);
  
//   if (isLoading) {
//     return <div className="text-center py-4">Loading payment data...</div>;
//   }
  
//   if (error) {
//     return <div className="bg-red-50 text-red-700 p-4 rounded">Error: {error}</div>;
//   }
  
//   if (!allPayments || allPayments.length === 0) {
//     return <div className="bg-blue-50 text-blue-700 p-4 rounded">No payment records found.</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">All Payment Records (Admin)</h2>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Order ID</th>
//               <th className="px-4 py-2 text-left">Payment ID</th>
//               <th className="px-4 py-2 text-left">Amount</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Product</th>
//               <th className="px-4 py-2 text-left">Buyer</th>
//               <th className="px-4 py-2 text-left">Seller</th>
//               <th className="px-4 py-2 text-left">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allPayments.map(payment => (
//               <tr key={payment._id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{payment.razorpayOrderId || 'N/A'}</td>
//                 <td className="px-4 py-2">{payment.razorpayPaymentId || 'N/A'}</td>
//                 <td className="px-4 py-2">{payment.amount} {payment.currency}</td>
//                 <td className="px-4 py-2">
//                   <span className={`inline-block px-2 py-1 rounded text-xs ${
//                     payment.status === 'paid' ? 'bg-green-100 text-green-800' :
//                     payment.status === 'created' ? 'bg-blue-100 text-blue-800' :
//                     payment.status === 'failed' ? 'bg-red-100 text-red-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {payment.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2">{payment.notes?.productName || 'Unknown Product'}</td>
//                 <td className="px-4 py-2">{payment.notes?.buyerId || payment.buyer}</td>
//                 <td className="px-4 py-2">{payment.notes?.sellerName || payment.seller}</td>
//                 <td className="px-4 py-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="mt-4">
//         <h3 className="text-xl font-semibold mb-2">Summary</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-blue-50 p-4 rounded">
//             <p className="text-sm text-blue-700">Total Orders</p>
//             <p className="text-2xl font-bold">{allPayments.length}</p>
//           </div>
//           <div className="bg-green-50 p-4 rounded">
//             <p className="text-sm text-green-700">Paid Orders</p>
//             <p className="text-2xl font-bold">
//               {allPayments.filter(p => p.status === 'paid').length}
//             </p>
//           </div>
//           <div className="bg-yellow-50 p-4 rounded">
//             <p className="text-sm text-yellow-700">Created Orders</p>
//             <p className="text-2xl font-bold">
//               {allPayments.filter(p => p.status === 'created').length}
//             </p>
//           </div>
//           <div className="bg-purple-50 p-4 rounded">
//             <p className="text-sm text-purple-700">Total Amount (Paid)</p>
//             <p className="text-2xl font-bold">
//               {allPayments
//                 .filter(p => p.status === 'paid')
//                 .reduce((sum, p) => sum + (p.amount || 0), 0)} INR
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionList;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPayments, getAllPayments } from '../../../store/Seller/paymentSlice';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TransactionList = () => {
  const dispatch = useDispatch();
  const { allPayments, isLoading, error } = useSelector(state => state.payment);
  const userPayments = useSelector(state => state.payment.userPayments || []);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // For chart data
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    try {
      dispatch(getAllPayments());
      dispatch(getUserPayments());
    } catch (err) {
      console.error("Dispatch error:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (allPayments && allPayments.length > 0) {
      // Prepare chart data
      const last7Days = prepareTimeSeriesData(7);
      setChartData(last7Days);
      
      // Prepare pie chart data
      const statusCounts = {
        paid: allPayments.filter(p => p.status === 'paid').length,
        created: allPayments.filter(p => p.status === 'created').length,
        failed: allPayments.filter(p => p.status === 'failed').length,
        other: allPayments.filter(p => !['paid', 'created', 'failed'].includes(p.status)).length
      };
      
      setPieData([
        { name: 'Paid', value: statusCounts.paid, color: '#10B981' },
        { name: 'Created', value: statusCounts.created, color: '#3B82F6' },
        { name: 'Failed', value: statusCounts.failed, color: '#EF4444' },
        { name: 'Other', value: statusCounts.other, color: '#9CA3AF' }
      ]);
    }
  }, [allPayments]);

  const prepareTimeSeriesData = (days) => {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const dayPayments = allPayments.filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate.getDate() === date.getDate() &&
               paymentDate.getMonth() === date.getMonth() &&
               paymentDate.getFullYear() === date.getFullYear();
      });
      
      const paid = dayPayments.filter(p => p.status === 'paid');
      const created = dayPayments.filter(p => p.status === 'created');
      
      data.push({
        date: dateString,
        'Paid Orders': paid.length,
        'Created Orders': created.length,
        'Total Value': paid.reduce((sum, p) => sum + (p.amount || 0), 0)
      });
    }
    
    return data;
  };

  const filterPayments = () => {
    if (!allPayments) return [];
    
    return allPayments.filter(payment => {
      // Status filter
      if (statusFilter !== 'all' && payment.status !== statusFilter) return false;
      
      // Date range filter
      if (dateRange !== 'all') {
        const paymentDate = new Date(payment.createdAt);
        const now = new Date();
        
        if (dateRange === 'today') {
          if (paymentDate.getDate() !== now.getDate() ||
              paymentDate.getMonth() !== now.getMonth() ||
              paymentDate.getFullYear() !== now.getFullYear()) {
            return false;
          }
        } else if (dateRange === 'week') {
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          if (paymentDate < weekAgo) return false;
        } else if (dateRange === 'month') {
          const monthAgo = new Date(now);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          if (paymentDate < monthAgo) return false;
        }
      }
      
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          (payment.razorpayOrderId && payment.razorpayOrderId.toLowerCase().includes(searchLower)) ||
          (payment.razorpayPaymentId && payment.razorpayPaymentId.toLowerCase().includes(searchLower)) ||
          (payment.notes?.productName && payment.notes.productName.toLowerCase().includes(searchLower)) ||
          (payment.notes?.buyerId && payment.notes.buyerId.toLowerCase().includes(searchLower)) ||
          (payment.notes?.sellerName && payment.notes.sellerName.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  };

  const filteredPayments = filterPayments();
  
  const totalPaidAmount = filteredPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium">Error Loading Data</h3>
        <p className="mt-2">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded"
          onClick={() => {
            dispatch(getAllPayments());
            dispatch(getUserPayments());
          }}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (!allPayments || allPayments.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 text-blue-700 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium">No Payment Records</h3>
        <p className="mt-2">There are currently no payment records in the system.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Transaction Dashboard</h2>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm"
            onClick={() => {
              dispatch(getAllPayments());
              dispatch(getUserPayments());
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid Only</option>
              <option value="created">Created Only</option>
              <option value="failed">Failed Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search by order ID, product, buyer or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{filteredPayments.length}</p>
          <p className="text-xs text-gray-400 mt-1">
            {statusFilter === 'all' ? 'All statuses' : `Status: ${statusFilter}`}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Paid Orders</p>
          <p className="text-2xl font-bold">
            {filteredPayments.filter(p => p.status === 'paid').length}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {((filteredPayments.filter(p => p.status === 'paid').length / filteredPayments.length) * 100).toFixed(1)}% of total
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Created Orders</p>
          <p className="text-2xl font-bold">
            {filteredPayments.filter(p => p.status === 'created').length}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {((filteredPayments.filter(p => p.status === 'created').length / filteredPayments.length) * 100).toFixed(1)}% of total
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold">₹{totalPaidAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">
            From {filteredPayments.filter(p => p.status === 'paid').length} paid orders
          </p>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Trend Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Transaction Trend (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Paid Orders" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="Created Orders" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Payment Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Payment Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Daily Revenue (Last 7 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total Value" fill="#8884d8" name="Revenue (INR)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Transaction Details</h3>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredPayments.length} of {allPayments.length} transactions
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map(payment => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{payment.razorpayOrderId || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm">{payment.razorpayPaymentId || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm font-medium">₹{payment.amount} {payment.currency}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                      payment.status === 'created' ? 'bg-blue-100 text-blue-800' :
                      payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{payment.notes?.productName || 'Unknown Product'}</td>
                  <td className="px-4 py-3 text-sm">{payment.notes?.buyerId || payment.buyer || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm">{payment.notes?.sellerName || payment.seller || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm">{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPayments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions match your current filters
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;