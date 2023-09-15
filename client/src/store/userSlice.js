import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    fname: "",
    email: "",
    lname: "",
    username: "",
    image: "",
  },
  reducers: {
    set_user(state, action) {
      console.log(action.payload)
      state.fname = action.payload.fname;
      state.email = action.payload.email;
      state.lname = action.payload.lname;
      state.image = action.payload.image;
      state.username = action.payload.username;
    },
    remove_user(state, action) {
      
      state.fname = "";
      state.email = "";
      state.lname = "";
      state.image = "";
      state.username = "";
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
