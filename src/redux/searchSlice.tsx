import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  place: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adults: 1,
  children: 0,
  infants: 0,
  pets: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch(state, action) {
        state.place = action.payload.place;
        state.checkIn = action.payload.checkIn;
        state.checkOut = action.payload.checkOut;
        state.adults = action.payload.adults;
        state.children = action.payload.children;
        state.infants = action.payload.infants;
        state.pets = action.payload.pets;
      },
  }
});

export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;