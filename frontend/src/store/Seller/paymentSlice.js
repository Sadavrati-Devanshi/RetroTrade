// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "sonner";

// const initialState = {
//   orderData: null,
//   paymentResult: null,
//   isLoading: false,
//   error: null,
//   success: false
// };

// // Create order thunk
// export const createPaymentOrder = createAsyncThunk(
//   'payment/createOrder',
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       console.log("Creating payment order with data:", paymentData);
//       const res = await axios.post(
//         'http://localhost:5000/api/payment/create-order',
//         paymentData,
//         { 
//           headers: { "Content-Type": "application/json" }, 
//           withCredentials: true 
//         }
//       );
//       console.log("Create order response:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Create order error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );

// // Verify payment thunk
// export const verifyPayment = createAsyncThunk(
//   'payment/verifyPayment',
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       console.log("Verifying payment with data:", paymentData);
//       const res = await axios.post(
//         'http://localhost:5000/api/payment/verify-payment',
//         paymentData,
//         { 
//           headers: { "Content-Type": "application/json" }, 
//           withCredentials: true 
//         }
//       );
//       console.log("Verify payment response:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Verify payment error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );

// const paymentSlice = createSlice({
//   name: 'payment',
//   initialState,
//   reducers: {
//     resetPayment: (state) => {
//       state.success = false;
//       state.error = null;
//     },
//     clearPaymentState: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create order cases
//       .addCase(createPaymentOrder.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Create Payment Order Pending");
//       })
//       .addCase(createPaymentOrder.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderData = action.payload.data;
//         state.success = true;
//         console.log("Create Payment Order Fulfilled - Payload:", action.payload);
//         // Remove toast from here as we'll show success only after payment completes
//       })
//       .addCase(createPaymentOrder.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Failed to create payment order";
//         console.log("Create Payment Order Rejected - Error:", state.error);
//         toast.error(`Payment order failed: ${state.error}`, {
//           style: {
//             backgroundColor: '#ef4444',
//             color: '#ffffff', 
//             border: 'none',
//           },
//         });
//       })
      
//       // Verify payment cases
//       .addCase(verifyPayment.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Verify Payment Pending");
//       })
//       .addCase(verifyPayment.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.paymentResult = action.payload.data;
//         state.success = true;
//         console.log("Verify Payment Fulfilled - Payload:", action.payload);
//         toast.success("Payment verified successfully", {
//           style: {
//             backgroundColor: '#22c55e',
//             color: '#ffffff',
//             border: 'none',
//           },
//         });
//       })
//       .addCase(verifyPayment.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Payment verification failed";
//         console.log("Verify Payment Rejected - Error:", state.error);
//         toast.error(`Payment verification failed: ${state.error}`, {
//           style: {
//             backgroundColor: '#ef4444',
//             color: '#ffffff',
//             border: 'none',
//           },
//         });
//       });
//   }
// });

// export const { resetPayment, clearPaymentState } = paymentSlice.actions;
// export default paymentSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "sonner";
// const initialState = {
//   orderData: null,
//   paymentResult: null,
//   paymentDetails: null,
//   userPayments: [],
//   allOrdersData: {
//     orders: [],
//     ordersByStatus: {
//       created: [],
//       paid: [],
//       failed: [],
//       cancelled: []
//     },
//     amountByStatus: {
//       created: 0,
//       paid: 0,
//       failed: 0,
//       cancelled: 0,
//       total: 0
//     },
//     counts: {
//       total: 0,
//       created: 0,
//       paid: 0,
//       failed: 0,
//       cancelled: 0
//     }
//   },
//   isLoading: false,
//   error: null,
//   success: false
// };
// // const initialState = {
// //   orderData: null,
// //   paymentResult: null,
// //   paymentDetails: null,
// //   userPayments: [],
// //   isLoading: false,
// //   error: null,
// //   success: false
// // };

// // Create order thunk
// export const createPaymentOrder = createAsyncThunk(
//   'payment/createOrder',
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       console.log("Creating payment order with data:", paymentData);
//       const res = await axios.post(
//         'http://localhost:5000/api/payment/create-order',
//         paymentData,
//         { 
//           headers: { "Content-Type": "application/json" }, 
//           withCredentials: true 
//         }
//       );
//       console.log("Create order response:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Create order error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );

// // Verify payment thunk
// export const verifyPayment = createAsyncThunk(
//   'payment/verifyPayment',
//   async (paymentData, { rejectWithValue }) => {
//     try {
//       console.log("Verifying payment with data:", paymentData);
//       const res = await axios.post(
//         'http://localhost:5000/api/payment/verify-payment',
//         paymentData,
//         { 
//           headers: { "Content-Type": "application/json" }, 
//           withCredentials: true 
//         }
//       );
//       console.log("Verify payment response:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Verify payment error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );

// // Get all orders/transactions (admin) thunk
// export const getAllPayments = createAsyncThunk(
//   'payment/getAllPayments',
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("Fetching all orders/transactions");
//       const res = await axios.get(
//         'http://localhost:5000/api/payment/all-orders',
//         { 
//           withCredentials: true 
//         }
//       );
//       console.log("All orders response:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Get all orders error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );
// // Get payment details by ID thunk
// export const getPaymentDetails = createAsyncThunk(
//   'payment/getPaymentDetails',
//   async (paymentId, { rejectWithValue }) => {
//     try {
//       console.log("Fetching payment details for ID:", paymentId);
//       const res = await axios.get(
//         `http://localhost:5000/api/payment/details/${paymentId}`,
//         { 
//           headers: { "Content-Type": "application/json" }, 
//           withCredentials: true 
//         }
//       );
//       console.log("Payment details response:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Get payment details error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );

// // Get user payments thunk
// export const getUserPayments = createAsyncThunk(
//   'payment/getUserPayments',
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("Fetching user payments");
//       const res = await axios.get(
//         'http://localhost:5000/api/payment/user-payments',
//         { 
//           withCredentials: true 
//         }
//       );
//       console.log("User payments response:", res.data);
//       return res.data.data;
//     } catch (error) {
//       console.error("Get user payments error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );

// const paymentSlice = createSlice({
//   name: 'payment',
//   initialState,
//   reducers: {
//     resetPayment: (state) => {
//       state.success = false;
//       state.error = null;
//     },
//     clearPaymentState: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create order cases
//       .addCase(createPaymentOrder.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Create Payment Order Pending");
//       })
//       .addCase(createPaymentOrder.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderData = action.payload.data;
//         state.success = true;
//         console.log("Create Payment Order Fulfilled - Payload:", action.payload);
//         // Remove toast from here as we'll show success only after payment completes
//       })
//       .addCase(createPaymentOrder.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Failed to create payment order";
//         console.log("Create Payment Order Rejected - Error:", state.error);
//         toast.error(`Payment order failed: ${state.error}`, {
//           style: {
//             backgroundColor: '#ef4444',
//             color: '#ffffff', 
//             border: 'none',
//           },
//         });
//       })
      
//       // Verify payment cases
//       .addCase(verifyPayment.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Verify Payment Pending");
//       })
//       .addCase(verifyPayment.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.paymentResult = action.payload.data;
//         state.success = true;
//         console.log("Verify Payment Fulfilled - Payload:", action.payload);
//         toast.success("Payment verified successfully", {
//           style: {
//             backgroundColor: '#22c55e',
//             color: '#ffffff',
//             border: 'none',
//           },
//         });
//       })
//       .addCase(verifyPayment.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Payment verification failed";
//         console.log("Verify Payment Rejected - Error:", state.error);
//         toast.error(`Payment verification failed: ${state.error}`, {
//           style: {
//             backgroundColor: '#ef4444',
//             color: '#ffffff',
//             border: 'none',
//           },
//         });
//       })
      
//       // Get payment details cases
//       .addCase(getPaymentDetails.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Get Payment Details Pending");
//       })
//       .addCase(getPaymentDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.paymentDetails = action.payload.data;
//         state.success = true;
//         console.log("Get Payment Details Fulfilled - Payload:", action.payload);
//       })
//       .addCase(getPaymentDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Failed to get payment details";
//         console.log("Get Payment Details Rejected - Error:", state.error);
//         toast.error(`Failed to fetch payment details: ${state.error}`, {
//           style: {
//             backgroundColor: '#ef4444',
//             color: '#ffffff',
//             border: 'none',
//           },
//         });
//       })
//       .addCase(getAllPayments.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Get All Orders Pending");
//       })
//       .addCase(getAllPayments.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.allOrdersData = action.payload.data;
//         state.success = true;
//         console.log("Get All Orders Fulfilled - Orders Data:", action.payload.data);
//       })
//       .addCase(getAllPayments.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Failed to get all orders";
//         console.log("Get All Orders Rejected - Error:", state.error);
//         toast.error(`Failed to fetch all orders: ${state.error}`, {
//           style: {
//             backgroundColor: '#ef4444',
//             color: '#ffffff',
//             border: 'none',
//           },
//         });
//       })
      
//       // Get user payments cases
//       .addCase(getUserPayments.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Get User Payments Pending");
//       })
//       .addCase(getUserPayments.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.userPayments = action.payload || [];
//         state.success = true;
//         console.log("Get User Payments Fulfilled - Payload:", action.payload);
//       })
//       .addCase(getUserPayments.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Failed to get user payments";
//         console.log("Get User Payments Rejected - Error:", state.error);
//         toast.error(`Failed to fetch payment history: ${state.error}`, {
//           style: {
//             backgroundColor: '#ef4444',
//             color: '#ffffff',
//             border: 'none',
//           },
//         });
//       });
//   }
// });

// export const { resetPayment, clearPaymentState } = paymentSlice.actions;
// export default paymentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  orderData: null,
  paymentResult: null,
  paymentDetails: null,
  userPayments: [],
  allPayments: [], // Add this to store all payments
  isLoading: false,
  error: null,
  success: false
};

// Create order thunk
export const createPaymentOrder = createAsyncThunk(
  'payment/createOrder',
  async (paymentData, { rejectWithValue }) => {
    try {
      console.log("Creating payment order with data:", paymentData);
      const res = await axios.post(
        'http://localhost:5000/api/payment/create-order',
        paymentData,
        { 
          headers: { "Content-Type": "application/json" }, 
          withCredentials: true 
        }
      );
      console.log("Create order response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Create order error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

// Verify payment thunk
export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      console.log("Verifying payment with data:", paymentData);
      const res = await axios.post(
        'http://localhost:5000/api/payment/verify-payment',
        paymentData,
        { 
          headers: { "Content-Type": "application/json" }, 
          withCredentials: true 
        }
      );
      console.log("Verify payment response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Verify payment error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

// Get payment details by ID thunk
export const getPaymentDetails = createAsyncThunk(
  'payment/getPaymentDetails',
  async (paymentId, { rejectWithValue }) => {
    try {
      console.log("Fetching payment details for ID:", paymentId);
      const res = await axios.get(
        `http://localhost:5000/api/payment/details/${paymentId}`,
        { 
          headers: { "Content-Type": "application/json" }, 
          withCredentials: true 
        }
      );
      console.log("Payment details response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Get payment details error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

// Get user payments thunk
export const getUserPayments = createAsyncThunk(
  'payment/getUserPayments',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching user payments");
      const res = await axios.get(
        'http://localhost:5000/api/payment/user-payments',
        { 
          withCredentials: true 
        }
      );
      console.log("User payments response:", res.data);
      return res.data.data;
    } catch (error) {
      console.error("Get user payments error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

// NEW: Get all payments thunk (admin only)
export const getAllPayments = createAsyncThunk(
  'payment/getAllPayments',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching all payments (admin)");
      const res = await axios.get(
        'http://localhost:5000/api/payment/all-payments',
        { 
          withCredentials: true 
        }
      );
      console.log("All payments response:", res.data);
      return res.data.data;
    } catch (error) {
      console.error("Get all payments error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.success = false;
      state.error = null;
    },
    clearPaymentState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Create order cases
      .addCase(createPaymentOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Create Payment Order Pending");
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.data;
        state.success = true;
        console.log("Create Payment Order Fulfilled - Payload:", action.payload);
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Failed to create payment order";
        console.log("Create Payment Order Rejected - Error:", state.error);
        toast.error(`Payment order failed: ${state.error}`, {
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff', 
            border: 'none',
          },
        });
      })
      
      // Verify payment cases
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Verify Payment Pending");
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentResult = action.payload.data;
        state.success = true;
        console.log("Verify Payment Fulfilled - Payload:", action.payload);
        toast.success("Payment verified successfully", {
          style: {
            backgroundColor: '#22c55e',
            color: '#ffffff',
            border: 'none',
          },
        });
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Payment verification failed";
        console.log("Verify Payment Rejected - Error:", state.error);
        toast.error(`Payment verification failed: ${state.error}`, {
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
          },
        });
      })
      
      // Get payment details cases
      .addCase(getPaymentDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Get Payment Details Pending");
      })
      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentDetails = action.payload.data;
        state.success = true;
        console.log("Get Payment Details Fulfilled - Payload:", action.payload);
      })
      .addCase(getPaymentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Failed to get payment details";
        console.log("Get Payment Details Rejected - Error:", state.error);
        toast.error(`Failed to fetch payment details: ${state.error}`, {
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
          },
        });
      })
      
      // Get user payments cases
      .addCase(getUserPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Get User Payments Pending");
      })
      .addCase(getUserPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPayments = action.payload || [];
        state.success = true;
        console.log("Get User Payments Fulfilled - Payload:", action.payload);
      })
      .addCase(getUserPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Failed to get user payments";
        console.log("Get User Payments Rejected - Error:", state.error);
        toast.error(`Failed to fetch payment history: ${state.error}`, {
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
          },
        });
      })

      // Get all payments cases (admin)
      .addCase(getAllPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Get All Payments Pending");
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPayments = action.payload || [];
        state.success = true;
        console.log("Get All Payments Fulfilled - Payload:", action.payload);
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Failed to get all payments";
        console.log("Get All Payments Rejected - Error:", state.error);
        toast.error(`Failed to fetch all payments: ${state.error}`, {
          style: {
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
          },
        });
      });
  }
});

export const { resetPayment, clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;