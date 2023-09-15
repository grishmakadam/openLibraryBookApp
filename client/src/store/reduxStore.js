import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookData";
import { loaderReducer } from "./loaderSlice";
import { useReducer } from "react";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { userReducer } from "./userSlice";
import { snackbarReducer } from "./snackbarSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loader","snackbar"],
};
const rootReducer = combineReducers({
  book: bookReducer,
  loader: loaderReducer,
  user: userReducer,
  snackbar:snackbarReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
