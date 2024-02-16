import { configureStore } from '@reduxjs/toolkit'
import tickersSlice from './tickersSlice';

export const store = configureStore({
  reducer: {
    ticker: tickersSlice,
  },
})