import React from "react";
import TableRow from "./TableRow";

const TableBody = (props) => {
  const mapRows = (row) => {
    return <TableRow key={row.id} row={row} header={props.header} />;
  };

  return <tbody>{props.body.map(mapRows)}</tbody>;
};

export default TableBody;
