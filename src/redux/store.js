import {configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducers';
export const store = configureStore({
    reducer: rootReducer,
    devTools:process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware({
      serializableCheck: false
    }),
     
  });