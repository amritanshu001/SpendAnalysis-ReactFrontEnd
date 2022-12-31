import React from "react";
import styles from "./BalanceGrid.module.css";

const BalanceGrid = (props) => {
  return (
    <div className={styles.balance}>
      <div className={styles["content-box"]}>
        <p className={styles.label}>Opening Balance</p>
        <p className={styles.content}>{props.openingBal}</p>
      </div>
      <div className={styles["content-box"]}>
        <p className={styles.label}>Closing Balance</p>
        <p className={styles.content}>{props.closingBal}</p>
      </div>
      <div className={styles["content-box"]}>
        <p className={styles.label}>Deficit/Surplus</p>
        <p
          className={`${styles.content} ${
            props.openingBal > props.closingBal
              ? styles.negative
              : styles.positive
          }`}
        >
          {props.openingBal > props.closingBal
            ? (props.openingBal - props.closingBal).toFixed(2)
            : (props.closingBal - props.openingBal).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default BalanceGrid;
