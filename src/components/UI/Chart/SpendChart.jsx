import React from "react";
import styles from "./SpendChart.module.css";
import Header from "../Header";
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

const SpendChart = (props) => {
  const data = {
    labels: props.chartData.map((chartItem) => {
      return chartItem.date.month + "/" + chartItem.date.year;
    }),
    datasets: [
      {
        type: "line",
        label: "Opening Balance",
        borderColor: "rgb(255, 99, 132)",
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
        label: "Income",
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "white",
        borderWidth: 2,
        data: props.chartData.map((chartItem) => chartItem.incoming),
      },
      {
        type: "bar",
        label: "Expense",
        backgroundColor: "rgb(53, 162, 235)",
        borderColor: "white",
        borderWidth: 2,
        data: props.chartData.map((chartItem) => chartItem.outgoing),
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
