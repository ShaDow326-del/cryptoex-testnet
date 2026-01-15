import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface Props {
  history: number[];
}

const CoinChart: React.FC<Props> = ({ history }) => {
  const [data, setData] = useState(history);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        next.push(last * (0.98 + Math.random() * 0.04)); // simulate volatility
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Line
      data={{
        labels: data.map((_, i) => i),
        datasets: [{
          label: "Price",
          data,
          borderColor: "#f0b90b",
          backgroundColor: "rgba(240,185,11,0.2)",
          tension: 0.3,
        }]
      }}
      options={{ plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }}
    />
  );
};

export default CoinChart;
