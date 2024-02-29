import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      let { data } = await axios.get(`${baseUrl}wishlist`, {
        headers: {
          token: localStorage.getItem("token") ,
        },
      });
      return data;
    }catch (error) {
        if (error?.response?.data?.message) {
          let errorMsg = rejectWithValue(error.response.data.message);
          return errorMsg ;
        } else {
          let errorMsg = rejectWithValue(error.message);
          return errorMsg ;
        }
    }
  }
);

export default actGetWishlist;
