import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

const TableRow = (props) => {
  const mapCells = (row) => {
    return <td key={row.tech_name}>{props.row[row.tech_name]}</td>;
  };

  return (
    <tr>
      {props.header.map(mapCells)}
      {props.editable && (
        <td>
          <Tooltip title="Edit" placement="bottom-start" arrow>
            <IconButton onClick={props.onEdit} color="default">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </td>
      )}
      {props.toDelete && (
        <td>
          <Tooltip title="Delete" placement="bottom-start" arrow>
            <IconButton onClick={props.onDelete} color="error">
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </td>
      )}
      {props.toCopy && (
        <td>
          <Tooltip title="Copy" placement="bottom-start" arrow>
            <IconButton color="primary" onClick={props.onCopy}>
              <ContentCopyOutlinedIcon />
            </IconButton>
          </Tooltip>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
