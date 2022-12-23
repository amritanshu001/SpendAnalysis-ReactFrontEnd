import React from "react";

const TableRow = (props) => {
  const mapCells = (row) => {
    return <td key={row.tech_name}>{props.row[row.tech_name]}</td>;
  };

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
