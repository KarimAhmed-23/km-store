import { createSelector, createSlice } from "@reduxjs/toolkit";
import actGetWishlist from "./act/actGetWishlist";
import actAddToWishlist from "./act/actAddToWishlist";
import actRemoveFromWishlist from "./act/actRemoveFromWishlist";
import { wishlistApi } from "../api/wishlistApi";

const initialState = {
  wishlistCounter: 0,
  wishlistProducts: null,
  wishlistProductsID: null,
  isLoaded: false,
  loading : false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist:(state)=>{
      state.wishlistCounter= 0;
      state.wishlistProducts= null;
      state.wishlistProductsID= null;
      state.isLoaded= false;
      state.loading= false;
      state.error= null;
    },
    setWishlistProductsID : (state , action)=>{
      state.wishlistProductsID = action.payload
    }
  },
  extraReducers: (builder) => {

    

    // // getWishlist
    // builder.addCase(actGetWishlist.pending, (state) => {
    //   state.isLoaded = false;
    //   state.error = null;
    // });
    // builder.addCase(actGetWishlist.fulfilled, (state, action) => {
    //   state.isLoaded = true;
    //   state.error = null;
    //   state.wishlistCounter = action.payload.count;
    //   state.wishlistProducts = action.payload.data;
    //   state.wishlistProductsID = action.payload.data.map((el) => el._id);
    // });
    // builder.addCase(actGetWishlist.rejected, (state, action) => {
    //   state.isLoaded = true;
    //   state.error = action.payload;

    //   console.log(action);
    // });

    // addToWishlist
    // builder.addCase(actAddToWishlist.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(actAddToWishlist.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   console.log(action);
    //   state.wishlistCounter = action.payload.data.length;
    //   state.wishlistProductsID = action.payload.data;

    // });
    // builder.addCase(actAddToWishlist.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });

    // // removeFromWishlist
    // builder.addCase(actRemoveFromWishlist.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(actRemoveFromWishlist.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   console.log(action);
    //   state.wishlistCounter = action.payload.data.length;
    //   state.wishlistProductsID = action.payload.data;

    // });
    // builder.addCase(actRemoveFromWishlist.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });


    builder.addMatcher(wishlistApi.endpoints.getWishlist.matchFulfilled , (state , action)=>{

      state.wishlistProductsID = action.payload.data.map((el) => el._id);

    });
    builder.addMatcher(wishlistApi.endpoints.addToWishlist.matchFulfilled , (state , action)=>{

      state.wishlistProductsID = action.payload.data;

    });
    builder.addMatcher(wishlistApi.endpoints.removeFromWishlist.matchFulfilled , (state , action)=>{

      state.wishlistProductsID = action.payload.data;

    });


  },
});

export const checkProductFav = (productId, wishlistProductsID) => {
  const result = wishlistProductsID?.some((el) => el === productId);
  return result;
};




export const {clearWishlist , setWishlistProductsID} = wishlistSlice.actions;
export default wishlistSlice.reducer;

// In Redux Toolkit and Redux in general, reducers should always return a new state object. However, in your checkProductFav reducer, you're returning either true or false, which is not a valid state object. Instead, you should update a specific property in the state based on the action payload and return the entire state object.
