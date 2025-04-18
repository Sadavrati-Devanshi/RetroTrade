import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  wishlistItems: [],
  isLoading: false,
  error: null,
};

// ✅ Fetch user's wishlist
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist/my', { withCredentials: true });
      console.log("Fetched wishlist response (Thunk):", res.data.data);
      return res.data.data; // Ensure this is the array you expect
    } catch (error) {
      console.error("Fetch wishlist error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

// ✅ Add/toggle product in wishlist
export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId, { rejectWithValue }) => {
  try {
    console.log("Toggling wishlist for product:", productId);
    const res = await axios.post(
      'http://localhost:5000/api/wishlist/toggle',
      { productId },
      { 
        headers: { "Content-Type": "application/json" }, 
        withCredentials: true 
      }
    );
    console.log("Toggle wishlist response:", res.data);
    // Return both the server response and the productId
    return { 
      ...res.data, 
      productId 
    };
  } catch (error) {
    console.error("Toggle wishlist error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || { error: error.message });
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Fetch Wishlist Pending");
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = action.payload || []; // Fallback to empty array if payload is undefined
        console.log("Fetch Wishlist Fulfilled - Payload:", action.payload);
        console.log("Updated Wishlist Items:", state.wishlistItems);
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Failed to fetch wishlist";
        console.log("Fetch Wishlist Rejected - Error:", state.error);
      })

      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const { productId, message } = action.payload;
        
        // If message contains "Removed", remove the item
        if (message && message.includes("Removed")) {
          state.wishlistItems = state.wishlistItems.filter(
            item => item.product._id !== productId && item.product !== productId
            
          );
          toast.warning("Removed from wishlisted", {
            style: {
              backgroundColor: '#ef4444', // Red color (Tailwind's red-500)
              color: '#ffffff', // White text for contrast
              border: 'none', // Optional: removes default border
            },
          });
        } 
        // If message contains "Added", add the item (if not already in list)
        else if (message && message.includes("Added")) {
          const exists = state.wishlistItems.some(
            item => item.product._id === productId || item.product === productId
          );
          toast.success("Add to wishlisted", {
            style: {
              backgroundColor: '#22c55e', // Green color (Tailwind's green-500)
              color: '#ffffff', // White text for contrast
              border: 'none', // Optional: removes default border
            },
          });
          
          if (!exists) {
            state.wishlistItems.push({
              _id: action.payload.data?._id || productId,
              product: { _id: productId }
            });
          }
        }
        
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to update wishlist";
      });
  }
});

export default wishlistSlice.reducer;