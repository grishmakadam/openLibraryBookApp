import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookData";
import { loaderReducer } from "./loaderSlice";
import { combineReducers } from "redux";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    loader: loaderReducer,
  },
});
