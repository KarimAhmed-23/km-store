import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";
import token from "../../../utilities/getToken";

const actAddToCart = createAsyncThunk("cart/actAddToCart", async ( productId , thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;

  try {
    let { data } = await axios.post(
        `${baseUrl}cart`,
        { productId },
        {
          headers: {
            token: getState().auth.userToken ,
          },
        }
      );
    return data;
  } catch (error) {
    if (error.response.data.message) {
      let errorMsg = rejectWithValue(error.response.data.message);
      return errorMsg ;
    } else {
      let errorMsg = rejectWithValue("oops !! , something went wrong please try again");
      return errorMsg ;
    }
  }
});

export default actAddToCart;
