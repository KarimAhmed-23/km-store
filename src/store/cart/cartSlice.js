import { createSlice } from "@reduxjs/toolkit";
import actGetCart from "./act/actGetCart.js";
import actUpdateCartItemQty from "./act/actUpdateCartItemQty.js";
import actRemoveFromCart from "./act/actRemoveFromCart.js";
import actAddToCart from "./act/actAddToCart.js";


const initialState = {
  cartId: null,
  cartItems: 0,
  cartProducts: null,
  cartData: null,
  isLoaded: false,
  error: false,
  loading: false,

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartId = 0;
      state.cartItems = null;
      state.cartProducts = null;
      state.cartData = null;
      state.isLoaded = false;
      state.error = false;
      state.loading = false;
    },
  },
  // extraReducers: (builder) => {
  //   // getCart
  //   builder.addCase(actGetCart.pending, (state) => {
  //     state.isLoaded = false;
  //     state.error = false;
  //   });
  //   builder.addCase(actGetCart.fulfilled, (state, { payload }) => {
  //     state.isLoaded = true;
  //     state.error = null;
  //     state.cartItems = payload.data.numOfCartItems;
  //     state.cartId = payload.data.data._id;
  //     if (payload.data.status === "success") {
  //       state.cartProducts = payload.data.data.products;
  //       state.cartData = {
  //         ...payload.data.data,
  //         products: payload.data.data.products.length,
  //       };
  //     }
  //   });
  //   builder.addCase(actGetCart.rejected, (state, { payload }) => {
  //     state.isLoaded = true;
  //     if (!payload?.response?.data?.statusMsg) {
  //       state.error = "error , try again";
  //     }
  //   });

  //   // addToCart
  //   builder.addCase(actAddToCart.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(actAddToCart.fulfilled, (state, { payload }) => {
  //     state.loading = false;
  //     state.error = null;
  //     state.cartItems = payload.numOfCartItems;
  //   });
  //   builder.addCase(actAddToCart.rejected, (state, { payload }) => {
  //     state.loading = false;
  //     state.error = payload;
  //   });

  //   // updateCartItemQty
  //   builder.addCase(actUpdateCartItemQty.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(actUpdateCartItemQty.fulfilled, (state, { payload }) => {
  //     state.loading = false;
  //     state.error = null;
  //     state.cartProducts = payload.data.products;
  //     state.cartData = {
  //       ...payload.data,
  //       products: payload.data.products.length,
  //     };
  //   });
  //   builder.addCase(actUpdateCartItemQty.rejected, (state, { payload }) => {
  //     state.loading = false;
  //     state.error = payload;
  //   });

  //   // removeFromCart

  //   builder.addCase(actRemoveFromCart.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(actRemoveFromCart.fulfilled, (state, { payload }) => {
  //     state.loading = false;
  //     state.error = null;
  //     state.cartItems = payload.numOfCartItems;
  //     state.cartProducts = payload.data.products;
  //     state.cartData = {
  //       ...payload.data,
  //       products: payload.data.products.length,
  //     };
  //   });
  //   builder.addCase(actRemoveFromCart.rejected, (state, { payload }) => {
  //     state.loading = false;
  //     state.error = payload;
  //   });


  // },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
