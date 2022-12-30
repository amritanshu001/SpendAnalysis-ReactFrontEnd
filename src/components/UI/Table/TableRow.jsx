import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const TableRow = (props) => {
  const mapCells = (row) => {
    return <td key={row.tech_name}>{props.row[row.tech_name]}</td>;
  };

  return (
    <tr>
      {props.header.map(mapCells)}
      {props.editable && (
        <td>
          <EditIcon onClick={props.onEdit} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
