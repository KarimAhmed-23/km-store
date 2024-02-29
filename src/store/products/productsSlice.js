import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./act/actGetProducts";


const initialState = {
    products : {},
    isLoaded : {},
    error:{},
}

const productsSlice = createSlice({
 name:"products",
 initialState,
 reducers:{

 },
 extraReducers:(builder)=>{

    // getProducts
    builder.addCase(actGetProducts.pending , (state , action)=>{
        const { title } = action.meta.arg;
        state.isLoaded[title] = false;
        state.error[title] = null
    });
    builder.addCase(actGetProducts.fulfilled , (state , {payload , meta})=>{
        const { title } = meta.arg;
        state.isLoaded[title] = true;
        state.error[title] = null;
        state.products[title] = payload;

        // state[title] = {isLoaded : true};
        // state[title] = {...state[title] , error : null};
        // state[title] = {...state[title] , ...payload};

    });
    builder.addCase(actGetProducts.rejected , (state , action)=>{
        const { title } = action.meta.arg;
        state.isLoaded[title] = true;
        state.error[title] = action.payload
    });

 },

});


export const {} = productsSlice.actions;
export default productsSlice.reducer;