import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IconButton from "@mui/material/IconButton";

const TableRow = (props) => {
  const mapCells = (row) => {
    return <td key={row.tech_name}>{props.row[row.tech_name]}</td>;
  };

  return (
    <tr>
      {props.header.map(mapCells)}
      {props.editable && (
        <td>
          <IconButton onClick={props.onEdit} color="default">
            <EditIcon />
          </IconButton>
        </td>
      )}
      {props.toDelete && (
        <td>
          <IconButton onClick={props.onDelete} color="error">
            <DeleteForeverIcon />
          </IconButton>
        </td>
      )}
      {props.toCopy && (
        <td>
          <IconButton color="primary" onClick={props.onCopy}>
            <ContentCopyOutlinedIcon />
          </IconButton>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
