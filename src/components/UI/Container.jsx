import React, { forwardRef } from "react";
import styles from "./Container.module.css";
import { motion } from "framer-motion";

const Container = forwardRef((props, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      ref={ref}
      className={`${styles.container} ${props.className}`}
    >
      {props.children}
    </motion.div>
  );
});

export default motion(Container);
