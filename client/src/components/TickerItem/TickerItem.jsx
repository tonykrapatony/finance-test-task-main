import React, { useEffect, useState } from 'react';

import s from './TickerItem.module.scss'

function TickerItem({ item, onClick }) { // Додано isRunning для відстеження стану біжучих рядків
    const { ticker, price, change, change_percent, last_trade_time } = item;
    const [tickPrice, setTickPrice] = useState(0);
    const [priceClass, setPriceClass] = useState(null);

    useEffect(() => {
        setTickPrice(price);
    }, [])

    useEffect(() => {
        if (price > tickPrice) {
            setPriceClass('positive');
        } else if (price < tickPrice) {
            setPriceClass('negative');
        } else {
            setPriceClass('noСhange')
        }
    }, [price])

    return (
        <div className={`${s.item} ${s[priceClass]}`} onClick={onClick}>
            <h3 className={s.title}>{ticker}</h3>
            <p className={s.change_percent}>{change_percent}%</p>
            <p className={s.price}>{price}</p>
            <p className={s.change}>{change}</p>
            <p className={s.date}>{new Date(last_trade_time).toLocaleString()}</p>
        </div>
    );
}

export default TickerItem;
