import React from "react";
import styles from "./Sidebar.module.css";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <Backdrop key="backdrop" onClick={props.hideSideBar} />
      <motion.div
        key="sidebar"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, x: -100 }}
        className={styles["sidebar-show"]}
      >
        {props.children}
      </motion.div>
    </React.Fragment>
  );
};

export default Sidebar;
