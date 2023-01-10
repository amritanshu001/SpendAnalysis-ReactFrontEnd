import React from "react";
import styles from "./Sidebar.module.css";
import Backdrop from "./Backdrop";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <Backdrop onClick={props.hideSideBar} />
      <div className={styles["sidebar-show"]}>{props.children}</div>
    </React.Fragment>
  );
};

export default Sidebar;
