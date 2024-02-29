import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";
import token from "../../../utilities/getToken";

const actRemoveFromCart = createAsyncThunk(
  "cart/actRemoveFromCart",
  async ( productId , thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      let { data } = await axios.delete(
        `${baseUrl}cart/${productId}`,
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

export default actRemoveFromCart;