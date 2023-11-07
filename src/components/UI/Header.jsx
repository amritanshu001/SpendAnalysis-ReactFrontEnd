import React from "react";
import styles from "./Header.module.css";
import { motion } from "framer-motion";

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

export default Header;
