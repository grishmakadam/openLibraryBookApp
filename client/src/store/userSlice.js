import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
  },
  reducers: {
    set_user(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    remove_user(state, action) {
      state.name = ""
      state.email=""
    },
  },
});

export const userActions = userSlice.actions
export const userReducer=userSlice.reducer
