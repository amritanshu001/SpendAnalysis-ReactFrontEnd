import React from "react";
import styles from "./TransactionGrid.module.css";

const TransactionGrid = (props) => {
  return (
    <div className={styles.average}>
      <div className={styles.labels}>
        <p className={styles.blank}></p>
        <p>Incoming</p>
        <p>Outgoing</p>
      </div>
      <div className={styles.labels}>
        <p>Amount</p>
        <p>{props.summary.incomingSum.toFixed(2)}</p>
        <p>{props.summary.outgoingSum.toFixed(2)}</p>
      </div>
      <div className={styles.labels}>
        <p>Txn #</p>
        <p>{props.summary.incomingTxnCount}</p>
        <p>{props.summary.outgoingTxnCount}</p>
      </div>
      <div className={styles.labels}>
        <p>Avg</p>
        <p>
          {(props.summary.incomingSum / props.summary.incomingTxnCount).toFixed(
            2
          )}
        </p>
        <p>
          {(props.summary.outgoingSum / props.summary.outgoingTxnCount).toFixed(
            2
          )}
        </p>
      </div>
    </div>
  );
};

export default TransactionGrid;
