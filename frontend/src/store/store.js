import { configureStore } from "@reduxjs/toolkit"
import authReducer from './authSlice'
import sellerProductsSlice from './Seller/productSlice'
import wishlistSlice from './../store/buyer/wishlistSlice'
import userSlice from './userSlice'
import paymentSlice from './Seller/paymentSlice'



const store = configureStore({
    reducer:{
        auth : authReducer,
        sellerProducts : sellerProductsSlice,
        wishlist: wishlistSlice,
        users: userSlice,
        payment: paymentSlice,
    }
})

export default store;