import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { motion } from "framer-motion";
import LoadingButton from "@mui/lab/LoadingButton";

const AnimatedButton = motion(LoadingButton);

const Button = forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      className={`${styles.button} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
});

const NewButton = (props) => {
  return (
    <AnimatedButton
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      color={props.color}
      variant={"variant" in props ? props.variant : "contained"}
      endIcon={props.icon}
      loading={props.loading}
      loadingPosition="end"
      sx={props.sx}
    >
      {props.children}
    </AnimatedButton>
  );
};

// export default motion(Button);
export default NewButton;
