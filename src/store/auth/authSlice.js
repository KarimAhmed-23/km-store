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
import Cookies from "js-cookie";

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
      localStorage.removeItem("userId");

      Cookies.remove('token'); 
      Cookies.remove('domain'); 
      Cookies.remove('path' , { path: '/products' }); 
      Cookies.remove('secure'); 
      Cookies.remove('name'); 

    },
    removeAsyncStates: (state) => {
      state.isLoading = null;
      state.error = null;
    },

    setUserToken : (state , action)=>{
      localStorage.setItem("token", action.payload.token);
      state.userToken = action.payload.token;

      Cookies.set('token', action.payload.token , { expires: 7}); // Cookie expires in 7 days
      Cookies.set('domain', 'test', { domain: '.com' }); // Cookie is accessible from all subdomains (domain)
      Cookies.set('path', 'test', { path: '/products' }); // Cookie is accessible only on URLs that begin with (path)
      Cookies.set('secure', 'test', { secure: true }); // Cookie is sent only over HTTPS
      Cookies.set('name', 'value', { sameSite: 'strict' }) // control whether the browser is sending a cookie along with cross-site requests.


    },

    setUserData : (state , action)=>{
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
      state.userData = action.payload.user;
    },
    setUserId : (state , action)=>{
      const { id } = jwtDecode(action.payload.token);
      localStorage.setItem("userId", id);
      state.userId = id;
    },

    setInputsError : (state , action)=>{
      state.inputsError = action.payload;
    }


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

export const { checkAuth, logout, removeAsyncStates , setUserToken , setUserData , setUserId , setInputsError} = authSlice.actions;

export default authSlice.reducer;



// Cookies:

// Usage: Cookies are small pieces of data stored in the user's browser. They are sent with every HTTP request to the server, including page loads, AJAX requests, and image requests.
// Behavior: Cookies can be set with various attributes such as expiration time, domain, path, and secure flag. They can be accessed and manipulated both on the client-side and server-side.
// Security: Cookies have some security concerns, such as being vulnerable to cross-site scripting (XSS) attacks if not properly secured. However, they offer features like the HttpOnly flag to mitigate certain risks.
// Size Limitation: Cookies have size limitations (typically around 4KB per cookie) imposed by browsers.

// Cookies can collect various types of information, including:
// Session Information: Cookies can store session IDs or tokens that identify a user's session on a website. This helps maintain user authentication and enables features like staying logged in across pages.
// Preferences: Websites may use cookies to remember user preferences, such as language settings, theme preferences, or font size selections.
// Analytics: Cookies can be used for tracking user interactions with a website, including which pages they visit, how long they stay on each page, and what actions they take. This data is often used for analytics purposes to improve website performance and user experience.
// Advertising: Cookies are commonly used for targeted advertising. They track users' browsing behavior across websites to deliver personalized ads based on their interests and preferences.
// it's important to note that while cookies can collect various types of information, they can only access data that users voluntarily provide or data generated during their interaction with the website .


// localStorage:

// Usage: localStorage is an API provided by modern web browsers for storing key-value pairs in the user's browser. Unlike cookies, localStorage data is not sent with every HTTP request to the server.
// Behavior: localStorage data persists even after the browser is closed and reopened. It is only accessible on the client-side and cannot be directly accessed by the server.
// Security: localStorage is considered more secure than cookies for storing sensitive data because it is not automatically sent to the server with each request. However, it is still vulnerable to certain client-side attacks.
// Size Limitation: localStorage has larger storage capacity compared to cookies (typically around 5MB per origin), but it is still limited by browser settings and user preferences.