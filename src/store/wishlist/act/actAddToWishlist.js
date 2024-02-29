import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";
import actGetWishlist from "./actGetWishlist";

const actAddToWishlist = createAsyncThunk(
  "wishlist/actAddToWishlist",
  async ( productId , thunkAPI) => {
    const { rejectWithValue, getState , dispatch} = thunkAPI;
    
    try {
      let { data } = await axios.post(`${baseUrl}wishlist`, {
        productId,
      },{
        headers: {
          token: getState().auth.userToken,
        },
      });
    //   dispatch(actGetWishlist());
      return data;
    } catch (error) {
        if (error?.response?.data?.message) {
          let errorMsg = rejectWithValue(error.response.data.message);
          return errorMsg ;
        } else {
          let errorMsg = rejectWithValue("Oops!! Something went wrong. Please try again.");
          return errorMsg ;
        }
      }
  }
);

export default actAddToWishlist;