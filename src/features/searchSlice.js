import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text: ''
};
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        addSearch: (state, action) => {
            state.text = action.payload;
        },
        removeRemove: (state) => {
            text = '';
        },
    },
});

export const { addSearch, removeRemove } = searchSlice.actions;

export default searchSlice.reducer;