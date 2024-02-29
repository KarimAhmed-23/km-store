import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";
import wishlistSlice from "./wishlist/wishlistSlice";
import productsSlice from "./products/productsSlice";
import generalSlice from "./general/generalSlice";
import addressesSlice from "./addresses/addressesSlice";

const store = configureStore({

    reducer:{
        auth: authSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
        products : productsSlice,
        general : generalSlice,
        addresses : addressesSlice,
    },
    


});

export default store;