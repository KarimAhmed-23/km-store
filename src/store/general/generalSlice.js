import { createSlice } from "@reduxjs/toolkit";
import actGetData from "./act/actGetData";
import { useTranslation } from "react-i18next";

const initialState = {
  data: {},
  isLoaded: {},
  error: {},
  locale: "en",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetData.pending, (state, { payload, meta }) => {
      const { title } = meta.arg;
      state.isLoaded[title] = false;
      state.error[title] = null;
    });
    builder.addCase(actGetData.fulfilled, (state, { payload, meta }) => {
      const { title } = meta.arg;
      state.isLoaded[title] = true;
      state.error[title] = null;
      state.data[title] = payload;
    });
    builder.addCase(actGetData.rejected, (state, { payload, meta }) => {
      const { title } = meta.arg;
      state.isLoaded[title] = true;
      state.error[title] = payload;
      console.log(payload);
    });
  },
});

export const {changeLocale} = generalSlice.actions;
export default generalSlice.reducer;
