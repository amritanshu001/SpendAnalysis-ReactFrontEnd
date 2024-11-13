import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const AnimatedBox = motion(Box);

const MUIBox = (props) => {
  return (
    <AnimatedBox
      sx={{
        ...props.sx,
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
      }}
      variants={{ ...props.variants }}
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      layout={props.layout}
      component={props.component}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </AnimatedBox>
  );
};

export default MUIBox;
