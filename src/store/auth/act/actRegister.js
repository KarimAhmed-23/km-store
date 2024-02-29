import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";

const actRegister = createAsyncThunk("auth/actRegister", async (values, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  try {
    let { data } = await axios.post(`${baseUrl}auth/signup`, values);
    return data;
  } catch (error) {
    if (error.response?.data?.errors) {
      return rejectWithValue(error.response.data);
    } else if (error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export default actRegister;
