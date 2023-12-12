import React, { useState } from "react";
import styles from "./SpendChart.module.css";
import createTrend from "trendline";
import Select from "react-select";

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

const getMonthFromString = (mon) => {
  return new Date(Date.parse(mon + " 1, 2023")).getMonth();
};

const SpendChart = (props) => {
  const monthYears = props.chartData.map(
    (chartItem) =>
      getMonthName(chartItem.date.month) + "," + chartItem.date.year
  );

  const [fromDate, setFromDate] = useState(0);
  console.log(fromDate);
  const [toDate, setToDate] = useState(0);
  const toDateOptions =
    fromDate === 0
      ? monthYears
      : props.chartData
          .filter((chartItem) => {
            const monthNumber = getMonthFromString(
              fromDate.label.split(",")[0]
            );
            const year = fromDate.label.split(",")[1];
            if (chartItem.date.year > +year) {
              return true;
            }
            if (chartItem.date.month >= monthNumber) {
              return true;
            } else {
              return false;
            }
          })
          .map(
            (chartItem) =>
              getMonthName(chartItem.date.month) + "," + chartItem.date.year
          );

  const fromDateChangeHandler = (event) => {
    setFromDate(event);
  };

  const toDateChangeHandler = (event) => {
    setToDate(event);
  };

  const trendData = props.chartData
    .map((chartItem) => chartItem.closingBal)
    .map((balance, index) => {
      return { closingBal: balance, x: index + 1 };
    });
  const trend = createTrend(trendData, "x", "closingBal");

  const data = {
    labels: monthYears,
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
        borderWidth: 3,
        pointRadius: 0,
        borderDash: [0, 6],
        borderCapStyle: "round",
        data: trendData.map((trendPoint, index) => trend.calcY(index + 1)),
      },
    ],
  };
  return (
    <div className={styles.chart}>
      <div>Spend Graph</div>
      <Chart type="bar" data={data} />
      <div className={styles.dates}>
        <div className={styles["date-select"]}>
          <label>From Date</label>
          <Select
            className={styles.reactselect}
            value={fromDate}
            isClearable={true}
            isSearchable={true}
            onChange={fromDateChangeHandler}
            options={monthYears.map((monthItem, indx) => {
              return { value: indx, label: monthItem };
            })}
          />
        </div>
        <div className={styles["date-select"]}>
          <label>To Date</label>
          <Select
            className={styles.reactselect}
            value={toDate}
            isClearable={true}
            isSearchable={true}
            onChange={toDateChangeHandler}
            options={toDateOptions.map((monthItem, indx) => {
              return { value: indx, label: monthItem };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default SpendChart;
