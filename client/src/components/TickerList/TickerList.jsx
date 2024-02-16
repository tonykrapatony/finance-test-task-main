import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTicker } from "./HandleTicker";
import TickerItem from "../TickerItem/TickerItem";

import s from "./TickerList.module.scss";

export default function TickerList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.ticker.items);

  const [isTickerRunning, setIsTickerRunning] = useState(true);

  useEffect(() => {
    dispatch(handleTicker(null, isTickerRunning)); // Передаємо поточне значення isTickerRunning
  }, [dispatch, isTickerRunning]); // Додаємо isTickerRunning до залежностей ефекту


  const handleIntervalChange = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.currentTarget);
    const newInterval = parseInt(Object.fromEntries(formdata).interval) * 1000;
    dispatch(handleTicker(newInterval, isTickerRunning)); // Передаємо новий інтервал та стан біжучих рядків
  };

  const toggleTickerRunning = () => { // Доданий обробник подій для вмикання/вимикання біжучих рядків
    setIsTickerRunning(!isTickerRunning);
  };

  return (
    <>
      <div className={s.input}>
        <h2>Set interval time in seconds</h2>
        <form onSubmit={handleIntervalChange}>
          <input type="number" name="interval" id="interval" />
          <button className={s.btn} type="submit">Set</button>
        </form>
      </div>
      <div className={s.list_container}>
        {items && <>
          <div className={s.list}>
            {items.map((item, index) => (
              <TickerItem
                item={item}
                key={index}
              />
            ))}
          </div>
          <button className={`${s.btn} ${isTickerRunning ? s.stop : s.start}`} onClick={toggleTickerRunning}>
            {isTickerRunning ? "Stop Tickers" : "Start Tickers"}
          </button>
        </>}
      </div>
    </>
  );
}
