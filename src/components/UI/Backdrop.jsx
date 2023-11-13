import React, { forwardRef } from "react";
import styles from "./Backdrop.module.css";
import { motion } from "framer-motion";

const Backdrop = (props) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
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
