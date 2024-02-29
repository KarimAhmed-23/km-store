import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";


const actGetCart = createAsyncThunk("cart/actGetCart", async (_, thunkAPI) => {
  const { rejectWithValue, getState , signal } = thunkAPI;
  try {
    let data = await axios.get(`${baseUrl}cart`, {
      headers: {
        token: localStorage.getItem("token") ,
      },
      signal
    });
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export default actGetCart;
