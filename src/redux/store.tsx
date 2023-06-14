import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import searchSlice from "./searchSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    search: searchSlice,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
