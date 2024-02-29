import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utilities/baseUrl";

const actDeleteAddresses = createAsyncThunk("address/actDeleteAddresses" , async(addressId,thunkAPI)=>{

    const {rejectWithValue} = thunkAPI;

    try {
        let {data} = await axios.delete(`${baseUrl}addresses/${addressId}` , {headers:{
            token:localStorage.getItem("token")
        }});
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : "oops !! , something went wrong please try again");
    }

});

export default actDeleteAddresses;

