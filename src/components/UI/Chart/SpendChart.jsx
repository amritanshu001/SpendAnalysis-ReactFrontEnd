import React from "react";
import styles from "./SpendChart.module.css";
import createTrend from "trendline";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString("default", { month: "long" });
};

const SpendChart = (props) => {
  const trendData = props.chartData
    .map((chartItem) => chartItem.closingBal)
    .map((balance, index) => {
      return { closingBal: balance, x: index + 1 };
    });
  const trend = createTrend(trendData, "x", "closingBal");

  const data = {
    labels: props.chartData.map((chartItem) => {
      return getMonthName(chartItem.date.month) + "," + chartItem.date.year;
    }),
    datasets: [
      {
        type: "line",
        label: "Opening Balance",
        borderColor: "#FF9E9E",
        borderWidth: 2,
        fill: false,
        data: props.chartData.map((chartItem) => chartItem.openingBal),
      },
      {
        type: "line",
        label: "Closing Balance",
        borderColor: "#395322",
        borderWidth: 2,
        fill: false,
        data: props.chartData.map((chartItem) => chartItem.closingBal),
      },
      {
        type: "bar",
        label: "Expense",
        backgroundColor: "#FF597B",
        borderColor: "white",
        borderWidth: 2,
        data: props.chartData.map((chartItem) => chartItem.outgoing),
      },
      {
        type: "bar",
        label: "Income",
        backgroundColor: "#62B6B7",
        borderColor: "white",
        borderWidth: 2,
        data: props.chartData.map((chartItem) => chartItem.incoming),
      },
      {
        type: "line",
        label: "Trend",
        borderColor: "#ccc",
        fill: false,
        data: trendData.map((trendPoint, index) => trend.calcY(index + 1)),
      },
    ],
  };
  return (
    <div className={styles.chart}>
      <div>Spend Graph</div>
      <Chart type="bar" data={data} />
    </div>
  );
};

export default SpendChart;
