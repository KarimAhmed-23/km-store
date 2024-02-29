import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";

const actGetAddresses = createAsyncThunk("address/actGetAddresses" , async(_,thunkAPI)=>{

    const {rejectWithValue} = thunkAPI;

    try {
        let {data} = await axios.get(`${baseUrl}addresses` , {headers:{
            token:localStorage.getItem("token")
        }});
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }

});

export default actGetAddresses;