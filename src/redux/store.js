import { configureStore } from "@reduxjs/toolkit";
import wordReducer from './wordSlice';

export const store = configureStore({
    reducer : {
        word : wordReducer,
    }
})