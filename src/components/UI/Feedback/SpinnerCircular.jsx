import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./SpinnerCircular.module.css";

const SpinnerCircular = (props) => {
  return (
    <div className={styles.spinner}>
      <CircularProgress color={props.color} size={props.size} />
    </div>
  );
};

export default SpinnerCircular;
