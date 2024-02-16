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
            
            const maxLength = 10; // Максимальна кількість елементів

            // Якщо нові елементи додаються до масиву і його довжина перевищує максимальну кількість
            if (state.allItems.length + 1 > maxLength) {
                const excessLength = state.allItems.length + 1 - maxLength; // Кількість елементів, які будуть забрані з початку масиву
                state.allItems = [...state.allItems.slice(excessLength), action.payload];
            } else {
                state.allItems = [...state.allItems, action.payload];
            }
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