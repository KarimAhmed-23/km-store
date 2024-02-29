import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";

const actResetPassword = createAsyncThunk(
  "auth/actResetPassword",
  async (values, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      let { data } = await axios.put(`${baseUrl}auth/resetPassword`, values);
      return data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export default actResetPassword;