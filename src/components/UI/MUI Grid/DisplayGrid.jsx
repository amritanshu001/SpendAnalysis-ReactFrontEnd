import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

const DisplayGrid = (props) => {
  return (
    <Box
      sx={{
        height: 2000,
        width: "90%",
        margin: "auto",
        marginTop: 2,
        marginBottom: 2,
        "& .spend-table__header": {
          backgroundColor: "#405d27",
          color: "#f3f2f2",
          fontWeight: 700,
        },
      }}
    >
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        density="compact"
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          border: 1,
        }}
        loading={props.loading}
        autoHeight={true}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />
    </Box>
  );
};

export const RowEditIcon = (props) => {
  return (
    <Tooltip title="Edit" placement="bottom-start" arrow>
      <IconButton onClick={props.onClick} color="default">
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export const RowDeleteIcon = (props) => {
  return (
    <Tooltip title="Delete" placement="bottom-start" arrow>
      <IconButton onClick={props.onClick} color="error">
        <DeleteForeverIcon />
      </IconButton>
    </Tooltip>
  );
};

export const RowCopyIcon = (props) => {
  <Tooltip title="Copy" placement="bottom-start" arrow>
    <IconButton color="primary" onClick={props.onCopy}>
      <ContentCopyOutlinedIcon />
    </IconButton>
  </Tooltip>;
};

export default DisplayGrid;
