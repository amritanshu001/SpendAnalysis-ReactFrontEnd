import React from "react";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
const AnimatedTypography = motion(Typography);

const Header = (props) => {
  return (
    <motion.div
      className={`${styles["form-header"]} ${props.className}`}
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h2>{props.children}</h2>
    </motion.div>
  );
};

const NewHeader = (props) => {
  return (
    <AnimatedTypography
      variant="h4"
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      gutterBottom
      sx={{
        width: "90%",
        maxWidth: "40rem",
        margin: "2rem auto",
        // color: "#002e94",
        color: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.header.main
            : theme.palette.header.light,
        borderBottom: (theme) =>
          `2px solid ${
            theme.palette.mode === "light"
              ? theme.palette.header.main
              : theme.palette.header.light
          }`,
        paddingBottom: "0.25rem",
        paddingLeft: "0.5rem",
        fontWeight: "bold",
        fontFamily: '"Open Sans", "Lato", sans-serif',
      }}
    >
      {props.children}
    </AnimatedTypography>
  );
};

export default NewHeader;
