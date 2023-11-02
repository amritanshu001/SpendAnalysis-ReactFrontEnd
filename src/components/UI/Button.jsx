import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { motion } from "framer-motion";

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

export default motion(Button);
