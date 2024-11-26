import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React, { forwardRef } from "react";

const AnimatedBox = motion(Box);

const MUIBox = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        ...props.sx,
      }}
      component={props.component}
      onSubmit={props.onSubmit}
      id={props.id}
    >
      {props.children}
    </Box>
  );
});

export default motion(MUIBox);
