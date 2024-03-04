import { createSlice } from "@reduxjs/toolkit";
import actGetAddresses from "./act/actGetAddresses";
import actDeleteAddresses from "./act/actDeleteAddresses";
import actAddAddresses from "./act/actAddAddresses";


const initialState = {
    addresses : null,
    isLoaded : false,
    loading:false,
    error:null,
}

const addressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{
        clearAddresses: (state) => {
            state.addresses = null;
            state.isLoaded = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers:(builder)=>{

       // getAddress
       builder.addCase(actGetAddresses.pending , (state , action)=>{
        state.isLoaded = false;
        state.error = null;
       });
       builder.addCase(actGetAddresses.fulfilled , (state , action)=>{
        state.isLoaded = true;
        state.error = null;
        state.addresses = action.payload;

       });
       builder.addCase(actGetAddresses.rejected , (state , action)=>{
        state.isLoaded = true;
        state.error = action.payload;

       });

       // addAddress
       builder.addCase(actAddAddresses.pending , (state , action)=>{
        state.loading = true;
        state.error = null;
       });
       builder.addCase(actAddAddresses.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
        state.addresses = action.payload;

       });
       builder.addCase(actAddAddresses.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
       });


       // deleteAddress
       builder.addCase(actDeleteAddresses.pending , (state , action)=>{
        state.loading = true;
        state.error = null;
       });
       builder.addCase(actDeleteAddresses.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
        state.addresses = action.payload;

       });
       builder.addCase(actDeleteAddresses.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;

       });



    }
});




export const {clearAddresses}= addressSlice.actions;
export default addressSlice.reducer;