import React, { useState } from "react";
import styles from "./SpendChart.module.css";
import createTrend from "trendline";
import Select from "react-select";

import {
  getMonthName,
  getMonthFromString,
  compareDates,
  filterDates,
} from "../../../lib/common-scripts";

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

// const getMonthName = (monthNumber) => {
//   const date = new Date();
//   date.setMonth(monthNumber);
//   return date.toLocaleString("default", { month: "long" });
// };

// const getMonthFromString = (mon) => {
//   return new Date(Date.parse(mon + " 1, 2023")).getMonth();
// };

// const compareDates = (chartData, filterData, greater = true) => {
//   const monthNumber = getMonthFromString(filterData.label.split(",")[0]);
//   const year = filterData.label.split(",")[1];
//   if (greater) {
//     if (chartData.date.year > +year) {
//       return true;
//     }
//     if (chartData.date.month >= monthNumber) {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     if (chartData.date.year < +year) {
//       return true;
//     }
//     if (chartData.date.month <= monthNumber) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };

// const filterDates = (chartItem, fromDate, toDate) => {
//   if (!toDate && !fromDate) {
//     return true;
//   }
//   if (!toDate && fromDate) {
//     return compareDates(chartItem, fromDate);
//   }
//   if (toDate && !fromDate) {
//     return compareDates(chartItem, toDate, false);
//   }
//   if (toDate && fromDate) {
//     return (
//       compareDates(chartItem, fromDate) &&
//       compareDates(chartItem, toDate, false)
//     );
//   }
// };

const SpendChart = (props) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const monthYears = props.chartData
    .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
    .map(
      (chartItem) =>
        getMonthName(chartItem.date.month) + "," + chartItem.date.year
    );

  const toDateOptions =
    fromDate === null
      ? monthYears
      : props.chartData
          .filter((chartItem) => compareDates(chartItem, fromDate))
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
    .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
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
        data: props.chartData
          .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
          .map((chartItem) => chartItem.openingBal),
      },
      {
        type: "line",
        label: "Closing Balance",
        borderColor: "#395322",
        borderWidth: 2,
        fill: false,
        data: props.chartData
          .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
          .map((chartItem) => chartItem.closingBal),
      },
      {
        type: "bar",
        label: "Expense",
        backgroundColor: "#FF597B",
        borderColor: "white",
        borderWidth: 2,
        data: props.chartData
          .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
          .map((chartItem) => chartItem.outgoing),
      },
      {
        type: "bar",
        label: "Income",
        backgroundColor: "#62B6B7",
        borderColor: "white",
        borderWidth: 2,
        data: props.chartData
          .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
          .map((chartItem) => chartItem.incoming),
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
          <label>From</label>
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
          <label>To</label>
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
