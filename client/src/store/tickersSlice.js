import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allItems: [],
    items: [],
    interval: 5000,
};


const tickerSlice = createSlice({
    name: 'ticker',
    initialState,
    reducers: {
        setAllItems: (state, action) => {
            state.allItems = [...state.allItems, ...action.payload];
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setInterval: (state, action) => {
            state.interval = action.payload;
        }
    }
})

export const { setAllItems, setItems, setInterval } = tickerSlice.actions;

export default tickerSlice.reducer;