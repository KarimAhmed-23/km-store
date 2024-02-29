import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../authSlice";
import { clearCart } from "../../cart/cartSlice";
import { clearWishlist } from "../../wishlist/wishlistSlice";

const actLogout =  createAsyncThunk("auth/actLogout" , async(_ , thunkAPI)=>{
    const {dispatch} = thunkAPI;
    dispatch(logout);
    dispatch(clearCart);
    dispatch(clearWishlist);
});

export default actLogout;