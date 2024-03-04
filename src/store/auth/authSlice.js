import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import token from "../../utilities/getToken";
import actVerifyRestCode from "./act/actVerifyRestCode";
import actForgetPassword from "./act/actForgetPassword";
import actResetPassword from "./act/actResetPassword";
import actRegister from "./act/actRegister";
import actLogin from "./act/actLogin";
import actUpdateProfile from "./act/actUpdateProfile";
import { clearCart } from "../cart/cartSlice";
import { clearWishlist } from "../wishlist/wishlistSlice";
import { authApi } from "../api/authApi";

const initialState = {
  userToken: null,
  userId: null,
  userData: null,
  isLoading: false,
  error: null,
  inputsError: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state) => {
      if (localStorage.getItem("token")) {
        state.userToken = localStorage.getItem("token");
        state.userData = localStorage.getItem("userData");
        state.userId = localStorage.getItem("userId");
      }
    },
    logout: (state) => {
      state.userToken = null;
      state.userData = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
    removeAsyncStates: (state) => {
      state.isLoading = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
  
    // login
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const { id } = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userId", id);
        localStorage.setItem("userData", JSON.stringify(action.payload.user));
        state.userToken = action.payload.token;
        state.userData = action.payload.user;
        state.userId = id;
      }
    );

    // register
    builder.addMatcher(
      authApi.endpoints.register.matchPending,
      (state, action) => {
        state.inputsError = {};
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        state.inputsError = {};
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, action) => {
        if (action.payload?.data?.errors) {
          let { param, msg } = action.payload.data.errors;
          state.inputsError[param] = msg;
        }
      }
    );
    // updateProfile
    builder.addMatcher(
      authApi.endpoints.updateProfile.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        localStorage.setItem("userData", JSON.stringify(action.payload.user));
        state.userData = action.payload.user;
      }
    );



  },
});

export const { checkAuth, logout, removeAsyncStates } = authSlice.actions;

export default authSlice.reducer;
