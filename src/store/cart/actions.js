import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";
import token from "../../../utilities/getToken";


export const actGetCart = createAsyncThunk(
    "cart/actGetCart",
    async (_, thunkAPI) => {
      const { rejectWithValue, getState, signal } = thunkAPI;
      try {
        let data = await axios.get(`${baseUrl}cart`, {
          headers: {
            token: localStorage.getItem("token"),
          },
          signal,
        });
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

export const actAddToCart = createAsyncThunk(
  "cart/actAddToCart",
  async (productId, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      let { data } = await axios.post(
        `${baseUrl}cart`,
        { productId },
        {
          headers: {
            token: getState().auth.userToken,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response.data.message) {
        let errorMsg = rejectWithValue(error.response.data.message);
        return errorMsg;
      } else {
        let errorMsg = rejectWithValue(
          "oops !! , something went wrong please try again"
        );
        return errorMsg;
      }
    }
  }
);

export const actRemoveFromCart = createAsyncThunk(
  "cart/actRemoveFromCart",
  async (productId, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      let { data } = await axios.delete(`${baseUrl}cart/${productId}`, {
        headers: {
          token: getState().auth.userToken,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const actUpdateCartItemQty = createAsyncThunk(
  "cart/actUpdateQty",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      let { data } = await axios.put(
        `${baseUrl}cart/${arg.productId}`,
        { count: arg.count },
        {
          headers: {
            token: getState().auth.userToken,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
