import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
};
const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadingStart: (state) => {
            state.loading = true;
        },
        loadingStop: (state) => {
            state.loading = false;
        },
    },
});

export const { loadingStart, loadingStop } = loadingSlice.actions;

export default loadingSlice.reducer;