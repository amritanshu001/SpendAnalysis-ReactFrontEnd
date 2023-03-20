import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DisplayGrid = (props) => {
  console.log("In MUI Display Grid", props.rows, props.columns);
  return (
    <DataGrid rows={props.rows} columns={props.columns} density="compact" />
  );
};

export default DisplayGrid;
