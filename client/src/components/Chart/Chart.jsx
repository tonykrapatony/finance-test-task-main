import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import s from './Chart.module.scss';

export default function Chart() {
  const allItems = useSelector((state) => state.ticker.allItems);
  console.log(allItems)
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const data = allItems.flatMap(array => array);
    console.log(data)
    const outputArray = data.reduce((result, item) => {
      const { last_trade_time, ticker, price } = item;
      const dateObject = new Date(last_trade_time);

      const hours = ("0" + dateObject.getHours()).slice(-2); // Отримуємо години
      const minutes = ("0" + dateObject.getMinutes()).slice(-2); // Отримуємо хвилини
      const seconds = ("0" + dateObject.getSeconds()).slice(-2); // Отримуємо секунди

      const formattedDate = `${hours}:${minutes}:${seconds}`;

      // Перевіряємо, чи вже існує об'єкт з такою датою в результаті
      let existingItem = result.find((entry) => entry.date === formattedDate);
      if (!existingItem) {
        // Якщо об'єкт з такою датою ще не існує, створюємо новий
        existingItem = {
          name: formattedDate,
          date: formattedDate,
          [ticker]: price,
        };
        result.push(existingItem);
      } else {
        // Якщо об'єкт з такою датою вже існує, просто додаємо нове значення
        existingItem[ticker] = price;
      }

      return result;
    }, []);
    setNewData(outputArray);
  }, [allItems]);

  return (
    <div className={s.chart_container}>
      <h3 className={s.title}>Realtime Chart</h3>
      <LineChart
        
        width={1000}
        height={500}
        data={newData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="AAPL" stroke="red" dot={false} />
        <Line type="linear" dataKey="AMZN" stroke="green" dot={false} />
        <Line type="linear" dataKey="FB" stroke="blue" dot={false} />
        <Line type="linear" dataKey="GOOGL" stroke="yellow" dot={false} />
        <Line type="linear" dataKey="MSFT" stroke="pink" dot={false} />
        <Line type="linear" dataKey="TSLA" stroke="black" dot={false} />
      </LineChart>
    </div>
  );
}
