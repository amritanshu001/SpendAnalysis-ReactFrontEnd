import React, { useState } from "react";

import createTrend from "trendline";

import { Stack } from "@mui/material";
import { useTheme } from "@mui/material";
import MUISelect from "../MUISelect/MUISelect";
import Box from "../Box/MUIBox";
import Autocomplete from "../Autocomplete/MUIAutocomplete";

import {
  getMonthName,
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
  scales,
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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const theme = useTheme();

  const monthYears = props.chartData
    .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
    .map(
      (chartItem) =>
        getMonthName(chartItem.date.month) + "," + chartItem.date.year
    );

  const toDateOptions =
    fromDate === ""
      ? monthYears
      : props.chartData
          .filter((chartItem) => compareDates(chartItem, fromDate))
          .map(
            (chartItem) =>
              getMonthName(chartItem.date.month) + "," + chartItem.date.year
          );

  const fromDateChangeHandler = (event) => {
    setFromDate(event.target.value);
  };

  const toDateChangeHandler = (event) => {
    setToDate(event.target.value);
  };

  const trendData = props.chartData
    .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
    .map((chartItem) => chartItem.closingBal)
    .map((balance, index) => {
      return { closingBal: balance, x: index + 1 };
    });
  const trend = createTrend(trendData, "x", "closingBal");
  const options = {
    scales: {
      x: {
        ticks: {
          color:
            theme.palette.mode === "light"
              ? theme.palette.secondary.dark
              : theme.palette.secondary.light,
        },
      },
      y: {
        ticks: {
          color:
            theme.palette.mode === "light"
              ? theme.palette.secondary.dark
              : theme.palette.secondary.light,
        },
      },
    },
    // plugins: {
    //   legend: {
    //     position: "top",
    //     fullSize: false,
    //     title: {
    //       display: true,
    //       text: "Legend",
    //       color:
    //         theme.palette.mode === "light"
    //           ? theme.palette.warning.dark
    //           : theme.palette.warning.light,
    //       font: {
    //         family: "Roboto sam-serif",
    //         size: 14,
    //         weight: "bold",
    //       },
    //     },
    //     labels: {
    //       color:
    //         theme.palette.mode === "light"
    //           ? theme.palette.secondary.dark
    //           : theme.palette.secondary.light,
    //     },
    //   },
    // },
  };
  const data = {
    labels: monthYears,
    datasets: [
      {
        type: "line",
        label: "Opening Balance",
        borderColor: theme.palette.mode === "light" ? "#008394" : "#33c9dc",
        borderWidth: 2,
        fill: false,
        data: props.chartData
          .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
          .map((chartItem) => chartItem.openingBal),
      },
      {
        type: "line",
        label: "Closing Balance",
        borderColor: theme.palette.mode === "light" ? "#008c3a" : "#00c853",
        borderWidth: 2,
        fill: false,
        data: props.chartData
          .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
          .map((chartItem) => chartItem.closingBal),
      },
      {
        type: "bar",
        label: "Expense",
        backgroundColor: theme.palette.mode === "light" ? "#ff7a95" : "#b23e56",
        borderColor: theme.palette.mode === "light" ? "white" : "black",
        borderWidth: 2,
        data: props.chartData
          .filter((chartItem) => filterDates(chartItem, fromDate, toDate))
          .map((chartItem) => chartItem.outgoing),
      },
      {
        type: "bar",
        label: "Income",
        backgroundColor: "#62B6B7",
        borderColor: theme.palette.mode === "light" ? "white" : "black",
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
    <Box>
      <Chart type="bar" data={data} options={options} />
      <Stack
        direction={{ xs: "column", lg: "row" }}
        flexWrap={true}
        justifyContent={"space-around"}
        alignItems={"center"}
        py={1}
        gap={2}
      >
        <MUISelect
          id="from-date"
          label="From"
          value={fromDate}
          onChange={fromDateChangeHandler}
          list={monthYears.map((monthItem) => ({
            id: monthItem,
            displayName: monthItem,
          }))}
        />

        <MUISelect
          id="to-date"
          label="To"
          value={toDate}
          onChange={toDateChangeHandler}
          list={toDateOptions.map((monthItem) => {
            return { id: monthItem, displayName: monthItem };
          })}
        />
      </Stack>
    </Box>
  );
};

export default SpendChart;
