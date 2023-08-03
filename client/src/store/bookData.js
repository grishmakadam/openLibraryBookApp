import {
  createSlice,
  configureStore,
  applyMiddleware,
  createStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-key",
  storage,
};

//const persistedReducer=persistReducer(persistConfig,rootReducer)
// const store=createStore(persistedReducer,applyMiddleware(ReduxThunk))

const bookSlice = createSlice({
  name: "books",
  initialState: { search: "", change: false, books: [] },
  reducers: {
    add_searchTerm(state, action) {
      console.log(state.search, action.payload);

      if (state.search != action.payload) {
        state.change = true;
      } else {
        state.change = false;
      }
      state.search = action.payload;
    },
    add_data(state, action) {
      state.books = action.payload;
    },
    get_book(state, action) {
      return state;
    },
  },
});

export const bookReducer = bookSlice.reducer;

export const bookActions = bookSlice.actions;
