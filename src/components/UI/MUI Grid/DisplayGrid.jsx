import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

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
        sx={{
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          border: 1,
        }}
        loading={props.loading}
        autoHeight={true}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
      />
    </Box>
  );
};

export default DisplayGrid;
