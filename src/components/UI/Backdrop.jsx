import React, { forwardRef } from "react";
import styles from "./Backdrop.module.css";
import { motion } from "framer-motion";

const Backdrop = (props) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        // scale: [0.8, 0.5, 0.3, 0.1, 0],
        // rotate: [10, 50, 90, 130, 180],
        scaleY: 0,
      }}
      className={styles.backdrop}
      onClick={props.onClick}
    >
      {props.children}
    </motion.div>
  );
};

export default Backdrop;
