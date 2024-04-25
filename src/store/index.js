import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";
import wishlistSlice from "./wishlist/wishlistSlice";
import productsSlice from "./products/productsSlice";
import generalSlice from "./general/generalSlice";
import addressesSlice from "./addresses/addressesSlice";
import { authApi } from "./api/authApi";
import { cartApi } from "./api/cartApi";
import { wishlistApi } from "./api/wishlistApi";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    wishlist: wishlistSlice,

    products: productsSlice,
    general: generalSlice,
    addresses: addressesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware
    ),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

setupListeners(store.dispatch);

export default store;
