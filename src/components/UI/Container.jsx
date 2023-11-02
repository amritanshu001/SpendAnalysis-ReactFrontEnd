import React, { forwardRef } from "react";
import styles from "./Container.module.css";
import { motion } from "framer-motion";

const Container = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={`${styles.container} ${props.className}`}>
      {props.children}
    </div>
  );
});

export default motion(Container);
