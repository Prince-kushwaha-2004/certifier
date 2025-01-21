import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./features/loadingSlice";
import moveReducer from "./features/moveSlice";
import searchReducer from './features/searchSlice';
import userReducer from "./features/userSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        loading: loadingReducer,
        move: moveReducer,
        search: searchReducer
    },
});

export default store;