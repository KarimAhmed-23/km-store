import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";
import token from "../../../utilities/getToken";


const actUpdateProfile =  createAsyncThunk("auth/actUpdateProfile" , async ( values , thunkAPI)=>{
    const {rejectWithValue , getState} = thunkAPI;
    try {
        let { data } = await axios.put(`${baseUrl}users/updateMe`, values, {
            headers: {
              token: token,
            },
          });
        return data
      } catch (error) {
        if(error.response?.data?.message){
            return rejectWithValue(error.response.data.message);
          }else{
            return rejectWithValue(error.message);
          }
      }

});

export default actUpdateProfile;