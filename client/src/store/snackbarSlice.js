import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  severity: "",
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    set_snackbar(state, action) {
      console.log(action);
      state.open = true;
      state.severity = action.payload.severity;

      state.message = action.payload.message;
    },
    remove_snackbar(state, action) {
      state.open = false;
      state.severity = "";
      state.message = "";
    },
  },
});

export const snackbarReducer = snackbarSlice.reducer;
export const { set_snackbar, remove_snackbar } = snackbarSlice.actions;
