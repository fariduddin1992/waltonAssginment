import { combineReducers } from "@reduxjs/toolkit"
import { CategorySlice } from "./CategorySlice";
import { authSlice } from "./slice";

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    category:CategorySlice.reducer
})