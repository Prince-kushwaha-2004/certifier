import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./features/loadingSlice";
import moveReducer from "./features/moveSlice";
import userReducer from "./features/userSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        loading: loadingReducer,
        move: moveReducer
    },
});

export default store;