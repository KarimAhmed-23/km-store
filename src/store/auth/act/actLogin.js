import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";
import actGetCart from "../../cart/act/actGetCart";


const actLogin =  createAsyncThunk("auth/actLogin" , async ( values , thunkAPI)=>{
    const {rejectWithValue , getState , dispatch} = thunkAPI;
    try {
        let { data } = await axios.post(
          `${baseUrl}auth/signin`,
          values
        );
        return data
      } catch (error) {
        if(error.response?.data?.message){
            return rejectWithValue(error.response.data.message);
          }else{
            return rejectWithValue(error.message);
          }
      }

});

export default actLogin;