import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    load: false,
  },
  reducers: {
    set_loader(state,action) {
     
      state.load = true;
      
    },
    remove_loader(state,action) {
      state.load = false;
    },
  },
});

export const loaderReducer = loaderSlice.reducer;
export const loaderActions = loaderSlice.actions;
