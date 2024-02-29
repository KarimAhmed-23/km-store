import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async ({params}, thunkAPI) => {
    const { rejectWithValue ,signal} = thunkAPI;
    console.log(params);
    try {
      let { data } = await axios.get(`${baseUrl}products`, {
        params: params,
        signal
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export default actGetProducts;
