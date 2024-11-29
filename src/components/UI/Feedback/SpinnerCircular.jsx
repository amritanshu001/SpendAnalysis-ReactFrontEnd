import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const SpinnerCircular = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "1rem",
        padding: "1rem",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.common.white
            : theme.palette.common.black,
      }}
    >
      <CircularProgress color={props.color} size={props.size} />
    </Box>
  );
};

export default SpinnerCircular;
