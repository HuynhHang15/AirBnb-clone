import { categoriesJson } from "@/components/Category/constants/categories"
import { createSlice } from "@reduxjs/toolkit";

const categories = categoriesJson;
const initialState = {
    selectedCategory: categories[0],
}
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        selectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    }
})

export const {selectedCategory} = categorySlice.actions;
const categoryReducer = categorySlice.reducer;
export default categoryReducer;