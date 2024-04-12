import { configureStore } from "@reduxjs/toolkit";
import { cityApi } from "./cityApiSlice";

export const store = configureStore({
  reducer: {
    [cityApi.reducerPath]: cityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityApi.middleware),
});
