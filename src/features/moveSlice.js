import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    type: null
};
const moveSlice = createSlice({
    name: "move",
    initialState,
    reducers: {
        addMove: (state, action) => {
            state.id = action.payload.id;
            state.type = action.payload.type;
        },
        removeMove: (state) => {
            state.id = null;
            state.type = null;
        },
    },
});

export const { addMove, removeMove } = moveSlice.actions;

export default moveSlice.reducer;