import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";
import token from "../../../utilities/getToken";

const actUpdateCartItemQty = createAsyncThunk(
  "cart/actUpdateQty",
  async ( arg , thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      let { data } = await axios.put(
        `${baseUrl}cart/${arg.productId}`,
        { count : arg.count },
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

export default actUpdateCartItemQty;
