import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";

const actAddAddresses = createAsyncThunk("address/actAddAddresses" , async(values,thunkAPI)=>{

    const {rejectWithValue} = thunkAPI;

    try {
        let {data} = await axios.post(`${baseUrl}addresses` , values ,  {headers:{
            token:localStorage.getItem("token")
        }});
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : "oops !! , something went wrong please try again");
    }

});

export default actAddAddresses;



