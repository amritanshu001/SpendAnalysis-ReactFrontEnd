import React from "react";

const TableRow = (props) => {
  const mapCells = (row) => {
    console.log("Col Name", row.tech_name);
    console.log("Col Value", props.row[row.tech_name]);
    return <td key={row.tech_name}>{props.row[row.tech_name]}</td>;
  };

  return <tr>{props.header.map(mapCells)}</tr>;
};

export default TableRow;
