// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "sonner";

// const initialState = {
//   users: [],
//   isLoading: false,
//   error: null,
// };

// // ✅ Fetch all users (admin only)
// export const fetchAllUsers = createAsyncThunk(
//   "users/fetchAllUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users", {
//         withCredentials: true,
//       });
//       console.log("Fetched users:", res.data.users);
//       return res.data.users; // array of users
//     } catch (error) {
//       console.error("Fetch users error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );
// export const fetchUserById = createAsyncThunk(
//   "users/fetchUserById",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//         withCredentials: true,
//       });
//       console.log("Fetched user details:", res.data.user);
//       return res.data.user; // single user object
//     } catch (error) {
//       console.error("Fetch user error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || { error: error.message });
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         console.log("Fetching users...");
//       })
//       .addCase(fetchAllUsers.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.users = action.payload || [];
//         console.log(action)
//         toast.success("Users loaded successfully", {
//           style: {
//             backgroundColor: "#22c55e", // green
//             color: "#ffffff",
//           },
//         });
//       })
//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload?.error || "Failed to fetch users";
//         toast.error("Failed to load users", {
//           style: {
//             backgroundColor: "#ef4444", // red
//             color: "#ffffff",
//           },
//         });
        
//       });
      
//   },
// });

// export default userSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  users: [],
  currentUser: null,
  isLoading: false,
  isFetchingUser: false,
  error: null,
};

// ✅ Fetch all users (admin only)
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      console.log("Fetched users:", res.data.users);
      return res.data.users; // array of users
    } catch (error) {
      console.error("Fetch users error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        withCredentials: true,
      });
      console.log("Fetched user details:", res.data.user);
      return res.data.user; // single user object
    } catch (error) {
      console.error("Fetch user error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Fetching users...");
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload || [];
        console.log(action);
        toast.success("Users loaded successfully", {
          style: {
            backgroundColor: "#22c55e", // green
            color: "#ffffff",
          },
        });
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Failed to fetch users";
        toast.error("Failed to load users", {
          style: {
            backgroundColor: "#ef4444", // red
            color: "#ffffff",
          },
        });
      })
      .addCase(fetchUserById.pending, (state) => {
        state.isFetchingUser = true;
        state.error = null;
        console.log("Fetching user details...");
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isFetchingUser = false;
        state.currentUser = action.payload;
        console.log("User details loaded:", action.payload);
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isFetchingUser = false;
        state.error = action.payload?.error || "Failed to fetch user details";
        toast.error("Failed to load user details", {
          style: {
            backgroundColor: "#ef4444", // red
            color: "#ffffff",
          },
        });
      });
  },
});

export default userSlice.reducer;