import React from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

const AnimatedBox = motion(Box);

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <Backdrop key="backdrop" onClick={props.hideSideBar} />
      <AnimatedBox
        key="sidebar"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, x: -100 }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 250,
          height: "100vh",
          zIndex: (theme) => theme.zIndex.drawer,
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey["100"]
              : theme.palette.grey["800"],
        }}
      >
        {props.children}
      </AnimatedBox>
    </React.Fragment>
  );
};

export default Sidebar;
