import { createSlice } from "@reduxjs/toolkit";
import arrayShuffle from "array-shuffle";
import Words from "../Components/Words/Words.json"

export const wordSlice = createSlice({
    name : "word",
    initialState : {
        registeredWords : Words.title,
        registeredWordsShuffle : [],
        writtenWords : [],
        second : 60,
        minute : 1,
        correctlySpelledWords : [],
    },

    reducers : {
        addTheTypedWord : (state , action) =>{
            state.writtenWords = [...state.writtenWords , action.payload] 
        },
        decreaseSeconds : (state) =>{
            state.second = state.second - 1;
            state.minute = Math.floor(state.second / 60);
        },
        addTheCorrectlySpelledWord : (state , action) =>{
            state.correctlySpelledWords.push(action.payload)
        },
        mix : (state , action) =>{
            state.registeredWordsShuffle = arrayShuffle(action.payload)
        },
        secondRestart : (state) =>{
            state.minute = 1;
            state.second = 60;
            state.writtenWords = [];
            state.correctlySpelledWords = [];
            state.registeredWords = Words.title;
        }
    }
})

export const { addTheTypedWord , decreaseSeconds , addTheCorrectlySpelledWord  , mix , secondRestart} = wordSlice.actions
export default wordSlice.reducer;