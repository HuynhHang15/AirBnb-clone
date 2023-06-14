import { db } from "@/firebase/firebaseConfig";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload || [];
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
