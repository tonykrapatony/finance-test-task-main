// TickerUpdate.js

import { io } from 'socket.io-client';
import { setAllItems, setItems } from '../../store/tickersSlice';

let socket = null;

export const handleTicker = (interval, isRunning) => (dispatch) => {
    if (!isRunning) {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
        return;
    }

    if (!socket) {
        socket = io('http://localhost:4000');
        socket.on('ticker', (items) => {
            dispatch(setItems(items));
            dispatch(setAllItems(items));
        });
    }

    if (interval !== undefined) {
        socket.emit('start', { newInterval: interval });
    }
};
