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
    builder.addCase(actLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const { id } = jwtDecode(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", id);
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
      state.userToken = action.payload.token;
      state.userData = action.payload.user;
      state.userId = id;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    // register
    builder.addCase(actRegister.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.inputsError = {};
    });
    builder.addCase(actRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
    });
    builder.addCase(actRegister.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      if (action.payload.errors) {
        let { param, msg } = action.payload.errors;
        state.inputsError[param] = msg;
      } else {
        state.error = action.payload;
      }
    });

    // forgetPassword
    builder.addCase(actForgetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(actForgetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
    });
    builder.addCase(actForgetPassword.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    // verifyRestCode
    builder.addCase(actVerifyRestCode.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(actVerifyRestCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
    });
    builder.addCase(actVerifyRestCode.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    // restPassword
    builder.addCase(actResetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(actResetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
    });
    builder.addCase(actResetPassword.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    // updateProfile
    builder.addCase(actUpdateProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(actUpdateProfile.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
      state.userData = action.payload.user;
    });
    builder.addCase(actUpdateProfile.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });


  },
});

export const { checkAuth, logout, removeAsyncStates } = authSlice.actions;

export default authSlice.reducer;
