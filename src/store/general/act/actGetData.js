import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetData = createAsyncThunk("general/actGetData" , async(arg , thunkAPI)=>{
    const {rejectWithValue , getState , signal} = thunkAPI;
    const {url , options} = arg;
    try {
        let {data} = await axios.get(url , {
            ...options,
            signal,
        });
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
        
    }


});

export default actGetData;