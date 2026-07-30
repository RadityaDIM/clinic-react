import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authReducer,
  },
});
