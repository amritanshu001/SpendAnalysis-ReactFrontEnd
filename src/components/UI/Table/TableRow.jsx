import React from "react";

const TableRow = (props) => {
  const mapCells = (row) => {
    // console.log(row.tech_name, props.row[row.tech_name]);
    // if (row.tech_name === "txn_date") {
    // }
    return <td key={row.tech_name}>{props.row[row.tech_name]}</td>;
  };
  // console.log(props.header, props.row);
  return (
    <tr>
      {/* <td>
        <button type="button"></button>
      </td>
      <td>
        <button type="button"></button>
      </td> */}
      {props.header.map(mapCells)}
    </tr>
  );
};

export default TableRow;
