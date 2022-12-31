import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

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
      {props.toDelete && (
        <td>
          <DeleteForeverIcon onClick={props.onDelete} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
