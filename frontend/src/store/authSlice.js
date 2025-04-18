// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit" 
// import axios from "axios";
// const initialState = {
//     isAuthenticated : false,
//     isLoading : false,
//     user : null
// }

// export const registerUser = createAsyncThunk('auth/register',
//     async(FormData)=>{
//         const response = await axios.post('http://localhost:5000/api/auth/register',FormData,{
//             withCredentials: true,
//         });
//         return response.data
//     }
//  );  

// const authSlice = createSlice({
//     name : 'auth',
//     initialState,
//     reducers : {
// setUser : (state,action)=>{

// },
//     },
//     extraReducers: (builder) =>builder.addCase(registerUser.pending, (state)=>{
//         state.isLoading = true
//     })
//     .addCase(registerUser.fulfilled,(state,action)=>{
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
// })
// .addCase(registerUser.rejected,(state,action)=>{
//     state.isLoading = false;
//     state.user = null;
//     state.isAuthenticated = false;
// })
// })
// export const {setUser} = authSlice.actions;
// export default authSlice.reducer


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("❌ Registration Error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || "Registration failed");
//     }
//   }
// );

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // The profileImage should now be a URL string from Cloudinary
      // instead of a File object, so no special handling needed here
      
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    // const token = getState().auth.token; 
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
           
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Expires: "0",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Auth Check Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Auth check failed");
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user :null;
        state.isAuthenticated = action.payload.success?  true: false ;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        // Check if action.payload has user directly
        if (action.payload && action.payload.user && action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
        .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        // state.error = action.payload || "Not authenticated";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }),
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // Check localStorage for persisted auth state
// const storedAuth = localStorage.getItem('auth');
// const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

// const initialState = {
//   isAuthenticated: parsedAuth ? parsedAuth.isAuthenticated : false,
//   isLoading: false,
//   user: parsedAuth ? parsedAuth.user : null,
//   error: null
// };

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("❌ Registration Error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || "Registration failed");
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("❌ Login Error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data?.error || "Login failed");
//     }
//   }
// );

// export const checkAuth = createAsyncThunk(
//   'auth/checkauth',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/auth/checkauth", {
//           withCredentials: true,
//           headers: {
//             'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
//             Expires: '0'
//           }
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("❌ Auth Check Error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || "Authentication failed");
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("❌ Logout Error:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || "Logout failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       // Update localStorage when manually setting user
//       localStorage.setItem('auth', JSON.stringify({
//         isAuthenticated: true,
//         user: action.payload
//       }));
//     },
//     clearAuth: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       // Clear localStorage
//       localStorage.removeItem('auth');
//     },
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) =>
//     builder
//       // Register user cases
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//         // Store in localStorage
//         localStorage.setItem('auth', JSON.stringify({
//           isAuthenticated: true,
//           user: action.payload
//         }));
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//       })
      
//       // Login user cases
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success ? true : false;
//         state.error = action.payload.success ? null : action.payload.message;
        
//         // Store in localStorage if login was successful
//         if (action.payload.success) {
//           localStorage.setItem('auth', JSON.stringify({
//             isAuthenticated: true,
//             user: action.payload.user
//           }));
//         }
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//       })
      
//       // Check auth cases
//       .addCase(checkAuth.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success ? true : false;
//         state.error = action.payload.success ? null : action.payload.message;
        
//         // Update localStorage if check was successful
//         if (action.payload.success) {
//           localStorage.setItem('auth', JSON.stringify({
//             isAuthenticated: true,
//             user: action.payload.user
//           }));
//         } else {
//           localStorage.removeItem('auth');
//         }
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = action.payload || "Not authenticated";
        
//         // Clear localStorage on authentication failure
//         localStorage.removeItem('auth');
//       })
      
//       // Logout user cases
//       .addCase(logoutUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
        
//         // Clear localStorage on logout
//         localStorage.removeItem('auth');
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//         // Still clear auth even if logout API fails
//         state.user = null;
//         state.isAuthenticated = false;
//         localStorage.removeItem('auth');
//       })
// });

// export const { setUser, clearAuth, clearError } = authSlice.actions;
// export default authSlice.reducer;